import { attendanceSummary, announcements, chatThreads, studentProfile, examResults } from "../data/mockDb";
import { getEvents } from "./data.service";

const timetableSlots = ["09:00-10:00", "10:00-11:00", "11:10-12:10", "12:10-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"];
const timetableRows = [
  {
    day: "Mon",
    slots: ["ACD", "MEFA", "CVPR", "Lunch", "Mini Project-2", "Mini Project-2", "Library"],
  },
  {
    day: "Tue",
    slots: ["ACD", "CVPR", "Library", "Lunch", "PE", "OE", "Sports"],
  },
  {
    day: "Wed",
    slots: ["MEFA", "CVPR", "ACD", "Lunch", "CVPR Lab(B1) / ACS Lab(B2)", "CVPR Lab(B1) / ACS Lab(B2)", "Library"],
  },
  {
    day: "Thu",
    slots: ["CVPR", "PE", "OE", "Lunch", "Aptitude Training", "Aptitude Training", "Aptitude Training"],
  },
  {
    day: "Fri",
    slots: ["CVPR Lab(B2) / ACS Lab(B1)", "CVPR Lab(B2) / ACS Lab(B1)", "Library", "Lunch", "Mini Project-2", "Mini Project-2", "Sports"],
  },
  {
    day: "Sat",
    slots: ["PE", "MEFA", "OE", "Lunch", "Department Activities", "Department Activities", "Department Activities"],
  },
];

function getTodayLabel() {
  const now = new Date();
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: dayLabels[now.getDay()],
    date: now.toLocaleDateString("en-CA"),
  };
}

function buildLibraryHoursResponse() {
  const { day, date } = getTodayLabel();
  const row = timetableRows.find((entry) => entry.day === day);
  if (!row) {
    return `Today (${date}) there is no library hour.`;
  }

  const librarySlots = row.slots
    .map((slot, index) => ({ slot, time: timetableSlots[index] }))
    .filter((entry) => entry.slot.toLowerCase().includes("library"));

  if (librarySlots.length === 0) {
    return `Today (${date}) there is no library hour.`;
  }

  const times = librarySlots.map((entry) => entry.time).join(", ");
  return `Library hours for ${day} (${date}): ${times}.`;
}

function buildExamResultsSummary() {
  if (!examResults.length) {
    return "No exam results are available yet.";
  }

  const lines = examResults.map((row) => `- ${row.subject}: ${row.consolidatedMarks}`);
  return ["Exam Results (Consolidated Marks)", ...lines].join("\n");
}

function buildStudyTrackAnalysis() {
  if (!examResults.length) {
    return "I couldn't find exam results to analyze. Add marks and I can build a study track.";
  }

  const totals = examResults
    .map((row) => ({
      subject: row.subject,
      total: row.consolidatedMarks,
    }))
    .filter((row) => Number.isFinite(row.total));

  if (!totals.length) {
    return "Exam results are missing total marks. Please add consolidated marks.";
  }

  const avg = Math.round(
    (totals.reduce((sum, row) => sum + row.total, 0) / totals.length) * 10,
  ) / 10;
  const sorted = [...totals].sort((a, b) => a.total - b.total);
  const weakest = sorted[0];
  const strongest = sorted[sorted.length - 1];

  const focus = `Focus next: ${weakest.subject} (${weakest.total}).`;
  const keep = `Strongest: ${strongest.subject} (${strongest.total}). Maintain with quick revision.`;
  const strategy =
    avg < 75
      ? "Plan: 2 focused sessions for the weakest subject this week, 1 session for each remaining subject."
      : "Plan: 1 focused session for the weakest subject and 1 mixed revision session this week.";

  return [
    "Study Track Analysis",
    `Average score: ${avg}`,
    focus,
    keep,
    strategy,
  ].join("\n");
}

function buildTimeTableResponse() {
  const headers = ["Day", ...timetableSlots];
  const rows = timetableRows.map((row) => [row.day, ...row.slots]);
  const colWidths = headers.map((header, i) =>
    Math.max(header.length, ...rows.map((row) => (row[i] ?? "").length)),
  );

  const formatRow = (cells: string[]) =>
    cells
      .map((cell, i) => (cell ?? "").padEnd(colWidths[i], " "))
      .join(" | ");

  const divider = colWidths.map((w) => "-".repeat(w)).join("-|-");

  return [
    "Class Timetable",
    formatRow(headers),
    divider,
    ...rows.map(formatRow),
  ].join("\n");
}

export function buildAiInsights() {
  const unreadAnnouncements = announcements.filter((item) => !item.isRead).length;
  const unreadMessages = chatThreads.reduce((sum, chat) => sum + chat.unread, 0);
  const totalHeld = attendanceSummary.reduce((sum, row) => sum + row.held, 0);
  const totalAttend = attendanceSummary.reduce((sum, row) => sum + row.attend, 0);
  const attendancePercent = Math.round((totalAttend / totalHeld) * 10) / 10;

  const insights = [
    {
      id: "attendance",
      title: attendancePercent < 85 ? "Attendance risk detected" : "Attendance is on track",
      description:
        attendancePercent < 85
          ? `Overall attendance is ${attendancePercent}%. Attend the next 4 classes to recover.`
          : `Overall attendance is ${attendancePercent}%. Maintain consistency for exam eligibility.`,
      priority: attendancePercent < 85 ? "high" : "low",
      category: "academic",
    },
    {
      id: "cgpa",
      title: "CGPA improvement strategy",
      description: `Current CGPA is ${studentProfile.cgpa}. Focus on weak subjects and one revision cycle this week.`,
      priority: "medium",
      category: "academic",
    },
    {
      id: "announcements",
      title: "Unread institutional updates",
      description: `${unreadAnnouncements} unread announcements. Review exam and placement notices first.`,
      priority: unreadAnnouncements > 1 ? "high" : "medium",
      category: "academic",
    },
    {
      id: "communication",
      title: "Communication pending",
      description: `${unreadMessages} unread messages in faculty/group chats. Clear urgent threads first.`,
      priority: unreadMessages >= 3 ? "medium" : "low",
      category: "social",
    },
  ];

  return insights;
}

function buildEventsResponse(events: { id: string; title: string; date: string; category: string; location: string }[]) {
  if (!events.length) {
    return "No upcoming events found.";
  }

  const lines = events.map((event) => `- ${event.date} — ${event.title} (${event.category}, ${event.location})`);
  return ["Upcoming Events", ...lines].join("\n");
}

export async function mentorReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("timetable") || text.includes("time table") || text.includes("class routine") || text.includes("schedule")) {
    return buildTimeTableResponse();
  }
  if (text.includes("event")) {
    const events = await getEvents();
    return buildEventsResponse(events);
  }
  if (text.includes("library")) {
    return buildLibraryHoursResponse();
  }
  if (text.includes("study track") || text.includes("study plan") || text.includes("analysis")) {
    return buildStudyTrackAnalysis();
  }
  if (text.includes("result") || text.includes("marks") || text.includes("scores")) {
    return buildExamResultsSummary();
  }
  if (text.includes("attendance")) {
    return `Your current attendance is ${studentProfile.attendance}%. Keep it above 90% for a safer margin.`;
  }
  if (text.includes("cgpa")) {
    return `Your CGPA is ${studentProfile.cgpa}. I suggest one focused revision block daily for your two weakest subjects.`;
  }
  if (text.includes("next class") || text.includes("schedule")) {
    return "Your next scheduled class is at 10:00 AM in LH-3. Check the class routine tab for full details.";
  }
  if (text.includes("placement") || text.includes("internship")) {
    return "Start a 30-minute daily placement sprint: aptitude, resume bullet updates, and one mock interview each week.";
  }

  return "I can help with attendance, schedule, CGPA strategy, placements, and daily planning. Ask me a specific question.";
}
