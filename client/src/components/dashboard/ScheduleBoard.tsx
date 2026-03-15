import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, Clock3, MapPin, Timer, ArrowUpRight } from "lucide-react";

const scheduleItems = [
  { id: 1, time: "09:00 AM", title: "Operating Systems", place: "CS-201", status: "done" },
  { id: 2, time: "11:00 AM", title: "Data Structures Lab", place: "Lab-3", status: "live" },
  { id: 3, time: "02:00 PM", title: "Placement Aptitude Session", place: "Seminar Hall", status: "upcoming" },
  { id: 4, time: "04:30 PM", title: "AI Club Sprint", place: "Innovation Hub", status: "upcoming" },
] as const;

const deadlines = [
  { title: "OS Assignment", due: "Today, 5:00 PM", priority: "High" },
  { title: "Resume Review", due: "Tomorrow, 7:30 PM", priority: "Medium" },
  { title: "Hackathon Team Form", due: "Friday", priority: "Medium" },
];

const statusStyle: Record<(typeof scheduleItems)[number]["status"], string> = {
  done: "bg-emerald-500",
  live: "bg-primary",
  upcoming: "bg-muted-foreground/40",
};

export default function ScheduleBoard() {
  return (
    <Card className="border-border/60 overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-sky-400 via-primary to-indigo-500" />
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-primary" />
          Smart Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {scheduleItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.2 }}
              className="rounded-xl border border-border/60 p-3 bg-card/80"
            >
              <div className="flex items-start gap-3">
                <span className={`mt-1 h-2.5 w-2.5 rounded-full ${statusStyle[item.status]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug">{item.title}</p>
                    <Badge variant="outline" className="rounded-full text-[10px] border-border/70">
                      {item.time}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.place}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl border border-border/60 p-3 bg-muted/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              Deadlines
            </p>
            <Button variant="ghost" className="h-7 px-0 text-primary hover:bg-transparent hover:text-primary/80">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-2">
            {deadlines.map((item) => (
              <div key={item.title} className="rounded-xl border border-border/60 p-2.5 bg-background/80">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold">{item.title}</p>
                  <Badge
                    variant={item.priority === "High" ? "destructive" : "secondary"}
                    className="rounded-full text-[10px]"
                  >
                    {item.priority}
                  </Badge>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock3 className="w-3.5 h-3.5" />
                  {item.due}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
