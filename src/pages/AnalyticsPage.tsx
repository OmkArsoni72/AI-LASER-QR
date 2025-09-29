import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  MapPin, 
  Calendar,
  AlertTriangle,
  Download
} from 'lucide-react';
import { useComponentStore } from '@/store/useComponentStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { format, subMonths, eachMonthOfInterval } from 'date-fns';

const AnalyticsPage = () => {
  const { components, claims, vendors } = useComponentStore();

  // Component distribution by type
  const componentsByType = components.reduce((acc, component) => {
    acc[component.type] = (acc[component.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(componentsByType).map(([type, count]) => ({
    type: type.replace(' ', '\n'),
    count,
    fullType: type
  }));

  // Status distribution
  const statusData = components.reduce((acc, component) => {
    acc[component.status] = (acc[component.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(statusData).map(([status, count], index) => ({
    name: status,
    value: count,
    color: ['#003366', '#FF6600', '#28A745', '#FFC107', '#DC3545'][index % 5]
  }));

  // Warranty expiration timeline
  const now = new Date();
  const months = eachMonthOfInterval({
    start: subMonths(now, 6),
    end: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
  });

  const warrantyData = months.map(month => {
    const expiringCount = components.filter(component => {
      const expiry = new Date(component.warrantyExpiry);
      return expiry.getMonth() === month.getMonth() && expiry.getFullYear() === month.getFullYear();
    }).length;

    return {
      month: format(month, 'MMM yyyy'),
      expiring: expiringCount
    };
  });

  // Vendor performance
  const vendorData = vendors.slice(0, 5).map(vendor => {
    const vendorComponents = components.filter(c => c.vendorId === vendor.id);
    const defectiveCount = vendorComponents.filter(c => c.status === 'Defective').length;
    const defectRate = vendorComponents.length > 0 ? (defectiveCount / vendorComponents.length) * 100 : 0;

    return {
      name: vendor.name.length > 15 ? vendor.name.substring(0, 15) + '...' : vendor.name,
      fullName: vendor.name,
      components: vendorComponents.length,
      defectRate: defectRate.toFixed(1),
      rating: vendor.rating
    };
  });

  // AI Insights (mocked)
  const aiInsights = [
    {
      type: 'warning',
      title: 'Preventive Maintenance Alert',
      description: 'Replace Rail Clips on Delhi-Gurgaon section within 90 days',
      confidence: 87,
      action: 'Schedule maintenance'
    },
    {
      type: 'info',
      title: 'Performance Optimization',
      description: 'ABC Industries components show 15% better longevity',
      confidence: 92,
      action: 'Review procurement'
    },
    {
      type: 'alert',
      title: 'Quality Issue Detected',
      description: 'Batch B-2025-003 showing higher defect rates',
      confidence: 78,
      action: 'Investigate batch'
    }
  ];

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-responsive-xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-responsive-sm text-muted-foreground mt-1">
            Insights and trends for railway component management
          </p>
        </div>
        
        <Button variant="outline" className="btn-mobile shrink-0">
          <Download className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Export Report</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      {/* AI Insights */}
      <Card className="railway-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Predictive maintenance and performance recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {aiInsights.map((insight, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className={`h-2 w-2 rounded-full shrink-0 ${
                      insight.type === 'warning' ? 'bg-warning' :
                      insight.type === 'alert' ? 'bg-destructive' : 'bg-primary'
                    }`} />
                    <h4 className="font-semibold text-responsive-sm truncate">{insight.title}</h4>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0 self-start">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{insight.description}</p>
                <Button variant="outline" size="sm" className="w-full btn-mobile">
                  {insight.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Component Distribution */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Component Distribution
            </CardTitle>
            <CardDescription>
              Breakdown by component type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={typeData} margin={{ bottom: 60, left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="type" 
                  fontSize={10}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis fontSize={10} />
                <Tooltip 
                  formatter={(value, name, props) => [value, props.payload.fullType]}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-primary" />
              Status Distribution
            </CardTitle>
            <CardDescription>
              Current component status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => window.innerWidth > 640 ? `${name} (${(Number(percent) * 100).toFixed(0)}%)` : `${(Number(percent) * 100).toFixed(0)}%`}
                  labelLine={false}
                  fontSize={12}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Warranty Expiration Timeline */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Warranty Expiration Timeline
            </CardTitle>
            <CardDescription>
              Components expiring by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={warrantyData} margin={{ bottom: 20, left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip contentStyle={{ fontSize: '12px' }} />
                <Area 
                  type="monotone" 
                  dataKey="expiring" 
                  stroke="hsl(var(--warning))" 
                  fill="hsl(var(--warning))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vendor Performance */}
        <Card className="railway-card">
          <CardHeader>
            <CardTitle>Top Vendor Performance</CardTitle>
            <CardDescription>
              Components and defect rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vendorData.map((vendor, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/30 rounded-lg gap-2">
                  <div className="space-y-1 min-w-0">
                    <p className="font-medium text-responsive-sm truncate" title={vendor.fullName}>
                      {vendor.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vendor.components} components • Rating: {vendor.rating}/5
                    </p>
                  </div>
                  <div className="flex justify-end sm:justify-start shrink-0">
                    <Badge 
                      className={`text-xs ${
                        parseFloat(vendor.defectRate) < 5 ? 'railway-badge-success' :
                        parseFloat(vendor.defectRate) < 10 ? 'railway-badge-warning' :
                        'railway-badge-danger'
                      }`}
                    >
                      {vendor.defectRate}% defects
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Placeholder */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            Geographic Distribution
          </CardTitle>
          <CardDescription>
            Component locations across railway sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80 lg:h-96 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border p-4">
            <div className="text-center max-w-full">
              <MapPin className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-responsive-base font-medium text-muted-foreground">Interactive Map</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Component locations would be displayed here with clustering and filtering
              </p>
              <div className="mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center">
                <Badge variant="outline" className="text-xs">Delhi-Gurgaon: 45</Badge>
                <Badge variant="outline" className="text-xs">Mumbai-Pune: 38</Badge>
                <Badge variant="outline" className="text-xs">Chennai-Bangalore: 32</Badge>
                <Badge variant="outline" className="text-xs">Others: 35</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="railway-card">
          <CardContent className="flex items-center p-3 sm:p-6">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Warranty Remaining</p>
              <p className="text-lg sm:text-2xl font-bold">3.2 years</p>
              <p className="text-xs text-muted-foreground hidden sm:block">Across all components</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-3 sm:p-6">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Overall Defect Rate</p>
              <p className="text-lg sm:text-2xl font-bold">4.2%</p>
              <p className="text-xs text-success">↓ 1.3% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-3 sm:p-6">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Inspection Coverage</p>
              <p className="text-lg sm:text-2xl font-bold">87%</p>
              <p className="text-xs text-muted-foreground hidden sm:block">Last 90 days</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-3 sm:p-6">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Resolution Time</p>
              <p className="text-lg sm:text-2xl font-bold">12 days</p>
              <p className="text-xs text-warning">↑ 2 days from target</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;