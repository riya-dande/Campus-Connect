import { Router } from "express";

export const eventsRouter = Router();

eventsRouter.get("/", (_req, res) => {
  res.json({
    events: [
      { id: "ev1", title: "Annual Hackathon", date: "2026-03-12", category: "Tech", location: "Innovation Center" },
      { id: "ev2", title: "Placement Workshop", date: "2026-03-15", category: "Career", location: "Seminar Hall" },
      { id: "ev3", title: "Cultural Night", date: "2026-03-20", category: "Campus Life", location: "Main Auditorium" },
    ],
  });
});
