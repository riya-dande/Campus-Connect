import { motion } from "framer-motion";
import { 
  Flame, 
  Map as MapIcon, 
  Search, 
  Coffee, 
  BookOpen, 
  Gamepad2, 
  Users,
  Zap,
  Gift,
  Navigation,
  Activity,
  UserPlus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const spots = [
  { id: 1, name: "Central Lawn", activity: "32 students here", details: "Frisbee match in progress", icon: Users, color: "bg-emerald-500", heat: "high" },
  { id: 2, name: "Library Annex", activity: "Quiet Zone • 85% full", details: "Best for focused study", icon: BookOpen, color: "bg-blue-500", heat: "low" },
  { id: 3, name: "Main Canteen", activity: "Happy Hour: 20% off", details: "Live acoustic session starts at 4 PM", icon: Coffee, color: "bg-amber-500", heat: "medium" },
  { id: 4, name: "Innovation Lab", activity: "12 creators active", details: "3D printer available", icon: Zap, color: "bg-indigo-500", heat: "medium" },
];

export default function CampusLifeHub() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500">
            <Navigation className="w-5 h-5 animate-pulse" />
          </div>
          <h2 className="text-xl font-heading font-bold">Live Radar</h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Real-time</span>
        </div>
      </div>

      {/* Interactive Visual Map Representation */}
      <div className="relative aspect-[4/3] w-full bg-muted/30 rounded-[2rem] border border-border/50 overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
        
        {/* Abstract Map Grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Floating Pulsing Nodes */}
        {spots.map((spot, i) => (
          <motion.div
            key={spot.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="absolute"
            style={{ 
              top: `${20 + (i * 18)}%`, 
              left: `${15 + (i * 20) + (i % 2 * 10)}%` 
            }}
          >
            <div className="relative group/node">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "w-4 h-4 rounded-full blur-[2px] opacity-40",
                  spot.color
                )}
              />
              <div className={cn(
                "absolute top-0 left-0 w-4 h-4 rounded-full ring-2 ring-white shadow-lg z-10",
                spot.color
              )} />
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-all pointer-events-none whitespace-nowrap z-20">
                <div className="bg-card/90 backdrop-blur-md border border-border/50 px-3 py-1.5 rounded-xl shadow-xl text-[10px] font-bold">
                  {spot.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="absolute bottom-4 left-4 right-4 bg-background/60 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-primary" />
            <p className="text-[10px] font-medium leading-tight">
              <span className="font-bold text-primary">Trend:</span> The <span className="underline decoration-primary/30 decoration-2">Central Lawn</span> is the most active spot right now.
            </p>
          </div>
        </div>
      </div>

      {/* Gamified Streaks & Rewards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 border-none bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20 rounded-3xl relative overflow-hidden group cursor-pointer transition-transform active:scale-95">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <Zap className="w-6 h-6 fill-white" />
              <Badge className="bg-white/20 border-none text-[8px]">BOOST</Badge>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Daily Points</p>
            <p className="text-2xl font-black">2,450</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
        </Card>

        <Card className="p-4 border-none bg-gradient-to-br from-primary to-indigo-600 text-white shadow-lg shadow-primary/20 rounded-3xl relative overflow-hidden group cursor-pointer transition-transform active:scale-95">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <Gift className="w-6 h-6 fill-white" />
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[8px] font-bold">{i}</div>
                ))}
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Coupons</p>
            <p className="text-2xl font-black">3 Active</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
        </Card>
      </div>

      {/* List View with more details */}
      <div className="space-y-3">
        {spots.map((spot) => (
          <motion.div
            key={spot.id}
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 p-3 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className={cn("p-2.5 rounded-xl text-white shadow-md", spot.color)}>
              <spot.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{spot.name}</h4>
                {spot.heat === "high" && <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />}
              </div>
              <p className="text-[10px] text-muted-foreground font-medium leading-tight">{spot.activity}</p>
              <p className="text-[9px] text-muted-foreground/60 italic mt-0.5">{spot.details}</p>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all">
              <UserPlus className="w-4 h-4 text-primary" />
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Quick Fun Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 rounded-2xl h-12 gap-2 border-dashed hover:border-primary/50 hover:bg-primary/5 group">
          <Gamepad2 className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold">Quick Game</span>
        </Button>
        <Button variant="outline" className="flex-1 rounded-2xl h-12 gap-2 border-dashed hover:border-primary/50 hover:bg-primary/5 group">
          <Coffee className="w-4 h-4 text-primary group-hover:-rotate-12 transition-transform" />
          <span className="text-xs font-bold">Find Buddy</span>
        </Button>
      </div>
    </div>
  );
}
