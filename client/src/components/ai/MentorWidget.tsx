import React, { useState } from "react";

export default function MentorWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const sendMessage = async () => {
    if (!message) return;

    setChat((prev) => [...prev, "You: " + message]);

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setChat((prev) => [...prev, "AI: " + data.response]);
    } catch (err) {
      setChat((prev) => [...prev, "AI: Server error"]);
    }

    setMessage("");
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "12px 18px",
            background: "#6C63FF",
            color: "white",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          💬 Chat with Campus AI
        </button>
      )}

      {open && (
        <div
          style={{
            width: "320px",
            height: "420px",
            background: "white",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
            {chat.map((c, i) => (
              <div key={i} style={{ marginBottom: "6px" }}>
                {c}
              </div>
            ))}
          </div>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask something..."
            style={{ marginBottom: "8px", padding: "6px" }}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}
