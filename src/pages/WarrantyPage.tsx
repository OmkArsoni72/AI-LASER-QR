import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Shield, 
  Search, 
  Plus, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  FileText,
  Calendar,
  User
} from 'lucide-react';
import { useComponentStore } from '@/store/useComponentStore';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const WarrantyPage = () => {
  const { claims, components, vendors, currentUser, updateClaim, getClaimsByVendor } = useComponentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const isVendorView = currentUser?.role === 'vendor';
  
  // Filter claims based on user role
  const userClaims = isVendorView && currentUser?.vendorId 
    ? getClaimsByVendor(currentUser.vendorId)
    : claims;

  const filteredClaims = userClaims.filter(claim => {
    const matchesSearch = claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.componentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleClaimAction = (claimId: string, action: 'approve' | 'reject') => {
    const updates: Partial<any> = {
      status: action === 'approve' ? 'Approved' as const : 'Rejected' as const,
      adminNotes,
      ...(action === 'approve' ? { approvedDate: new Date().toISOString().split('T')[0] } : { rejectedReason: adminNotes })
    };

    updateClaim(claimId, updates);
    
    toast({
      title: `Claim ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `Warranty claim ${claimId} has been ${action}d.`,
    });

    setSelectedClaim(null);
    setAdminNotes('');
  };

  const getClaimComponent = (componentId: string) => {
    return components.find(c => c.id === componentId);
  };

  const getVendorName = (vendorId: string) => {
    return vendors.find(v => v.id === vendorId)?.name || 'Unknown Vendor';
  };

  const claimStats = {
    total: userClaims.length,
    pending: userClaims.filter(c => c.status === 'Pending' || c.status === 'Under Review').length,
    approved: userClaims.filter(c => c.status === 'Approved').length,
    rejected: userClaims.filter(c => c.status === 'Rejected').length
  };

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isVendorView ? 'My Warranty Claims' : 'Warranty Management'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isVendorView 
              ? 'Submit and track your warranty claims'
              : 'Review and process warranty claims from vendors'
            }
          </p>
        </div>
        
        {isVendorView && (
          <Button className="bg-gradient-hero text-white hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Submit Claim
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <Shield className="h-8 w-8 text-primary mr-4" />
            <div>
              <p className="text-2xl font-bold">{claimStats.total}</p>
              <p className="text-xs text-muted-foreground">Total Claims</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-warning mr-4" />
            <div>
              <p className="text-2xl font-bold">{claimStats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-success mr-4" />
            <div>
              <p className="text-2xl font-bold">{claimStats.approved}</p>
              <p className="text-xs text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="railway-card">
          <CardContent className="flex items-center p-6">
            <XCircle className="h-8 w-8 text-destructive mr-4" />
            <div>
              <p className="text-2xl font-bold">{claimStats.rejected}</p>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claims Table */}
      <Card className="railway-card">
        <CardHeader>
          <CardTitle>Warranty Claims</CardTitle>
          <CardDescription>
            {isVendorView ? 'Your submitted warranty claims' : 'All warranty claims requiring review'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by claim ID, component ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Component</TableHead>
                  {!isVendorView && <TableHead>Vendor</TableHead>}
                  <TableHead>Claim Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => {
                  const component = getClaimComponent(claim.componentId);
                  
                  return (
                    <TableRow key={claim.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm">{claim.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{claim.componentId}</p>
                          {component && (
                            <p className="text-xs text-muted-foreground">
                              {component.type} • {component.manufacturer}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      {!isVendorView && (
                        <TableCell>{getVendorName(claim.vendorId)}</TableCell>
                      )}
                      <TableCell className="text-sm">
                        {format(new Date(claim.claimDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeVariant(claim.status)}>
                          {getStatusIcon(claim.status)}
                          <span className="ml-1">{claim.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{claim.description}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedClaim(claim)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <Shield className="mr-2 h-5 w-5 text-primary" />
                                Warranty Claim Details
                              </DialogTitle>
                              <DialogDescription>
                                Claim ID: {claim.id}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedClaim && (
                              <div className="space-y-6">
                                {/* Claim Information */}
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Component ID</p>
                                    <p className="font-mono">{selectedClaim.componentId}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                                    <p>{getVendorName(selectedClaim.vendorId)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Claim Date</p>
                                    <p>{format(new Date(selectedClaim.claimDate), 'MMM dd, yyyy')}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <Badge className={getStatusBadgeVariant(selectedClaim.status)}>
                                      {selectedClaim.status}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Description */}
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                                  <p className="text-sm p-3 bg-muted/30 rounded-lg">
                                    {selectedClaim.description}
                                  </p>
                                </div>

                                {/* Images */}
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-2">Supporting Images</p>
                                  <div className="grid grid-cols-2 gap-2">
                                    {selectedClaim.images.map((image: string, index: number) => (
                                      <div key={index} className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                                        <FileText className="h-8 w-8 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground ml-2">
                                          Image {index + 1}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Admin Notes */}
                                {selectedClaim.adminNotes && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Admin Notes</p>
                                    <p className="text-sm p-3 bg-muted/30 rounded-lg">
                                      {selectedClaim.adminNotes}
                                    </p>
                                  </div>
                                )}

                                {/* Admin Actions */}
                                {!isVendorView && (selectedClaim.status === 'Pending' || selectedClaim.status === 'Under Review') && (
                                  <div className="space-y-4 border-t pt-4">
                                    <div>
                                      <p className="text-sm font-medium mb-2">Admin Notes</p>
                                      <Textarea
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Add notes for this decision..."
                                        rows={3}
                                      />
                                    </div>
                                    
                                    <div className="flex space-x-2">
                                      <Button
                                        onClick={() => handleClaimAction(selectedClaim.id, 'approve')}
                                        className="flex-1 bg-success hover:bg-success/90"
                                      >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve Claim
                                      </Button>
                                      <Button
                                        onClick={() => handleClaimAction(selectedClaim.id, 'reject')}
                                        variant="destructive"
                                        className="flex-1"
                                      >
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject Claim
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {filteredClaims.length === 0 && (
            <div className="text-center py-12">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No warranty claims found</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : isVendorView 
                  ? 'Submit your first warranty claim to get started.'
                  : 'No warranty claims have been submitted yet.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WarrantyPage;