import { motion } from "framer-motion";
import { MessageSquare, Hash, Settings, Plus, Video, Phone, Mic, Radio, Users, Eye, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import billboardImage from '@assets/generated_images/futuristic_digital_billboard_on_campus.png';
import { supabase } from "@/lib/supabaseClient";

const groups = [
  { id: 1, name: "Coding Guild", icon: "💻", active: true },
  { id: 2, name: "Design Studio", icon: "🎨", active: false },
  { id: 3, name: "Placement Prep", icon: "💼", active: false },
];

export default function CommunicationHub() {
  const [activeGroup, setActiveGroup] = useState(groups[0].id);
  const [activeTab, setActiveTab] = useState("chat");
  const [channels, setChannels] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedChannel, setSelectedChannel] = useState<{ id: string; name: string } | null>(null);
  const [messages, setMessages] = useState<Array<{ user_id: string; content: string; created_at: string; channel_id?: string }>>([]);
  const [sending, setSending] = useState(false);

  // Fetch channels from Supabase on mount
  useEffect(() => {
    const fetchChannels = async () => {
      const { data, error } = await supabase.from("channels").select("id, name");
      if (!error && data) {
        setChannels(data);
        if (!selectedChannel && data.length > 0) {
          setSelectedChannel(data[0]);
        }
      }
    };
    fetchChannels();
  }, []);

  // Fetch messages for selected channel
  useEffect(() => {
    if (!selectedChannel) return;
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("user_id, content, created_at, channel_id")
        .eq("channel_id", selectedChannel.id)
        .order("created_at", { ascending: true });
      if (!error && data) setMessages(data);
    };
    fetchMessages();
  }, [selectedChannel]);

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
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 flex flex-row m-0">
            {/* Channel List */}
            <div className="w-48 bg-muted/10 border-r border-border/50 flex flex-col">
              <div className="p-4 font-bold text-sm border-b border-border/50 flex justify-between items-center">
                Channels
                <Settings className="w-4 h-4 text-muted-foreground" />
              </div>
              <ScrollArea className="flex-1 p-2">
                <div className="space-y-1">
                  {channels.length === 0 ? (
                    <div className="text-muted-foreground px-4 py-2">No channels found</div>
                  ) : (
                    channels.map((ch) => (
                      <div
                        key={ch.id}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors",
                          selectedChannel && selectedChannel.id === ch.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                        )}
                        onClick={() => setSelectedChannel(ch)}
                      >
                        <Hash className="w-4 h-4" />
                        {ch.name}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-background">
              <div className="p-4 border-b border-border/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-muted-foreground" />
                  <span className="font-bold">{selectedChannel ? selectedChannel.name : "Select a channel"}</span>
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
                  {messages.length === 0 ? (
                    <div className="text-muted-foreground">No messages yet.</div>
                  ) : (
                    messages.map((msg, i) => (
                      <div key={i} className="flex gap-3 group">
                        <Avatar className="w-10 h-10 ring-2 ring-background">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user_id}`} />
                          <AvatarFallback>{msg.user_id?.slice(0,2) || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm">{msg.user_id}</span>
                            <span className="text-[10px] text-muted-foreground">{new Date(msg.created_at).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              <div className="p-4">
                <form
                  className="bg-muted/30 p-2 rounded-xl flex items-center gap-2 border border-border/50"
                  onSubmit={async e => {
                    e.preventDefault();
                    if (!selectedChannel) return;
                    // Replace with your user_id logic
                    const user_id = "demo-user";
                    const input = e.target.elements[0].value;
                    if (!input.trim()) return;
                    setSending(true);
                    const { error } = await supabase
                      .from("messages")
                      .insert([
                        { user_id, content: input, channel_id: selectedChannel.id }
                      ]);
                    e.target.reset();
                    setSending(false);
                    // Reload messages for channel
                    const { data } = await supabase
                      .from("messages")
                      .select("user_id, content, created_at, channel_id")
                      .eq("channel_id", selectedChannel.id)
                      .order("created_at", { ascending: true });
                    if (data) setMessages(data);
                  }}
                >
                  <Plus className="w-5 h-5 text-muted-foreground ml-2" />
                  <input 
                    className="flex-1 bg-transparent border-none text-sm focus:ring-0 p-2" 
                    placeholder={`Message #${selectedChannel ? selectedChannel.name : "channel"}`}
                    disabled={sending}
                  />
                  <Button type="submit" disabled={sending}>Send</Button>
                </form>
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

          {/* <TabsContent value="live" className="flex-1 m-0">
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
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}