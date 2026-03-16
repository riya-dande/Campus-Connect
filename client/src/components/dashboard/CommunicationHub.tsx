import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Hash,
  Phone,
  Video,
  Plus,
  Settings,
  Search,
  Send
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { supabase } from "@/lib/supabaseClient";

const serverList = [
  { id: "cc-main", label: "CC", color: "from-primary to-purple-600" },
  { id: "code-lab", label: "CL", color: "from-blue-500 to-cyan-500" },
  { id: "events", label: "EV", color: "from-orange-500 to-pink-500" },
  { id: "placements", label: "PL", color: "from-emerald-500 to-green-600" },
];

export default function CommunicationHub() {

  const [activeServer, setActiveServer] = useState(serverList[0].id);


  type Channel = { id: string; name: string };
  type Message = { user_id: string; content: string; created_at: string; channel_id: string };

  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [messageInput, setMessageInput] = useState("");

  const [sending, setSending] = useState(false);


  // Fetch channels
  useEffect(() => {
    const fetchChannels = async () => {

      const { data, error } = await supabase
        .from("channels")
        .select("id,name");

      if (!error && data) {
        setChannels(data);

        if (data.length > 0) {
          setSelectedChannel(data[0]);
        }
      }
    };

    fetchChannels();
  }, []);


  // Fetch messages
  useEffect(() => {

    if (!selectedChannel) return;

    const fetchMessages = async () => {

      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("channel_id", selectedChannel.id)
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
    };

    fetchMessages();

  }, [selectedChannel]);


  // Send message
  const sendMessage = async () => {

    if (!messageInput.trim() || !selectedChannel) return;

    setSending(true);

    const {
      data: { user }
    } = await supabase.auth.getUser();

    await supabase
      .from("messages")
      .insert([
        {
          user_id: user?.id,
          content: messageInput,
          channel_id: selectedChannel.id
        }
      ]);

    setMessageInput("");

    setSending(false);

    // reload messages
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("channel_id", selectedChannel.id)
      .order("created_at", { ascending: true });

    if (data) setMessages(data);
  };


  return (

    <div className="h-[690px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl">

      <div className="flex h-full">


        {/* SERVER LIST */}

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
                  active && "rounded-xl"
                )}
              >

                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white",
                    server.color
                  )}
                >
                  {server.label}
                </div>

              </motion.button>

            );
          })}

          <button className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <Plus className="h-5 w-5" />
          </button>

        </aside>



        {/* CHANNEL LIST */}

        <aside className="w-[260px] border-r border-border bg-slate-50">

          <div className="border-b p-4 flex justify-between">

            <p className="font-semibold">CampusConnect Hub</p>

            <Settings className="h-4 w-4 text-muted-foreground" />

          </div>


          <ScrollArea className="h-full">

            {channels.map((ch) => (

              <div
                key={ch.id}
                onClick={() => setSelectedChannel(ch)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer",
                  selectedChannel?.id === ch.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >

                <Hash className="w-4 h-4" />

                {ch.name}

              </div>

            ))}

          </ScrollArea>

        </aside>



        {/* CHAT AREA */}

        <main className="flex flex-1 flex-col bg-white">


          {/* CHAT HEADER */}

          <header className="flex h-14 items-center justify-between border-b px-4">

            <div className="flex items-center gap-2">

              <Hash className="h-5 w-5 text-muted-foreground" />

              <p className="font-semibold">
                {selectedChannel?.name || "Select Channel"}
              </p>

            </div>

            <div className="flex gap-2">

              <Button variant="ghost" size="icon">
                <Phone className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="icon">
                <Video className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="icon">
                <Search className="w-4 h-4" />
              </Button>

            </div>

          </header>



          {/* MESSAGES */}

          <ScrollArea className="flex-1 p-4">

            {messages.length === 0 ? (

              <div className="text-muted-foreground">
                No messages yet
              </div>

            ) : (

              messages.map((msg, index) => (

                <div key={index} className="flex gap-3 mb-4">

                  <Avatar className="h-10 w-10">

                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user_id}`}
                    />

                    <AvatarFallback>
                      {msg.user_id?.slice(0, 2)}
                    </AvatarFallback>

                  </Avatar>

                  <div>

                    <div className="flex gap-2 text-sm">

                      <span className="font-semibold">
                        {msg.user_id}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </span>

                    </div>

                    <p className="text-sm">
                      {msg.content}
                    </p>

                  </div>

                </div>

              ))

            )}

          </ScrollArea>



          {/* MESSAGE INPUT */}

          <div className="border-t p-3">

            <div className="flex gap-2">

              <input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder={`Message #${selectedChannel?.name || ""}`}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />

              <Button onClick={sendMessage} disabled={sending}>

                <Send className="w-4 h-4" />

              </Button>

            </div>

          </div>

        </main>

      </div>

    </div>

  );
}