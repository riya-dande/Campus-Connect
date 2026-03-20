import { Router } from "express";
import {
  getAttendanceSummary,
  getClassRoutine,
  getExamResults,
  getExamTimeTable,
} from "../../services/data.service";

export const academicRouter = Router();

academicRouter.get("/class-routine", async (_req, res) => {
  const classRoutine = await getClassRoutine();
  res.json({ classRoutine });
});

academicRouter.get("/exam-timetable", async (_req, res) => {
  const examTimeTable = await getExamTimeTable();
  res.json({ examTimeTable });
});

academicRouter.get("/exam-results", async (_req, res) => {
  const examResults = await getExamResults();
  res.json({ examResults });
});

academicRouter.get("/attendance-summary", async (_req, res) => {
  const { items, averagePercent } = await getAttendanceSummary();
  res.json({ attendanceSummary: items, averagePercent });
});
