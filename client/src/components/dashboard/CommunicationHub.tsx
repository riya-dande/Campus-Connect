import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Hash,
  Headphones,
  ImagePlus,
  Laugh,
  Mic,
  Paperclip,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Video,
  Volume2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import billboardImage from '@assets/generated_images/futuristic_digital_billboard_on_campus.png';
import { supabase } from "@/lib/supabaseClient";

const serverList = [
  { id: "cc-main", label: "CC", color: "from-primary to-purple-600" },
  { id: "code-lab", label: "CL", color: "from-blue-500 to-cyan-500" },
  { id: "events", label: "EV", color: "from-orange-500 to-pink-500" },
  { id: "placements", label: "PL", color: "from-emerald-500 to-green-600" },
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
    <div className="h-[690px] overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl">
      <div className="flex h-full">
        <aside className="flex w-[76px] flex-col items-center gap-3 bg-slate-100 px-3 py-4">
          {serverList.map((server) => {
            const active = activeServer === server.id;
            return (
              <motion.button
                key={server.id}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveServer(server.id)}
                className={cn(
                  "group relative h-12 w-12 rounded-2xl transition-all",
                  active ? "rounded-xl" : ""
                )}
              >
                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white transition-all",
                    server.color,
                    active && "rounded-xl"
                  )}
                >
                  {server.label}
                </div>
                <span
                  className={cn(
                    "absolute -left-2 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-primary transition-all",
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  )}
                />
              </motion.button>
            );
          })}
          <button className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-600 hover:bg-slate-50">
            <Plus className="h-5 w-5" />
          </button>
        </aside>

        <aside className="w-[260px] border-r border-border/70 bg-slate-50">
          <div className="border-b border-border/70 p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">CampusConnect Hub</p>
              <Settings className="h-4 w-4 text-slate-500" />
            </div>
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
                    // Get current/logged-in user id from Supabase auth
                    const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
                    const user_id = user ? user.id : "94348ccb-0153-4a8c-b0db-d5b94045b4a4";
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
          </ScrollArea>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col bg-white">
          <header className="flex h-14 items-center justify-between border-b border-border/70 px-4">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-slate-400" />
              <p className="font-semibold text-slate-900">{activeTextChannel}</p>
              <span className="ml-2 text-sm text-slate-500">Student collaboration and updates</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="ml-1 flex h-8 items-center rounded-md border border-border/70 bg-slate-50 px-2.5">
                <Search className="h-4 w-4 text-slate-500" />
                <span className="ml-2 text-xs text-slate-500">Search</span>
              </div>
            </div>
          </header>

          <div className="grid min-h-0 flex-1 grid-cols-[1fr_240px]">
            <section className="flex min-h-0 flex-col">
              <ScrollArea className="min-h-0 flex-1">
                <div className="space-y-0.5 px-4 py-4">
                  <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.15) }}
                        className="rounded-md px-2 py-2 hover:bg-slate-100/80"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.avatarSeed}`} />
                            <AvatarFallback>{msg.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={cn("text-sm font-semibold text-slate-900", msg.mine && "text-primary")}>
                                {msg.user}
                              </span>
                              <span className="text-xs text-slate-500">{msg.time}</span>
                              {msg.mine && (
                                <Badge className="h-5 rounded-full border-none bg-primary/15 px-2 text-[10px] text-primary">
                                  You
                                </Badge>
                              )}
                            </div>
                            <p className="mt-0.5 text-sm leading-relaxed text-slate-700">{msg.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>

              <div className="p-4 pt-3">
                <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-slate-50 px-3 py-2.5">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                    placeholder={`Message #${activeTextChannel}`}
                    className="h-9 flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none"
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800">
                    <ImagePlus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800">
                    <Laugh className="h-4 w-4" />
                  </Button>
                  <Button onClick={sendMessage} size="icon" className="h-8 w-8 rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </section>

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
              <ScrollArea className="h-[calc(100%-58px)]">
                <div className="space-y-1 p-2">
                  {members.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-slate-100"
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.seed}`} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <span
                          className={cn(
                            "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-50",
                            member.status === "online" && "bg-emerald-500",
                            member.status === "idle" && "bg-amber-400",
                            member.status === "offline" && "bg-slate-500"
                          )}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">{member.name}</p>
                        <p className="truncate text-[11px] text-slate-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </aside>
          </div>

          <footer className="flex h-14 items-center justify-between border-t border-border/70 bg-slate-100 px-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                <p className="text-[10px] text-emerald-600">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-200 hover:text-slate-800">
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-200 hover:text-slate-800">
                <Headphones className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-200 hover:text-slate-800">
                <ShieldCheck className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}