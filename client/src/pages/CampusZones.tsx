import { useState } from "react";
import { useStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Award,
  Briefcase,
  TrendingUp,
  Clock,
  MapPin,
  GraduationCap,
  FileText,
  Video,
  MessageCircle,
  Star,
  Trophy,
  Target,
  Lightbulb,
  Plus,
  ChevronRight,
  CheckCircle,
  BookMarked,
  Building2,
  Sparkles,
  Dumbbell,
  Heart,
  PartyPopper,
  FlaskConical,
  PenTool
} from "lucide-react";
import { motion } from "framer-motion";

export default function CampusZones() {
  const { user } = useStore();
  const [activeZone, setActiveZone] = useState("academics");

  const courses = [
    { 
      id: "1", 
      name: "Data Structures & Algorithms", 
      code: "CS201", 
      professor: "Dr. Sarah Williams", 
      credits: 4, 
      attendance: 92, 
      grade: "A",
      schedule: "Mon, Wed, Fri - 9:00 AM"
    },
    { 
      id: "2", 
      name: "Database Management Systems", 
      code: "CS301", 
      professor: "Dr. Amit Kumar", 
      credits: 3, 
      attendance: 88, 
      grade: "A-",
      schedule: "Tue, Thu - 11:00 AM"
    },
    { 
      id: "3", 
      name: "Operating Systems", 
      code: "CS302", 
      professor: "Prof. Priya Sharma", 
      credits: 4, 
      attendance: 95, 
      grade: "B+",
      schedule: "Mon, Wed - 2:00 PM"
    },
    { 
      id: "4", 
      name: "Machine Learning", 
      code: "CS401", 
      professor: "Dr. Rahul Verma", 
      credits: 3, 
      attendance: 90, 
      grade: "A",
      schedule: "Tue, Thu - 3:00 PM"
    },
  ];

  const assignments = [
    { id: "1", title: "DSA Project - Graph Implementation", course: "CS201", dueDate: "Mar 15, 2024", status: "pending", marks: 20 },
    { id: "2", title: "Database Design - ER Diagram", course: "CS301", dueDate: "Mar 18, 2024", status: "submitted", marks: 15 },
    { id: "3", title: "OS Lab - Process Scheduling", course: "CS302", dueDate: "Mar 20, 2024", status: "pending", marks: 10 },
    { id: "4", title: "ML Assignment - Neural Networks", course: "CS401", dueDate: "Mar 22, 2024", status: "pending", marks: 25 },
  ];

  const studyGroups = [
    { id: "1", name: "DSA Final Prep", subject: "CS201", members: 12, nextSession: "Tomorrow, 5:00 PM" },
    { id: "2", name: "DBMS Project Team", subject: "CS301", members: 5, nextSession: "Today, 7:00 PM" },
    { id: "3", name: "ML Study Circle", subject: "CS401", members: 8, nextSession: "Fri, 6:00 PM" },
  ];

  const examSchedule = [
    { id: "1", exam: "DSA Midterm", date: "Mar 25, 2024", time: "9:00 AM - 12:00 PM", venue: "Hall A" },
    { id: "2", exam: "DBMS Practical", date: "Mar 28, 2024", time: "2:00 PM - 5:00 PM", venue: "Lab 301" },
    { id: "3", exam: "OS Theory", date: "Apr 1, 2024", time: "9:00 AM - 12:00 PM", venue: "Hall B" },
  ];

  const placements = [
    { id: "1", company: "Google", role: "SDE Intern", date: "Mar 20, 2024", status: "upcoming", applicants: 245 },
    { id: "2", company: "Microsoft", role: "Software Engineer", date: "Mar 25, 2024", status: "upcoming", applicants: 189 },
    { id: "3", company: "Amazon", role: "SDE I", date: "Apr 5, 2024", status: "upcoming", applicants: 312 },
    { id: "4", company: "Meta", role: "Software Engineer", date: "Apr 10, 2024", status: "upcoming", applicants: 156 },
  ];

  const skills = [
    { name: "Data Structures", progress: 85, level: "Advanced" },
    { name: "Algorithms", progress: 80, level: "Advanced" },
    { name: "React", progress: 70, level: "Intermediate" },
    { name: "Node.js", progress: 65, level: "Intermediate" },
    { name: "Python", progress: 90, level: "Advanced" },
  ];

  const clubs = [
    { id: "1", name: "Tech Club", category: "Technical", members: 320, events: 24, myRole: "Member" },
    { id: "2", name: "Cultural Society", category: "Cultural", members: 280, events: 18, myRole: "None" },
    { id: "3", name: "Sports Council", category: "Sports", members: 200, events: 12, myRole: "Captain" },
    { id: "4", name: "Literary Club", category: "Academic", members: 150, events: 8, myRole: "Member" },
    { id: "5", name: "Social Service", category: "Social", members: 180, events: 15, myRole: "Volunteer" },
  ];

  const events = [
    { id: "1", name: "Hackathon 2024", date: "Mar 22-24, 2024", type: "Technical", participants: 150 },
    { id: "2", name: "Cultural Fest", date: "Apr 5-7, 2024", type: "Cultural", participants: 500 },
    { id: "3", name: "Sports Meet", date: "Apr 15-17, 2024", type: "Sports", participants: 300 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campus Zones</h1>
          <p className="text-muted-foreground">Explore academics, placements, and extra-curricular activities</p>
        </div>
      </div>

      {/* Zone Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={`cursor-pointer transition-all ${activeZone === 'academics' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
          onClick={() => setActiveZone("academics")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Academics</h3>
              <p className="text-sm text-muted-foreground">Courses, grades, attendance</p>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground" />
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${activeZone === 'placements' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
          onClick={() => setActiveZone("placements")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Placements</h3>
              <p className="text-sm text-muted-foreground">Jobs, drives, preparation</p>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground" />
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${activeZone === 'extra' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
          onClick={() => setActiveZone("extra")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Extra-Curricular</h3>
              <p className="text-sm text-muted-foreground">Clubs, events, sports</p>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      {/* Academics Zone */}
      {activeZone === "academics" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{user.cgpa}</div>
                <div className="text-sm text-muted-foreground">Current CGPA</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">92%</div>
                <div className="text-sm text-muted-foreground">Avg. Attendance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">4</div>
                <div className="text-sm text-muted-foreground">Active Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">3</div>
                <div className="text-sm text-muted-foreground">Pending Assignments</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Courses */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    My Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold">{course.code.substring(2, 4)}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{course.name}</p>
                          <p className="text-sm text-muted-foreground">{course.professor} • {course.credits} credits</p>
                          <p className="text-xs text-muted-foreground">{course.schedule}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={course.grade.startsWith('A') ? 'default' : 'secondary'}>
                          {course.grade}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{course.attendance}% attendance</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Upcoming Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.course} • {assignment.marks} marks</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={assignment.status === 'submitted' ? 'default' : 'destructive'}>
                          {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{assignment.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Study Groups */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="w-5 h-5 text-primary" />
                    Study Groups
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {studyGroups.map((group) => (
                    <div key={group.id} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{group.name}</p>
                        <Badge variant="outline" className="text-xs">{group.members}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{group.subject}</p>
                      <p className="text-xs text-primary mt-1">{group.nextSession}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Join Group
                  </Button>
                </CardContent>
              </Card>

              {/* Exam Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Exams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {examSchedule.map((exam) => (
                    <div key={exam.id} className="p-3 rounded-lg border">
                      <p className="font-medium text-sm">{exam.exam}</p>
                      <p className="text-xs text-muted-foreground">{exam.date}</p>
                      <p className="text-xs text-muted-foreground">{exam.time} • {exam.venue}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card className="bg-gradient-to-br from-primary/10 to-purple-50 dark:from-primary/20 dark:to-purple-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-sm">📚 Your OS attendance is below 90%. Consider attending more classes to maintain the scholarship criteria.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <p className="text-sm">🎯 DSA Project deadline in 3 days. Start working on graph implementation today!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Placements Zone */}
      {activeZone === "placements" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">8.5</div>
                <div className="text-sm text-muted-foreground">CGPA</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">5</div>
                <div className="text-sm text-muted-foreground">Companies Applied</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">3</div>
                <div className="text-sm text-muted-foreground">Skills Tracked</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">2</div>
                <div className="text-sm text-muted-foreground">Offers Received</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Drives */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Upcoming Placement Drives
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {placements.map((placement) => (
                    <div key={placement.id} className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                          {placement.company.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{placement.company}</p>
                          <p className="text-sm text-muted-foreground">{placement.role}</p>
                          <p className="text-xs text-muted-foreground">{placement.applicants} applicants</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">{placement.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{placement.date}</p>
                        <Button size="sm" className="mt-2">Apply</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Skills Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Target className="w-5 h-5 text-primary" />
                    Skills Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <Badge variant="outline" className="text-xs">{skill.level}</Badge>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Preparation Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Preparation Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm">🎯 Practice at least 3 LeetCode problems daily</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm">📝 Keep your resume updated with latest projects</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm">🎤 Practice mock interviews weekly</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Extra-Curricular Zone */}
      {activeZone === "extra" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">3</div>
                <div className="text-sm text-muted-foreground">Clubs Joined</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">12</div>
                <div className="text-sm text-muted-foreground">Events Attended</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">5</div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">180</div>
                <div className="text-sm text-muted-foreground">Volunteering Hours</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Clubs */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PartyPopper className="w-5 h-5 text-primary" />
                    Campus Clubs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {clubs.map((club) => (
                    <div key={club.id} className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                          {club.category === "Technical" && <FlaskConical className="w-6 h-6" />}
                          {club.category === "Cultural" && <PartyPopper className="w-6 h-6" />}
                          {club.category === "Sports" && <Dumbbell className="w-6 h-6" />}
                          {club.category === "Academic" && <BookMarked className="w-6 h-6" />}
                          {club.category === "Social" && <Heart className="w-6 h-6" />}
                        </div>
                        <div>
                          <p className="font-semibold">{club.name}</p>
                          <p className="text-sm text-muted-foreground">{club.category} • {club.members} members</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={club.myRole !== "None" ? "default" : "secondary"}>
                          {club.myRole !== "None" ? club.myRole : "Join"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{club.events} events</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{event.name}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{event.participants} participants</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* My Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Trophy className="w-5 h-5 text-primary" />
                    My Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="text-sm font-medium">Hackathon Winner</p>
                      <p className="text-xs text-muted-foreground">CodeFest 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <p className="text-sm font-medium">Star Performer</p>
                      <p className="text-xs text-muted-foreground">Tech Club</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-2xl">🎖️</span>
                    <div>
                      <p className="text-sm font-medium">Best Volunteer</p>
                      <p className="text-xs text-muted-foreground">NSS Camp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Club Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PenTool className="w-4 h-4 mr-2" />
                    Register for Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Find Team
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
