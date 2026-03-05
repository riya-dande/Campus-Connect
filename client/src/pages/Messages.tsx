import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Smile, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

export default function Messages() {
  const [, setLocation] = useLocation();
  const { chats } = useStore();
  const [selectedChat, setSelectedChat] = useState(chats[0].id);

  const activeChat = chats.find(c => c.id === selectedChat);

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] rounded-3xl bg-card border border-border shadow-sm flex overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-80 border-r border-border flex flex-col bg-muted/10">
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            className="mb-3 w-fit rounded-full"
            onClick={() => window.history.length > 1 ? window.history.back() : setLocation("/hub")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 bg-background border-transparent shadow-sm focus:bg-background" />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors",
                  selectedChat === chat.id 
                    ? "bg-primary/10 text-primary-foreground" 
                    : "hover:bg-muted"
                )}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className={cn("font-medium truncate", selectedChat === chat.id ? "text-primary font-bold" : "text-foreground")}>
                      {chat.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                      {chat.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {activeChat ? (
        <div className="hidden md:flex flex-1 flex-col bg-background">
          {/* Header */}
          <div className="p-4 border-b border-border flex justify-between items-center">
             <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeChat.avatar} />
                  <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                   <h3 className="font-bold">{activeChat.name}</h3>
                   <span className="text-xs text-emerald-500 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                     Online
                   </span>
                </div>
             </div>
             <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                   <Phone className="w-5 h-5" />
                </Button>
                 <Button variant="ghost" size="icon" className="text-muted-foreground">
                   <Video className="w-5 h-5" />
                </Button>
                 <Button variant="ghost" size="icon" className="text-muted-foreground">
                   <MoreVertical className="w-5 h-5" />
                </Button>
             </div>
          </div>

          {/* Messages Mock */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')]">
             <div className="flex justify-center">
                <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">Today</span>
             </div>
             
             <div className="flex justify-start">
               <div className="bg-muted p-4 rounded-2xl rounded-tl-none max-w-[70%]">
                 <p className="text-sm">Hey Alex! Did you check the new announcement about the exam schedule?</p>
                 <span className="text-[10px] text-muted-foreground mt-1 block">10:28 AM</span>
               </div>
             </div>

             <div className="flex justify-end">
               <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none max-w-[70%] shadow-lg shadow-primary/20">
                 <p className="text-sm">Yes! Just saw it. Looks like we have a week to prepare for Data Structures.</p>
                 <span className="text-[10px] text-primary-foreground/70 mt-1 block text-right">10:30 AM</span>
               </div>
             </div>
             
             <div className="flex justify-start">
               <div className="bg-muted p-4 rounded-2xl rounded-tl-none max-w-[70%]">
                 <p className="text-sm">{activeChat.lastMessage}</p>
                 <span className="text-[10px] text-muted-foreground mt-1 block">10:32 AM</span>
               </div>
             </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
             <div className="flex items-center gap-2 bg-muted/30 p-1.5 rounded-full border border-border focus-within:ring-2 ring-primary/20 transition-all">
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-muted">
                   <Paperclip className="w-5 h-5" />
                </Button>
                <Input className="border-none shadow-none focus-visible:ring-0 bg-transparent" placeholder="Type a message..." />
                 <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-muted">
                   <Smile className="w-5 h-5" />
                </Button>
                <Button size="icon" className="rounded-full shrink-0 shadow-md">
                   <Send className="w-4 h-4" />
                </Button>
             </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}
