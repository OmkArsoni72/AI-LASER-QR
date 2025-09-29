import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/compon  return (

import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';import { Button } from '@/components/ui/button';    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { import { Badge } from '@/components/ui/badge';      {/* Header */}

  UserCheck, 

  Plus, import { Avatar, AvatarFallback } from '@/components/ui/avatar';      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

  Shield, 

  Settings,import {         <div className="min-w-0">

  Users,

  Eye,  UserCheck,           <h1 className="text-responsive-xl font-bold text-foreground">User Management</h1>

  Edit

} from 'lucide-react';  Plus,           <p className="text-responsive-sm text-muted-foreground mt-1">



const UsersPage = () => {  Shield,             Manage user accounts and permissions

  // Mock user data

  const users = [  Settings,          </p>

    {

      id: 'U-001',  Users,        </div>

      name: 'Rajesh Kumar',

      email: 'rajesh.kumar@indianrailways.gov.in',  Eye,        

      role: 'admin' as const,

      department: 'Engineering',  Edit        <Button className="bg-gradient-hero text-white hover:opacity-90 btn-mobile shrink-0">

      lastActive: '2025-01-15',

      status: 'active' as const} from 'lucide-react';          <Plus className="mr-2 h-4 w-4" />

    },

    {          <span className="hidden sm:inline">Add User</span>

      id: 'U-002',

      name: 'Priya Sharma',const UsersPage = () => {          <span className="sm:hidden">Add</span>

      email: 'priya.sharma@indianrailways.gov.in',

      role: 'inspector' as const,  // Mock user data        </Button>

      department: 'Quality Control',

      lastActive: '2025-01-14',  const users = [      </div>import { Button } from '@/components/ui/button';

      status: 'active' as const

    },    {import { Badge } from '@/components/ui/badge';

    {

      id: 'U-003',      id: 'U-001',import { Avatar, AvatarFallback } from '@/components/ui/avatar';

      name: 'Vendor Manager',

      email: 'manager@abcindustries.com',      name: 'Rajesh Kumar',import { 

      role: 'vendor' as const,

      department: 'ABC Industries',      email: 'rajesh.kumar@indianrailways.gov.in',  UserCheck, 

      lastActive: '2025-01-13',

      status: 'active' as const      role: 'admin' as const,  Plus, 

    },

    {      department: 'Engineering',  Shield, 

      id: 'U-004',

      name: 'Amit Singh',      lastActive: '2025-01-15',  Settings,

      email: 'amit.singh@indianrailways.gov.in',

      role: 'viewer' as const,      status: 'active' as const  Users,

      department: 'Administration',

      lastActive: '2025-01-10',    },  Eye,

      status: 'inactive' as const

    }    {  Edit

  ];

      id: 'U-002',} from 'lucide-react';

  const getRoleBadgeVariant = (role: string) => {

    switch (role) {      name: 'Priya Sharma',

      case 'superadmin':

      case 'admin':      email: 'priya.sharma@indianrailways.gov.in',const UsersPage = () => {

        return 'railway-badge-danger';

      case 'inspector':      role: 'inspector' as const,  // Mock user data

        return 'railway-badge-warning';

      case 'vendor':      department: 'Quality Control',  const users = [

        return 'railway-badge';

      case 'viewer':      lastActive: '2025-01-14',    {

        return 'railway-badge-success';

      default:      status: 'active' as const      id: 'U-001',

        return 'railway-badge';

    }    },      name: 'Rajesh Kumar',

  };

    {      email: 'rajesh.kumar@indianrailways.gov.in',

  const getStatusBadgeVariant = (status: string) => {

    return status === 'active' ? 'railway-badge-success' : 'railway-badge';      id: 'U-003',      role: 'admin' as const,

  };

      name: 'Vendor Manager',      department: 'Engineering',

  const roleStats = {

    total: users.length,      email: 'manager@abcindustries.com',      lastActive: '2025-01-15',

    admin: users.filter(u => u.role === 'admin').length,

    inspector: users.filter(u => u.role === 'inspector').length,      role: 'vendor' as const,      status: 'active' as const

    vendor: users.filter(u => u.role === 'vendor').length,

    viewer: users.filter(u => u.role === 'viewer').length      department: 'ABC Industries',    },

  };

      lastActive: '2025-01-13',    {

  return (

    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">      status: 'active' as const      id: 'U-002',

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">    },      name: 'Priya Sharma',

        <div className="min-w-0">

          <h1 className="text-responsive-xl font-bold text-foreground">User Management</h1>    {      email: 'priya.sharma@indianrailways.gov.in',

          <p className="text-responsive-sm text-muted-foreground mt-1">

            Manage user accounts, roles, and permissions      id: 'U-004',      role: 'inspector' as const,

          </p>

        </div>      name: 'Amit Singh',      department: 'Quality Control',

        

        <Button className="bg-gradient-hero text-white hover:opacity-90 btn-mobile shrink-0">      email: 'amit.singh@indianrailways.gov.in',      lastActive: '2025-01-14',

          <Plus className="mr-2 h-4 w-4" />

          <span className="hidden sm:inline">Add User</span>      role: 'viewer' as const,      status: 'active' as const

          <span className="sm:hidden">Add</span>

        </Button>      department: 'Administration',    },

      </div>

      lastActive: '2025-01-10',    {

      {/* Summary Cards */}

      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">      status: 'inactive' as const      id: 'U-003',

        <Card className="railway-card">

          <CardContent className="flex items-center p-3 sm:p-6">    }      name: 'Vendor Manager',

            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2 sm:mr-4 shrink-0" />

            <div className="min-w-0">  ];      email: 'manager@abcindustries.com',

              <p className="text-lg sm:text-2xl font-bold">{roleStats.total}</p>

              <p className="text-xs text-muted-foreground">Total Users</p>      role: 'vendor' as const,

            </div>

          </CardContent>  const getRoleBadgeVariant = (role: string) => {      department: 'ABC Industries',

        </Card>

            switch (role) {      lastActive: '2025-01-13',

        <Card className="railway-card">

          <CardContent className="flex items-center p-3 sm:p-6">      case 'superadmin':      status: 'active' as const

            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-destructive mr-2 sm:mr-4 shrink-0" />

            <div className="min-w-0">      case 'admin':    },

              <p className="text-lg sm:text-2xl font-bold">{roleStats.admin}</p>

              <p className="text-xs text-muted-foreground">Admins</p>        return 'railway-badge-danger';    {

            </div>

          </CardContent>      case 'inspector':      id: 'U-004',

        </Card>

                return 'railway-badge-warning';      name: 'Amit Singh',

        <Card className="railway-card">

          <CardContent className="flex items-center p-3 sm:p-6">      case 'vendor':      email: 'amit.singh@indianrailways.gov.in',

            <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-warning mr-2 sm:mr-4 shrink-0" />

            <div className="min-w-0">        return 'railway-badge';      role: 'viewer' as const,

              <p className="text-lg sm:text-2xl font-bold">{roleStats.inspector}</p>

              <p className="text-xs text-muted-foreground">Inspectors</p>      case 'viewer':      department: 'Administration',

            </div>

          </CardContent>        return 'railway-badge-success';      lastActive: '2025-01-10',

        </Card>

              default:      status: 'inactive' as const

        <Card className="railway-card">

          <CardContent className="flex items-center p-3 sm:p-6">        return 'railway-badge';    }

            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-secondary mr-2 sm:mr-4 shrink-0" />

            <div className="min-w-0">    }  ];

              <p className="text-lg sm:text-2xl font-bold">{roleStats.vendor}</p>

              <p className="text-xs text-muted-foreground">Vendors</p>  };

            </div>

          </CardContent>  const getRoleBadgeVariant = (role: string) => {

        </Card>

          const getStatusBadgeVariant = (status: string) => {    switch (role) {

        <Card className="railway-card lg:col-span-1 col-span-2 md:col-span-1">

          <CardContent className="flex items-center p-3 sm:p-6">    return status === 'active' ? 'railway-badge-success' : 'railway-badge';      case 'superadmin':

            <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-success mr-2 sm:mr-4 shrink-0" />

            <div className="min-w-0">  };      case 'admin':

              <p className="text-lg sm:text-2xl font-bold">{roleStats.viewer}</p>

              <p className="text-xs text-muted-foreground">Viewers</p>        return 'railway-badge-danger';

            </div>

          </CardContent>  const roleStats = {      case 'inspector':

        </Card>

      </div>    total: users.length,        return 'railway-badge-warning';



      {/* Users List */}    admin: users.filter(u => u.role === 'admin').length,      case 'vendor':

      <Card className="railway-card">

        <CardHeader>    inspector: users.filter(u => u.role === 'inspector').length,        return 'railway-badge';

          <CardTitle>System Users</CardTitle>

          <CardDescription>    vendor: users.filter(u => u.role === 'vendor').length,      case 'viewer':

            Manage user accounts and access permissions

          </CardDescription>    viewer: users.filter(u => u.role === 'viewer').length        return 'railway-badge-success';

        </CardHeader>

        <CardContent>  };      default:

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

            {users.map((user) => (        return 'railway-badge';

              <Card key={user.id} className="railway-card hover:shadow-lg transition-shadow">

                <CardContent className="p-4 sm:p-6">  return (    }

                  <div className="flex items-start justify-between mb-4">

                    <div className="flex items-center space-x-3 min-w-0 flex-1">    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">  };

                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 shrink-0">

                        <AvatarFallback className="text-primary font-semibold text-sm">      {/* Header */}

                          {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}

                        </AvatarFallback>      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">  const getStatusBadgeVariant = (status: string) => {

                      </Avatar>

                      <div className="min-w-0 flex-1">        <div className="min-w-0">    return status === 'active' ? 'railway-badge-success' : 'railway-badge';

                        <h3 className="font-semibold text-responsive-sm truncate">{user.name}</h3>

                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.department}</p>          <h1 className="text-responsive-xl font-bold text-foreground">User Management</h1>  };

                      </div>

                    </div>          <p className="text-responsive-sm text-muted-foreground mt-1">

                    

                    <div className="flex space-x-1 shrink-0">            Manage user accounts, roles, and permissions  const roleStats = {

                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">

                        <Eye className="h-4 w-4" />          </p>    total: users.length,

                      </Button>

                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">        </div>    admin: users.filter(u => u.role === 'admin').length,

                        <Edit className="h-4 w-4" />

                      </Button>            inspector: users.filter(u => u.role === 'inspector').length,

                    </div>

                  </div>        <Button className="bg-gradient-hero text-white hover:opacity-90 btn-mobile shrink-0">    vendor: users.filter(u => u.role === 'vendor').length,



                  <div className="space-y-3">          <Plus className="mr-2 h-4 w-4" />    viewer: users.filter(u => u.role === 'viewer').length

                    <div>

                      <p className="text-xs sm:text-sm text-muted-foreground">Email</p>          <span className="hidden sm:inline">Add User</span>  };

                      <p className="text-xs sm:text-sm font-mono truncate">{user.email}</p>

                    </div>          <span className="sm:hidden">Add</span>



                    <div className="flex items-center justify-between gap-4">        </Button>  return (

                      <div className="min-w-0">

                        <p className="text-xs sm:text-sm text-muted-foreground">Role</p>      </div>    <div className="flex-1 space-y-6 p-6">

                        <Badge className={`text-xs ${getRoleBadgeVariant(user.role)}`}>

                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}      {/* Header */}

                        </Badge>

                      </div>      {/* Summary Cards */}      <div className="flex items-center justify-between">

                      <div className="min-w-0">

                        <p className="text-xs sm:text-sm text-muted-foreground">Status</p>      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">        <div>

                        <Badge className={`text-xs ${getStatusBadgeVariant(user.status)}`}>

                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}        <Card className="railway-card">          <h1 className="text-3xl font-bold text-foreground">User Management</h1>

                        </Badge>

                      </div>          <CardContent className="flex items-center p-3 sm:p-6">          <p className="text-muted-foreground mt-1">

                    </div>

            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2 sm:mr-4 shrink-0" />            Manage user accounts, roles, and permissions

                    <div>

                      <p className="text-xs sm:text-sm text-muted-foreground">Last Active</p>            <div className="min-w-0">          </p>

                      <p className="text-xs sm:text-sm">{user.lastActive}</p>

                    </div>              <p className="text-lg sm:text-2xl font-bold">{roleStats.total}</p>        </div>



                    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">              <p className="text-xs text-muted-foreground">Total Users</p>        

                      <Button variant="outline" size="sm" className="flex-1 btn-mobile">

                        <Settings className="mr-2 h-4 w-4" />            </div>        <Button className="bg-gradient-hero text-white hover:opacity-90">

                        <span className="hidden sm:inline">Permissions</span>

                        <span className="sm:hidden">Perms</span>          </CardContent>          <Plus className="mr-2 h-4 w-4" />

                      </Button>

                      <Button variant="outline" size="sm" className="flex-1 btn-mobile">        </Card>          Add User

                        <Shield className="mr-2 h-4 w-4" />

                        Security                </Button>

                      </Button>

                    </div>        <Card className="railway-card">      </div>

                  </div>

                </CardContent>          <CardContent className="flex items-center p-3 sm:p-6">

              </Card>

            ))}            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-destructive mr-2 sm:mr-4 shrink-0" />      {/* Summary Cards */}

          </div>

        </CardContent>            <div className="min-w-0">      <div className="grid gap-4 md:grid-cols-5">

      </Card>

    </div>              <p className="text-lg sm:text-2xl font-bold">{roleStats.admin}</p>        <Card className="railway-card">

  );

};              <p className="text-xs text-muted-foreground">Admins</p>          <CardContent className="flex items-center p-6">



export default UsersPage;            </div>            <Users className="h-8 w-8 text-primary mr-4" />

          </CardContent>            <div>

        </Card>              <p className="text-2xl font-bold">{roleStats.total}</p>

                      <p className="text-xs text-muted-foreground">Total Users</p>

        <Card className="railway-card">            </div>

          <CardContent className="flex items-center p-3 sm:p-6">          </CardContent>

            <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-warning mr-2 sm:mr-4 shrink-0" />        </Card>

            <div className="min-w-0">        

              <p className="text-lg sm:text-2xl font-bold">{roleStats.inspector}</p>        <Card className="railway-card">

              <p className="text-xs text-muted-foreground">Inspectors</p>          <CardContent className="flex items-center p-6">

            </div>            <Shield className="h-8 w-8 text-destructive mr-4" />

          </CardContent>            <div>

        </Card>              <p className="text-2xl font-bold">{roleStats.admin}</p>

                      <p className="text-xs text-muted-foreground">Admins</p>

        <Card className="railway-card">            </div>

          <CardContent className="flex items-center p-3 sm:p-6">          </CardContent>

            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-secondary mr-2 sm:mr-4 shrink-0" />        </Card>

            <div className="min-w-0">        

              <p className="text-lg sm:text-2xl font-bold">{roleStats.vendor}</p>        <Card className="railway-card">

              <p className="text-xs text-muted-foreground">Vendors</p>          <CardContent className="flex items-center p-6">

            </div>            <UserCheck className="h-8 w-8 text-warning mr-4" />

          </CardContent>            <div>

        </Card>              <p className="text-2xl font-bold">{roleStats.inspector}</p>

                      <p className="text-xs text-muted-foreground">Inspectors</p>

        <Card className="railway-card lg:col-span-1 col-span-2 md:col-span-1">            </div>

          <CardContent className="flex items-center p-3 sm:p-6">          </CardContent>

            <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-success mr-2 sm:mr-4 shrink-0" />        </Card>

            <div className="min-w-0">        

              <p className="text-lg sm:text-2xl font-bold">{roleStats.viewer}</p>        <Card className="railway-card">

              <p className="text-xs text-muted-foreground">Viewers</p>          <CardContent className="flex items-center p-6">

            </div>            <Users className="h-8 w-8 text-secondary mr-4" />

          </CardContent>            <div>

        </Card>              <p className="text-2xl font-bold">{roleStats.vendor}</p>

      </div>              <p className="text-xs text-muted-foreground">Vendors</p>

            </div>

      {/* Users List */}          </CardContent>

      <Card className="railway-card">        </Card>

        <CardHeader>        

          <CardTitle>System Users</CardTitle>        <Card className="railway-card">

          <CardDescription>          <CardContent className="flex items-center p-6">

            Manage user accounts and access permissions            <Eye className="h-8 w-8 text-success mr-4" />

          </CardDescription>            <div>

        </CardHeader>              <p className="text-2xl font-bold">{roleStats.viewer}</p>

        <CardContent>              <p className="text-xs text-muted-foreground">Viewers</p>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">            </div>

            {users.map((user) => (          </CardContent>

              <Card key={user.id} className="railway-card hover:shadow-lg transition-shadow">        </Card>

                <CardContent className="p-4 sm:p-6">      </div>

                  <div className="flex items-start justify-between mb-4">

                    <div className="flex items-center space-x-3 min-w-0 flex-1">      {/* Users List */}

                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 shrink-0">      <Card className="railway-card">

                        <AvatarFallback className="text-primary font-semibold text-sm">        <CardHeader>

                          {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}          <CardTitle>System Users</CardTitle>

                        </AvatarFallback>          <CardDescription>

                      </Avatar>            Manage user accounts and access permissions

                      <div className="min-w-0 flex-1">          </CardDescription>

                        <h3 className="font-semibold text-responsive-sm truncate">{user.name}</h3>        </CardHeader>

                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.department}</p>        <CardContent>

                      </div>          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    </div>            {users.map((user) => (

                                  <Card key={user.id} className="railway-card hover:shadow-lg transition-shadow">

                    <div className="flex space-x-1 shrink-0">                <CardContent className="p-6">

                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">                  <div className="flex items-start justify-between mb-4">

                        <Eye className="h-4 w-4" />                    <div className="flex items-center space-x-3">

                      </Button>                      <Avatar className="h-12 w-12 bg-primary/10">

                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">                        <AvatarFallback className="text-primary font-semibold">

                        <Edit className="h-4 w-4" />                          {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}

                      </Button>                        </AvatarFallback>

                    </div>                      </Avatar>

                  </div>                      <div>

                        <h3 className="font-semibold">{user.name}</h3>

                  <div className="space-y-3">                        <p className="text-sm text-muted-foreground">{user.department}</p>

                    <div>                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground">Email</p>                    </div>

                      <p className="text-xs sm:text-sm font-mono truncate">{user.email}</p>                    

                    </div>                    <div className="flex space-x-1">

                      <Button variant="ghost" size="sm">

                    <div className="flex items-center justify-between gap-4">                        <Eye className="h-4 w-4" />

                      <div className="min-w-0">                      </Button>

                        <p className="text-xs sm:text-sm text-muted-foreground">Role</p>                      <Button variant="ghost" size="sm">

                        <Badge className={`text-xs ${getRoleBadgeVariant(user.role)}`}>                        <Edit className="h-4 w-4" />

                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}                      </Button>

                        </Badge>                    </div>

                      </div>                  </div>

                      <div className="min-w-0">

                        <p className="text-xs sm:text-sm text-muted-foreground">Status</p>                  <div className="space-y-3">

                        <Badge className={`text-xs ${getStatusBadgeVariant(user.status)}`}>                    <div>

                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}                      <p className="text-sm text-muted-foreground">Email</p>

                        </Badge>                      <p className="text-sm font-mono truncate">{user.email}</p>

                      </div>                    </div>

                    </div>

                    <div className="flex items-center justify-between">

                    <div>                      <div>

                      <p className="text-xs sm:text-sm text-muted-foreground">Last Active</p>                        <p className="text-sm text-muted-foreground">Role</p>

                      <p className="text-xs sm:text-sm">{user.lastActive}</p>                        <Badge className={getRoleBadgeVariant(user.role)}>

                    </div>                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}

                        </Badge>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">                      </div>

                      <Button variant="outline" size="sm" className="flex-1 btn-mobile">                      <div>

                        <Settings className="mr-2 h-4 w-4" />                        <p className="text-sm text-muted-foreground">Status</p>

                        <span className="hidden sm:inline">Permissions</span>                        <Badge className={getStatusBadgeVariant(user.status)}>

                        <span className="sm:hidden">Perms</span>                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}

                      </Button>                        </Badge>

                      <Button variant="outline" size="sm" className="flex-1 btn-mobile">                      </div>

                        <Shield className="mr-2 h-4 w-4" />                    </div>

                        Security

                      </Button>                    <div>

                    </div>                      <p className="text-sm text-muted-foreground">Last Active</p>

                  </div>                      <p className="text-sm">{user.lastActive}</p>

                </CardContent>                    </div>

              </Card>

            ))}                    <div className="flex space-x-2 pt-2 border-t border-border">

          </div>                      <Button variant="outline" size="sm" className="flex-1">

        </CardContent>                        <Settings className="mr-2 h-4 w-4" />

      </Card>                        Permissions

                      </Button>

      {/* Role Permissions */}                      <Button variant="outline" size="sm" className="flex-1">

      <Card className="railway-card">                        <Shield className="mr-2 h-4 w-4" />

        <CardHeader>                        Security

          <CardTitle>Role Permissions</CardTitle>                      </Button>

          <CardDescription>                    </div>

            Overview of permissions by user role                  </div>

          </CardDescription>                </CardContent>

        </CardHeader>              </Card>

        <CardContent>            ))}

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">          </div>

            <div className="space-y-4">        </CardContent>

              <h4 className="font-semibold text-responsive-sm">Administrator</h4>      </Card>

              <div className="space-y-2 text-xs sm:text-sm">

                <div className="flex items-center space-x-2">      {/* Role Permissions */}

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />      <Card className="railway-card">

                  <span>Full system access</span>        <CardHeader>

                </div>          <CardTitle>Role Permissions</CardTitle>

                <div className="flex items-center space-x-2">          <CardDescription>

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />            Overview of permissions by user role

                  <span>User management</span>          </CardDescription>

                </div>        </CardHeader>

                <div className="flex items-center space-x-2">        <CardContent>

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />          <div className="grid gap-6 md:grid-cols-2">

                  <span>Component management</span>            <div className="space-y-4">

                </div>              <h4 className="font-semibold">Administrator</h4>

                <div className="flex items-center space-x-2">              <div className="space-y-2 text-sm">

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />                <div className="flex items-center space-x-2">

                  <span>Warranty claim approval</span>                  <div className="h-2 w-2 rounded-full bg-success" />

                </div>                  <span>Full system access</span>

                <div className="flex items-center space-x-2">                </div>

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />                <div className="flex items-center space-x-2">

                  <span>Analytics & reporting</span>                  <div className="h-2 w-2 rounded-full bg-success" />

                </div>                  <span>User management</span>

              </div>                </div>

            </div>                <div className="flex items-center space-x-2">

                  <div className="h-2 w-2 rounded-full bg-success" />

            <div className="space-y-4">                  <span>Component management</span>

              <h4 className="font-semibold text-responsive-sm">Inspector</h4>                </div>

              <div className="space-y-2 text-xs sm:text-sm">                <div className="flex items-center space-x-2">

                <div className="flex items-center space-x-2">                  <div className="h-2 w-2 rounded-full bg-success" />

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />                  <span>Warranty claim approval</span>

                  <span>View components</span>                </div>

                </div>                <div className="flex items-center space-x-2">

                <div className="flex items-center space-x-2">                  <div className="h-2 w-2 rounded-full bg-success" />

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />                  <span>Analytics & reporting</span>

                  <span>QR scanning</span>                </div>

                </div>              </div>

                <div className="flex items-center space-x-2">            </div>

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />

                  <span>Log inspections</span>            <div className="space-y-4">

                </div>              <h4 className="font-semibold">Inspector</h4>

                <div className="flex items-center space-x-2">              <div className="space-y-2 text-sm">

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />                <div className="flex items-center space-x-2">

                  <span>Report defects</span>                  <div className="h-2 w-2 rounded-full bg-success" />

                </div>                  <span>View components</span>

                <div className="flex items-center space-x-2">                </div>

                  <div className="h-2 w-2 rounded-full bg-muted shrink-0" />                <div className="flex items-center space-x-2">

                  <span className="text-muted-foreground">No warranty management</span>                  <div className="h-2 w-2 rounded-full bg-success" />

                </div>                  <span>QR scanning</span>

              </div>                </div>

            </div>                <div className="flex items-center space-x-2">

                  <div className="h-2 w-2 rounded-full bg-success" />

            <div className="space-y-4">                  <span>Log inspections</span>

              <h4 className="font-semibold text-responsive-sm">Vendor</h4>                </div>

              <div className="space-y-2 text-xs sm:text-sm">                <div className="flex items-center space-x-2">

                <div className="flex items-center space-x-2">                  <div className="h-2 w-2 rounded-full bg-success" />

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />                  <span>Report defects</span>

                  <span>View own components</span>                </div>

                </div>                <div className="flex items-center space-x-2">

                <div className="flex items-center space-x-2">                  <div className="h-2 w-2 rounded-full bg-muted" />

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />                  <span className="text-muted-foreground">No warranty management</span>

                  <span>Submit warranty claims</span>                </div>

                </div>              </div>

                <div className="flex items-center space-x-2">            </div>

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />

                  <span>Track claim status</span>            <div className="space-y-4">

                </div>              <h4 className="font-semibold">Vendor</h4>

                <div className="flex items-center space-x-2">              <div className="space-y-2 text-sm">

                  <div className="h-2 w-2 rounded-full bg-muted shrink-0" />                <div className="flex items-center space-x-2">

                  <span className="text-muted-foreground">No system administration</span>                  <div className="h-2 w-2 rounded-full bg-success" />

                </div>                  <span>View own components</span>

                <div className="flex items-center space-x-2">                </div>

                  <div className="h-2 w-2 rounded-full bg-muted shrink-0" />                <div className="flex items-center space-x-2">

                  <span className="text-muted-foreground">Limited analytics</span>                  <div className="h-2 w-2 rounded-full bg-success" />

                </div>                  <span>Submit warranty claims</span>

              </div>                </div>

            </div>                <div className="flex items-center space-x-2">

                  <div className="h-2 w-2 rounded-full bg-success" />

            <div className="space-y-4">                  <span>Track claim status</span>

              <h4 className="font-semibold text-responsive-sm">Viewer</h4>                </div>

              <div className="space-y-2 text-xs sm:text-sm">                <div className="flex items-center space-x-2">

                <div className="flex items-center space-x-2">                  <div className="h-2 w-2 rounded-full bg-muted" />

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />                  <span className="text-muted-foreground">No system administration</span>

                  <span>Read-only access</span>                </div>

                </div>                <div className="flex items-center space-x-2">

                <div className="flex items-center space-x-2">                  <div className="h-2 w-2 rounded-full bg-muted" />

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />                  <span className="text-muted-foreground">Limited analytics</span>

                  <span>View components</span>                </div>

                </div>              </div>

                <div className="flex items-center space-x-2">            </div>

                  <div className="h-2 w-2 rounded-full bg-success shrink-0" />

                  <span>Basic analytics</span>            <div className="space-y-4">

                </div>              <h4 className="font-semibold">Viewer</h4>

                <div className="flex items-center space-x-2">              <div className="space-y-2 text-sm">

                  <div className="h-2 w-2 rounded-full bg-muted shrink-0" />                <div className="flex items-center space-x-2">

                  <span className="text-muted-foreground">No modifications</span>                  <div className="h-2 w-2 rounded-full bg-success" />

                </div>                  <span>Read-only access</span>

                <div className="flex items-center space-x-2">                </div>

                  <div className="h-2 w-2 rounded-full bg-muted shrink-0" />                <div className="flex items-center space-x-2">

                  <span className="text-muted-foreground">No claim management</span>                  <div className="h-2 w-2 rounded-full bg-success" />

                </div>                  <span>View components</span>

              </div>                </div>

            </div>                <div className="flex items-center space-x-2">

          </div>                  <div className="h-2 w-2 rounded-full bg-success" />

        </CardContent>                  <span>Basic analytics</span>

      </Card>                </div>

    </div>                <div className="flex items-center space-x-2">

  );                  <div className="h-2 w-2 rounded-full bg-muted" />

};                  <span className="text-muted-foreground">No modifications</span>

                </div>

export default UsersPage;                <div className="flex items-center space-x-2">
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