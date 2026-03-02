import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart, MessageCircle, Share, MoreHorizontal, Camera,
  Video, MapPin, Smile, Image, Send, Play, Volume2,
  Users, TrendingUp, Star, Flame, Plus
} from "lucide-react";
import { useState } from "react";
import billboardImage from '@assets/generated_images/futuristic_digital_billboard_on_campus.png';

export default function SocialFeed() {
  const [newPost, setNewPost] = useState("");

  const posts = [
    {
      id: 1,
      user: { name: "Sarah Chen", avatar: "", major: "CS", year: "3rd" },
      content: "Just aced my algorithms midterm! 🎉 The study group we formed really helped. Thanks everyone! #StudyGroup #Algorithms",
      image: billboardImage,
      likes: 24,
      comments: 8,
      shares: 3,
      time: "2h ago",
      type: "text"
    },
    {
      id: 2,
      user: { name: "Mike Johnson", avatar: "", major: "ME", year: "2nd" },
      content: "Live from the robotics club workshop! Building some amazing projects today 🤖",
      video: true,
      likes: 45,
      comments: 12,
      shares: 7,
      time: "4h ago",
      type: "live"
    },
    {
      id: 3,
      user: { name: "Emma Davis", avatar: "", major: "EE", year: "4th" },
      content: "Campus career fair was incredible! Connected with 5 companies and got 3 interview invites. Remember to update your resume! 📄✨",
      likes: 67,
      comments: 23,
      shares: 15,
      time: "6h ago",
      type: "text"
    }
  ];

  const stories = [
    { user: "Alex", avatar: "", viewed: false },
    { user: "Priya", avatar: "", viewed: false },
    { user: "Jordan", avatar: "", viewed: true },
    { user: "Sam", avatar: "", viewed: true },
    { user: "Taylor", avatar: "", viewed: false },
  ];

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card className="border border-border/50">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                placeholder="What's happening on campus?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="border-none bg-muted/50 rounded-full px-4 py-3 text-base"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Camera className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Image className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MapPin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button disabled={!newPost.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stories */}
      <Card className="border border-border/50">
        <CardContent className="p-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="flex flex-col items-center gap-2 min-w-fit">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-full p-0.5">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
              </div>
              <span className="text-xs text-center">Add Story</span>
            </div>
            {stories.map((story, index) => (
              <div key={index} className="flex flex-col items-center gap-2 min-w-fit">
                <div className={`w-16 h-16 rounded-full p-0.5 ${story.viewed ? 'bg-muted' : 'bg-gradient-to-br from-pink-500 to-orange-500'}`}>
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                    <Avatar className="w-14 h-14">
                      <AvatarFallback>{story.user[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <span className="text-xs text-center">{story.user}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="border border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Trending on Campus
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["#CareerFair", "#StudyGroup", "#Hackathon", "#ClubMeeting"].map((tag, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">{tag}</span>
              <Badge variant="secondary" className="text-xs">
                {Math.floor(Math.random() * 100) + 10} posts
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="border border-border/50 overflow-hidden">
            {/* Post Header */}
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{post.user.name}</span>
                      {post.type === 'live' && (
                        <Badge className="bg-red-500 text-white text-xs">
                          <Flame className="w-3 h-3 mr-1" />
                          LIVE
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.user.major} • {post.user.year} year</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              <p className="text-sm mb-3">{post.content}</p>

              {/* Post Media */}
              {post.image && (
                <div className="rounded-lg overflow-hidden mb-3">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {post.video && (
                <div className="rounded-lg overflow-hidden mb-3 bg-muted flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">Live Stream</p>
                  </div>
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-6">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                    <Heart className="w-4 h-4 mr-2" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share className="w-4 h-4 mr-2" />
                    {post.shares}
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}