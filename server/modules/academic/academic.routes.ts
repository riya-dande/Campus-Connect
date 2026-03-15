import { Router } from "express";
import { attendanceSummary, classRoutine, examResults, examTimeTable } from "../../data/mockDb";

export const academicRouter = Router();

academicRouter.get("/class-routine", (_req, res) => {
  res.json({ classRoutine });
});

academicRouter.get("/exam-timetable", (_req, res) => {
  res.json({ examTimeTable });
});

academicRouter.get("/exam-results", (_req, res) => {
  res.json({ examResults });
});

academicRouter.get("/attendance-summary", (_req, res) => {
  const totalHeld = attendanceSummary.reduce((sum, row) => sum + row.held, 0);
  const totalAttend = attendanceSummary.reduce((sum, row) => sum + row.attend, 0);
  const averagePercent = Math.round((totalAttend / totalHeld) * 10) / 10;
  res.json({ attendanceSummary, averagePercent });
});
