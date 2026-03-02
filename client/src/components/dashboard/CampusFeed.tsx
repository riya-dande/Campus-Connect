import { motion } from "framer-motion";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Video, 
  Play, 
  BarChart2, 
  Globe, 
  Bookmark,
  Send,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

export default function CampusFeed() {
  const { posts, toggleLike } = useStore();

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      {posts.map((post, index) => {
        const isInstagramStyle = post.type === 'event' || post.image;
        const isLinkedInStyle = post.type === 'poll' || (!post.image && post.type === 'post');

        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card className={cn(
              "overflow-hidden border border-border/50 shadow-sm transition-all duration-300",
              isLinkedInStyle ? "rounded-xl" : "rounded-3xl"
            )}>
              {/* Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className={cn(
                      "ring-2 ring-background",
                      isInstagramStyle ? "w-12 h-12" : "w-10 h-10 rounded-md"
                    )}>
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    {isInstagramStyle && (
                      <div className="absolute -inset-1 rounded-full border-2 border-primary/30 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-sm hover:underline cursor-pointer">{post.author}</h4>
                      {isLinkedInStyle && <span className="text-xs text-muted-foreground font-normal">• 1st</span>}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span>{post.timeAgo} ago</span>
                      <span>•</span>
                      <Globe className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="px-4 pb-3">
                <p className={cn(
                  "text-sm leading-relaxed",
                  isLinkedInStyle ? "text-foreground/90" : "text-foreground"
                )}>
                  {post.caption}
                </p>
              </div>

              {/* Media Rendering */}
              {post.type === 'event' ? (
                /* Instagram Reel / Vlog Style */
                <div className="relative aspect-[9/16] max-h-[500px] w-full bg-black overflow-hidden mx-auto group">
                  <img 
                    src={post.image} 
                    alt="Vlog content" 
                    className="object-cover w-full h-full opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-primary/80 backdrop-blur-sm text-[10px] font-bold border-none">
                        REEL
                      </Badge>
                      <span className="text-white text-xs font-medium drop-shadow-md">Campus Vibes ✨</span>
                    </div>
                  </div>
                </div>
              ) : post.image ? (
                /* Instagram Feed Style */
                <div className="relative aspect-square w-full bg-muted overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              ) : null}

              {/* LinkedIn Poll Style */}
              {post.type === 'poll' && (
                <div className="px-4 pb-4 space-y-3">
                  <div className="p-4 rounded-xl border border-primary/10 bg-primary/[0.02]">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart2 className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">Academic Poll</span>
                    </div>
                    <div className="space-y-2">
                      {['The Weeknd', 'Taylor Swift', 'Coldplay'].map((opt, i) => (
                        <div key={i} className="relative h-10 rounded-lg border border-border/50 bg-background hover:border-primary/50 transition-all cursor-pointer group overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: i === 0 ? "45%" : i === 1 ? "35%" : "20%" }}
                            className="absolute inset-y-0 left-0 bg-primary/10 transition-all"
                          />
                          <div className="absolute inset-0 flex items-center justify-between px-3 text-sm">
                            <span className="font-medium">{opt}</span>
                            <span className="text-xs text-muted-foreground font-bold">{i === 0 ? "45%" : i === 1 ? "35%" : "20%"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-[10px] text-muted-foreground">
                      1,240 votes • 2 days left
                    </div>
                  </div>
                </div>
              )}

              {/* Engagement Controls */}
              <div className="px-4 py-2 border-t border-border/10">
                {isInstagramStyle ? (
                  /* Instagram Actions */
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4">
                      <Heart 
                        className={cn("w-7 h-7 cursor-pointer hover:scale-110 transition-transform", post.likes > 500 ? "fill-rose-500 text-rose-500" : "text-foreground")} 
                        onClick={() => toggleLike(post.id)}
                      />
                      <MessageCircle className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform" />
                      <Send className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                    <Bookmark className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                ) : (
                  /* LinkedIn Actions */
                  <div className="flex items-center justify-between py-1">
                    <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5" onClick={() => toggleLike(post.id)}>
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs font-bold">Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-bold">Comment</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5">
                      <Share2 className="w-4 h-4" />
                      <span className="text-xs font-bold">Repost</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5">
                      <Send className="w-4 h-4" />
                      <span className="text-xs font-bold">Send</span>
                    </Button>
                  </div>
                )}
                
                {/* Like Count / Social Proof */}
                <div className="pb-2 px-1">
                  <span className="text-xs font-bold">{post.likes.toLocaleString()} likes</span>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
