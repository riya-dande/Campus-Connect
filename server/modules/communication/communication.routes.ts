import { Router } from "express";
import { chatThreads, counsellors } from "../../data/mockDb";

export const communicationRouter = Router();

communicationRouter.get("/chats", (_req, res) => {
  res.json({ chats: chatThreads });
});

communicationRouter.get("/counsellors", (_req, res) => {
  res.json({ counsellors });
});
