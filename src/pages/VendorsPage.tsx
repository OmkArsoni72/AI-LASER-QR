import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Users, 
  Star, 
  Package, 
  Shield, 
  Mail, 
  Phone,
  MapPin,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import { useComponentStore } from '@/store/useComponentStore';
import { Link } from 'react-router-dom';

const VendorsPage = () => {
  const { vendors, getComponentsByVendor, getClaimsByVendor } = useComponentStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getVendorStats = (vendorId: string) => {
    const components = getComponentsByVendor(vendorId);
    const claims = getClaimsByVendor(vendorId);
    const activeComponents = components.filter(c => c.status === 'Active').length;
    const defectiveComponents = components.filter(c => c.status === 'Defective').length;
    const pendingClaims = claims.filter(c => c.status === 'Pending' || c.status === 'Under Review').length;
    
    return {
      totalComponents: components.length,
      activeComponents,
      defectiveComponents,
      pendingClaims,
      defectRate: components.length > 0 ? (defectiveComponents / components.length) * 100 : 0
    };
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-warning fill-warning' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getDefectRateBadge = (defectRate: number) => {
    if (defectRate < 5) return 'railway-badge-success';
    if (defectRate < 10) return 'railway-badge-warning';
    return 'railway-badge-danger';
  };

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-responsive-xl font-bold text-foreground">Vendor Management</h1>
          <p className="text-responsive-sm text-muted-foreground mt-1">
            Manage vendor relationships and performance metrics
          </p>
        </div>
        
        <Button className="bg-gradient-hero text-white hover:opacity-90 btn-mobile shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Add Vendor</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="railway-card">
          <CardContent className="flex items-center p-3 sm:p-6">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2 sm:mr-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold">{vendors.length}</p>
              <p className="text-xs text-muted-foreground">Total Vendors</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-3 sm:p-6">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-success mr-2 sm:mr-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold">
                {vendors.reduce((sum, vendor) => sum + getVendorStats(vendor.id).activeComponents, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Active Components</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-3 sm:p-6">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-warning mr-2 sm:mr-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold">
                {vendors.reduce((sum, vendor) => sum + getVendorStats(vendor.id).pendingClaims, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Pending Claims</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-3 sm:p-6">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-warning mr-2 sm:mr-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold">
                {(vendors.reduce((sum, vendor) => sum + vendor.rating, 0) / vendors.length).toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle>Vendors</CardTitle>
          <CardDescription>
            Search and manage vendor information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search vendors by name, email, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Vendors Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredVendors.map((vendor) => {
              const stats = getVendorStats(vendor.id);
              
              return (
                <Card key={vendor.id} className="railway-card hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 shrink-0">
                          <AvatarFallback className="text-primary font-semibold text-sm">
                            {vendor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-responsive-base truncate">{vendor.name}</h3>
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="flex">
                              {getRatingStars(Math.floor(vendor.rating))}
                            </div>
                            <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                              ({vendor.rating})
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1 shrink-0">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Mail className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{vendor.email}</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Phone className="mr-2 h-4 w-4 shrink-0" />
                        <span>{vendor.phone}</span>
                      </div>
                      <div className="flex items-start text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 mt-0.5 shrink-0" />
                        <span className="text-xs leading-relaxed break-words">{vendor.address}</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Specialties</p>
                      <div className="flex flex-wrap gap-1">
                        {vendor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">{stats.totalComponents}</p>
                        <p className="text-xs text-muted-foreground">Components</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <Badge className={getDefectRateBadge(stats.defectRate)}>
                            {stats.defectRate.toFixed(1)}%
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Defect Rate</p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Active:</span>
                        <span className="font-medium text-success">{stats.activeComponents}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Defective:</span>
                        <span className="font-medium text-destructive">{stats.defectiveComponents}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pending Claims:</span>
                        <span className="font-medium text-warning">{stats.pendingClaims}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 btn-mobile">
                        <Package className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Components</span>
                        <span className="sm:hidden">Parts</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 btn-mobile">
                        <Shield className="mr-2 h-4 w-4" />
                        Claims
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No vendors found</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm
                  ? 'Try adjusting your search terms to see more results.'
                  : 'Get started by adding your first vendor.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle>Top Performing Vendors</CardTitle>
          <CardDescription>
            Vendors ranked by performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {vendors
              .sort((a, b) => {
                const aStats = getVendorStats(a.id);
                const bStats = getVendorStats(b.id);
                // Sort by defect rate (lower is better) then by rating
                return aStats.defectRate - bStats.defectRate || b.rating - a.rating;
              })
              .slice(0, 5)
              .map((vendor, index) => {
                const stats = getVendorStats(vendor.id);
                
                return (
                  <div key={vendor.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-muted/30 rounded-lg gap-3">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                      <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary font-bold text-sm sm:text-base shrink-0">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-responsive-sm truncate">{vendor.name}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-muted-foreground gap-1">
                          <span>{stats.totalComponents} components</span>
                          <div className="flex items-center space-x-1">
                            <div className="flex">
                              {getRatingStars(Math.floor(vendor.rating))}
                            </div>
                            <span>({vendor.rating})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end shrink-0">
                      <Badge className={`text-xs ${getDefectRateBadge(stats.defectRate)}`}>
                        <span className="hidden sm:inline">{stats.defectRate.toFixed(1)}% defect rate</span>
                        <span className="sm:hidden">{stats.defectRate.toFixed(1)}%</span>
                      </Badge>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorsPage;