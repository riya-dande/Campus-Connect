import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DevelopmentPath from "@/components/profile/DevelopmentPath";
import SkillRadar from "@/components/profile/SkillRadar";
import {
  Activity,
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Edit3,
  Flame,
  GraduationCap,
  Home,
  Lock,
  LogOut,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  UserCircle2,
  Users,
} from "lucide-react";

const studentDetails = {
  rollNo: "23251A05T0",
  section: "Section D",
  batch: "Engineering 2023-2027",
  faculty: "Bachelor Of Technology",
  academicYear: "2025-2026",
  semester: "3-2",
  seatType: "Full Reimbursement",
  admissionDate: "28-08-2023",
  status: "Continue",
};

const personalDetails = [
  { label: "Date of Birth", value: "21-11-2005" },
  { label: "Mother Tongue", value: "Telugu" },
  { label: "Blood Group", value: "O-" },
  { label: "Category", value: "OC" },
  { label: "Religion", value: "N/A" },
];

const guardianDetails = [
  { relation: "Father", name: "Sudireddy Madhukar Reddy", occupation: "Agriculture", phone: "9553327732" },
  { relation: "Mother", name: "Sudireddy Vedha", occupation: "Home Maker", phone: "9849923775" },
];

const addressDetails = {
  present: "1-11 Laxmidevi Pally, Gangadhara, Karimnagar, Telangana 505445",
  permanent: "1-11 Laxmidevi Pally, Gangadhara, Karimnagar, Telangana 505445",
};

const hostelDetails = {
  hostel: "H2",
  room: "317",
  roomType: "A/C with Attached Toilets",
};

const timeline = [
  { id: 1, title: "Submitted OS Assignment", time: "2 hours ago", icon: ClipboardList },
  { id: 2, title: "Joined placement prep room", time: "5 hours ago", icon: Users },
  { id: 3, title: "Updated internship profile", time: "1 day ago", icon: Award },
  { id: 4, title: "Attended counsellor session", time: "2 days ago", icon: CalendarDays },
];

const strengths = ["Problem Solving", "Team Leadership", "Time Management"];
const improvements = ["Communication", "Public Speaking"];

export default function Profile() {
  const { user, logout, achievements } = useStore();
  const [activeTab, setActiveTab] = useState("overview");

  const unlockedCount = useMemo(() => achievements.filter((a) => a.unlocked).length, [achievements]);
  const avgProgress = useMemo(() => {
    if (!achievements.length) return 0;
    const total = achievements.reduce((sum, a) => sum + Math.min(100, Math.round((a.progress / a.maxProgress) * 100)), 0);
    return Math.round(total / achievements.length);
  }, [achievements]);

  const topStats = [
    { label: "CGPA", value: `${user.cgpa}`, icon: GraduationCap },
    { label: "Attendance", value: `${user.attendance}%`, icon: Activity },
    { label: "Study Streak", value: `${user.streak} days`, icon: Flame },
    { label: "Unlocked Badges", value: `${unlockedCount}`, icon: Award },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-20">
      <Card className="overflow-hidden rounded-3xl border border-border/60 shadow-sm">
        <div className="h-28 bg-gradient-to-r from-primary/20 via-indigo-500/15 to-sky-500/15" />
        <CardContent className="relative p-6 md:p-8">
          <div className="-mt-16 flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className="flex flex-1 items-center gap-4">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold md:text-3xl">{user.name}</h1>
                <p className="text-sm text-muted-foreground md:text-base">
                  {user.major} | {user.year} | Semester {studentDetails.semester}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">Roll No: {studentDetails.rollNo}</Badge>
                  <Badge variant="secondary">Section: {studentDetails.section}</Badge>
                  <Badge className="border border-green-500/20 bg-green-500/10 text-green-700">{studentDetails.status}</Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2 rounded-xl">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="gap-2 rounded-xl" onClick={logout}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {topStats.map((item) => (
              <Card key={item.label} className="border-border/60">
                <CardContent className="p-3">
                  <p className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </p>
                  <p className="text-lg font-semibold">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto rounded-2xl border border-border/60 bg-card p-1.5">
          <TabsTrigger value="overview" className="rounded-xl px-4 py-2 text-sm">Overview</TabsTrigger>
          <TabsTrigger value="progress" className="rounded-xl px-4 py-2 text-sm">Progress</TabsTrigger>
          <TabsTrigger value="activity" className="rounded-xl px-4 py-2 text-sm">Activity</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl px-4 py-2 text-sm">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="space-y-6 xl:col-span-8">
              <Card className="rounded-3xl border border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Academic and ERP Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-2 text-sm md:grid-cols-2">
                    <p className="text-muted-foreground">Batch</p><p className="font-medium">{studentDetails.batch}</p>
                    <p className="text-muted-foreground">Faculty</p><p className="font-medium">{studentDetails.faculty}</p>
                    <p className="text-muted-foreground">Program</p><p className="font-medium">{user.major}</p>
                    <p className="text-muted-foreground">Academic Year</p><p className="font-medium">{studentDetails.academicYear}</p>
                    <p className="text-muted-foreground">Semester</p><p className="font-medium">{studentDetails.semester}</p>
                    <p className="text-muted-foreground">Seat Type</p><p className="font-medium">{studentDetails.seatType}</p>
                    <p className="text-muted-foreground">Admission Date</p><p className="font-medium">{studentDetails.admissionDate}</p>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <h3 className="mb-2 text-sm font-semibold">Personal Details</h3>
                    <div className="grid gap-2 text-sm md:grid-cols-2">
                      {personalDetails.map((item) => (
                        <div key={item.label} className="contents">
                          <p className="text-muted-foreground">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Parent and Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    {guardianDetails.map((g) => (
                      <div key={g.relation} className="rounded-xl border border-border/60 bg-muted/20 p-3">
                        <p className="text-sm font-semibold">{g.relation}</p>
                        <p className="text-sm text-muted-foreground">{g.name}</p>
                        <p className="text-xs text-muted-foreground">{g.occupation}</p>
                        <p className="mt-1 flex items-center gap-1 text-sm font-medium">
                          <Phone className="h-3.5 w-3.5 text-primary" />
                          {g.phone}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-border/60 p-3">
                      <p className="mb-1 flex items-center gap-2 text-sm font-semibold">
                        <Home className="h-4 w-4 text-primary" />
                        Present Address
                      </p>
                      <p className="text-xs text-muted-foreground">{addressDetails.present}</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-3">
                      <p className="mb-1 flex items-center gap-2 text-sm font-semibold">
                        <Home className="h-4 w-4 text-primary" />
                        Permanent Address
                      </p>
                      <p className="text-xs text-muted-foreground">{addressDetails.permanent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 xl:col-span-4">
              <Card className="rounded-3xl border border-border/60">
                <CardHeader>
                  <CardTitle className="text-lg">Hostel Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Hostel</span><span className="font-medium">{hostelDetails.hostel}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Room</span><span className="font-medium">{hostelDetails.room}</span></div>
                  <div className="border-t border-border/50 pt-2">
                    <p className="text-xs text-muted-foreground">{hostelDetails.roomType}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-border/60">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs text-muted-foreground">Overall completion</p>
                    <Progress value={avgProgress} className="h-2" />
                    <p className="mt-1 text-xs font-medium">{avgProgress}%</p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-muted-foreground">Strengths</p>
                    <div className="flex flex-wrap gap-2">
                      {strengths.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-muted-foreground">Improvement Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {improvements.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-border/60">
                <CardHeader>
                  <CardTitle className="text-lg">Student Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="flex items-center gap-2"><UserCircle2 className="h-4 w-4 text-primary" /> {user.name}</p>
                  <p className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> {user.major}</p>
                  <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" /> {studentDetails.academicYear}</p>
                  <p className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> {studentDetails.status}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-6 space-y-6">
          <Card className="rounded-3xl border border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Skills and Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card className="border-border/60 bg-muted/20">
                  <SkillRadar />
                </Card>
                <div className="rounded-2xl border border-border/60 p-4">
                  <p className="mb-2 text-sm font-semibold">Growth Insight</p>
                  <p className="text-sm text-muted-foreground">
                    You are strongest in technical depth and consistency. Prioritize communication and public speaking
                    this semester to improve interview confidence and team visibility.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">Academic Strength</p>
                      <Progress value={86} className="h-2" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">Professional Readiness</p>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">Communication Confidence</p>
                      <Progress value={61} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-border/60">
            <CardHeader>
              <CardTitle>Development Path</CardTitle>
            </CardHeader>
            <CardContent>
              <DevelopmentPath />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card className="rounded-3xl border border-border/60">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timeline.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 rounded-xl border border-border/60 p-3"
                >
                  <item.icon className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: User, title: "Edit Profile", desc: "Update personal and academic details" },
              { icon: Bell, title: "Notifications", desc: "Manage app and email alerts" },
              { icon: Lock, title: "Security", desc: "Password and account safety" },
              { icon: ShieldCheck, title: "Privacy", desc: "Control profile visibility" },
            ].map((item) => (
              <button key={item.title} type="button" className="text-left">
                <Card className="rounded-2xl border border-border/60 transition-colors hover:bg-muted/30">
                  <CardContent className="flex items-center gap-3 p-4">
                    <item.icon className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
