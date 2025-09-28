import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ScanLine, 
  Camera, 
  Upload, 
  MapPin, 
  Calendar, 
  Package,
  User,
  AlertTriangle,
  CheckCircle,
  FileText,
  Plus
} from 'lucide-react';
import { useComponentStore } from '@/store/useComponentStore';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const ScannerPage = () => {
  const { getComponentById, addComponent, currentUser } = useComponentStore();
  const [manualId, setManualId] = useState('');
  const [scannedComponent, setScannedComponent] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraScan = () => {
    setIsScanning(true);
    // Simulate camera scanning
    setTimeout(() => {
      const sampleComponent = getComponentById('RC-001-2025-001');
      if (sampleComponent) {
        setScannedComponent(sampleComponent);
        toast({
          title: "QR Code Scanned Successfully",
          description: `Component ${sampleComponent.id} found`,
        });
      }
      setIsScanning(false);
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate QR code reading from image
      setTimeout(() => {
        const sampleComponent = getComponentById('RC-002-2025-002');
        if (sampleComponent) {
          setScannedComponent(sampleComponent);
          toast({
            title: "QR Code Read from Image",
            description: `Component ${sampleComponent.id} found`,
          });
        }
      }, 1000);
    }
  };

  const handleManualEntry = () => {
    if (!manualId.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a component ID",
        variant: "destructive"
      });
      return;
    }

    const component = getComponentById(manualId.trim());
    if (component) {
      setScannedComponent(component);
      toast({
        title: "Component Found",
        description: `Component ${component.id} retrieved`,
      });
    } else {
      toast({
        title: "Component Not Found",
        description: "No component found with the provided ID",
        variant: "destructive"
      });
    }
  };

  const handleQuickAction = (action: string) => {
    if (!scannedComponent) return;

    switch (action) {
      case 'report':
        toast({
          title: "Defect Report Initiated",
          description: "Defect report form opened for this component",
        });
        break;
      case 'inspect':
        toast({
          title: "Inspection Logged",
          description: "Inspection record added to component history",
        });
        break;
      case 'update':
        toast({
          title: "Status Update",
          description: "Component status update form opened",
        });
        break;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'railway-badge-success';
      case 'Maintenance':
        return 'railway-badge-warning';
      case 'Defective':
        return 'railway-badge-danger';
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

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Code Scanner</h1>
          <p className="text-muted-foreground mt-1">
            Scan component QR codes or enter manually for instant access
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scanner Interface */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ScanLine className="mr-2 h-5 w-5 text-primary" />
              Scanner Interface
            </CardTitle>
            <CardDescription>
              Multiple ways to access component information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Camera Scanner */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <Camera className="mr-2 h-4 w-4" />
                Camera Scanner
              </h4>
              <div className="relative">
                <div className="aspect-video bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  {isScanning ? (
                    <div className="text-center animate-pulse">
                      <ScanLine className="h-12 w-12 mx-auto text-primary mb-4" />
                      <p className="text-sm text-muted-foreground">Scanning QR Code...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">Click to activate camera</p>
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleCameraScan}
                  disabled={isScanning}
                  className="w-full mt-4"
                >
                  {isScanning ? (
                    <>
                      <ScanLine className="mr-2 h-4 w-4 animate-pulse" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Start Camera Scan
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Image Upload */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                Upload QR Image
              </h4>
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image File
                </Button>
                <p className="text-xs text-muted-foreground">
                  Upload a photo containing a QR code
                </p>
              </div>
            </div>

            <Separator />

            {/* Manual Entry */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Manual Entry
              </h4>
              <div className="space-y-2">
                <Label htmlFor="manualId">Component ID</Label>
                <div className="flex space-x-2">
                  <Input
                    id="manualId"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="Enter component ID"
                    onKeyPress={(e) => e.key === 'Enter' && handleManualEntry()}
                  />
                  <Button onClick={handleManualEntry}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Details */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-primary" />
              Component Details
            </CardTitle>
            <CardDescription>
              Information about the scanned component
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scannedComponent ? (
              <div className="space-y-6">
                {/* Component Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold font-mono">{scannedComponent.id}</h3>
                    <Badge className={getStatusBadgeVariant(scannedComponent.status)}>
                      {scannedComponent.status}
                    </Badge>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Type</p>
                      <p className="font-medium">{scannedComponent.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Manufacturer</p>
                      <p className="font-medium">{scannedComponent.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Batch Number</p>
                      <p className="font-mono">{scannedComponent.batchNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Install Date</p>
                      <p>{format(new Date(scannedComponent.installDate), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      Location
                    </p>
                    <p className="font-medium">
                      {scannedComponent.location.section} • {scannedComponent.location.kilometer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Coordinates: {scannedComponent.location.coordinates.join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        Warranty Status
                      </p>
                      <p className="text-sm">
                        Expires: {format(new Date(scannedComponent.warrantyExpiry), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <Badge className={getWarrantyStatus(scannedComponent.warrantyExpiry).variant}>
                      {getWarrantyStatus(scannedComponent.warrantyExpiry).status}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Quick Actions</h4>
                  <div className="grid gap-2">
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleQuickAction('inspect')}
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-success" />
                      Log Inspection
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleQuickAction('report')}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4 text-warning" />
                      Report Issue
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleQuickAction('update')}
                    >
                      <Package className="mr-2 h-4 w-4 text-primary" />
                      Update Status
                    </Button>
                  </div>
                </div>

                {/* Recent Activity */}
                {scannedComponent.inspectionHistory.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-semibold">Recent Inspections</h4>
                      <div className="space-y-2">
                        {scannedComponent.inspectionHistory.slice(0, 3).map((inspection: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                            <div>
                              <p className="text-sm font-medium">{inspection.inspector}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(inspection.date), 'MMM dd, yyyy')}
                              </p>
                            </div>
                            <Badge 
                              className={
                                inspection.rating === 'Good' ? 'railway-badge-success' :
                                inspection.rating === 'Fair' ? 'railway-badge-warning' :
                                'railway-badge-danger'
                              }
                            >
                              {inspection.rating}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <ScanLine className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No Component Scanned</p>
                <p className="text-sm text-muted-foreground">
                  Use the scanner interface to scan a QR code or enter a component ID manually
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Offline Support Notice */}
      <Card className="railway-card border-primary/20">
        <CardContent className="flex items-start space-x-4 pt-6">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Plus className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold">Offline Support</h4>
            <p className="text-sm text-muted-foreground">
              Scanner works offline. Any actions performed while offline will be synced when connection is restored.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScannerPage;