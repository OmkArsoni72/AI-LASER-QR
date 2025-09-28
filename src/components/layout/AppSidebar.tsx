import { useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  QrCode, 
  ScanLine, 
  BarChart3, 
  Users, 
  Shield, 
  UserCheck, 
  Settings,
  Plus
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useComponentStore } from "@/store/useComponentStore";

const adminItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Components", url: "/components", icon: Package },
  { title: "Add Component", url: "/components/new", icon: Plus },
  { title: "Generate QR", url: "/qr/generate", icon: QrCode },
  { title: "Scanner", url: "/scan", icon: ScanLine },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Vendors", url: "/vendors", icon: Users },
  { title: "Warranty Claims", url: "/warranty", icon: Shield },
  { title: "User Management", url: "/users", icon: UserCheck },
  { title: "Settings", url: "/settings", icon: Settings },
];

const vendorItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Components", url: "/components", icon: Package },
  { title: "Warranty Claims", url: "/warranty", icon: Shield },
  { title: "Scanner", url: "/scan", icon: ScanLine },
];

const inspectorItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Components", url: "/components", icon: Package },
  { title: "Scanner", url: "/scan", icon: ScanLine },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { currentUser } = useComponentStore();
  const currentPath = location.pathname;

  const getMenuItems = () => {
    switch (currentUser?.role) {
      case 'vendor':
        return vendorItems;
      case 'inspector':
        return inspectorItems;
      case 'viewer':
        return inspectorItems.filter(item => !item.url.includes('/new'));
      default:
        return adminItems;
    }
  };

  const menuItems = getMenuItems();
  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    return isActive(path) 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
  };

  const collapsed = state === 'collapsed';

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className={`px-6 py-4 text-sidebar-foreground ${collapsed ? 'sr-only' : ''}`}>
            Main Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/'}
                      className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${getNavClassName(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="rounded-lg bg-gradient-hero p-4 text-white">
              <h4 className="font-semibold text-sm">Indian Railways</h4>
              <p className="text-xs opacity-90 mt-1">Track Component Management System</p>
              <div className="mt-2 text-xs opacity-75">
                Role: {currentUser?.role || 'Unknown'}
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}