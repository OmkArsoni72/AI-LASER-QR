import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ComponentData {
  id: string;
  type: 'Rail Clip' | 'Rail Pad' | 'Sleeper' | 'Fish Plate' | 'Rail Liner';
  manufacturer: string;
  batchNumber: string;
  installDate: string;
  warrantyExpiry: string;
  location: {
    coordinates: [number, number];
    section: string;
    kilometer: string;
  };
  status: 'Active' | 'Maintenance' | 'Defective' | 'Replaced';
  inspectionHistory: Array<{
    date: string;
    inspector: string;
    notes: string;
    rating: 'Good' | 'Fair' | 'Poor';
  }>;
  defectReports: Array<{
    id: string;
    date: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    description: string;
    resolved: boolean;
  }>;
  vendorId: string;
  qrData: string;
  materialSpecs?: {
    material: string;
    loadRating: string;
    dimensions: string;
  };
}

export interface WarrantyClaim {
  id: string;
  componentId: string;
  vendorId: string;
  claimDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  description: string;
  images: string[];
  adminNotes?: string;
  approvedDate?: string;
  rejectedReason?: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  specialties: string[];
  rating: number;
  totalComponents: number;
  activeWarranties: number;
}

interface ComponentStore {
  components: ComponentData[];
  claims: WarrantyClaim[];
  vendors: Vendor[];
  currentUser: {
    id: string;
    name: string;
    role: 'superadmin' | 'admin' | 'inspector' | 'vendor' | 'viewer';
    vendorId?: string;
  } | null;
  
  // Actions
  addComponent: (component: ComponentData) => void;
  updateComponent: (id: string, component: Partial<ComponentData>) => void;
  deleteComponent: (id: string) => void;
  getComponentById: (id: string) => ComponentData | undefined;
  getComponentsByVendor: (vendorId: string) => ComponentData[];
  
  // Claims
  addClaim: (claim: WarrantyClaim) => void;
  updateClaim: (id: string, claim: Partial<WarrantyClaim>) => void;
  getClaimsByVendor: (vendorId: string) => WarrantyClaim[];
  
  // Vendors
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  getVendorById: (id: string) => Vendor | undefined;
  
  // Auth
  setCurrentUser: (user: ComponentStore['currentUser']) => void;
  logout: () => void;
  
  // Analytics
  getMetrics: () => {
    totalComponents: number;
    activeComponents: number;
    warrantyExpiring: number;
    defectiveComponents: number;
    pendingClaims: number;
  };
}

// Mock data generation
const generateMockComponents = (): ComponentData[] => {
  const types: ComponentData['type'][] = ['Rail Clip', 'Rail Pad', 'Sleeper', 'Fish Plate', 'Rail Liner'];
  const manufacturers = ['ABC Industries', 'XYZ Corp', 'Railway Tech Ltd', 'Steel Masters', 'Track Components Inc'];
  const sections = ['Delhi-Gurgaon', 'Mumbai-Pune', 'Chennai-Bangalore', 'Kolkata-Bhubaneswar', 'Ahmedabad-Vadodara'];
  const statuses: ComponentData['status'][] = ['Active', 'Maintenance', 'Defective', 'Replaced'];
  
  return Array.from({ length: 150 }, (_, i) => {
    const installDate = new Date(2023 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const warrantyExpiry = new Date(installDate.getFullYear() + 5, installDate.getMonth(), installDate.getDate());
    
    return {
      id: `RC-${String(i + 1).padStart(3, '0')}-2025-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
      type: types[Math.floor(Math.random() * types.length)],
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      batchNumber: `B-2025-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
      installDate: installDate.toISOString().split('T')[0],
      warrantyExpiry: warrantyExpiry.toISOString().split('T')[0],
      location: {
        coordinates: [77.1025 + (Math.random() - 0.5) * 2, 28.7041 + (Math.random() - 0.5) * 2] as [number, number],
        section: sections[Math.floor(Math.random() * sections.length)],
        kilometer: `KM ${(Math.random() * 500).toFixed(1)}`
      },
      status: statuses[Math.floor(Math.random() * statuses.length)],
      inspectionHistory: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        inspector: ['R. Singh', 'S. Verma', 'A. Kumar', 'P. Sharma', 'M. Gupta'][Math.floor(Math.random() * 5)],
        notes: ['Good condition', 'Minor wear', 'Needs attention', 'Excellent', 'Fair condition'][Math.floor(Math.random() * 5)],
        rating: ['Good', 'Fair', 'Poor'][Math.floor(Math.random() * 3)] as 'Good' | 'Fair' | 'Poor'
      })),
      defectReports: Math.random() > 0.7 ? [{
        id: `DR-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] as 'Low' | 'Medium' | 'High' | 'Critical',
        description: ['Loose connection', 'Surface corrosion', 'Crack detected', 'Wear beyond limits'][Math.floor(Math.random() * 4)],
        resolved: Math.random() > 0.5
      }] : [],
      vendorId: `V-${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}`,
      qrData: '',
      materialSpecs: {
        material: 'High Carbon Steel',
        loadRating: '25T',
        dimensions: '150x75x25mm'
      }
    };
  });
};

const generateMockVendors = (): Vendor[] => {
  const vendorNames = [
    'ABC Industries', 'XYZ Corp', 'Railway Tech Ltd', 'Steel Masters', 'Track Components Inc',
    'Premier Rail Solutions', 'Iron Horse Industries', 'Railway Systems Ltd', 'Track Tech Corp', 'Rail Components Co'
  ];
  
  return vendorNames.map((name, i) => ({
    id: `V-${String(i + 1).padStart(3, '0')}`,
    name,
    email: `contact@${name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')}.com`,
    phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    address: `${Math.floor(Math.random() * 999) + 1}, Industrial Area, ${['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Pune'][Math.floor(Math.random() * 5)]}`,
    specialties: ['Rail Clips', 'Sleepers', 'Fish Plates'].slice(0, Math.floor(Math.random() * 3) + 1),
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
    totalComponents: Math.floor(Math.random() * 500) + 50,
    activeWarranties: Math.floor(Math.random() * 100) + 10
  }));
};

const generateMockClaims = (components: ComponentData[]): WarrantyClaim[] => {
  const statuses: WarrantyClaim['status'][] = ['Pending', 'Approved', 'Rejected', 'Under Review'];
  
  return components.slice(0, 25).map((component, i) => ({
    id: `CL-${String(i + 1).padStart(4, '0')}`,
    componentId: component.id,
    vendorId: component.vendorId,
    claimDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    description: [
      'Component showing premature wear',
      'Defect found during routine inspection',
      'Material quality issues observed',
      'Installation defect discovered',
      'Warranty replacement request'
    ][Math.floor(Math.random() * 5)],
    images: [`/api/claims/${i + 1}/image1.jpg`, `/api/claims/${i + 1}/image2.jpg`],
    adminNotes: Math.random() > 0.5 ? 'Under review by technical team' : undefined,
    approvedDate: Math.random() > 0.7 ? new Date().toISOString().split('T')[0] : undefined,
    rejectedReason: Math.random() > 0.8 ? 'Insufficient evidence provided' : undefined
  }));
};

export const useComponentStore = create<ComponentStore>()(
  persist(
    (set, get) => {
      const mockComponents = generateMockComponents();
      const mockVendors = generateMockVendors();
      const mockClaims = generateMockClaims(mockComponents);
      
      return {
        components: mockComponents,
        claims: mockClaims,
        vendors: mockVendors,
        currentUser: {
          id: 'U-001',
          name: 'Admin User',
          role: 'admin'
        },
        
        addComponent: (component) => set((state) => ({
          components: [...state.components, component]
        })),
        
        updateComponent: (id, updatedComponent) => set((state) => ({
          components: state.components.map(c => c.id === id ? { ...c, ...updatedComponent } : c)
        })),
        
        deleteComponent: (id) => set((state) => ({
          components: state.components.filter(c => c.id !== id)
        })),
        
        getComponentById: (id) => get().components.find(c => c.id === id),
        
        getComponentsByVendor: (vendorId) => get().components.filter(c => c.vendorId === vendorId),
        
        addClaim: (claim) => set((state) => ({
          claims: [...state.claims, claim]
        })),
        
        updateClaim: (id, updatedClaim) => set((state) => ({
          claims: state.claims.map(c => c.id === id ? { ...c, ...updatedClaim } : c)
        })),
        
        getClaimsByVendor: (vendorId) => get().claims.filter(c => c.vendorId === vendorId),
        
        addVendor: (vendor) => set((state) => ({
          vendors: [...state.vendors, vendor]
        })),
        
        updateVendor: (id, updatedVendor) => set((state) => ({
          vendors: state.vendors.map(v => v.id === id ? { ...v, ...updatedVendor } : v)
        })),
        
        getVendorById: (id) => get().vendors.find(v => v.id === id),
        
        setCurrentUser: (user) => set({ currentUser: user }),
        
        logout: () => set({ currentUser: null }),
        
        getMetrics: () => {
          const { components, claims } = get();
          const now = new Date();
          const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
          
          return {
            totalComponents: components.length,
            activeComponents: components.filter(c => c.status === 'Active').length,
            warrantyExpiring: components.filter(c => 
              new Date(c.warrantyExpiry) <= threeMonthsFromNow && new Date(c.warrantyExpiry) > now
            ).length,
            defectiveComponents: components.filter(c => c.status === 'Defective').length,
            pendingClaims: claims.filter(c => c.status === 'Pending' || c.status === 'Under Review').length
          };
        }
      };
    },
    {
      name: 'railway-component-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        components: state.components,
        claims: state.claims,
        vendors: state.vendors
      })
    }
  )
);