import { useStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Announcements from "@/components/dashboard/Announcements";
import CampusFeed from "@/components/dashboard/CampusFeed";
import SkillRadar from "@/components/profile/SkillRadar";
import CommunicationHub from "@/components/dashboard/CommunicationHub";
import AlumniSection from "@/components/dashboard/AlumniSection";
import CampusLifeHub from "@/components/dashboard/CampusLifeHub";
import AcademicDashboard from "@/components/dashboard/AcademicDashboard";
import SocialFeed from "@/components/social/SocialFeed";
import StudyGroups from "@/components/study/StudyGroups";
import EventDiscovery from "@/components/events/EventDiscovery";
import AiInsightsPanel from "@/components/ai/AiInsightsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Trophy, Clock, Target, Lightbulb, Users,
  ArrowRight, MessageCircle, Sparkles,
  GraduationCap, CalendarDays, ListTodo, Plus,
  CheckCircle2, MoreVertical, Layout, Camera, MapPin, Calendar,
  Flame, Zap, Heart, BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Home() {
  const { user } = useStore();
  const [tasks, setTasks] = useState([
    { id: 1, text: "Operating Systems Assignment", done: false, type: "Academic" },
    { id: 2, text: "Hackathon Registration", done: true, type: "Club" },
    { id: 3, text: "Resume Peer Review", done: false, type: "Career" },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false, type: "Personal" }]);
    setNewTask("");
  };

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
            value="social"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-sm whitespace-nowrap"
          >
            <Heart className="w-4 h-4 mr-2" />
            Social
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
                  <div className="flex items-center gap-3">
                    <ListTodo className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">Today's Tasks</CardTitle>
                      <p className="text-sm text-muted-foreground">Stay on track</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={addTask} className="flex gap-2">
                    <Input
                      placeholder="Add a task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </form>
                  <div className="space-y-2">
                    {tasks.map((task) => (
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
                          <Badge variant="outline" className="text-xs mt-1">{task.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <CampusLifeHub />

              {/* Gamification Card */}
              <Card className="border border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Level {user.level}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>XP Progress</span>
                      <span>{user.xp}/{user.xp + user.xpToNext}</span>
                    </div>
                    <Progress value={(user.xp / (user.xp + user.xpToNext)) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>{user.streak} day streak</span>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <p className="text-sm font-medium mb-2">Recent Achievements</p>
                    <div className="space-y-2">
                      {[
                        { icon: "🎯", title: "Task Master", desc: "Completed 5 tasks" },
                        { icon: "🔥", title: "Study Streak", desc: "12 day streak" },
                        { icon: "🎓", title: "Academic Star", desc: "GPA 3.8+" }
                      ].map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="text-lg">{achievement.icon}</span>
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

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

        <TabsContent value="academic" className="mt-0">
          <AcademicDashboard />
        </TabsContent>

        <TabsContent value="social" className="mt-0">
          <SocialFeed />
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
