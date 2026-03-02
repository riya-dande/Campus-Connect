import { useState } from "react";
import { useStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageCircle, 
  Users, 
  Group, 
  PartyPopper,
  Heart,
  Share2,
  MoreHorizontal,
  Send,
  Search,
  Plus,
  Image,
  Smile,
  Calendar,
  MapPin,
  Video,
  Phone,
  BookOpen,
  Trophy,
  Star,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";

export default function Hub() {
  const { user, posts, chats } = useStore();
  const [activeTab, setActiveTab] = useState("feed");

  const mockPosts = [
    {
      id: "1",
      author: "Priya Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      content: "Just completed my Machine Learning certification! 🎉 The journey was tough but worth it. Thanks to all my study group members for the support!",
      image: null,
      likes: 245,
      comments: 32,
      timeAgo: "2h",
      tags: ["#Certification", "#ML", "#Achievement"]
    },
    {
      id: "2",
      author: "Arjun Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      content: "Hackathon alert! 🎯 Team up for the upcoming CodeFest 2024. Looking for 2 more members - one backend and one designer. DM if interested!",
      image: null,
      likes: 189,
      comments: 45,
      timeAgo: "4h",
      tags: ["#Hackathon", "#CodeFest", "#TeamUp"]
    },
    {
      id: "3",
      author: "Campus Events",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Events",
      content: "🎭 Cultural Fest 2024 is here! Register now for dance, music, drama, and art competitions. Last date: March 15th",
      image: "/attached_assets/generated_images/college_campus_event_concert_or_festival.png",
      likes: 567,
      comments: 89,
      timeAgo: "6h",
      tags: ["#CulturalFest", "#Events"]
    },
    {
      id: "4",
      author: "Prof. Sarah Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Reminder: Project submissions for CS301 are due this Friday. Late submissions will have a penalty of 10% per day. Good luck!",
      image: null,
      likes: 78,
      comments: 12,
      timeAgo: "8h",
      tags: ["#Academic", "#Reminder"]
    }
  ];

  const mockConnections = [
    { id: "1", name: "Sneha Reddy", role: "Senior - CSE", company: "Microsoft", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha", mutual: 12 },
    { id: "2", name: "Rahul Verma", role: "Alumni - 2023", company: "Google", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul", mutual: 8 },
    { id: "3", name: "Anjali Gupta", role: "Peer - ECE", company: "", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali", mutual: 15 },
    { id: "4", name: "Dr. Amit Kumar", role: "Faculty - HOD", company: "CSE Department", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit", mutual: 0 },
  ];

  const mockGroups = [
    { id: "1", name: "CSE Final Year 2024", members: 245, image: "https://api.dicebear.com/7.x/identicon/svg?seed=CSE24" },
    { id: "2", name: "Google Developer Group", members: 189, image: "https://api.dicebear.com/7.x/identicon/svg?seed=GDG" },
    { id: "3", name: "Placement Prep Circle", members: 456, image: "https://api.dicebear.com/7.x/identicon/svg?seed=Placement" },
    { id: "4", name: "Sports Enthusiasts", members: 178, image: "https://api.dicebear.com/7.x/identicon/svg?seed=Sports" },
  ];

  const mockClubs = [
    { id: "1", name: "Tech Club", members: 320, events: 24, category: "Technical" },
    { id: "2", name: "Cultural Society", members: 280, events: 18, category: "Cultural" },
    { id: "3", name: "Sports Council", members: 200, events: 12, category: "Sports" },
    { id: "4", name: "Literary Club", members: 150, events: 8, category: "Academic" },
    { id: "5", name: "Social Service", members: 180, events: 15, category: "Social" },
  ];

  const recentChats = [
    { id: "1", name: "CSE Final Year Project", lastMessage: "Dave: I pushed the changes...", time: "10:30 AM", unread: 3, avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Project" },
    { id: "2", name: "Priya Sharma", lastMessage: "Are you going to the hackathon?", time: "Yesterday", unread: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya2" },
    { id: "3", name: "Placement Cell", lastMessage: "New drive announced: Amazon", time: "Yesterday", unread: 5, avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Placement" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hub</h1>
          <p className="text-muted-foreground">Connect, share, and grow with your campus community</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Find People
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Connect</span>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Group className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium">Groups</span>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <PartyPopper className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Clubs</span>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium">Messages</span>
              </CardContent>
            </Card>
          </div>

          {/* Create Post Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <Input 
                    placeholder="What's on your mind?" 
                    className="mb-3"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Image className="w-4 h-4 mr-1" />
                        Image
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4 mr-1" />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Event
                      </Button>
                    </div>
                    <Button size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Recent Posts</h2>
            {mockPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent className="p-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-3">
                        <img 
                          src={post.avatar} 
                          alt={post.author} 
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <p className="mb-3">{post.content}</p>
                    
                    {post.image && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img 
                          src={post.image} 
                          alt="Post" 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex gap-4">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Share2 className="w-4 h-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Messages Preview */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Messages</CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentChats.map((chat) => (
                <div key={chat.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="relative">
                    <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{chat.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="text-xs">{chat.unread}</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggested Connections */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Suggested Connections</CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockConnections.slice(0, 4).map((connection) => (
                <div key={connection.id} className="flex items-center gap-3 p-2">
                  <img src={connection.avatar} alt={connection.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{connection.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{connection.role}</p>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Groups */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Your Groups</CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockGroups.slice(0, 4).map((group) => (
                <div key={group.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <img src={group.image} alt={group.name} className="w-10 h-10 rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{group.name}</p>
                    <p className="text-xs text-muted-foreground">{group.members} members</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Clubs */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Campus Clubs</CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockClubs.slice(0, 5).map((club) => (
                <div key={club.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <PartyPopper className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{club.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{club.members}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
