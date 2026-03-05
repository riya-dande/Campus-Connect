import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen, Calendar, Trophy, TrendingUp, Clock,
  FileText, Users, Star, AlertCircle, CheckCircle,
  Download, Eye, MessageSquare, Video
} from "lucide-react";
import { useStore } from "@/store";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const TASK_CATEGORIES = ["Academic", "Club", "Career"];

// Fix: Add Task type for tasks state
interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

export default function AcademicDashboard() {
  const { user } = useStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [category, setCategory] = useState(TASK_CATEGORIES[0]);
  const [loading, setLoading] = useState(false);

  const grades = [
    { subject: "Operating Systems", grade: "A-", progress: 85, attendance: 92 },
    { subject: "Data Structures", grade: "B+", progress: 78, attendance: 88 },
    { subject: "Algorithms", grade: "A", progress: 92, attendance: 95 },
    { subject: "Database Systems", grade: "A-", progress: 87, attendance: 90 },
  ];

  const assignments = [
    { title: "OS Final Project", due: "Dec 15", status: "pending", priority: "high" },
    { title: "DS Lab Report", due: "Dec 12", status: "submitted", priority: "medium" },
    { title: "Algo Quiz 3", due: "Dec 10", status: "completed", priority: "low" },
  ];

  const schedule = [
    { time: "9:00 AM", subject: "Operating Systems", room: "CS-101", type: "lecture" },
    { time: "11:00 AM", subject: "Data Structures Lab", room: "Lab-203", type: "lab" },
    { time: "2:00 PM", subject: "Algorithms", room: "CS-102", type: "lecture" },
  ];

  // Load tasks from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, category, completed")
        .order("created_at", { ascending: false });
      if (!error && data) setTasks((data as Task[]) || []);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  // Add new task
  const handleAddTask = async () => {
    if (!taskInput.trim()) return;
    await supabase
      .from("tasks")
      .insert([{ title: taskInput, category, completed: false }]);
    setTaskInput("");
    setCategory(TASK_CATEGORIES[0]);
    // Reload tasks
    const { data } = await supabase
      .from("tasks")
      .select("id, title, category, completed")
      .order("created_at", { ascending: false });
    setTasks((data as Task[]) || []);
  };

  // Toggle complete
  const handleToggleTask = async (id: string, completed: boolean) => {
    await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id);
    // Reload tasks
    const { data } = await supabase
      .from("tasks")
      .select("id, title, category, completed")
      .order("created_at", { ascending: false });
    setTasks((data as Task[]) || []);
  };

  return (
    <div className="space-y-6">
      {/* Academic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Trophy className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">GPA</p>
                <p className="text-2xl font-bold">3.7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold">{user.attendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credits</p>
                <p className="text-2xl font-bold">124</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-2xl font-bold">#12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-transparent gap-2 border-b border-border/50 rounded-none mb-6">
          <TabsTrigger value="grades" className="rounded-lg px-4 py-2">Grades</TabsTrigger>
          <TabsTrigger value="assignments" className="rounded-lg px-4 py-2">Assignments</TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-lg px-4 py-2">Schedule</TabsTrigger>
          <TabsTrigger value="resources" className="rounded-lg px-4 py-2">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-4">
          {grades.map((course, index) => (
            <Card key={index} className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{course.subject}</h3>
                    <p className="text-sm text-muted-foreground">Professor Smith</p>
                  </div>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {course.grade}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Attendance</span>
                      <span>{course.attendance}%</span>
                    </div>
                    <Progress value={course.attendance} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          {assignments.map((assignment, index) => (
            <Card key={index} className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground">Due: {assignment.due}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={assignment.status === 'completed' ? 'default' : assignment.status === 'submitted' ? 'secondary' : 'destructive'}
                      className="capitalize"
                    >
                      {assignment.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {assignment.status === 'submitted' && <Clock className="w-3 h-3 mr-1" />}
                      {assignment.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {assignment.status}
                    </Badge>
                    {assignment.status === 'pending' && (
                      <Button size="sm">Submit</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          {schedule.map((class_, index) => (
            <Card key={index} className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{class_.subject}</h3>
                      <p className="text-sm text-muted-foreground">{class_.time} • {class_.room}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {class_.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">Study Materials</h3>
                    <p className="text-sm text-muted-foreground">Notes, PDFs, Videos</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Browse Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Video className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="font-semibold">Recorded Lectures</h3>
                    <p className="text-sm text-muted-foreground">Missed a class? Catch up here</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Watch Lectures
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}