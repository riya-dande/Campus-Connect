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

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "@/lib/utils";

interface LocalTask {
  id: number;
  text: string;
  done: boolean;
  type: string;
}

const TASK_TYPES = [
  "Academic",
  "Club",
  "Career",
  "Personal",
  "Placement",
  "Exam",
  "Project",
  "Event",
  "Other"
];

const eventDates = [
  new Date(2026, 2, 2),
  new Date(2026, 2, 4),
  new Date(2026, 2, 6),
  new Date(2026, 2, 8)
];

export default function Home() {
  const { user } = useStore();

  const [tasks, setTasks] = useState<LocalTask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskType, setTaskType] = useState(TASK_TYPES[0]);

  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);

      const { data } = await supabase
        .from("tasks")
        .select("id, title, category, completed");

      if (data) {
        setTasks(
          data.map((t: any) => ({
            id: t.id,
            text: t.title,
            done: t.completed,
            type: t.category
          }))
        );
      }

      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e: any) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    await supabase
      .from("tasks")
      .insert([{ title: newTask, category: taskType, completed: false }]);
    setNewTask("");
    const { data } = await supabase
      .from("tasks")
      .select("id, title, category, completed");
    if (data) {
      setTasks(
        data.map((t: any) => ({
          id: t.id,
          text: t.title,
          done: t.completed,
          type: t.category
        }))
      );
    }
  };

  const toggleTask = async (id: number, done: boolean) => {
    await supabase
      .from("tasks")
      .update({ completed: !done })
      .eq("id", id);

    setTasks(tasks.map(t => t.id === id ? { ...t, done: !done } : t));
  };

  const deleteTask = async (id: number) => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
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

        <TabsContent value="overview">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              <Announcements />

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-primary" />
                    Today's Tasks
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                  <form onSubmit={handleAddTask} className="flex gap-2">
                    <Input
                      placeholder="Add task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                    <select
                      value={taskType}
                      onChange={e => setTaskType(e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {TASK_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <button className="bg-purple-600 text-white px-4 rounded">
                      +
                    </button>
                  </form>

                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="task-list">
                      {tasks.map((task) => (
                        <div key={task.id} className="task-item" style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id, task.done)}
                            style={{ marginRight: 12 }}
                          />
                          <span
                            style={{
                              textDecoration: task.done ? "line-through" : "none",
                              opacity: task.done ? 0.5 : 1,
                              marginRight: 12,
                              fontSize: 18
                            }}
                          >
                            {task.text}
                          </span>
                          <div style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            padding: "2px 12px",
                            background: "#f9fafb",
                            marginLeft: 8,
                            marginRight: 8,
                            minWidth: 80,
                            textAlign: "center",
                            fontWeight: 500,
                            color: "#6d28d9"
                          }}>
                            {task.type}
                          </div>
                          {task.done && (
                            <button
                              onClick={() => deleteTask(task.id)}
                              style={{ marginLeft: 12, background: "none", border: "none", color: "#a855f7", fontSize: 20, cursor: "pointer" }}
                              aria-label="Delete task"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                </CardContent>
              </Card>

            </div>


            {/* RIGHT SIDEBAR */}

            <div className="space-y-6">

              {/* CALENDAR */}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    Calendar
                  </CardTitle>

                  <p className="text-sm text-muted-foreground">
                    Your month at a glance
                  </p>
                </CardHeader>

                <CardContent className="flex flex-col items-center">
                  <div className="w-full max-w-[280px]">
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      showOutsideDays
                      className="calendar-ui"
                      modifiers={{
                        event: eventDates
                      }}
                      modifiersClassNames={{
                        event: "event-dot"
                      }}
                    />
                  </div>
                  {date && (
                    <p className="text-sm text-muted-foreground mt-3">
                      Selected: {date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                      })}
                    </p>
                  )}
                </CardContent>
              </Card>


              <CampusLifeHub />

              {/* LEVEL */}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Level {user.level}
                  </CardTitle>
                </CardHeader>

                <CardContent>

                  <div className="flex justify-between text-sm mb-2">
                    <span>XP Progress</span>
                    <span>{user.xp}/{user.xp + user.xpToNext}</span>
                  </div>

                  <Progress value={(user.xp/(user.xp+user.xpToNext))*100}/>

                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <Flame className="w-4 h-4 text-orange-500"/>
                    {user.streak} day streak
                  </div>

                </CardContent>
              </Card>


              {/* PROGRESS */}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary"/>
                    Progress
                  </CardTitle>
                </CardHeader>

                <CardContent>

                  <div className="flex justify-between text-sm mb-2">
                    <span>Semester 6</span>
                    <span>72%</span>
                  </div>

                  <Progress value={72}/>

                </CardContent>
              </Card>

            </div>

          </div>

        </TabsContent>

        <TabsContent value="academic">
          <AcademicDashboard/>
        </TabsContent>

        <TabsContent value="social">
          <SocialFeed/>
        </TabsContent>
        <TabsContent value="connect" className="mt-0">
          <CommunicationHub />
        </TabsContent>
        <TabsContent value="study">
          <StudyGroups/>
        </TabsContent>

        <TabsContent value="events">
          <EventDiscovery/>
        </TabsContent>

      </Tabs>

    </div>
  );
}