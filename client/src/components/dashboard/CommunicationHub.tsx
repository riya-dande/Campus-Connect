import { motion } from "framer-motion";
import { MessageSquare, Hash, Settings, Plus, Video, Phone, Mic, Radio, Users, Eye, Heart, UserCheck, Briefcase, Award, CalendarPlus, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import billboardImage from '@assets/generated_images/futuristic_digital_billboard_on_campus.png';

const groups = [
  { id: 1, name: "Coding Guild", icon: "💻", active: true },
  { id: 2, name: "Design Studio", icon: "🎨", active: false },
  { id: 3, name: "Placement Prep", icon: "💼", active: false },
];

export default function CommunicationHub() {
  const [activeGroup, setActiveGroup] = useState(groups[0].id);
  const [activeTab, setActiveTab] = useState("chat");

  const liveStreams = [
    {
      id: 1,
      title: "Live: OS Study Session",
      streamer: "Prof. Smith",
      viewers: 45,
      category: "Academic",
      thumbnail: billboardImage
    },
    {
      id: 2,
      title: "Campus Tour 2026",
      streamer: "Student Council",
      viewers: 120,
      category: "Campus Life",
      thumbnail: billboardImage
    }
  ];

  return (
    <div className="h-[600px] flex bg-card rounded-2xl overflow-hidden border border-border/50 shadow-xl">
      {/* Sidebar - Servers List */}
      <div className="w-16 bg-muted/30 border-r border-border/50 flex flex-col items-center py-4 gap-4">
        {groups.map((group) => (
          <motion.div
            key={group.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveGroup(group.id)}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center text-xl cursor-pointer transition-all",
              activeGroup === group.id 
                ? "bg-primary text-white rounded-xl" 
                : "bg-background hover:bg-primary/10"
            )}
          >
            {group.icon}
          </motion.div>
        ))}
        <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl border-dashed">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-4 pt-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Voice
              </TabsTrigger>
              <TabsTrigger value="live" className="flex items-center gap-2">
                <Radio className="w-4 h-4" />
                Live
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Support
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 flex flex-col m-0">
            {/* Channel List */}
            <div className="w-48 bg-muted/10 border-r border-border/50 flex flex-col">
              <div className="p-4 font-bold text-sm border-b border-border/50 flex justify-between items-center">
                Channels
                <Settings className="w-4 h-4 text-muted-foreground" />
              </div>
              <ScrollArea className="flex-1 p-2">
                <div className="space-y-1">
                  {['announcements', 'general', 'showcase', 'random'].map((ch) => (
                    <div 
                      key={ch} 
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors",
                        ch === 'general' ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <Hash className="w-4 h-4" />
                      {ch}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-background">
              <div className="p-4 border-b border-border/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-muted-foreground" />
                  <span className="font-bold">general</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  {[
                    { user: "Sarah", text: "Has anyone seen the new Placement post?", time: "12:30 PM" },
                    { user: "Alex", text: "Yeah, just checked it. The Google drive looks interesting!", time: "12:32 PM" },
                    { user: "Me", text: "I'm working on my portfolio for that right now 🚀", time: "12:35 PM" },
                  ].map((msg, i) => (
                    <div key={i} className="flex gap-3 group">
                      <Avatar className="w-10 h-10 ring-2 ring-background">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`} />
                        <AvatarFallback>{msg.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm">{msg.user}</span>
                          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4">
                <div className="bg-muted/30 p-2 rounded-xl flex items-center gap-2 border border-border/50">
                  <Plus className="w-5 h-5 text-muted-foreground ml-2" />
                  <input 
                    className="flex-1 bg-transparent border-none text-sm focus:ring-0 p-2" 
                    placeholder="Message #general"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="voice" className="flex-1 m-0">
            <div className="flex-1 flex flex-col bg-background">
              <div className="p-4 border-b border-border/50">
                <h3 className="font-bold flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Voice Channels
                </h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {[
                    { name: "General", users: 5, muted: false },
                    { name: "Study Session", users: 12, muted: false },
                    { name: "Gaming", users: 8, muted: true }
                  ].map((channel, index) => (
                    <Card key={index} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-3 h-3 rounded-full",
                            channel.muted ? "bg-red-500" : "bg-green-500"
                          )} />
                          <div>
                            <p className="font-medium">{channel.name}</p>
                            <p className="text-sm text-muted-foreground">{channel.users} users</p>
                          </div>
                        </div>
                        <Button size="sm">
                          {channel.muted ? "Unmute" : "Join"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="live" className="flex-1 m-0">
            <div className="flex-1 flex flex-col bg-background">
              <div className="p-4 border-b border-border/50 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  Live Streams
                </h3>
                <Button>
                  <Video className="w-4 h-4 mr-2" />
                  Go Live
                </Button>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {liveStreams.map((stream) => (
                    <Card key={stream.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={stream.thumbnail}
                          alt={stream.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 text-white border-none">
                            <Radio className="w-3 h-3 mr-1" />
                            LIVE
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white text-sm">
                          <Eye className="w-4 h-4" />
                          {stream.viewers}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold mb-1">{stream.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{stream.streamer}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{stream.category}</Badge>
                          <Button size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Watch
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="support" className="flex-1 m-0">
            <div className="flex-1 bg-background p-4 md:p-5 space-y-4 overflow-auto">
              <Card className="p-4 border border-border/50 bg-primary/5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-primary/15 text-primary">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">AI Student Assistant</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ask for attendance recovery plans, exam strategy, and internship profile feedback.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button size="sm" className="rounded-full">Plan Attendance</Button>
                      <Button size="sm" variant="outline" className="rounded-full">Draft Leave Mail</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-4 border border-border/50">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <UserCheck className="w-4 h-4 text-primary" />
                    Student Counsellor
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 rounded-xl bg-muted/30">
                      <p className="font-medium">Dr. Venkata Lalita Parameswari Dantu</p>
                      <p className="text-muted-foreground">Semester 3-2 • Academic Counselling</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30">
                      <p className="font-medium">Dr. Sharada Adepu</p>
                      <p className="text-muted-foreground">Semester 3-1 • Career Counselling</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-border/50">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <CalendarPlus className="w-4 h-4 text-primary" />
                    Leave Support
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 rounded-xl bg-muted/30 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Medical Leave</p>
                        <p className="text-muted-foreground">Draft pending faculty approval</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <Button className="w-full rounded-xl mt-1">Apply New Leave</Button>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      Student Achievements
                    </h3>
                    <Button size="sm" variant="outline" className="rounded-full">Add New</Button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-muted/30 text-sm">
                      <p className="font-medium">Hackathon Finalist</p>
                      <p className="text-muted-foreground">Smart Campus Hackathon • Jan 2026</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 text-sm">
                      <p className="font-medium">Paper Presentation</p>
                      <p className="text-muted-foreground">AI and Vision Symposium • Dec 2025</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Student Internships
                    </h3>
                    <Button size="sm" variant="outline" className="rounded-full">Add New</Button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-muted/30 text-sm">
                      <p className="font-medium">Frontend Intern • CampusConnect Labs</p>
                      <p className="text-muted-foreground">May 2026 - Jul 2026</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 text-sm">
                      <p className="font-medium">No other internships yet</p>
                      <p className="text-muted-foreground">Use AI mentor to improve resume and apply.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
