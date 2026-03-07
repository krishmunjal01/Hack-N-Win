import {
  Shield, LayoutDashboard, Map, Building2, BarChart3, Settings, LogOut,
  AlertTriangle, Users, Globe, FileText, MapPinned
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
    ...(isNational ? [{ title: t("nav_national_control"), url: "/dashboard", icon: LayoutDashboard }] : []),
    ...(isState ? [{ title: t("nav_state_command"), url: "/dashboard", icon: Map }] : []),
    ...(isDistrict ? [{ title: t("nav_district_dashboard"), url: "/dashboard/district", icon: MapPinned }] : []),
    ...(isOfficer ? [{ title: t("nav_officer_dashboard"), url: "/dashboard/officer", icon: LayoutDashboard }] : []),
    ...(!isNational && !isState && !isDistrict && !isOfficer ? [{ title: t("nav_dashboard"), url: "/dashboard", icon: LayoutDashboard }] : []),
    { title: t("nav_building_monitor"), url: "/dashboard/buildings", icon: Building2 },
    { title: t("nav_analytics"), url: "/dashboard/analytics", icon: BarChart3 },
    { title: t("nav_alerts"), url: "/dashboard/alerts", icon: AlertTriangle },
  ];

  const systemNav = [
    { title: t("nav_contributex"), url: "/contributex", icon: Globe },
    { title: t("nav_citizen_portal"), url: "/citizen", icon: Users },
    { title: t("nav_incident_logs"), url: "/dashboard/incidents", icon: FileText },
    { title: t("nav_settings"), url: "/dashboard/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
          <Shield className="text-sidebar-primary shrink-0" size={22} />
          {!collapsed && (
            <div className="min-w-0 flex-1 text-left">
              <p className="text-sm font-bold text-sidebar-foreground truncate group-hover:underline underline-offset-2">{t("app_title_national")}</p>
              <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-widest">{t("app_subtitle_command")}</p>
            </div>
          )}
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav_operations")}</SidebarGroupLabel>
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
          <SidebarGroupLabel>{t("nav_system")}</SidebarGroupLabel>
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
              {!collapsed && <span>{t("nav_logout")}</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
