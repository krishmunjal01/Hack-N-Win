import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/auth/AuthContext";
import { getRoleLabel, getRoleAccent } from "@/services/authService";
import { ChevronRight, Home } from "lucide-react";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "National Control Center",
  "/dashboard/buildings": "Building Monitoring",
  "/dashboard/analytics": "Analytics & Intelligence",
  "/dashboard/alerts": "Active Alerts",
  "/dashboard/incidents": "Incident Logs",
  "/dashboard/settings": "Account Settings",
  "/dashboard/district": "District Dashboard",
  "/dashboard/officer": "Officer Dashboard",
};

const DashboardLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const roleAccent = user ? getRoleAccent(user.role) : "role-officer";

  // Build breadcrumbs
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbs: { label: string; path: string }[] = [];
  let currentPath = "";
  for (const seg of pathSegments) {
    currentPath += `/${seg}`;
    const label = breadcrumbMap[currentPath];
    if (label) breadcrumbs.push({ label, path: currentPath });
    else if (seg.startsWith("states")) breadcrumbs.push({ label: "State Command", path: currentPath });
  }

  // Handle state command breadcrumb
  if (location.pathname.match(/\/dashboard\/states\/.+/)) {
    breadcrumbs.push({ label: "State Command", path: location.pathname });
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border bg-card px-4 shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="h-5 w-px bg-border" />
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-sm">
                <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Home size={14} />
                </button>
                {breadcrumbs.map((bc, i) => (
                  <span key={bc.path} className="flex items-center gap-1.5">
                    <ChevronRight size={12} className="text-muted-foreground" />
                    <button
                      onClick={() => navigate(bc.path)}
                      className={`${i === breadcrumbs.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"} transition-colors`}
                    >
                      {bc.label}
                    </button>
                  </span>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <span className="h-2 w-2 rounded-full bg-stage-safe animate-pulse-glow" />
              <div className="text-right hidden md:block">
                <span className="text-xs text-muted-foreground">{user?.name}</span>
                <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-${roleAccent}/10 text-${roleAccent}`}>
                  {user ? getRoleLabel(user.role) : ""}
                </span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
