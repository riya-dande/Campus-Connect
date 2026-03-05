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
import { cn } from "@/lib/utils";
import { useStore } from "@/store";

type Message = {
  id: number;
  user: string;
  text: string;
  time: string;
  avatarSeed: string;
  mine?: boolean;
};

const serverList = [
  { id: "cc-main", label: "CC", color: "from-primary to-purple-600" },
  { id: "code-lab", label: "CL", color: "from-blue-500 to-cyan-500" },
  { id: "events", label: "EV", color: "from-orange-500 to-pink-500" },
  { id: "placements", label: "PL", color: "from-emerald-500 to-green-600" },
];

const textChannels = ["announcements", "general", "showcase", "placements", "random"];
const voiceChannels = ["Lounge", "Study Room", "Interview Prep"];

const initialMessages: Message[] = [
  {
    id: 1,
    user: "Sarah",
    text: "Has anyone seen the latest placement drive post?",
    time: "12:30 PM",
    avatarSeed: "Sarah",
  },
  {
    id: 2,
    user: "Alex",
    text: "Yes, Google and Atlassian links are in #announcements.",
    time: "12:32 PM",
    avatarSeed: "Alex",
  },
  {
    id: 3,
    user: "Riya",
    text: "I can share my resume checklist here if anyone wants.",
    time: "12:34 PM",
    avatarSeed: "Riya",
  },
];

const members = [
  { name: "Prof. Smith", role: "Faculty", status: "online", seed: "ProfSmith" },
  { name: "Sarah", role: "Moderator", status: "online", seed: "Sarah" },
  { name: "Alex", role: "Student", status: "idle", seed: "Alex" },
  { name: "Riya", role: "Student", status: "online", seed: "Riya" },
  { name: "David", role: "Student", status: "offline", seed: "David" },
];

export default function CommunicationHub() {
  const { user } = useStore();
  const [activeServer, setActiveServer] = useState(serverList[0].id);
  const [activeTextChannel, setActiveTextChannel] = useState("general");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const onlineCount = useMemo(
    () => members.filter((m) => m.status === "online" || m.status === "idle").length,
    []
  );

  const sendMessage = () => {
    const text = messageInput.trim();
    if (!text) return;

    const newMessage: Message = {
      id: Date.now(),
      user: user.name.split(" ")[0] || "You",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatarSeed: user.name.replace(/\s+/g, ""),
      mine: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
  };

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

          <ScrollArea className="h-[calc(100%-65px)]">
            <div className="space-y-5 p-3">
              <div>
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Text Channels
                </p>
                <div className="space-y-1">
                  {textChannels.map((channel) => (
                    <motion.button
                      key={channel}
                      whileHover={{ x: 2 }}
                      onClick={() => setActiveTextChannel(channel)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                        activeTextChannel === channel
                          ? "bg-primary/15 text-primary"
                          : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                      )}
                    >
                      <Hash className="h-4 w-4" />
                      {channel}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Voice Channels
                </p>
                <div className="space-y-1">
                  {voiceChannels.map((channel) => (
                    <button
                      key={channel}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                    >
                      <Volume2 className="h-4 w-4" />
                      {channel}
                    </button>
                  ))}
                </div>
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

            <aside className="border-l border-border/70 bg-slate-50">
              <div className="border-b border-border/70 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">Members</p>
                <p className="text-xs text-slate-500">{onlineCount} online</p>
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
          </footer>
        </main>
      </div>
    </div>
  );
}
