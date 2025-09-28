import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  UserCheck, 
  Plus, 
  Shield, 
  Settings,
  Users,
  Eye,
  Edit
} from 'lucide-react';

const UsersPage = () => {
  // Mock user data
  const users = [
    {
      id: 'U-001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@indianrailways.gov.in',
      role: 'admin' as const,
      department: 'Engineering',
      lastActive: '2025-01-15',
      status: 'active' as const
    },
    {
      id: 'U-002',
      name: 'Priya Sharma',
      email: 'priya.sharma@indianrailways.gov.in',
      role: 'inspector' as const,
      department: 'Quality Control',
      lastActive: '2025-01-14',
      status: 'active' as const
    },
    {
      id: 'U-003',
      name: 'Vendor Manager',
      email: 'manager@abcindustries.com',
      role: 'vendor' as const,
      department: 'ABC Industries',
      lastActive: '2025-01-13',
      status: 'active' as const
    },
    {
      id: 'U-004',
      name: 'Amit Singh',
      email: 'amit.singh@indianrailways.gov.in',
      role: 'viewer' as const,
      department: 'Administration',
      lastActive: '2025-01-10',
      status: 'inactive' as const
    }
  ];

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'superadmin':
      case 'admin':
        return 'railway-badge-danger';
      case 'inspector':
        return 'railway-badge-warning';
      case 'vendor':
        return 'railway-badge';
      case 'viewer':
        return 'railway-badge-success';
      default:
        return 'railway-badge';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'railway-badge-success' : 'railway-badge';
  };

  const roleStats = {
    total: users.length,
    admin: users.filter(u => u.role === 'admin').length,
    inspector: users.filter(u => u.role === 'inspector').length,
    vendor: users.filter(u => u.role === 'vendor').length,
    viewer: users.filter(u => u.role === 'viewer').length
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        
        <Button className="bg-gradient-hero text-white hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-primary mr-4" />
            <div>
              <p className="text-2xl font-bold">{roleStats.total}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <Shield className="h-8 w-8 text-destructive mr-4" />
            <div>
              <p className="text-2xl font-bold">{roleStats.admin}</p>
              <p className="text-xs text-muted-foreground">Admins</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <UserCheck className="h-8 w-8 text-warning mr-4" />
            <div>
              <p className="text-2xl font-bold">{roleStats.inspector}</p>
              <p className="text-xs text-muted-foreground">Inspectors</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-secondary mr-4" />
            <div>
              <p className="text-2xl font-bold">{roleStats.vendor}</p>
              <p className="text-xs text-muted-foreground">Vendors</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <Eye className="h-8 w-8 text-success mr-4" />
            <div>
              <p className="text-2xl font-bold">{roleStats.viewer}</p>
              <p className="text-xs text-muted-foreground">Viewers</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>
            Manage user accounts and access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.id} className="railway-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 bg-primary/10">
                        <AvatarFallback className="text-primary font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-sm font-mono truncate">{user.email}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <Badge className={getRoleBadgeVariant(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge className={getStatusBadgeVariant(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Last Active</p>
                      <p className="text-sm">{user.lastActive}</p>
                    </div>

                    <div className="flex space-x-2 pt-2 border-t border-border">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="mr-2 h-4 w-4" />
                        Permissions
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Overview of permissions by user role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-semibold">Administrator</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Full system access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>User management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Component management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Warranty claim approval</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Analytics & reporting</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Inspector</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>View components</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>QR scanning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Log inspections</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Report defects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-muted" />
                  <span className="text-muted-foreground">No warranty management</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Vendor</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>View own components</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Submit warranty claims</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Track claim status</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-muted" />
                  <span className="text-muted-foreground">No system administration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-muted" />
                  <span className="text-muted-foreground">Limited analytics</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Viewer</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Read-only access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>View components</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>Basic analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-muted" />
                  <span className="text-muted-foreground">No modifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-muted" />
                  <span className="text-muted-foreground">No claim management</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;