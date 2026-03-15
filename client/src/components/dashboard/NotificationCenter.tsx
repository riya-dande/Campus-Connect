import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CalendarClock, MessageCircleWarning, Sparkles, Siren, MessageSquare } from "lucide-react";

type NotificationLevel = "high" | "medium" | "low";
type FilterKey = "all" | "urgent" | "messages" | "planner";

interface DashboardNotification {
  id: string;
  title: string;
  detail: string;
  level: NotificationLevel;
  source: "Announcement" | "Messages" | "Planner";
}

const levelClass: Record<NotificationLevel, string> = {
  high: "border-red-300/70 bg-gradient-to-r from-red-50 to-white dark:from-red-950/20 dark:to-card",
  medium: "border-amber-300/70 bg-gradient-to-r from-amber-50 to-white dark:from-amber-950/20 dark:to-card",
  low: "border-border/60 bg-card/90",
};

export default function NotificationCenter() {
  const { announcements, chats } = useStore();
  const [filter, setFilter] = useState<FilterKey>("all");

  const notifications = useMemo<DashboardNotification[]>(() => {
    const announcementAlerts = announcements
      .filter((item) => !item.isRead)
      .map<DashboardNotification>((item) => ({
        id: `a-${item.id}`,
        title: item.title,
        detail: `${item.author} | ${item.date}`,
        level: item.priority === "High" ? "high" : item.priority === "Medium" ? "medium" : "low",
        source: "Announcement",
      }));

    const chatAlerts = chats
      .filter((chat) => chat.unread > 0)
      .map<DashboardNotification>((chat) => ({
        id: `c-${chat.id}`,
        title: `${chat.unread} new message${chat.unread > 1 ? "s" : ""} from ${chat.name}`,
        detail: chat.lastMessage,
        level: chat.unread >= 3 ? "high" : "medium",
        source: "Messages",
      }));

    const planningReminder: DashboardNotification = {
      id: "planner-reminder",
      title: "Daily planning check-in",
      detail: "You still have 2 focus blocks to complete today.",
      level: "low",
      source: "Planner",
    };

    return [...announcementAlerts, ...chatAlerts, planningReminder]
      .sort((a, b) => {
        const score: Record<NotificationLevel, number> = { high: 3, medium: 2, low: 1 };
        return score[b.level] - score[a.level];
      })
      .slice(0, 8);
  }, [announcements, chats]);

  const filteredNotifications = useMemo(() => {
    if (filter === "urgent") return notifications.filter((item) => item.level === "high");
    if (filter === "messages") return notifications.filter((item) => item.source === "Messages");
    if (filter === "planner") return notifications.filter((item) => item.source === "Planner");
    return notifications;
  }, [notifications, filter]);

  const urgentCount = notifications.filter((item) => item.level === "high").length;

  return (
    <Card className="border-border/60 overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-sky-400" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notification Center
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-full border-border/70">
              {notifications.length} total
            </Badge>
            {urgentCount > 0 && (
              <Badge className="rounded-full bg-red-500 text-white">
                {urgentCount} urgent
              </Badge>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All", icon: Sparkles },
            { key: "urgent", label: "Urgent", icon: Siren },
            { key: "messages", label: "Messages", icon: MessageSquare },
            { key: "planner", label: "Planner", icon: CalendarClock },
          ].map((option) => (
            <Button
              key={option.key}
              type="button"
              size="sm"
              variant={filter === option.key ? "secondary" : "outline"}
              className="rounded-full border-border/70 text-xs"
              onClick={() => setFilter(option.key as FilterKey)}
              leftIcon={<option.icon className="w-3.5 h-3.5" />}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
            No notifications in this filter.
          </div>
        ) : (
          filteredNotifications.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.2 }}
              className={`rounded-2xl border p-3 ${levelClass[item.level]}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                </div>
                <Badge variant="outline" className="rounded-full text-[10px] border-border/70 shrink-0">
                  {item.source}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                {item.level === "high" ? (
                  <MessageCircleWarning className="w-3.5 h-3.5 text-red-500" />
                ) : item.level === "medium" ? (
                  <CalendarClock className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                )}
                <span className="capitalize">{item.level} priority</span>
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
