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
      <aside className="hidden md:flex flex-col w-72 border-r border-border/50 bg-card/30 backdrop-blur-xl fixed inset-y-0 z-50" role="navigation" aria-label="Main navigation">
        <div className="p-6">
          <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            CampusConnect
          </h1>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group whitespace-nowrap",
                  isActive
                    ? "bg-primary/10 text-primary border-l-[3px] border-primary ml-[-2px]"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "group-hover:scale-110 transition-transform")} />
                <span className="font-medium text-sm truncate">{item.label}</span>
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
              className="w-10 h-10 rounded-full shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full justify-start gap-2 whitespace-nowrap"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="truncate">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 pb-safe" aria-label="Mobile navigation">
        <div className="flex justify-around items-center p-3">
          {navItems.map((item) => {
             const isActive = location === item.path;
             const Icon = item.icon;
             return (
               <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 min-h-[60px] min-w-[60px] justify-center",
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
               >
                 <Icon className="w-6 h-6" />
                 <span className="text-xs font-medium">{item.label}</span>
               </Link>
             )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:pl-72 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}