// import React, { useState } from "react";

// export default function MentorWidget() {
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState<string[]>([]);

//   const sendMessage = async () => {
//     if (!message) return;

//       setChat((prev) => [...prev, "You: " + message]);

//     try {
//       const res = await fetch("/api/mentor/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         setChat((prev) => [...prev, "AI Error: " + (errorData.error || "Unknown error")]);
//         return;
//       }

//       const data = await res.json();
//       console.log("Server response:", data);

//       if (data.reply) {
//         setChat((prev) => [...prev, "AI: " + data.reply]);
//       } else if (data.response) {
//         setChat((prev) => [...prev, "AI: " + data.response]);
//       } else if (data.error) {
//         setChat((prev) => [...prev, "AI Error: " + data.error]);
//       } else {
//         setChat((prev) => [...prev, "AI: No response - " + JSON.stringify(data)]);
//       }
//     } catch (err: any) {
//       setChat((prev) => [...prev, "AI: Network error - " + (err.message || "Unknown")]);
//     }

//     setMessage("");
//   };

//   return (
//     <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           style={{
//             padding: "12px 18px",
//             background: "#6C63FF",
//             color: "white",
//             borderRadius: "10px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           💬 Chat with Campus AI
//         </button>
//       )}

//       {open && (
//         <div
//           style={{
//             width: "320px",
//             height: "420px",
//             background: "white",
//             borderRadius: "10px",
//             padding: "10px",
//             boxShadow: "0 0 10px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
//             {chat.map((c, i) => (
//               <div key={i} style={{ marginBottom: "6px" }}>
//                 {c}
//               </div>
//             ))}
//           </div>

//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Ask something..."
//             style={{ marginBottom: "8px", padding: "6px" }}
//           />

//           <button onClick={sendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";

// export default function MentorWidget() {
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState<string[]>([]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     setChat((prev) => [...prev, "You: " + message]);

//     try {
//       const res = await fetch("/api/mentor/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });

//       const data = await res.json();

//       setChat((prev) => [...prev, "AI: " + data.reply]);
//     } catch (err) {
//       setChat((prev) => [...prev, "AI: Server error"]);
//     }

//     setMessage("");
//   };

//   return (
//     <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           style={{
//             padding: "12px 18px",
//             background: "#6C63FF",
//             color: "white",
//             borderRadius: "10px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           💬 Chat with Campus AI
//         </button>
//       )}

//       {open && (
//         <div
//           style={{
//             width: "320px",
//             height: "420px",
//             background: "white",
//             borderRadius: "10px",
//             padding: "10px",
//             boxShadow: "0 0 10px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
//             {chat.map((msg, i) => (
//               <div key={i} style={{ marginBottom: "6px" }}>
//                 {msg}
//               </div>
//             ))}
//           </div>

//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Ask something..."
//             style={{ marginBottom: "8px", padding: "6px" }}
//           />

//           <button onClick={sendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Minimize2 } from "lucide-react";
import { useStore } from "@/store";

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
}

// Quick reply suggestions for common questions
const quickReplies = [
  "Attendance",
  "Next class",
  "Events",
  "Library",
  "Timetable",
  "Study track",
  "Results",
  "Help"
];

export default function MentorWidget() {
  const { user } = useStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([
    { id: 0, text: "Hello! I'm your Campus Assistant. How can I help you today?", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (textToSend?: string) => {
    const finalMessage = textToSend || message;
    if (!finalMessage.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: chat.length,
      text: finalMessage,
      isUser: true
    };
    setChat(prev => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          message: finalMessage,
          userData: {
            attendance: user.attendance,
            cgpa: user.cgpa,
            name: user.name,
            studyHours: user.studyHours,
            level: user.level,
            streak: user.streak
          }
        })
      });

      const data = await res.json();

      if (data.reply) {
        const botMsg: ChatMessage = {
          id: chat.length + 1,
          text: data.reply,
          isUser: false
        };
        setChat(prev => [...prev, botMsg]);
      } else {
        setChat(prev => [...prev, { 
          id: prev.length, 
          text: "Sorry, I encountered an error. Please try again.", 
          isUser: false 
        }]);
      }

    } catch (error) {
      setChat(prev => [...prev, { 
        id: prev.length, 
        text: "Server error. Please try again later.", 
        isUser: false 
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: 9999
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              width: "360px",
              height: "480px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 0 30px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              marginBottom: "12px"
            }}
          >
            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              padding: "16px",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: "16px" }}>Campus Assistant</h3>
                <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>Ask me anything!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px",
                  cursor: "pointer",
                  color: "white"
                }}
              >
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              background: "#f8fafc"
            }}>
              {chat.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: msg.isUser ? "flex-end" : "flex-start"
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "10px 14px",
                      borderRadius: msg.isUser 
                        ? "16px 16px 4px 16px" 
                        : "16px 16px 16px 4px",
                      background: msg.isUser 
                        ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" 
                        : "#e2e8f0",
                      color: msg.isUser ? "white" : "#1e293b",
                      fontSize: "14px",
                      lineHeight: "1.4",
                      wordBreak: "break-word",
                      whiteSpace: msg.text.startsWith("Class Timetable") ? "pre" : "pre-wrap",
                      overflowX: msg.text.startsWith("Class Timetable") ? "auto" : "visible",
                      fontFamily: msg.text.startsWith("Class Timetable")
                        ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
                        : "inherit"
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: "16px 16px 16px 4px",
                    background: "#e2e8f0",
                    color: "#64748b",
                    fontSize: "14px"
                  }}>
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div style={{
              padding: "8px 12px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              background: "white"
            }}>
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  disabled={isLoading}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    border: "1px solid #cbd5e1",
                    background: "white",
                    color: "#475569",
                    fontSize: "12px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    opacity: isLoading ? 0.6 : 1
                  }}
                  onMouseOver={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.background = "#f1f5f9";
                      e.currentTarget.style.borderColor = "#6366f1";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div style={{
              padding: "12px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              gap: "8px",
              background: "white"
            }}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "24px",
                  border: "1px solid #cbd5e1",
                  outline: "none",
                  fontSize: "14px",
                  transition: "border-color 0.2s"
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!message.trim() || isLoading}
                style={{
                  padding: "10px 16px",
                  borderRadius: "24px",
                  border: "none",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  opacity: (!message.trim() || isLoading) ? 0.6 : 1,
                  transition: "opacity 0.2s"
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "white",
            fontSize: "28px",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          💬
        </motion.button>
      )}
    </div>
  );
}
