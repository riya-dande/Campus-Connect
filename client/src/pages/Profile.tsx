import { useMemo, useState } from "react";
import { useStore } from "@/store";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DevelopmentPath from "@/components/profile/DevelopmentPath";
import {
  Activity,
  Award,
  Bell,
  BookOpen,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Edit3,
  Flame,
  GraduationCap,
  Lock,
  LogOut,
  MapPin,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
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
  { relation: "Mother", name: "Sudireddy Vedha", occupation: "House Wife", phone: "9849923775" },
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

const activityTimeline = [
  { id: 1, title: "Submitted OS Assignment", time: "2 hours ago", icon: ClipboardCheck, color: "text-green-600" },
  { id: 2, title: "Joined placement prep room", time: "5 hours ago", icon: Users, color: "text-blue-600" },
  { id: 3, title: "Updated internship profile", time: "1 day ago", icon: Award, color: "text-primary" },
  { id: 4, title: "Attended counsellor session", time: "2 days ago", icon: CalendarClock, color: "text-orange-600" },
];

const strengths = ["Problem Solving", "Team Leadership", "Time Management"];
const improvements = ["Communication", "Public Speaking"];

export default function Profile() {
  const { user, logout, achievements } = useStore();
  const [activeTab, setActiveTab] = useState("overview");

  const unlockedCount = useMemo(() => achievements.filter((a) => a.unlocked).length, [achievements]);
  const avgProgress = useMemo(() => {
    if (!achievements.length) return 0;
    const total = achievements.reduce((sum, item) => sum + Math.min(100, Math.round((item.progress / item.maxProgress) * 100)), 0);
    return Math.round(total / achievements.length);
  }, [achievements]);

  const learningStats = [
    { label: "CGPA", value: `${user.cgpa}`, icon: GraduationCap },
    { label: "Attendance", value: `${user.attendance}%`, icon: Activity },
    { label: "Study Streak", value: `${user.streak} days`, icon: Flame },
    { label: "Unlocked Badges", value: `${unlockedCount}`, icon: Award },
  ];

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      <Card className="border border-border/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-sky-500" />
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-background shadow-md">
                <AvatarImage src={user.avatar} className="object-cover" />
                <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.major} | {user.year} | Sem {studentDetails.semester}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">Roll No: {studentDetails.rollNo}</Badge>
                  <Badge variant="secondary">Section: {studentDetails.section}</Badge>
                  <Badge className="bg-green-500/10 text-green-700 border border-green-500/20">{studentDetails.status}</Badge>
                </div>
              </div>
            </div>

            <div className="lg:ml-auto flex flex-wrap gap-2">
              <Button variant="outline" className="rounded-xl gap-2">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="rounded-xl gap-2" onClick={logout}>
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {learningStats.map((stat) => (
              <Card key={stat.label} className="border-border/60">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className="w-4 h-4 text-primary" />
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                  <p className="text-lg font-semibold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-transparent gap-1 border-b border-border/50 rounded-none">
          <TabsTrigger value="overview" className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
          <TabsTrigger value="activity" className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Activity</TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Achievements</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <Card className="border border-border/60 rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-primary" />
                    ERP Student Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Academic Details</h3>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <p className="text-muted-foreground">Batch</p><p className="font-medium">{studentDetails.batch}</p>
                      <p className="text-muted-foreground">Faculty</p><p className="font-medium">{studentDetails.faculty}</p>
                      <p className="text-muted-foreground">Program</p><p className="font-medium">{user.major}</p>
                      <p className="text-muted-foreground">Academic Year</p><p className="font-medium">{studentDetails.academicYear}</p>
                      <p className="text-muted-foreground">Semester</p><p className="font-medium">{studentDetails.semester}</p>
                      <p className="text-muted-foreground">Seat Type</p><p className="font-medium">{studentDetails.seatType}</p>
                      <p className="text-muted-foreground">Admission Date</p><p className="font-medium">{studentDetails.admissionDate}</p>
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <h3 className="text-sm font-semibold mb-2">Personal Details</h3>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      {personalDetails.map((item) => (
                        <div key={item.label} className="contents">
                          <p className="text-muted-foreground">{item.label}</p><p className="font-medium">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <h3 className="text-sm font-semibold mb-2">Guardian Details</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {guardianDetails.map((item) => (
                        <div key={item.relation} className="p-3 rounded-xl bg-muted/30">
                          <p className="font-semibold text-sm">{item.relation}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.occupation}</p>
                          <p className="text-sm font-medium mt-1">{item.phone}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-4 grid md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-border/60">
                      <p className="font-semibold text-sm mb-1">Present Address</p>
                      <p className="text-xs text-muted-foreground">{addressDetails.present}</p>
                    </div>
                    <div className="p-3 rounded-xl border border-border/60">
                      <p className="font-semibold text-sm mb-1">Permanent Address</p>
                      <p className="text-xs text-muted-foreground">{addressDetails.permanent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/60 rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Personal Growth Tracks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DevelopmentPath />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card className="border border-border/60 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-lg">Hostel Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Hostel</span><span className="font-medium">{hostelDetails.hostel}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Room</span><span className="font-medium">{hostelDetails.room}</span></div>
                  <div className="pt-1 border-t border-border/50">
                    <p className="text-muted-foreground text-xs">{hostelDetails.roomType}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/60 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-lg">Strengths and Focus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Strengths</p>
                    <div className="flex flex-wrap gap-2">
                      {strengths.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Improvement Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {improvements.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">Overall profile progress</p>
                    <Progress value={avgProgress} className="h-2" />
                    <p className="text-xs mt-1">{avgProgress}%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card className="border border-border/60 rounded-3xl">
            <CardHeader><CardTitle>Activity Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityTimeline.map((item) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-3 p-3 rounded-xl border border-border/60">
                    <item.icon className={`w-4 h-4 mt-0.5 ${item.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((item) => {
              const pct = Math.min(100, Math.round((item.progress / item.maxProgress) * 100));
              return (
                <Card key={item.id} className="border border-border/60 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{item.title}</p>
                      <Badge variant={item.unlocked ? "default" : "outline"}>{item.rarity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="mt-3">
                      <Progress value={pct} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{pct}% progress</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: User, title: "Edit Profile", desc: "Update personal and academic details" },
              { icon: Bell, title: "Notifications", desc: "Manage app and email alerts" },
              { icon: Lock, title: "Security", desc: "Password and account safety" },
              { icon: ShieldCheck, title: "Privacy", desc: "Control profile visibility" },
            ].map((item) => (
              <button key={item.title} type="button" className="text-left">
                <Card className="border border-border/60 rounded-2xl hover:bg-muted/30 transition-colors">
                  <CardContent className="p-4 flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
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
