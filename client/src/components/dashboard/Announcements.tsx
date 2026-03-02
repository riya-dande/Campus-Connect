import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import { Calendar, Bell, Info, Award, ExternalLink, ChevronDown } from "lucide-react";
import { useRef } from "react";
import billboardImage from '@assets/generated_images/futuristic_digital_billboard_on_campus.png';

export default function BillboardAnnouncements() {
  const { announcements, markRead } = useStore();
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* 3D Graphic Billboard Section */}
      <div className="relative group perspective-1000">
        <motion.div
          initial={{ rotateX: 20, opacity: 0, y: 50 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[21/9] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 border border-white/10"
        >
          {/* Background Image */}
          <img 
            src={billboardImage} 
            alt="Campus Billboard" 
            className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
          />
          
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Billboard Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Campus Updates</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {recentAnnouncements.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  onClick={() => {
                    markRead(item.id);
                    scrollToList();
                  }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group/item"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-[8px] border-primary/50 text-primary uppercase">
                      {item.category}
                    </Badge>
                  </div>
                  <h3 className="text-white text-sm font-bold line-clamp-2 group-hover/item:text-primary transition-colors">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ y: 5 }}
              onClick={scrollToList}
              className="mx-auto flex flex-col items-center gap-2 text-white/60 hover:text-primary transition-colors"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to full list</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Holographic light effect */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-primary/20 blur-[100px] -z-10" />
      </div>

      {/* Full Announcements List */}
      <div ref={listRef} className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold">Campus Bulletin</h2>
          <div className="flex gap-2">
            {['All', 'Placement', 'Academic', 'Club'].map(f => (
              <Badge key={f} variant="outline" className="rounded-full px-4 py-1 cursor-pointer hover:bg-primary/5">
                {f}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {announcements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden transition-all duration-300 rounded-3xl border border-border/50 hover:border-primary/30",
                !item.isRead ? "bg-primary/[0.02] ring-1 ring-primary/10" : "bg-card"
              )}
            >
              <div className="p-6 flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-2xl shrink-0",
                  !item.isRead ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {item.category === 'Exam' ? <Info className="w-5 h-5" /> : 
                   item.category === 'Placement' ? <Award className="w-5 h-5" /> : 
                   <Bell className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.author} • {item.date}
                    </span>
                    {!item.isRead && (
                      <Badge className="h-4 text-[8px] bg-primary">NEW</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors truncate">
                    {item.title}
                  </h3>
                </div>

                <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
