import {
  Shield, LayoutDashboard, Map, Building2, BarChart3, Settings, LogOut,
  AlertTriangle, Users, Globe, FileText, MapPinned
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { getRoleLabel } from "@/services/authService";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  // Role-based navigation
  const isNational = user?.role === "national_admin";
  const isState = user?.role === "state_officer";
  const isDistrict = user?.role === "district_officer";
  const isOfficer = user?.role === "building_authority";

  const mainNav = [
    ...(isNational ? [{ title: "National Control", url: "/dashboard", icon: LayoutDashboard }] : []),
    ...(isState ? [{ title: "State Command", url: "/dashboard", icon: Map }] : []),
    ...(isDistrict ? [{ title: "District Dashboard", url: "/dashboard/district", icon: MapPinned }] : []),
    ...(isOfficer ? [{ title: "Officer Dashboard", url: "/dashboard/officer", icon: LayoutDashboard }] : []),
    ...(!isNational && !isState && !isDistrict && !isOfficer ? [{ title: "Dashboard", url: "/dashboard", icon: LayoutDashboard }] : []),
    { title: "Building Monitor", url: "/dashboard/buildings", icon: Building2 },
    { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
    { title: "Alerts", url: "/dashboard/alerts", icon: AlertTriangle },
  ];

  const systemNav = [
    { title: "ContriButeX", url: "/contributex", icon: Globe },
    { title: "Citizen Portal", url: "/citizen", icon: Users },
    { title: "Incident Logs", url: "/dashboard/incidents", icon: FileText },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
          <Shield className="text-sidebar-primary shrink-0" size={22} />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-sidebar-foreground truncate group-hover:underline underline-offset-2">IDIS National</p>
              <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-widest">Command Center</p>
            </div>
          )}
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/dashboard"} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!collapsed && user && (
          <div className="mb-3">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-[10px] text-sidebar-foreground/60">{getRoleLabel(user.role)}</p>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-red-400 hover:bg-red-500/10">
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
