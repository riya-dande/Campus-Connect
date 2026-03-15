import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calendarEvents = [
  { id: 1, title: "OS Viva", date: "2026-03-06", time: "10:00 AM", venue: "LH-3", type: "Exam" },
  { id: 2, title: "CVPR Lab", date: "2026-03-07", time: "02:00 PM", venue: "Lab-2", type: "Class" },
  { id: 3, title: "Counsellor Session", date: "2026-03-08", time: "11:30 AM", venue: "Block A", type: "Support" },
  { id: 4, title: "Placement Workshop", date: "2026-03-10", time: "04:00 PM", venue: "Seminar Hall", type: "Career" },
];

function toIsoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function CampusLifeHub() {
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();
  const todayIso = toIsoDate(today);

  const { days, monthLabel } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);

    const leading = start.getDay();
    const totalDays = end.getDate();
    const cells: Array<{ date: Date; inMonth: boolean }> = [];

    for (let i = 0; i < leading; i++) {
      cells.push({ date: new Date(year, month, i - leading + 1), inMonth: false });
    }
    for (let d = 1; d <= totalDays; d++) {
      cells.push({ date: new Date(year, month, d), inMonth: true });
    }
    while (cells.length % 7 !== 0) {
      const nextDay = cells.length - (leading + totalDays) + 1;
      cells.push({ date: new Date(year, month + 1, nextDay), inMonth: false });
    }

    return {
      days: cells,
      monthLabel: viewDate.toLocaleString("en-US", { month: "long", year: "numeric" }),
    };
  }, [viewDate]);

  const monthEvents = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    return calendarEvents.filter((event) => {
      const d = new Date(event.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [viewDate]);

  const eventMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const event of calendarEvents) {
      map.set(event.date, (map.get(event.date) ?? 0) + 1);
    }
    return map;
  }, []);

  return (
    <div className="space-y-4">
      <Card className="p-4 border border-border/60 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-bold">Calendar</h2>
              <p className="text-xs text-muted-foreground">Your month at a glance</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm font-semibold mb-3">{monthLabel}</p>
        <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-muted-foreground mb-2">
          {weekDays.map((day) => (
            <span key={day} className="py-1">{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map(({ date, inMonth }) => {
            const iso = toIsoDate(date);
            const isToday = iso === todayIso;
            const hasEvent = eventMap.has(iso);
            return (
              <motion.div
                key={`${iso}-${inMonth ? "in" : "out"}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "relative h-9 rounded-lg flex items-center justify-center text-xs border",
                  inMonth ? "bg-card border-border/60 text-foreground" : "bg-muted/20 border-border/40 text-muted-foreground/60",
                  isToday && "bg-primary text-white border-primary font-semibold"
                )}
              >
                {date.getDate()}
                {hasEvent && !isToday && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>

      <Card className="p-4 border border-border/60 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Upcoming</h3>
          <Badge variant="outline" className="rounded-full border-border/70">
            {monthEvents.length} this month
          </Badge>
        </div>
        <div className="space-y-2.5">
          {monthEvents.length === 0 ? (
            <div className="p-3 rounded-xl bg-muted/30 text-sm text-muted-foreground">
              No events in this month.
            </div>
          ) : (
            monthEvents.map((event) => (
              <div key={event.id} className="p-3 rounded-xl border border-border/60 bg-card">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{event.title}</p>
                  <Badge variant="secondary" className="rounded-full text-[10px]">
                    {event.type}
                  </Badge>
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" />{event.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.venue}</span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          AI can optimize this schedule based on exams and attendance.
        </div>
      </Card>
    </div>
  );
}
