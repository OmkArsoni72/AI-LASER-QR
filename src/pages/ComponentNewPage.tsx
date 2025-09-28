import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ArrowRight, 
  Package, 
  MapPin, 
  Settings, 
  QrCode,
  Check,
  FileText
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useComponentStore, ComponentData } from '@/store/useComponentStore';
import { toast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';

type FormStep = 'basic' | 'location' | 'technical' | 'qr' | 'confirm';

const ComponentNewPage = () => {
  const navigate = useNavigate();
  const { addComponent, vendors } = useComponentStore();
  const [currentStep, setCurrentStep] = useState<FormStep>('basic');
  const [formData, setFormData] = useState<Partial<ComponentData>>({
    type: undefined,
    manufacturer: '',
    batchNumber: '',
    location: {
      coordinates: [77.1025, 28.7041],
      section: '',
      kilometer: ''
    },
    materialSpecs: {
      material: '',
      loadRating: '',
      dimensions: ''
    },
    vendorId: ''
  });

  const steps = [
    { id: 'basic', title: 'Basic Info', icon: Package },
    { id: 'location', title: 'Location', icon: MapPin },
    { id: 'technical', title: 'Technical', icon: Settings },
    { id: 'qr', title: 'QR Code', icon: QrCode },
    { id: 'confirm', title: 'Confirm', icon: Check }
  ];

  const componentTypes: ComponentData['type'][] = [
    'Rail Clip', 'Rail Pad', 'Sleeper', 'Fish Plate', 'Rail Liner'
  ];

  const sections = [
    'Delhi-Gurgaon', 'Mumbai-Pune', 'Chennai-Bangalore', 
    'Kolkata-Bhubaneswar', 'Ahmedabad-Vadodara'
  ];

  const handleNext = () => {
    const stepOrder: FormStep[] = ['basic', 'location', 'technical', 'qr', 'confirm'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const stepOrder: FormStep[] = ['basic', 'location', 'technical', 'qr', 'confirm'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const generateComponentId = () => {
    const typeCode = formData.type?.replace(/\s+/g, '').substring(0, 2).toUpperCase() || 'RC';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 999) + 1;
    return `${typeCode}-${String(random).padStart(3, '0')}-${year}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
  };

  const handleSubmit = () => {
    const componentId = generateComponentId();
    const installDate = new Date().toISOString().split('T')[0];
    const warrantyExpiry = new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newComponent: ComponentData = {
      id: componentId,
      type: formData.type!,
      manufacturer: formData.manufacturer!,
      batchNumber: formData.batchNumber!,
      installDate,
      warrantyExpiry,
      location: formData.location!,
      status: 'Active',
      inspectionHistory: [],
      defectReports: [],
      vendorId: formData.vendorId!,
      qrData: JSON.stringify({
        id: componentId,
        type: formData.type,
        manufacturer: formData.manufacturer,
        batchNumber: formData.batchNumber,
        installDate,
        warrantyExpiry,
        location: formData.location
      }),
      materialSpecs: formData.materialSpecs
    };

    addComponent(newComponent);
    
    toast({
      title: "Component Added Successfully",
      description: `Component ${componentId} has been registered and QR code generated.`,
    });

    navigate('/components');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 'basic':
        return formData.type && formData.manufacturer && formData.batchNumber && formData.vendorId;
      case 'location':
        return formData.location?.section && formData.location?.kilometer;
      case 'technical':
        return formData.materialSpecs?.material && formData.materialSpecs?.loadRating;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Component Type *</Label>
                <Select 
                  value={formData.type || ''} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as ComponentData['type'] }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select component type" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer *</Label>
                <Input
                  id="manufacturer"
                  value={formData.manufacturer || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, manufacturer: e.target.value }))}
                  placeholder="Enter manufacturer name"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="batchNumber">Batch Number *</Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, batchNumber: e.target.value }))}
                  placeholder="e.g., B-2025-001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor *</Label>
                <Select 
                  value={formData.vendorId || ''} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, vendorId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>{vendor.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="section">Railway Section *</Label>
                <Select 
                  value={formData.location?.section || ''} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location!, section: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select railway section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section} value={section}>{section}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kilometer">Kilometer Mark *</Label>
                <Input
                  id="kilometer"
                  value={formData.location?.kilometer || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location!, kilometer: e.target.value }
                  }))}
                  placeholder="e.g., KM 15.5"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.location?.coordinates[1] || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    location: { 
                      ...prev.location!, 
                      coordinates: [prev.location!.coordinates[0], parseFloat(e.target.value) || 0]
                    }
                  }))}
                  placeholder="28.7041"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.location?.coordinates[0] || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    location: { 
                      ...prev.location!, 
                      coordinates: [parseFloat(e.target.value) || 0, prev.location!.coordinates[1]]
                    }
                  }))}
                  placeholder="77.1025"
                />
              </div>
            </div>
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="material">Material *</Label>
                <Input
                  id="material"
                  value={formData.materialSpecs?.material || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    materialSpecs: { ...prev.materialSpecs!, material: e.target.value }
                  }))}
                  placeholder="e.g., High Carbon Steel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loadRating">Load Rating *</Label>
                <Input
                  id="loadRating"
                  value={formData.materialSpecs?.loadRating || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    materialSpecs: { ...prev.materialSpecs!, loadRating: e.target.value }
                  }))}
                  placeholder="e.g., 25T"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                value={formData.materialSpecs?.dimensions || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  materialSpecs: { ...prev.materialSpecs!, dimensions: e.target.value }
                }))}
                placeholder="e.g., 150x75x25mm"
              />
            </div>
          </div>
        );

      case 'qr':
        const qrData = JSON.stringify({
          id: generateComponentId(),
          type: formData.type,
          manufacturer: formData.manufacturer,
          batchNumber: formData.batchNumber,
          location: formData.location
        });

        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">QR Code Preview</h3>
              <div className="inline-block p-6 bg-white rounded-lg border-2 border-border">
                <QRCodeSVG
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                This QR code will be generated for the component and can be printed for laser engraving.
              </p>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Component Summary</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Component ID</p>
                  <p className="font-mono">{generateComponentId()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p>{formData.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Manufacturer</p>
                  <p>{formData.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Batch Number</p>
                  <p>{formData.batchNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p>{formData.location?.section} {formData.location?.kilometer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Material</p>
                  <p>{formData.materialSpecs?.material}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-hero text-white hover:opacity-90 px-8"
                size="lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                Create Component
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" asChild>
          <Link to="/components">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Components
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Component</h1>
          <p className="text-muted-foreground">Register a new railway track component</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="railway-card mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    isActive 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : isCompleted
                      ? 'border-success bg-success text-success-foreground'
                      : 'border-muted-foreground bg-background'
                  }`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <p className={`text-sm font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${isCompleted ? 'bg-success' : 'bg-muted'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle>
            {steps.find(s => s.id === currentStep)?.title}
          </CardTitle>
          <CardDescription>
            {currentStep === 'basic' && 'Enter the basic information about the component'}
            {currentStep === 'location' && 'Specify the installation location and coordinates'}
            {currentStep === 'technical' && 'Add technical specifications and material details'}
            {currentStep === 'qr' && 'Preview the QR code that will be generated'}
            {currentStep === 'confirm' && 'Review all information before creating the component'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
          
          <Separator className="my-6" />
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 'basic'}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentStep !== 'confirm' && (
              <Button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-primary hover:bg-primary/90"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentNewPage;