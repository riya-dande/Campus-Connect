import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import { Award, Bell, ChevronDown, ExternalLink, Info } from "lucide-react";
import { useRef } from "react";
import billboardImage from "@assets/generated_images/futuristic_digital_billboard_on_campus.png";

export default function Announcements() {
  const { announcements, markRead } = useStore();
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="relative group">
        <motion.div
          initial={{ rotateX: 16, opacity: 0, y: 30 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative aspect-[19/8] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 border border-white/15"
        >
          <img
            src={billboardImage}
            alt="Campus announcements board"
            className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

          <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Live Announcements</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {recentAnnouncements.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.08 }}
                  onClick={() => {
                    markRead(item.id);
                    scrollToList();
                  }}
                  className="text-left rounded-2xl p-3 bg-white/8 border border-white/15 backdrop-blur-md hover:bg-white/15 transition-colors"
                >
                  <Badge variant="outline" className="text-[9px] border-primary/60 text-primary mb-2">
                    {item.category}
                  </Badge>
                  <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
                </motion.button>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToList}
              className="mx-auto flex flex-col items-center gap-1 text-white/70 hover:text-primary transition-colors"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider">Open full board</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </motion.div>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-primary/20 blur-[80px] -z-10" />
      </div>

      <div ref={listRef} className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-xl font-heading font-bold">Campus Bulletin</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {["All", "Placement", "Academic", "Club"].map((filter) => (
              <Badge key={filter} variant="outline" className="rounded-full px-4 py-1 border-border/70">
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {announcements.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "group rounded-2xl border p-4 transition-colors",
                !item.isRead ? "border-primary/30 bg-primary/5" : "border-border/60 bg-card hover:bg-muted/30"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-xl shrink-0", !item.isRead ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>
                  {item.category === "Exam" ? (
                    <Info className="w-4 h-4" />
                  ) : item.category === "Placement" ? (
                    <Award className="w-4 h-4" />
                  ) : (
                    <Bell className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {item.author} | {item.date}
                    </span>
                    {!item.isRead && <Badge className="h-5 text-[10px] bg-primary">New</Badge>}
                  </div>
                  <p className="text-sm md:text-base font-semibold leading-snug">{item.title}</p>
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
