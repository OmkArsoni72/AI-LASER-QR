import { Card, CardCo    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-responsive-xl font-bold text-foreground">Settings</h1>
          <p className="text-responsive-sm text-muted-foreground mt-1">
            Configure system preferences and account settings
          </p>
        </div>
      </div>dDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Globe, 
  Bell, 
  Shield, 
  Download,
  Upload,
  Smartphone,
  Wifi,
  Database
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure system preferences and application settings
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* PWA Settings */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="mr-2 h-5 w-5 text-primary" />
              Progressive Web App
            </CardTitle>
            <CardDescription>
              Mobile app features and offline capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pwa-enabled">Enable PWA Features</Label>
                <p className="text-sm text-muted-foreground">
                  Allow installation as a mobile app
                </p>
              </div>
              <Switch id="pwa-enabled" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="offline-mode">Offline Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Cache data for offline access
                </p>
              </div>
              <Switch id="offline-mode" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important updates
                </p>
              </div>
              <Switch id="push-notifications" />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cache Status</span>
                <Badge className="railway-badge-success">
                  <Wifi className="mr-1 h-3 w-3" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cached Data</span>
                <span className="text-sm">2.4 MB</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Language & Localization */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              Language & Localization
            </CardTitle>
            <CardDescription>
              Configure language and regional settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language">Interface Language</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  English
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  हिंदी
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" value="Asia/Kolkata (IST)" disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  DD/MM/YYYY
                </Button>
                <Button variant="ghost" size="sm">
                  MM/DD/YYYY
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="rtl-support">RTL Support</Label>
                <p className="text-sm text-muted-foreground">
                  Right-to-left text direction
                </p>
              </div>
              <Switch id="rtl-support" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="warranty-alerts">Warranty Expiry Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  90 days before expiry
                </p>
              </div>
              <Switch id="warranty-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="defect-alerts">Defect Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Immediate defect reports
                </p>
              </div>
              <Switch id="defect-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="claim-updates">Claim Status Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Warranty claim decisions
                </p>
              </div>
              <Switch id="claim-updates" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system-maintenance">System Maintenance</Label>
                <p className="text-sm text-muted-foreground">
                  Scheduled downtime notices
                </p>
              </div>
              <Switch id="system-maintenance" />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input 
                id="notification-email" 
                type="email" 
                placeholder="admin@indianrailways.gov.in"
                defaultValue="admin@indianrailways.gov.in"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Security & Privacy
            </CardTitle>
            <CardDescription>
              Security policies and data protection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-logout">Auto Logout</Label>
                <p className="text-sm text-muted-foreground">
                  After 30 minutes of inactivity
                </p>
              </div>
              <Switch id="auto-logout" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="audit-logging">Audit Logging</Label>
                <p className="text-sm text-muted-foreground">
                  Track all user actions
                </p>
              </div>
              <Switch id="audit-logging" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-encryption">Data Encryption</Label>
                <p className="text-sm text-muted-foreground">
                  Encrypt sensitive information
                </p>
              </div>
              <Switch id="data-encryption" defaultChecked disabled />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Security Level</span>
                <Badge className="railway-badge-success">High</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Backup</span>
                <span className="text-sm">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-primary" />
              Data Management
            </CardTitle>
            <CardDescription>
              Import, export, and backup settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Export Component Data
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Upload className="mr-2 h-4 w-4" />
                Import CSV Data
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Backup Database
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm">45.2 MB / 100 MB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-cleanup">Auto Cleanup</Label>
                <p className="text-sm text-muted-foreground">
                  Remove old data after 5 years
                </p>
              </div>
              <Switch id="auto-cleanup" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Current system status and version details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Version</p>
                <p className="text-sm font-mono">v1.0.0</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Build</p>
                <p className="text-sm font-mono">#2025.01</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Environment</p>
                <Badge className="railway-badge-warning">Production</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                <p className="text-sm">7 days, 14 hours</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Recent Updates</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>QR scanning improvements</span>
                  <span className="text-muted-foreground">Jan 10</span>
                </div>
                <div className="flex justify-between">
                  <span>Warranty management update</span>
                  <span className="text-muted-foreground">Jan 05</span>
                </div>
                <div className="flex justify-between">
                  <span>Analytics dashboard refresh</span>
                  <span className="text-muted-foreground">Dec 28</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Check for Updates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;