import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Plus, 
  QrCode, 
  Eye, 
  Edit,
  Package,
  Calendar,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComponentStore } from '@/store/useComponentStore';
import { format } from 'date-fns';

const ComponentsPage = () => {
  const { components, currentUser, getComponentsByVendor } = useComponentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Filter components based on user role
  const userComponents = useMemo(() => {
    if (currentUser?.role === 'vendor' && currentUser.vendorId) {
      return getComponentsByVendor(currentUser.vendorId);
    }
    return components;
  }, [components, currentUser, getComponentsByVendor]);

  // Filtered components
  const filteredComponents = useMemo(() => {
    return userComponents.filter((component) => {
      const matchesSearch = component.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.location.section.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || component.status === statusFilter;
      const matchesType = typeFilter === 'all' || component.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [userComponents, searchTerm, statusFilter, typeFilter]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'railway-badge-success';
      case 'Maintenance':
        return 'railway-badge-warning';
      case 'Defective':
        return 'railway-badge-danger';
      case 'Replaced':
        return 'railway-badge';
      default:
        return 'railway-badge';
    }
  };

  const getWarrantyStatus = (warrantyExpiry: string) => {
    const expiryDate = new Date(warrantyExpiry);
    const now = new Date();
    const diffMonths = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (diffMonths < 0) return { status: 'Expired', variant: 'railway-badge-danger' };
    if (diffMonths < 3) return { status: 'Expiring Soon', variant: 'railway-badge-warning' };
    return { status: 'Valid', variant: 'railway-badge-success' };
  };

  const uniqueTypes = [...new Set(components.map(c => c.type))];
  const isVendorView = currentUser?.role === 'vendor';

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isVendorView ? 'My Components' : 'Component Management'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isVendorView 
              ? 'Track and manage your supplied components'
              : 'Manage railway track components and their lifecycle'
            }
          </p>
        </div>
        
        {!isVendorView && (
          <div className="flex space-x-3">
            <Button asChild variant="outline">
              <Link to="/qr/generate">
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR Codes
              </Link>
            </Button>
            <Button asChild className="bg-gradient-hero text-white hover:opacity-90">
              <Link to="/components/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Component
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <Package className="h-8 w-8 text-primary mr-4" />
            <div>
              <p className="text-2xl font-bold">{filteredComponents.length}</p>
              <p className="text-xs text-muted-foreground">Total Components</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center mr-4">
              <div className="h-3 w-3 rounded-full bg-success"></div>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {filteredComponents.filter(c => c.status === 'Active').length}
              </p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <Calendar className="h-8 w-8 text-warning mr-4" />
            <div>
              <p className="text-2xl font-bold">
                {filteredComponents.filter(c => getWarrantyStatus(c.warrantyExpiry).status === 'Expiring Soon').length}
              </p>
              <p className="text-xs text-muted-foreground">Expiring Soon</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center mr-4">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {filteredComponents.filter(c => c.status === 'Defective').length}
              </p>
              <p className="text-xs text-muted-foreground">Defective</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle>Components</CardTitle>
          <CardDescription>
            Search and filter components by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by ID, type, manufacturer, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Defective">Defective</SelectItem>
                <SelectItem value="Replaced">Replaced</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Components Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Warranty</TableHead>
                  <TableHead>Install Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComponents.map((component) => {
                  const warrantyStatus = getWarrantyStatus(component.warrantyExpiry);
                  
                  return (
                    <TableRow key={component.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm">{component.id}</TableCell>
                      <TableCell>{component.type}</TableCell>
                      <TableCell>{component.manufacturer}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {component.location.section} {component.location.kilometer}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeVariant(component.status)}>
                          {component.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={warrantyStatus.variant}>
                          {warrantyStatus.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(new Date(component.installDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!isVendorView && (
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {filteredComponents.length === 0 && (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No components found</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'Get started by adding your first component.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentsPage;