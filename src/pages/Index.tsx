import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, QrCode, ScanLine, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComponentStore } from '@/store/useComponentStore';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

const Index = () => {
  const { components, claims, currentUser } = useComponentStore();

  // Recent activity data
  const recentComponents = components
    .sort((a, b) => new Date(b.installDate).getTime() - new Date(a.installDate).getTime())
    .slice(0, 5);

  const recentClaims = claims
    .sort((a, b) => new Date(b.claimDate).getTime() - new Date(a.claimDate).getTime())
    .slice(0, 5);

  // Chart data
  const componentsByType = components.reduce((acc, component) => {
    acc[component.type] = (acc[component.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(componentsByType).map(([type, count]) => ({
    type,
    count
  }));

  const pieData = Object.entries(componentsByType).map(([type, count], index) => ({
    name: type,
    value: count,
    color: ['#003366', '#FF6600', '#28A745', '#FFC107', '#DC3545'][index % 5]
  }));

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

  const getClaimStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'railway-badge-success';
      case 'Pending':
      case 'Under Review':
        return 'railway-badge-warning';
      case 'Rejected':
        return 'railway-badge-danger';
      default:
        return 'railway-badge';
    }
  };

  const isVendorView = currentUser?.role === 'vendor';

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">
            Welcome back, {currentUser?.name}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {isVendorView 
              ? 'Manage your components and warranty claims' 
              : 'Monitor and manage railway component infrastructure'
            }
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:shrink-0">
          <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5 w-full sm:w-auto" size="sm">
            <Link to="/scan">
              <ScanLine className="mr-2 h-4 w-4" />
              <span className="sm:inline">Quick Scan</span>
            </Link>
          </Button>
          
          {!isVendorView && (
            <>
              <Button asChild variant="outline" className="border-secondary/20 hover:bg-secondary/5 w-full sm:w-auto" size="sm">
                <Link to="/qr/generate">
                  <QrCode className="mr-2 h-4 w-4" />
                  <span className="sm:inline">Generate QR</span>
                </Link>
              </Button>
              
              <Button asChild className="bg-gradient-hero text-white hover:opacity-90 w-full sm:w-auto" size="sm">
                <Link to="/components/new">
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="sm:inline">Add Component</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <DashboardMetrics />

      {/* Charts and Activity */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Component Distribution Chart */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center text-sm sm:text-base">
              <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Component Distribution
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Breakdown of components by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution Pie Chart */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Component Status</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Current status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Recent Components */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle>Recent Components</CardTitle>
            <CardDescription>
              Latest registered components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComponents.map((component) => (
                <div key={component.id} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-b-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{component.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {component.type} • {component.manufacturer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Installed: {format(new Date(component.installDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <Badge className={getStatusBadgeVariant(component.status)}>
                    {component.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Claims */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle>Recent Warranty Claims</CardTitle>
            <CardDescription>
              Latest claim submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-b-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{claim.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Component: {claim.componentId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Filed: {format(new Date(claim.claimDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <Badge className={getClaimStatusBadgeVariant(claim.status)}>
                    {claim.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
