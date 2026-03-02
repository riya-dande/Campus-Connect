import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, GraduationCap, User, MessageCircle, LogOut, Sparkles } from "lucide-react";
import { useStore } from "@/store";
import { Button } from "@/components/ui/button";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { logout, user } = useStore();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Hub", path: "/hub" },
    { icon: GraduationCap, label: "Campus Zones", path: "/campus-zones" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-xl fixed inset-y-0 z-50" role="navigation" aria-label="Main navigation">
        <div className="p-6">
          <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            CampusConnect
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} href={item.path}>
                <div className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}>
                  <Icon className={cn("w-5 h-5", isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform")} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary-foreground/90 dark:text-primary">Semester 6</span>
          </div>
          <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-full w-[72%] rounded-full" />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-right">72% Complete</p>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 m-4 mt-auto">
          <div className="flex items-center gap-3 mb-3 p-2 rounded-xl bg-muted/50">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 pb-safe" role="navigation" aria-label="Mobile navigation">
        <div className="flex justify-around items-center p-3">
          {navItems.map((item) => {
             const isActive = location === item.path;
             const Icon = item.icon;
             return (
               <Link key={item.path} href={item.path}>
                 <div className={cn(
                   "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 min-h-[60px] min-w-[60px] justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                   isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                 )}
                 role="menuitem"
                 aria-current={isActive ? "page" : undefined}
                 aria-label={item.label}
                 >
                   <Icon className="w-6 h-6" />
                   <span className="text-xs font-medium">{item.label}</span>
                 </div>
               </Link>
             )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}