import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, MessageSquare, Video, FileText, Calendar,
  Plus, Search, BookOpen, Brain, Target, Clock,
  Star, Trophy, Zap, Lightbulb
} from "lucide-react";
import { useState } from "react";

export default function StudyGroups() {
  const [searchQuery, setSearchQuery] = useState("");

  const studyGroups = [
    {
      id: 1,
      name: "Operating Systems Study Circle",
      subject: "CS 301",
      members: 12,
      active: true,
      nextSession: "Today 3:00 PM",
      description: "Weekly problem-solving sessions and mock exams",
      tags: ["OS", "Systems", "Practice"],
      rating: 4.8
    },
    {
      id: 2,
      name: "Data Structures & Algorithms",
      subject: "CS 201",
      members: 28,
      active: true,
      nextSession: "Tomorrow 2:00 PM",
      description: "Daily coding challenges and algorithm discussions",
      tags: ["DSA", "Coding", "Algorithms"],
      rating: 4.9
    },
    {
      id: 3,
      name: "Database Design Group",
      subject: "CS 401",
      members: 15,
      active: false,
      nextSession: "Next Week",
      description: "SQL queries, normalization, and system design",
      tags: ["Database", "SQL", "Design"],
      rating: 4.6
    }
  ];

  const upcomingSessions = [
    {
      group: "OS Study Circle",
      topic: "Memory Management",
      time: "Today 3:00 PM",
      attendees: 8,
      type: "live"
    },
    {
      group: "DSA Group",
      topic: "Dynamic Programming",
      time: "Tomorrow 2:00 PM",
      attendees: 15,
      type: "discussion"
    }
  ];

  const resources = [
    { title: "OS Memory Management Notes", type: "PDF", downloads: 45, rating: 4.7 },
    { title: "DSA Problem Set", type: "Document", downloads: 78, rating: 4.9 },
    { title: "Database Schema Examples", type: "Code", downloads: 32, rating: 4.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Search and Create */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search study groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-transparent gap-2 border-b border-border/50 rounded-none mb-6">
          <TabsTrigger value="groups" className="rounded-lg px-4 py-2">Study Groups</TabsTrigger>
          <TabsTrigger value="sessions" className="rounded-lg px-4 py-2">Live Sessions</TabsTrigger>
          <TabsTrigger value="resources" className="rounded-lg px-4 py-2">Resources</TabsTrigger>
          <TabsTrigger value="leaderboard" className="rounded-lg px-4 py-2">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyGroups.map((group) => (
              <Card key={group.id} className="border border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex items-center gap-2">
                        {group.active && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {group.subject}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{group.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{group.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {group.members}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {group.nextSession}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {group.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Join Group
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          {upcomingSessions.map((session, index) => (
            <Card key={index} className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{session.topic}</h3>
                    <p className="text-sm text-muted-foreground">{session.group}</p>
                  </div>
                  <Badge variant={session.type === 'live' ? 'default' : 'secondary'}>
                    {session.type === 'live' ? (
                      <>
                        <Video className="w-3 h-3 mr-1" />
                        Live
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Discussion
                      </>
                    )}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.attendees} attending
                    </div>
                  </div>
                  <Button>
                    {session.type === 'live' ? 'Join Live' : 'Join Discussion'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <Card key={index} className="border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{resource.title}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{resource.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{resource.downloads} downloads</span>
                  </div>

                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Sarah Chen", points: 1250, rank: 1, badge: "🏆" },
                { name: "Mike Johnson", points: 1180, rank: 2, badge: "🥈" },
                { name: "Emma Davis", points: 1050, rank: 3, badge: "🥉" },
                { name: "Alex Rodriguez", points: 980, rank: 4, badge: "⭐" },
                { name: "Priya Patel", points: 920, rank: 5, badge: "⭐" }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                      {user.rank}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">{user.badge}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold">{user.points}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}