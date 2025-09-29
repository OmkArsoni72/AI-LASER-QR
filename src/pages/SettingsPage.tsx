import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Mail,
  Smartphone,
  Globe,
  Download,
  Upload,
  Trash2,
  Save
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-responsive-xl font-bold text-foreground">Settings</h1>
          <p className="text-responsive-sm text-muted-foreground mt-1">
            Configure system preferences and account settings
          </p>
        </div>
        
        <Button className="bg-gradient-hero text-white hover:opacity-90 btn-mobile shrink-0">
          <Save className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Save Changes</span>
          <span className="sm:hidden">Save</span>
        </Button>
      </div>

      {/* Settings Categories */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Account Settings */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-primary" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage your personal account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                defaultValue="Rajesh Kumar"
                className="form-mobile"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="rajesh.kumar@indianrailways.gov.in"
                className="form-mobile"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                defaultValue="Railway Engineering"
                className="form-mobile"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                defaultValue="ENG-2024-001"
                className="form-mobile"
                disabled
              />
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
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <Label className="text-responsive-sm font-medium">Email Notifications</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Receive alerts via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <Label className="text-responsive-sm font-medium">SMS Alerts</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Critical alerts via SMS
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <Label className="text-responsive-sm font-medium">Desktop Notifications</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Browser notifications
                </p>
              </div>
              <Switch />
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <Label className="text-responsive-sm font-medium">Warranty Reminders</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Upcoming warranty expirations
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="form-mobile"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                className="form-mobile"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="form-mobile"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="space-y-1">
                <Label className="text-responsive-sm font-medium">Two-Factor Authentication</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                Not Configured
              </Badge>
            </div>
            
            <Button variant="outline" className="w-full btn-mobile">
              <Smartphone className="mr-2 h-4 w-4" />
              Setup 2FA
            </Button>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-primary" />
              System Preferences
            </CardTitle>
            <CardDescription>
              Customize your system experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <Label className="text-responsive-sm font-medium">Dark Mode</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Switch to dark theme
                </p>
              </div>
              <Switch />
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <Label className="text-responsive-sm font-medium">Auto-save Forms</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Automatically save form data
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select 
                id="language"
                aria-label="Select language"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm form-mobile"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select 
                id="timezone"
                aria-label="Select timezone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm form-mobile"
                defaultValue="IST"
              >
                <option value="IST">India Standard Time (IST)</option>
                <option value="UTC">Coordinated Universal Time (UTC)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5 text-primary" />
            Data Management
          </CardTitle>
          <CardDescription>
            Export, import, and manage your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="btn-mobile">
              <Download className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Export Data</span>
              <span className="sm:hidden">Export</span>
            </Button>
            
            <Button variant="outline" className="btn-mobile">
              <Upload className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Import Data</span>
              <span className="sm:hidden">Import</span>
            </Button>
            
            <Button variant="outline" className="btn-mobile">
              <Globe className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Sync Settings</span>
              <span className="sm:hidden">Sync</span>
            </Button>
            
            <Button variant="outline" className="btn-mobile text-destructive hover:bg-destructive hover:text-destructive-foreground">
              <Trash2 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Clear Cache</span>
              <span className="sm:hidden">Clear</span>
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold text-responsive-sm mb-2">Storage Usage</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Component Data:</span>
                <span>145 MB</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>QR Code Cache:</span>
                <span>23 MB</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Analytics Cache:</span>
                <span>12 MB</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-xs sm:text-sm font-medium">
                <span>Total:</span>
                <span>180 MB</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Application and system details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-responsive-sm">Application</h4>
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <Badge variant="outline">v1.0.0</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Build:</span>
                  <span className="font-mono">2025.09.29</span>
                </div>
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <Badge className="railway-badge-success">Production</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-responsive-sm">System</h4>
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>OS:</span>
                  <span>Windows 11</span>
                </div>
                <div className="flex justify-between">
                  <span>Browser:</span>
                  <span>Chrome 120.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Update:</span>
                  <span>2025-09-29</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;