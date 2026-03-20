import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Group,
  Heart,
  Image,
  MessageCircle,
  MoreHorizontal,
  Newspaper,
  PartyPopper,
  Plus,
  Search,
  Send,
  Share2,
  Users,
  UserPlus,
  Video,
} from "lucide-react";
import campusEventImage from "@assets/generated_images/college_campus_event_concert_or_festival.png";

type FeedPost = {
  id: string;
  author: string;
  avatar: string;
  role: "peer" | "alumni" | "faculty" | "club";
  headline: string;
  content: string;
  image?: string | null;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
  tags: string[];
};

type Connection = {
  id: string;
  name: string;
  role: "peer" | "alumni" | "faculty";
  subtitle: string;
  company: string;
  avatar: string;
  mutual: number;
};

export default function Hub() {
  const [, setLocation] = useLocation();
  const { user, chats } = useStore();

  const [activeTab, setActiveTab] = useState("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [composerText, setComposerText] = useState("");
  const [composerTags, setComposerTags] = useState("");

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({});
  const [joinedGroupIds, setJoinedGroupIds] = useState<Record<string, boolean>>({});
  const [followedClubIds, setFollowedClubIds] = useState<Record<string, boolean>>({});

  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([
    {
      id: "p1",
      author: "Priya Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      role: "peer",
      headline: "Machine Learning Track Completed",
      content:
        "Completed my ML certification and built two projects. If anyone wants notes and prep strategy, ping me.",
      likes: 245,
      comments: 32,
      shares: 11,
      timeAgo: "2h",
      tags: ["#Certification", "#ML", "#StudyTips"],
    },
    {
      id: "p2",
      author: "Rahul Verma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      role: "alumni",
      headline: "Interview Prep Session",
      content:
        "I am hosting a LinkedIn and resume review session for final year students tomorrow at 6 PM.",
      likes: 178,
      comments: 21,
      shares: 14,
      timeAgo: "4h",
      tags: ["#Alumni", "#Career", "#Resume"],
    },
    {
      id: "p3",
      author: "Campus Events",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=CampusEvents",
      role: "club",
      headline: "Cultural Fest Registrations Open",
      content:
        "Join dance, music, and design showcases. Registration closes on March 15. Teams and solo both allowed.",
      image: campusEventImage,
      likes: 562,
      comments: 89,
      shares: 72,
      timeAgo: "6h",
      tags: ["#CulturalFest", "#Clubs", "#Events"],
    },
    {
      id: "p4",
      author: "Prof. Sarah Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProfSarah",
      role: "faculty",
      headline: "Project Submission Reminder",
      content:
        "CS301 submissions close this Friday at 11:59 PM. Use the rubric shared in LMS to avoid deductions.",
      likes: 80,
      comments: 12,
      shares: 5,
      timeAgo: "8h",
      tags: ["#Academic", "#Faculty", "#Reminder"],
    },
  ]);

  const connections: Connection[] = [
    {
      id: "c1",
      name: "Sneha Reddy",
      role: "alumni",
      subtitle: "Alumni 2023",
      company: "Microsoft",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      mutual: 12,
    },
    {
      id: "c2",
      name: "Anjali Gupta",
      role: "peer",
      subtitle: "ECE 3rd Year",
      company: "Student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
      mutual: 15,
    },
    {
      id: "c3",
      name: "Dr. Amit Kumar",
      role: "faculty",
      subtitle: "Head of Department",
      company: "CSE Department",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
      mutual: 0,
    },
    {
      id: "c4",
      name: "Rahul Verma",
      role: "alumni",
      subtitle: "Alumni 2022",
      company: "Google",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul2",
      mutual: 9,
    },
    {
      id: "c5",
      name: "Deepa Nair",
      role: "peer",
      subtitle: "CSE 3rd Year",
      company: "Student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepa",
      mutual: 6,
    },
  ];

  const groups = [
    { id: "g1", name: "CSE Final Year 2026", members: 245, topic: "Projects + Placements" },
    { id: "g2", name: "Google Developer Group", members: 189, topic: "Hackathons + Tech Talks" },
    { id: "g3", name: "Placement Prep Circle", members: 456, topic: "Mock Interviews + Referrals" },
    { id: "g4", name: "Campus Creators", members: 178, topic: "Design + Content + Media" },
  ];

  const clubs = [
    { id: "club1", name: "Tech Club", members: 320, events: 24, category: "Technical" },
    { id: "club2", name: "Cultural Society", members: 280, events: 18, category: "Cultural" },
    { id: "club3", name: "Sports Council", members: 200, events: 12, category: "Sports" },
    { id: "club4", name: "Literary Club", members: 150, events: 8, category: "Academic" },
  ];

  const smartResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const people = connections
      .filter((p) =>
        [p.name, p.subtitle, p.company, p.role].join(" ").toLowerCase().includes(q)
      )
      .map((p) => ({ id: p.id, type: "person", title: p.name, subtitle: `${p.subtitle} • ${p.company}` }));

    const grp = groups
      .filter((g) => [g.name, g.topic].join(" ").toLowerCase().includes(q))
      .map((g) => ({ id: g.id, type: "group", title: g.name, subtitle: `${g.members} members` }));

    const clb = clubs
      .filter((c) => [c.name, c.category].join(" ").toLowerCase().includes(q))
      .map((c) => ({ id: c.id, type: "club", title: c.name, subtitle: `${c.events} events this term` }));

    const chatResults = chats
      .filter((c) => [c.name, c.lastMessage].join(" ").toLowerCase().includes(q))
      .map((c) => ({ id: c.id, type: "chat", title: c.name, subtitle: c.lastMessage }));

    return [...people, ...grp, ...clb, ...chatResults].slice(0, 10);
  }, [searchQuery, connections, groups, clubs, chats]);

  const filteredFeed = useMemo(() => {
    if (!searchQuery.trim()) return feedPosts;
    const q = searchQuery.toLowerCase();
    return feedPosts.filter((p) =>
      [p.author, p.content, p.headline, ...p.tags].join(" ").toLowerCase().includes(q)
    );
  }, [feedPosts, searchQuery]);

  const roleBadgeClass = (role: FeedPost["role"]) => {
    if (role === "alumni") return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    if (role === "faculty") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    if (role === "club") return "bg-amber-500/10 text-amber-700 border-amber-500/20";
    return "bg-primary/10 text-primary border-primary/20";
  };

  const handleCreatePost = () => {
    const text = composerText.trim();
    if (!text) return;
    const tags = composerTags
      .split(" ")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

    const newPost: FeedPost = {
      id: `p${Date.now()}`,
      author: user.name,
      avatar: user.avatar,
      role: "peer",
      headline: "New update",
      content: text,
      likes: 0,
      comments: 0,
      shares: 0,
      timeAgo: "now",
      tags: tags.length ? tags : ["#CampusConnect"],
    };
    setFeedPosts((prev) => [newPost, ...prev]);
    setComposerText("");
    setComposerTags("");
  };

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    setFeedPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + (likedPosts[id] ? -1 : 1) } : p
      )
    );
  };

  const peerConnections = connections.filter((c) => c.role === "peer");
  const alumniConnections = connections.filter((c) => c.role === "alumni");
  const facultyConnections = connections.filter((c) => c.role === "faculty");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hub</h1>
          <p className="text-muted-foreground">Connect, share, and grow with your campus community</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveTab("network")}>
            <Search className="mr-2 h-4 w-4" />
            Find People
          </Button>
          <Button onClick={() => setActiveTab("feed")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </div>
      </div>

      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Smart search people, alumni, faculty, groups, clubs, chats..."
              className="pl-9"
            />
          </div>
          {searchQuery.trim() && (
            <div className="mt-3 space-y-2">
              {smartResults.length === 0 ? (
                <p className="text-sm text-muted-foreground">No results found.</p>
              ) : (
                smartResults.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase">
                      {item.type}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="space-y-6 lg:col-span-3">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { key: "feed", label: "Feed", icon: Newspaper, color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30" },
              { key: "network", label: "Connect", icon: Users, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
              { key: "clubs", label: "Groups", icon: Group, color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
              { key: "clubs", label: "Club Corner", icon: PartyPopper, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30" },
              { key: "chats", label: "Messages", icon: MessageCircle, color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30" },
            ].map((action) => (
              <Card
                key={action.label}
                className="cursor-pointer border-border/60 transition-all hover:border-primary/40 hover:shadow-sm"
                onClick={() => setActiveTab(action.key)}
              >
                <CardContent className="flex flex-col items-center gap-2 p-4">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", action.color)}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="feed" className="space-y-4">
              <Card className="!rounded-none border-border/60 !bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Input
                        value={composerText}
                        onChange={(e) => setComposerText(e.target.value)}
                        placeholder="Share update for peers, alumni, and faculty..."
                      />
                      <Input
                        value={composerTags}
                        onChange={(e) => setComposerTags(e.target.value)}
                        placeholder="Tags (example: placements alumni ai)"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Image className="mr-1 h-4 w-4" />
                            Image
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Video className="mr-1 h-4 w-4" />
                            Video
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar className="mr-1 h-4 w-4" />
                            Event
                          </Button>
                        </div>
                        <Button size="sm" onClick={handleCreatePost}>
                          <Send className="mr-2 h-4 w-4" />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {filteredFeed.map((post) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="!rounded-none border-border/60 !bg-white shadow-sm">
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{post.author}</p>
                              <Badge variant="outline" className={cn("text-[10px] uppercase", roleBadgeClass(post.role))}>
                                {post.role}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{post.headline} • {post.timeAgo}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="mb-3 text-sm">{post.content}</p>
                      {post.image && (
                        <div className="mb-3 overflow-hidden rounded-lg">
                          <img src={post.image} alt="Post" className="h-64 w-full object-cover" />
                        </div>
                      )}
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between border-t pt-3">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="sm" onClick={() => toggleLike(post.id)}>
                            <Heart className={cn("mr-1 h-4 w-4", likedPosts[post.id] && "fill-current text-red-500")} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="mr-1 h-4 w-4" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="mr-1 h-4 w-4" />
                            {post.shares}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="network" className="space-y-4">
              {[
                { label: "Peers", icon: Users, list: peerConnections },
                { label: "Alumni", icon: Briefcase, list: alumniConnections },
                { label: "Faculty", icon: GraduationCap, list: facultyConnections },
              ].map((section) => (
                <Card key={section.label}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <section.icon className="h-5 w-5 text-primary" />
                      {section.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {section.list.map((person) => (
                      <div key={person.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={person.avatar} />
                          <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{person.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{person.subtitle} • {person.company}</p>
                          <p className="text-[11px] text-muted-foreground">{person.mutual} mutual connections</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={connectedIds[person.id] ? "secondary" : "outline"}
                            onClick={() =>
                              setConnectedIds((prev) => ({ ...prev, [person.id]: !prev[person.id] }))
                            }
                          >
                            {connectedIds[person.id] ? (
                              <>
                                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                                Connected
                              </>
                            ) : (
                              <>
                                <UserPlus className="mr-1 h-3.5 w-3.5" />
                                Connect
                              </>
                            )}
                          </Button>
                          <Button size="sm" onClick={() => setLocation("/messages")}>
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="chats" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>Active Conversations</span>
                    <Button size="sm" onClick={() => setLocation("/messages")}>
                      Open Full Messenger
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {chats.map((chat) => (
                    <div key={chat.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{chat.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && <Badge>{chat.unread}</Badge>}
                      <Button size="sm" variant="outline" onClick={() => setLocation("/messages")}>
                        Open
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clubs" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Groups</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  {groups.map((group) => (
                    <div key={group.id} className="rounded-lg border border-border/60 p-3">
                      <p className="font-medium">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.topic}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{group.members} members</p>
                      <Button
                        size="sm"
                        className="mt-3"
                        variant={joinedGroupIds[group.id] ? "secondary" : "outline"}
                        onClick={() =>
                          setJoinedGroupIds((prev) => ({ ...prev, [group.id]: !prev[group.id] }))
                        }
                      >
                        {joinedGroupIds[group.id] ? "Joined" : "Join Group"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Club Corner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {clubs.map((club) => (
                    <div key={club.id} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                      <div>
                        <p className="font-medium">{club.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {club.category} • {club.members} members • {club.events} events
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={followedClubIds[club.id] ? "secondary" : "outline"}
                        onClick={() =>
                          setFollowedClubIds((prev) => ({ ...prev, [club.id]: !prev[club.id] }))
                        }
                      >
                        {followedClubIds[club.id] ? "Following" : "Follow"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Messages</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setLocation("/messages")}>
                  See All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {chats.slice(0, 4).map((chat) => (
                <div key={chat.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{chat.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && <Badge className="text-xs">{chat.unread}</Badge>}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Suggested Connections</CardTitle>
                <Badge variant="outline" className="text-[10px] uppercase">Swipe</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-3 pb-2">
                  {connections.slice(0, 8).map((person) => (
                    <div key={person.id} className="w-[240px] shrink-0 snap-start rounded-xl border border-border/60 p-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-11 w-11">
                          <AvatarImage src={person.avatar} />
                          <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-foreground">{person.name}</p>
                            <Badge
                              variant="outline"
                              className={cn(
                                "h-5 rounded-full px-2 text-[10px] uppercase",
                                person.role === "alumni" && "border-blue-200 bg-blue-50 text-blue-700",
                                person.role === "faculty" && "border-emerald-200 bg-emerald-50 text-emerald-700",
                                person.role === "peer" && "border-primary/20 bg-primary/10 text-primary"
                              )}
                            >
                              {person.role}
                            </Badge>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">{person.subtitle}</p>
                          <p className="truncate text-xs text-muted-foreground">{person.company}</p>
                          <p className="mt-1 text-[11px] text-muted-foreground">{person.mutual} mutual connections</p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Button
                          variant={connectedIds[person.id] ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => setConnectedIds((prev) => ({ ...prev, [person.id]: !prev[person.id] }))}
                        >
                          {connectedIds[person.id] ? "Connected" : "Connect"}
                        </Button>
                        <Button size="sm" onClick={() => setLocation("/messages")}>
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Club Corner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {clubs.map((club) => (
                <div key={club.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/40">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{club.name}</p>
                    <p className="text-xs text-muted-foreground">{club.members} members</p>
                  </div>
                  <Badge variant="outline">{club.category}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
