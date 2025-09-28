import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  QrCode, 
  Upload, 
  Download, 
  FileText, 
  Printer,
  Grid3x3,
  Plus
} from 'lucide-react';
import { useComponentStore } from '@/store/useComponentStore';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from '@/hooks/use-toast';

const QRGeneratePage = () => {
  const { components } = useComponentStore();
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [csvData, setCsvData] = useState('');
  const [singleComponentId, setSingleComponentId] = useState('');

  const handleSingleQR = () => {
    const component = components.find(c => c.id === singleComponentId);
    if (!component) {
      toast({
        title: "Component Not Found",
        description: "Please enter a valid component ID.",
        variant: "destructive"
      });
      return;
    }

    // Generate QR code for single component
    toast({
      title: "QR Code Generated",
      description: `QR code generated for component ${component.id}`,
    });
  };

  const handleBatchGeneration = () => {
    if (!csvData.trim()) {
      toast({
        title: "No Data Provided",
        description: "Please upload or paste CSV data to generate batch QR codes.",
        variant: "destructive"
      });
      return;
    }

    // Process CSV data and generate batch QR codes
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    const dataRows = lines.slice(1);

    toast({
      title: "Batch QR Generation Started",
      description: `Processing ${dataRows.length} components for QR generation.`,
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download Started",
      description: "Your QR code labels PDF is being prepared for download.",
    });
  };

  const sampleComponent = components[0];
  const sampleQRData = sampleComponent ? JSON.stringify({
    id: sampleComponent.id,
    type: sampleComponent.type,
    manufacturer: sampleComponent.manufacturer,
    batchNumber: sampleComponent.batchNumber,
    installDate: sampleComponent.installDate,
    warrantyExpiry: sampleComponent.warrantyExpiry,
    location: sampleComponent.location
  }) : '';

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Code Generation</h1>
          <p className="text-muted-foreground mt-1">
            Generate QR codes for single components or batch processing
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Sample CSV
          </Button>
          <Button onClick={handleDownloadPDF} className="bg-gradient-secondary text-white">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="single" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Single Component</TabsTrigger>
          <TabsTrigger value="batch">Batch Generation</TabsTrigger>
        </TabsList>

        {/* Single Component QR Generation */}
        <TabsContent value="single" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="railway-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="mr-2 h-5 w-5 text-primary" />
                  Single QR Generation
                </CardTitle>
                <CardDescription>
                  Generate QR code for an individual component
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="componentId">Component ID</Label>
                  <Input
                    id="componentId"
                    value={singleComponentId}
                    onChange={(e) => setSingleComponentId(e.target.value)}
                    placeholder="Enter component ID (e.g., RC-001-2025-001)"
                  />
                </div>
                
                <Button onClick={handleSingleQR} className="w-full">
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>

            {/* QR Preview */}
            <Card className="railway-card">
              <CardHeader>
                <CardTitle>QR Code Preview</CardTitle>
                <CardDescription>
                  Preview of the generated QR code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white rounded-lg border-2 border-border">
                    <QRCodeSVG
                      value={sampleQRData || 'Sample QR Code'}
                      size={150}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Component ID</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {sampleComponent?.id || 'RC-001-2025-001'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download SVG
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="mr-2 h-4 w-4" />
                      Print Label
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Batch QR Generation */}
        <TabsContent value="batch" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="railway-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Grid3x3 className="mr-2 h-5 w-5 text-primary" />
                  Batch QR Generation
                </CardTitle>
                <CardDescription>
                  Upload CSV file or paste data to generate multiple QR codes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="csvFile">Upload CSV File</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="csvFile"
                      type="file"
                      accept=".csv"
                      className="flex-1"
                    />
                    <Button variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-center text-muted-foreground">
                  <span className="text-sm">or</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="csvData">Paste CSV Data</Label>
                  <Textarea
                    id="csvData"
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    placeholder="id,type,manufacturer,batchNumber,installDate,warrantyExpiry,latitude,longitude,section,kilometer,vendorId
RC-001-2025-001,Rail Clip,ABC Industries,B-2025-001,2025-01-15,2030-01-15,28.7041,77.1025,Delhi-Gurgaon,KM 15.5,V-007"
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
                
                <Button onClick={handleBatchGeneration} className="w-full">
                  <Grid3x3 className="mr-2 h-4 w-4" />
                  Generate Batch QR Codes
                </Button>
              </CardContent>
            </Card>

            {/* Batch Preview */}
            <Card className="railway-card">
              <CardHeader>
                <CardTitle>Batch Preview</CardTitle>
                <CardDescription>
                  Preview of batch QR generation layout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="aspect-square bg-white border border-border rounded flex items-center justify-center">
                        <QRCodeSVG
                          value={`Sample QR ${i + 1}`}
                          size={60}
                          level="H"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Batch Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Layout:</span>
                        <Badge variant="secondary">A4 - 6x4 Grid</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Label Size:</span>
                        <Badge variant="secondary">40x25mm</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>QR Size:</span>
                        <Badge variant="secondary">15x15mm</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="mr-2 h-4 w-4" />
                      Preview PDF
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-secondary text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* QR Code Specifications */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle>QR Code Specifications</CardTitle>
          <CardDescription>
            Technical specifications for laser engraving
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold">Laser Settings</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Power:</span>
                  <span className="font-mono">80%</span>
                </div>
                <div className="flex justify-between">
                  <span>Speed:</span>
                  <span className="font-mono">100mm/min</span>
                </div>
                <div className="flex justify-between">
                  <span>Passes:</span>
                  <span className="font-mono">2</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Material Compatibility</h4>
              <div className="space-y-1 text-sm">
                <Badge variant="outline">Stainless Steel</Badge>
                <Badge variant="outline">Aluminum</Badge>
                <Badge variant="outline">Anodized Metal</Badge>
                <Badge variant="outline">Plastic Labels</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">QR Data Format</h4>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                {JSON.stringify({
                  id: "RC-001-2025-001",
                  type: "Rail Clip",
                  manufacturer: "ABC Industries",
                  installDate: "2025-01-15",
                  location: {
                    section: "Delhi-Gurgaon",
                    kilometer: "KM 15.5"
                  }
                }, null, 2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRGeneratePage;