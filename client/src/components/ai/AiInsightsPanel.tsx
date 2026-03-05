import { useMemo } from "react";
import { useStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, TrendingUp, AlertTriangle, Target, Briefcase, Users } from "lucide-react";

interface InsightItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "academic" | "career" | "social";
}

const priorityClass: Record<InsightItem["priority"], string> = {
  high: "bg-red-500 text-white",
  medium: "bg-amber-500 text-white",
  low: "bg-primary text-primary-foreground",
};

const categoryIcon: Record<InsightItem["category"], React.ComponentType<{ className?: string }>> = {
  academic: Target,
  career: Briefcase,
  social: Users,
};

export default function AiInsightsPanel() {
  const { user, announcements, chats } = useStore();

  const insights = useMemo<InsightItem[]>(() => {
    const list: InsightItem[] = [];

    if (user.attendance < 85) {
      list.push({
        id: "attendance-risk",
        title: "Attendance risk detected",
        description: `Your attendance is ${user.attendance}%. Target 90% by attending the next 4 classes without absence.`,
        priority: "high",
        category: "academic",
      });
    } else {
      list.push({
        id: "attendance-good",
        title: "Strong attendance momentum",
        description: `You're at ${user.attendance}% attendance. Maintain this trend for exam eligibility and internal marks.`,
        priority: "low",
        category: "academic",
      });
    }

    if (user.cgpa < 3.7) {
      list.push({
        id: "cgpa-improve",
        title: "CGPA improvement opportunity",
        description: "Focus on 2 weaker subjects this week and complete one revision test per subject.",
        priority: "medium",
        category: "academic",
      });
    } else {
      list.push({
        id: "cgpa-track",
        title: "CGPA performance on track",
        description: `Current CGPA ${user.cgpa}. Add one high-impact mini project to improve placement profile.`,
        priority: "low",
        category: "career",
      });
    }

    const unreadAnnouncements = announcements.filter((a) => !a.isRead).length;
    if (unreadAnnouncements > 0) {
      list.push({
        id: "announcements-pending",
        title: "Unread official updates",
        description: `${unreadAnnouncements} unread announcements available. Review high-priority notices first.`,
        priority: unreadAnnouncements >= 2 ? "high" : "medium",
        category: "academic",
      });
    }

    const unreadMessages = chats.reduce((sum, c) => sum + c.unread, 0);
    if (unreadMessages > 0) {
      list.push({
        id: "messages-pending",
        title: "Active communication pending",
        description: `${unreadMessages} unread messages in your network. Respond to faculty/group threads first.`,
        priority: unreadMessages >= 3 ? "medium" : "low",
        category: "social",
      });
    }

    list.push({
      id: "career-sprint",
      title: "Career readiness sprint",
      description: "Allocate 30 minutes daily for aptitude + resume updates to strengthen placement readiness.",
      priority: "medium",
      category: "career",
    });

    return list.slice(0, 4);
  }, [announcements, chats, user.attendance, user.cgpa]);

  return (
    <Card className="border border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="w-5 h-5 text-primary" />
          AI Insights
          <Badge className="ml-auto bg-primary/10 text-primary border border-primary/20">
            Gemini Ready
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((item) => {
          const Icon = categoryIcon[item.category];
          return (
            <div key={item.id} className="rounded-xl border border-border/60 p-3 bg-card/90">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">{item.title}</p>
                <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${priorityClass[item.priority]}`}>
                  {item.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          );
        })}

        <div className="flex gap-2 pt-1">
          <Button size="sm" className="rounded-full">
            <Sparkles className="w-4 h-4 mr-1" />
            Generate Plan
          </Button>
          <Button size="sm" variant="outline" className="rounded-full border-border/70">
            <TrendingUp className="w-4 h-4 mr-1" />
            Weekly Forecast
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Risk Check
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
