import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Lock, CheckCircle2, Trophy, ArrowRight, Zap, GraduationCap, Users, Lightbulb, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const professionalLevels = [
  { id: 1, title: "Resume Building", status: "completed", rating: 3, description: "Crafting a standout professional profile." },
  { id: 2, title: "LinkedIn Mastery", status: "completed", rating: 3, description: "Networking and personal branding online." },
  { id: 3, title: "Interview Prep", status: "current", rating: 0, description: "Mastering the art of professional conversation." },
  { id: 4, title: "Industry Research", status: "locked", rating: 0, description: "Identifying opportunities and trends." },
  { id: 5, title: "Portfolio Design", status: "locked", rating: 0, description: "Showcasing your work to the world." },
];

const selfDevLevels = [
  { id: 1, title: "Self-Awareness", status: "completed", rating: 3, description: "Discover your strengths and core values." },
  { id: 2, title: "Emotional EQ", status: "completed", rating: 2, description: "Mastering empathy and self-regulation." },
  { id: 3, title: "Active Listening", status: "current", rating: 0, description: "Learn to listen beyond words." },
  { id: 4, title: "Team Dynamics", status: "locked", rating: 0, description: "Navigating group collaboration." },
  { id: 5, title: "Public Speaking", status: "locked", rating: 0, description: "Commanding the stage with confidence." },
];

function LevelMap({ levels, title, icon: Icon }: { levels: any[], title: string, icon: any }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold">{title}</h2>
          </div>
        </div>
      </div>

      <div className="relative max-w-md mx-auto py-10">
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-visible" viewBox="0 0 200 600">
          <path
            d="M 100 50 Q 150 150 100 250 Q 50 350 100 450 Q 150 550 100 650"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="8 8"
            className="text-primary/20"
          />
        </svg>

        <div className="space-y-20">
          {levels.map((level, index) => {
            const isEven = index % 2 === 0;
            const isCompleted = level.status === "completed";
            const isCurrent = level.status === "current";
            const isLocked = level.status === "locked";

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={cn(
                  "flex items-center gap-6",
                  isEven ? "flex-row" : "flex-row-reverse"
                )}
              >
                <div className="relative group">
                  <motion.button
                    whileHover={!isLocked ? { scale: 1.1, rotate: 5 } : {}}
                    whileTap={!isLocked ? { scale: 0.9 } : {}}
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 relative z-10",
                      isCompleted ? "bg-gradient-to-br from-primary to-violet-600 text-white" :
                      isCurrent ? "bg-white dark:bg-slate-800 ring-4 ring-primary ring-offset-4 animate-bounce" :
                      "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="w-7 h-7" /> :
                     isCurrent ? <Zap className="w-7 h-7 text-primary fill-primary/20" /> :
                     <Lock className="w-5 h-5" />}
                  </motion.button>
                  
                  {isCompleted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {[1, 2, 3].map((s) => (
                        <Star 
                          key={s} 
                          className={cn(
                            "w-3 h-3",
                            s <= level.rating ? "text-yellow-400 fill-yellow-400" : "text-muted/50"
                          )} 
                        />
                      ))}
                    </div>
                  )}
                </div>

                <motion.div 
                  className={cn(
                    "flex-1 p-3 rounded-xl border bg-card/50 backdrop-blur-sm transition-all",
                    isCurrent ? "border-primary shadow-lg shadow-primary/5 scale-105" : "border-border/50",
                    isLocked && "opacity-50 grayscale"
                  )}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Level {level.id}</span>
                  </div>
                  <h3 className="font-bold text-xs mb-0.5">{level.title}</h3>
                  <p className="text-[9px] text-muted-foreground leading-tight">{level.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function DevelopmentPath() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-10">
      <LevelMap levels={selfDevLevels} title="Self Development" icon={Heart} />
      <LevelMap levels={professionalLevels} title="Professional Track" icon={GraduationCap} />
    </div>
  );
}
