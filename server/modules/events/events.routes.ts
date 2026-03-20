import { Router } from "express";
import { getEvents } from "../../services/data.service";

export const eventsRouter = Router();

eventsRouter.get("/", async (_req, res) => {
  const events = await getEvents();
  res.json({ events });
});
