import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  MessageSquare, 
  Video, 
  Image as ImageIcon, 
  Smile, 
  Send, 
  MoreHorizontal, 
  Heart, 
  Share2, 
  Hash, 
  TrendingUp,
  Flame,
  Globe,
  Plus,
  Zap,
  Star,
  Music
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";

const STORIES = [
  { id: 1, user: "Tech Club", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop", active: true },
  { id: 2, user: "Music Fest", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=100&h=100&fit=crop", active: true },
  { id: 3, user: "Alex R.", image: "https://github.com/shadcn.png", active: false },
  { id: 4, user: "Sports Hub", image: "https://images.unsplash.com/photo-1461896756986-930d04b1207e?w=100&h=100&fit=crop", active: true },
  { id: 5, user: "Art Society", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&h=100&fit=crop", active: false },
];

const TRENDING_TOPICS = [
  { tag: "#Hackathon2026", posts: "1.2k", growth: "up" },
  { tag: "#CampusFest", posts: "850", growth: "up" },
  { tag: "#CanteenReview", posts: "420", growth: "down" },
  { tag: "#ExamMemes", posts: "2.5k", growth: "up" },
];

const FEEDS = [
  {
    id: 1,
    user: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", badge: "Influencer" },
    content: "Just finished the 48-hour hackathon! 🚀 Our team built an AI that predicts canteen queue times. So proud of everyone! #Hackathon2026 #CodeLife",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop",
    likes: 245,
    comments: 42,
    time: "2h ago",
    isHot: true
  },
  {
    id: 2,
    user: { name: "Department of AI", avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop", badge: "Official" },
    content: "Guest lecture by Dr. Aris today at 3 PM in the Main Auditorium. Topics: Quantum Neural Networks. Don't miss out! 🎓",
    likes: 156,
    comments: 12,
    time: "4h ago",
    isHot: false
  }
];

export default function SocialHub() {
  const [activeTab, setActiveTab] = useState("for-you");

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pb-20">
      {/* Left Sidebar - Navigation & Trends */}
      <div className="hidden lg:flex flex-col w-72 shrink-0 space-y-6 sticky top-24 h-fit">
        <Card className="p-6 border-none bg-card/40 backdrop-blur-xl rounded-[2.5rem] border border-border/50">
          <div className="space-y-2">
            {[
              { icon: Globe, label: "Explore", id: "for-you" },
              { icon: Users, label: "Clubs", id: "clubs" },
              { icon: Star, label: "Bookmarks", id: "bookmarks" },
              { icon: TrendingUp, label: "Leaderboard", id: "ranks" },
            ].map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full justify-start gap-4 h-12 rounded-2xl font-bold transition-all",
                  activeTab === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-primary/10 hover:text-primary"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-none bg-card/40 backdrop-blur-xl rounded-[2.5rem] border border-border/50">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-black text-sm uppercase tracking-widest">Trending Now</h3>
          </div>
          <div className="space-y-6">
            {TRENDING_TOPICS.map((topic) => (
              <div key={topic.tag} className="group cursor-pointer">
                <p className="font-bold text-sm group-hover:text-primary transition-colors">{topic.tag}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-muted-foreground font-medium">{topic.posts} posts</p>
                  {topic.growth === "up" ? (
                    <Badge className="bg-emerald-500/10 text-emerald-500 text-[8px] h-4 border-none">Rising</Badge>
                  ) : (
                    <Badge className="bg-rose-500/10 text-rose-500 text-[8px] h-4 border-none">Quiet</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Content Feed */}
      <div className="flex-1 space-y-8">
        {/* Stories Section */}
        <div className="relative">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {/* Add Story */}
              <div className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                <div className="w-20 h-20 rounded-[2rem] bg-muted/50 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                  <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Post</span>
              </div>
              
              {STORIES.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center gap-2 shrink-0 cursor-pointer"
                >
                  <div className={cn(
                    "w-20 h-20 rounded-[2rem] p-1 transition-all",
                    story.active ? "bg-gradient-to-tr from-amber-400 via-rose-500 to-primary shadow-lg shadow-primary/20" : "bg-muted"
                  )}>
                    <div className="w-full h-full rounded-[1.8rem] bg-background p-1">
                      <Avatar className="w-full h-full rounded-[1.6rem]">
                        <AvatarImage src={story.image} className="object-cover" />
                        <AvatarFallback>{story.user[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold truncate w-20 text-center">{story.user}</span>
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        {/* Create Post Card */}
        <Card className="p-6 border-none bg-card/40 backdrop-blur-xl rounded-[2.5rem] border border-border/50 shadow-xl shadow-primary/5">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12 rounded-2xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input 
                placeholder="What's happening on campus?" 
                className="bg-muted/50 border-none rounded-2xl h-12 focus-visible:ring-primary px-6 font-medium"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-1">
                  {[
                    { icon: ImageIcon, color: "text-blue-500", label: "Media" },
                    { icon: Video, color: "text-emerald-500", label: "Live" },
                    { icon: Music, color: "text-amber-500", label: "Audio" },
                    { icon: Smile, color: "text-rose-500", label: "Feeling" },
                  ].map((item) => (
                    <Button key={item.label} variant="ghost" size="sm" className="rounded-full gap-2 hover:bg-muted font-bold text-xs h-9">
                      <item.icon className={cn("w-4 h-4", item.color)} />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Button>
                  ))}
                </div>
                <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 font-black text-white h-10 shadow-lg shadow-primary/20">Post</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Post Feeds */}
        <AnimatePresence>
          <div className="space-y-8">
            {FEEDS.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none bg-card/40 backdrop-blur-xl rounded-[3rem] border border-border/50 overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-14 h-14 rounded-2xl border-2 border-primary/20">
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                          </Avatar>
                          {post.isHot && (
                            <div className="absolute -top-1 -right-1 bg-rose-500 p-1 rounded-lg border-2 border-background">
                              <Flame className="w-3 h-3 text-white fill-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black tracking-tight">{post.user.name}</h4>
                            <Badge className={cn(
                              "text-[8px] uppercase tracking-widest px-2 h-4 border-none font-black",
                              post.user.badge === "Official" ? "bg-primary text-white" : "bg-amber-400 text-amber-950"
                            )}>
                              {post.user.badge}
                            </Badge>
                          </div>
                          <p className="text-[10px] text-muted-foreground font-bold">{post.time} • Public</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full opacity-40 hover:opacity-100 hover:bg-muted">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>

                    <p className="text-lg font-medium leading-relaxed mb-6">
                      {post.content.split(' ').map((word, j) => 
                        word.startsWith('#') ? (
                          <span key={j} className="text-primary font-bold cursor-pointer hover:underline mr-1">{word} </span>
                        ) : word + ' '
                      )}
                    </p>

                    {post.image && (
                      <div className="rounded-[2.5rem] overflow-hidden mb-8 border border-border/30 group-hover:scale-[1.01] transition-transform duration-700">
                        <img src={post.image} className="w-full h-auto object-cover" alt="Post content" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" className="rounded-full gap-2 hover:bg-rose-500/10 hover:text-rose-500 transition-colors group/btn h-11 px-6">
                          <Heart className="w-5 h-5 group-hover/btn:fill-rose-500" />
                          <span className="font-black text-sm">{post.likes}</span>
                        </Button>
                        <Button variant="ghost" className="rounded-full gap-2 hover:bg-primary/10 hover:text-primary transition-colors h-11 px-6">
                          <MessageSquare className="w-5 h-5" />
                          <span className="font-black text-sm">{post.comments}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted h-11 w-11">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* Right Sidebar - Suggestions & Leaderboard */}
      <div className="hidden xl:flex flex-col w-80 shrink-0 space-y-8 sticky top-24 h-fit">
        {/* Weekly Leaderboard */}
        <Card className="p-8 border-none bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white rounded-[3rem] shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 rounded-xl">
                <Star className="w-5 h-5 fill-white" />
              </div>
              <h3 className="font-black text-sm uppercase tracking-widest">Top Creators</h3>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex items-center justify-between bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black opacity-60">#{rank}</span>
                    <Avatar className="w-8 h-8 rounded-xl border border-white/20">
                      <AvatarImage src={`https://i.pravatar.cc/100?u=${rank}`} />
                    </Avatar>
                    <span className="text-xs font-bold">User_{rank}</span>
                  </div>
                  <Badge className="bg-white/20 text-white text-[8px] border-none font-bold">+{1200 / rank} XP</Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 bg-white text-primary hover:bg-white/90 font-black rounded-2xl h-11 text-xs">View Rankings</Button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </Card>

        {/* Community Suggestions */}
        <Card className="p-8 border-none bg-card/40 backdrop-blur-xl rounded-[3rem] border border-border/50">
           <h3 className="font-black text-sm uppercase tracking-widest mb-6 px-2">Discover Clubs</h3>
           <div className="space-y-6">
              {[
                { name: "Photography", members: "1.2k", color: "bg-blue-500" },
                { name: "Entrepreneurship", members: "850", color: "bg-rose-500" },
                { name: "Anime Society", members: "2.4k", color: "bg-amber-500" },
              ].map((club) => (
                <div key={club.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold", club.color)}>
                      {club.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black group-hover:text-primary transition-colors">{club.name}</p>
                      <p className="text-[10px] text-muted-foreground font-bold">{club.members} members</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-xl h-8 text-[10px] font-black px-4">Join</Button>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
}
