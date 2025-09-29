import { Bell, User, Settings, LogOut, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useComponentStore } from '@/store/useComponentStore';

export function Header() {
  const { currentUser, logout, getMetrics } = useComponentStore();
  const metrics = getMetrics();

  const handleRoleSwitch = (role: typeof currentUser.role) => {
    if (currentUser) {
      useComponentStore.getState().setCurrentUser({
        ...currentUser,
        role,
        vendorId: role === 'vendor' ? 'V-001' : undefined
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 sm:h-16 items-center justify-between px-2 sm:px-4">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
          <SidebarTrigger className="shrink-0" />
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shrink-0">
              <Train className="h-4 w-4 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">Track Component Management</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Indian Railways</p>
            </div>
            <div className="min-w-0 sm:hidden">
              <h1 className="text-sm font-bold text-foreground">TCM</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-4 shrink-0">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                {metrics.pendingClaims > 0 && (
                  <Badge className="absolute -right-1 -top-1 sm:-right-2 sm:-top-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-xs bg-destructive text-destructive-foreground">
                    {metrics.pendingClaims > 9 ? '9+' : metrics.pendingClaims}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 sm:w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Warranty Claims Pending</p>
                  <p className="text-xs text-muted-foreground">
                    {metrics.pendingClaims} claims require your attention
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Components Expiring Soon</p>
                  <p className="text-xs text-muted-foreground">
                    {metrics.warrantyExpiring} warranties expire in 90 days
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {currentUser?.name.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Role: {currentUser?.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Demo: Role Switching */}
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Switch Role (Demo)
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleRoleSwitch('admin')}>
                <User className="mr-2 h-4 w-4" />
                <span>Admin</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleSwitch('vendor')}>
                <User className="mr-2 h-4 w-4" />
                <span>Vendor</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleSwitch('inspector')}>
                <User className="mr-2 h-4 w-4" />
                <span>Inspector</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}