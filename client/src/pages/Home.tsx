import { useStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Announcements from "@/components/dashboard/Announcements";
import CampusFeed from "@/components/dashboard/CampusFeed";
import SkillRadar from "@/components/profile/SkillRadar";
import CommunicationHub from "@/components/dashboard/CommunicationHub";
import AlumniSection from "@/components/dashboard/AlumniSection";
import CampusLifeHub from "@/components/dashboard/CampusLifeHub";
import AcademicDashboard from "@/components/dashboard/AcademicDashboard";
import StudyGroups from "@/components/study/StudyGroups";
import EventDiscovery from "@/components/events/EventDiscovery";
import AiInsightsPanel from "@/components/ai/AiInsightsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Clock, Target, Lightbulb, Users,
  ArrowRight, MessageCircle, Sparkles,
  GraduationCap, CalendarDays, ListTodo, Plus,
  CheckCircle2, MoreVertical, Layout, Camera, MapPin, Calendar,
  Zap, BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useStore();
  const todayIso = new Date().toLocaleDateString("en-CA");
  const priorityOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 };
  const priorityStyles: Record<string, string> = {
    High: "border-rose-200 text-rose-700 bg-rose-50",
    Medium: "border-amber-200 text-amber-700 bg-amber-50",
    Low: "border-emerald-200 text-emerald-700 bg-emerald-50",
  };
  const [tasks, setTasks] = useState<Array<{
    id: string;
    text: string;
    done: boolean;
    type: string;
    date: string;
    time: string;
    priority: string;
  }>>([]);
  const [tasksError, setTasksError] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(todayIso);
  const [newTaskTime, setNewTaskTime] = useState("09:00");
  const [newTaskTag, setNewTaskTag] = useState("Personal");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  const toUiTask = (task: {
    id: string;
    title: string;
    tag: string | null;
    priority: string | null;
    due_at: string | null;
    is_done: boolean;
  }) => {
    const due = task.due_at ? new Date(task.due_at) : null;
    return {
      id: task.id,
      text: task.title,
      done: Boolean(task.is_done),
      type: task.tag ?? "Personal",
      date: due ? due.toLocaleDateString("en-CA") : todayIso,
      time: due ? due.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "09:00",
      priority: task.priority ?? "Medium",
    };
  };

  const loadTasks = async () => {
    const token = localStorage.getItem("campusconnect_token");
    if (!token) return;
    setTasksError("");
    const res = await fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => null);
      setTasksError(payload?.message ?? "Unable to load tasks.");
      return;
    }
    const payload = await res.json().catch(() => ({ tasks: [] }));
    const nextTasks = (payload?.tasks ?? []).map(toUiTask);
    setTasks(nextTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleTask = async (id: string) => {
    const token = localStorage.getItem("campusconnect_token");
    if (!token) return;
    const current = tasks.find((t) => t.id === id);
    if (!current) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ is_done: !current.done }),
    });
    if (!res.ok) {
      setTasks(tasks.map(t => t.id === id ? { ...t, done: current.done } : t));
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    if (!newTaskDate || !newTaskTime || !newTaskTag.trim()) return;
    const token = localStorage.getItem("campusconnect_token");
    if (!token) return;
    const dueAt = new Date(`${newTaskDate}T${newTaskTime}:00`).toISOString();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newTask.trim(),
        tag: newTaskTag.trim(),
        priority: newTaskPriority,
        due_at: dueAt,
      }),
    });
    if (res.ok) {
      const payload = await res.json().catch(() => null);
      if (payload?.task) {
        setTasks([...tasks, toUiTask(payload.task)]);
      } else {
        await loadTasks();
      }
    }
    setNewTask("");
    setNewTaskTag("Personal");
    setNewTaskPriority("Medium");
    setIsTaskDialogOpen(false);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    const timeCompare = a.time.localeCompare(b.time);
    if (timeCompare !== 0) return timeCompare;
    return (priorityOrder[a.priority] ?? 1) - (priorityOrder[b.priority] ?? 1);
  });

  return (
    <div className="space-y-6">
      {/* Clean Header */}
      <section className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {user.major} • {user.year} • Sem 3-2
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Good morning, <span className="text-primary">{user.name.split(' ')[0]}</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Next class: Advanced Algorithms at 10:00 AM
          </p>
        </div>

        <div className="flex gap-3">
          <Card className="flex items-center gap-3 p-4 border border-border/50 bg-white">
            <GraduationCap className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">CGPA</p>
              <p className="font-bold text-lg">{user.cgpa}</p>
            </div>
          </Card>

          <Card className="flex items-center gap-3 p-4 border border-border/50">
            <Zap className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Streak</p>
              <p className="font-bold text-lg">12 Days</p>
            </div>
          </Card>

          <Card className="flex items-center gap-3 p-4 border border-border/50">
            <Clock className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Attendance</p>
              <p className="font-bold text-lg text-emerald-600">{user.attendance}%</p>
            </div>
          </Card>
        </div>
      </section>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-transparent gap-1 border-b border-border/50 rounded-none mb-6 overflow-x-auto">
          <TabsTrigger
            value="overview"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-sm whitespace-nowrap"
          >
            <Layout className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="academic"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-sm whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Academic
          </TabsTrigger>
          <TabsTrigger
            value="connect"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-sm whitespace-nowrap"
          >
            <Users className="w-4 h-4 mr-2" />
            Connect
          </TabsTrigger>
          <TabsTrigger
            value="study"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-sm whitespace-nowrap"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Study
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-sm whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Announcements />
              <AiInsightsPanel />

              {/* Simplified Tasks */}
              <Card className="border border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <ListTodo className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <CardTitle className="text-lg">Today's Tasks</CardTitle>
                      <p className="text-sm text-muted-foreground">Stay on track</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="h-9 w-9 rounded-full"
                      onClick={() => setIsTaskDialogOpen(true)}
                      aria-label="Add task"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {tasksError && (
                      <p className="text-xs text-destructive">{tasksError}</p>
                    )}
                    {sortedTasks.map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50",
                          task.done && "opacity-60"
                        )}
                        onClick={() => toggleTask(task.id)}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded border-2 flex items-center justify-center",
                          task.done ? "bg-primary border-primary" : "border-muted-foreground/30"
                        )}>
                          {task.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={cn("text-sm", task.done && "line-through")}>{task.text}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-xs">{task.type}</Badge>
                            <Badge variant="outline" className={cn("text-xs", priorityStyles[task.priority] ?? "")}>
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.date} • {task.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <CampusLifeHub tasks={tasks} />

              <Card className="border border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Semester 6</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>OS Finals Prep</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create task</DialogTitle>
              <DialogDescription>Add a task with deadline, tag, and priority.</DialogDescription>
            </DialogHeader>
            <form onSubmit={addTask} className="space-y-4">
              <Input
                placeholder="Task title"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  type="date"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                />
                <Input
                  type="time"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Custom tag"
                  value={newTaskTag}
                  onChange={(e) => setNewTaskTag(e.target.value)}
                />
                <Select value={newTaskPriority} onValueChange={setNewTaskPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add task</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <TabsContent value="academic" className="mt-0">
          <AcademicDashboard />
        </TabsContent>


        <TabsContent value="connect" className="mt-0">
          <CommunicationHub />
        </TabsContent>

        <TabsContent value="study" className="mt-0">
          <StudyGroups />
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <EventDiscovery />
        </TabsContent>
      </Tabs>
    </div>
  );
}

