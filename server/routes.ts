import "dotenv/config";
import OpenAI from "openai";
import type { Express } from "express";
import { type Server } from "http";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Test endpoint
  app.get("/api/test", (_req, res) => {
    res.json({ message: "Server is working!" });
  });

  // AI Mentor Chat API
  app.post("/api/mentor/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message missing" });
      }

      console.log("Message received:", message);

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `You are CampusConnect AI Assistant.

Student data:
Attendance: 92%
Next class: Algorithms 10 AM
Event: Hackathon open

Student question: ${message}`,
          },
        ],
      });

      const reply = completion.choices[0].message.content;

      console.log("AI Reply:", reply);

      res.json({ response: reply });

    } catch (error: any) {
      console.error("❌ OPENAI ERROR FULL:", error?.response?.data || error.message || error);
      res.status(500).json({ error: "OpenAI failed" });
    }
  });

  return httpServer;
}
