import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store";
import SkillRadar from "@/components/profile/SkillRadar";
import DevelopmentPath from "@/components/profile/DevelopmentPath";
import { 
  BookOpen, MapPin, Mail, Phone, Award, Sparkles, 
  FileText, CreditCard, Bus, Building2, 
  Download, History, Receipt, ShieldCheck,
  ChevronRight, ClipboardCheck, GraduationCap,
  Edit3, Camera, Settings, Bell, Lock, LogOut,
  TrendingUp, Target, Flame, Zap, Star,
  Calendar, Clock, BookMarked, Trophy, Users,
  Activity, Heart, Brain, Lightbulb, CheckCircle2,
  MoreHorizontal, Share2, Upload, User
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Animation variants for smooth transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Profile() {
  const { user, logout } = useStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Mock activity timeline data
  const activityTimeline = [
    { id: 1, type: "achievement", title: "Unlocked 'Quick Learner' badge", time: "2 hours ago", icon: Trophy, color: "text-yellow-500" },
    { id: 2, type: "study", title: "Completed 3 DSA problems", time: "5 hours ago", icon: Brain, color: "text-blue-500" },
    { id: 3, type: "event", title: "Registered for Hackathon 2024", time: "1 day ago", icon: Calendar, color: "text-purple-500" },
    { id: 4, type: "course", title: "Submitted OS Assignment", time: "2 days ago", icon: BookOpen, color: "text-green-500" },
    { id: 5, type: "social", title: "Connected with 5 new peers", time: "3 days ago", icon: Users, color: "text-pink-500" },
  ];

  // Learning stats
  const learningStats = [
    { label: "Study Streak", value: "12 days", icon: Flame, color: "from-orange-500 to-red-500", progress: 85 },
    { label: "Tasks Done", value: "48/60", icon: CheckCircle2, color: "from-green-500 to-emerald-500", progress: 80 },
    { label: "Hours Learned", value: "156h", icon: Clock, color: "from-blue-500 to-cyan-500", progress: 72 },
    { label: "Current Level", value: "Lv. 12", icon: Zap, color: "from-purple-500 to-pink-500", progress: 65 },
  ];

  // Strengths and improvement areas
  const strengths = ["Problem Solving", "Team Leadership", "Time Management"];
  const improvements = ["Communication", "Public Speaking"];

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Hero Header with Avatar Upload */}
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="relative"
      >
        {/* Cover Gradient */}
        <div className="h-48 md:h-64 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/20 to-indigo-500/30" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
          </div>
          {/* Floating particles effect */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%" 
                }}
                animate={{ 
                  y: [null, "-20px", "0px"],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Profile Info Card */}
        <Card className="mx-4 -mt-20 relative z-10 border-0 shadow-2xl shadow-primary/5 rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                {/* Avatar with Upload Animation */}
                <motion.div 
                  className="relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="relative">
                    <Avatar className="w-28 h-28 md:w-36 md:h-36 border-4 border-background shadow-2xl">
                      <AvatarImage src={user.avatar} className="object-cover" />
                      <AvatarFallback className="text-3xl bg-primary/10">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <motion.label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Camera className="w-4 h-4" />
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        title="Upload profile picture"
                        aria-label="Upload profile picture"
                        onChange={() => setIsUploadingAvatar(true)}
                      />
                    </motion.label>
                    {/* Online indicator */}
                    <motion.div 
                      className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-background"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>

                {/* User Info */}
                <motion.div 
                  className="flex-1 text-center md:text-left"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      Online
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-lg mb-3">{user.major} • {user.year}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <GraduationCap className="w-3 h-3" />
                      CGPA: {user.cgpa}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="w-3 h-3" />
                      Hostel B-304
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Award className="w-3 h-3" />
                      12 Achievements
                    </Badge>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    variant="outline" 
                    className="rounded-xl gap-2 hover:bg-primary/5"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="rounded-xl gap-2 hover:bg-primary/5">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="rounded-xl gap-2 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={logout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>

              {/* Learning Stats Bar */}
              <motion.div 
                className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {learningStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="relative p-4 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/70 transition-colors"
                  >
                    <div className={cn("absolute inset-0 rounded-2xl opacity-10 bg-gradient-to-br", stat.color)} />
                    <div className="relative flex items-center gap-3">
                      <div className={cn("p-2 rounded-xl bg-gradient-to-br", stat.color)}>
                        <stat.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-lg font-bold">{stat.value}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={stat.progress} className="h-1 bg-muted" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-1 mb-6 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "activity", label: "Activity", icon: History },
              { id: "achievements", label: "Achievements", icon: Trophy },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 gap-2",
                  "data-[state=active]:bg-primary data-[state=active]:text-white",
                  "data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25",
                  "hover:bg-muted/50"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Personal Insights Card */}
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <Card className="border-none shadow-lg shadow-primary/5 rounded-3xl overflow-hidden">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <Lightbulb className="w-5 h-5 text-yellow-500" />
                          Personalized Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Strengths */}
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            Your Strengths
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {strengths.map((strength, i) => (
                              <motion.div
                                key={strength}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2 gap-1">
                                  <Star className="w-3 h-3 fill-current" />
                                  {strength}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Areas to Improve */}
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-orange-500" />
                            Areas to Improve
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {improvements.map((area, i) => (
                              <motion.div
                                key={area}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                              >
                                <Badge variant="outline" className="px-4 py-2 gap-1 border-orange-200 text-orange-600">
                                  <Heart className="w-3 h-3" />
                                  {area}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Daily Tip */}
                        <motion.div
                          className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/10"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/20 rounded-xl">
                              <Brain className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">Daily Insight</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                You're 85% through your study streak! Complete 2 more problems to maintain your record and earn the "Consistency Champion" badge.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <Card className="border-none shadow-lg shadow-primary/5 rounded-3xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <Zap className="w-5 h-5 text-primary" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { icon: BookOpen, label: "View Courses", color: "bg-blue-500" },
                            { icon: Calendar, label: "Schedule", color: "bg-purple-500" },
                            { icon: FileText, label: "Assignments", color: "bg-orange-500" },
                            { icon: Award, label: "Badges", color: "bg-yellow-500" },
                          ].map((action, i) => (
                            <motion.button
                              key={action.label}
                              variants={itemVariants}
                              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all group"
                              whileHover={{ y: -4 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className={cn("p-3 rounded-xl text-white", action.color, "group-hover:scale-110 transition-transform")}>
                                <action.icon className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-medium">{action.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Development Path */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="border-none shadow-lg shadow-primary/5 rounded-3xl overflow-hidden">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 bg-primary/10 rounded-2xl">
                            <Sparkles className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold">Personal Growth Tracks</h2>
                            <p className="text-sm text-muted-foreground">Your journey through campus life</p>
                          </div>
                        </div>
                        <DevelopmentPath />
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Skill Radar */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="border-none shadow-lg shadow-primary/5 rounded-3xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Target className="w-5 h-5 text-primary" />
                          Skills Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SkillRadar />
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Recent Achievements */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="border-none shadow-lg shadow-primary/5 rounded-3xl overflow-hidden">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                          Recent Achievements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { name: 'Quick Learner', icon: '🎯', desc: 'Complete 10 lessons', time: '2h ago' },
                          { name: 'Streak Master', icon: '🔥', desc: '7 day streak', time: '1d ago' },
                          { name: 'Team Player', icon: '🤝', desc: 'Join 3 groups', time: '2d ago' },
                        ].map((achievement, i) => (
                          <motion.div
                            key={achievement.name}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg shadow-lg">
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold">{achievement.name}</p>
                              <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{achievement.time}</span>
                          </motion.div>
                        ))}
                        <Button variant="ghost" className="w-full text-primary text-sm font-medium">
                          View All Achievements
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-none shadow-lg shadow-primary/5 rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Activity Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-muted" />
                    
                    {/* Timeline items */}
                    <div className="space-y-6">
                      {activityTimeline.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative flex items-start gap-4 pl-4"
                        >
                          {/* Timeline dot */}
                          <motion.div
                            className={cn("relative z-10 w-12 h-12 rounded-full flex items-center justify-center", item.color)}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                          >
                            <item.icon className="w-5 h-5" />
                          </motion.div>
                          
                          {/* Content */}
                          <div className="flex-1 pt-2">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.time}</p>
                          </div>
                          
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 rounded-xl">Load More Activity</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'First Steps', desc: 'Complete your first task', icon: '🎯', rarity: 'common', unlocked: true },
                  { name: 'Study Streak', desc: 'Maintain a 7-day streak', icon: '🔥', rarity: 'rare', unlocked: true },
                  { name: 'Social Butterfly', desc: 'Connect with 50 peers', icon: '🦋', rarity: 'epic', unlocked: false, progress: 46 },
                  { name: 'Academic Excellence', desc: 'Achieve GPA above 3.8', icon: '🎓', rarity: 'legendary', unlocked: true },
                  { name: 'Event Explorer', desc: 'Attend 10 events', icon: '🎪', rarity: 'rare', unlocked: false, progress: 70 },
                  { name: 'Code Master', desc: 'Solve 100 problems', icon: '💻', rarity: 'epic', unlocked: false, progress: 32 },
                ].map((badge, i) => (
                  <motion.div
                    key={badge.name}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className={cn(
                      "rounded-3xl overflow-hidden transition-all hover:shadow-xl",
                      !badge.unlocked && "opacity-60"
                    )}>
                      <CardContent className="p-6 text-center">
                        <motion.div
                          className={cn(
                            "w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-4",
                            badge.unlocked 
                              ? badge.rarity === 'legendary' 
                                ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-lg shadow-orange-500/30' 
                                : badge.rarity === 'epic'
                                ? 'bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30'
                                : badge.rarity === 'rare'
                                ? 'bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/30'
                                : 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30'
                              : 'bg-muted'
                          )}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {badge.icon}
                        </motion.div>
                        <h3 className="font-bold text-lg">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{badge.desc}</p>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "mt-3 text-xs",
                            badge.rarity === 'legendary' && 'border-yellow-500 text-yellow-600',
                            badge.rarity === 'epic' && 'border-purple-500 text-purple-600',
                            badge.rarity === 'rare' && 'border-blue-500 text-blue-600',
                            badge.rarity === 'common' && 'border-green-500 text-green-600'
                          )}
                        >
                          {badge.rarity}
                        </Badge>
                        {!badge.unlocked && badge.progress && (
                          <div className="mt-3">
                            <Progress value={badge.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">{badge.progress}% complete</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Settings */}
                <Card className="rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { icon: User, label: 'Edit Profile', desc: 'Update your personal information' },
                      { icon: Bell, label: 'Notifications', desc: 'Manage notification preferences' },
                      { icon: Lock, label: 'Security', desc: 'Password and security settings' },
                      { icon: Mail, label: 'Email Preferences', desc: 'Manage email notifications' },
                    ].map((setting, i) => (
                      <motion.button
                        key={setting.label}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors text-left"
                      >
                        <div className="p-2 bg-primary/10 rounded-xl">
                          <setting.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{setting.label}</p>
                          <p className="text-sm text-muted-foreground">{setting.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </motion.button>
                    ))}
                  </CardContent>
                </Card>

                {/* Support & About */}
                <Card className="rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      Support & About
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { icon: BookMarked, label: 'Help Center', desc: 'Get help and support' },
                      { icon: FileText, label: 'Terms of Service', desc: 'Read our terms' },
                      { icon: ShieldCheck, label: 'Privacy Policy', desc: 'How we handle your data' },
                      { icon: LogOut, label: 'Sign Out', desc: 'Log out of your account', danger: true },
                    ].map((setting, i) => (
                      <motion.button
                        key={setting.label}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={setting.label === 'Sign Out' ? logout : undefined}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors text-left",
                          setting.danger && "hover:bg-red-50 text-red-500"
                        )}
                      >
                        <div className={cn("p-2 rounded-xl", setting.danger ? "bg-red-100" : "bg-primary/10")}>
                          <setting.icon className={cn("w-5 h-5", setting.danger ? "text-red-500" : "text-primary")} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{setting.label}</p>
                          <p className="text-sm text-muted-foreground">{setting.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </motion.button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  );
}


