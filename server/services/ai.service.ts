import { attendanceSummary, announcements, chatThreads, studentProfile } from "../data/mockDb";

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

export function mentorReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("attendance")) {
    return `Your current attendance is ${studentProfile.attendance}%. Keep it above 90% for a safer margin.`;
  }
  if (text.includes("cgpa") || text.includes("result")) {
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
