import {
  achievements as fallbackAchievements,
  announcements as fallbackAnnouncements,
  attendanceSummary as fallbackAttendanceSummary,
  chatThreads as fallbackChatThreads,
  classRoutine as fallbackClassRoutine,
  counsellors as fallbackCounsellors,
  examResults as fallbackExamResults,
  examTimeTable as fallbackExamTimeTable,
  hostelInfo as fallbackHostelInfo,
  internships as fallbackInternships,
  studentProfile as fallbackStudentProfile,
} from "../data/mockDb";
import type {
  AchievementItem,
  Announcement,
  AttendanceItem,
  ChatThread,
  ClassRoutineItem,
  CounsellorItem,
  ExamResultItem,
  ExamTimeTableItem,
  HostelInfo,
  InternshipItem,
  StudentProfile,
} from "../types";
import { SUPABASE_COLUMNS, SUPABASE_TABLES } from "./supabaseConfig";
import { fetchAll, fetchSingle, updateById } from "./supabaseRepo";

type AnnouncementRow = Announcement & { is_read?: boolean };

function normalizeAnnouncement(row: AnnouncementRow): Announcement {
  return {
    ...row,
    isRead: row.isRead ?? row.is_read ?? false,
  };
}

export async function getStudentProfile(): Promise<StudentProfile> {
  const profile = await fetchSingle<StudentProfile>(SUPABASE_TABLES.studentProfiles);
  return profile ?? fallbackStudentProfile;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const announcements = await fetchAll<AnnouncementRow>(SUPABASE_TABLES.announcements);
  return announcements ? announcements.map(normalizeAnnouncement) : fallbackAnnouncements;
}

export async function markAnnouncementRead(id: string): Promise<Announcement | null> {
  const updated = await updateById<AnnouncementRow>(
    SUPABASE_TABLES.announcements,
    SUPABASE_COLUMNS.announcements.id,
    id,
    { [SUPABASE_COLUMNS.announcements.isRead]: true },
  );

  if (updated) return normalizeAnnouncement(updated);

  const announcement = fallbackAnnouncements.find((item) => item.id === id);
  if (!announcement) return null;
  announcement.isRead = true;
  return announcement;
}

export async function getChatThreads(): Promise<ChatThread[]> {
  const chats = await fetchAll<ChatThread>(SUPABASE_TABLES.chatThreads);
  return chats ?? fallbackChatThreads;
}

export async function getClassRoutine(): Promise<ClassRoutineItem[]> {
  const routine = await fetchAll<ClassRoutineItem>(SUPABASE_TABLES.classRoutine);
  return routine ?? fallbackClassRoutine;
}

export async function getExamTimeTable(): Promise<ExamTimeTableItem[]> {
  const timetable = await fetchAll<ExamTimeTableItem>(SUPABASE_TABLES.examTimeTable);
  return timetable ?? fallbackExamTimeTable;
}

export async function getExamResults(): Promise<ExamResultItem[]> {
  const results = await fetchAll<ExamResultItem>(SUPABASE_TABLES.examResults);
  return results ?? fallbackExamResults;
}

export async function getAttendanceSummary(): Promise<{ items: AttendanceItem[]; averagePercent: number }> {
  const items = (await fetchAll<AttendanceItem>(SUPABASE_TABLES.attendanceSummary)) ?? fallbackAttendanceSummary;

  const totalHeld = items.reduce((sum, row) => sum + row.held, 0);
  const totalAttend = items.reduce((sum, row) => sum + row.attend, 0);
  const averagePercent = totalHeld === 0 ? 0 : Math.round((totalAttend / totalHeld) * 10) / 10;

  return { items, averagePercent };
}

export async function getCounsellors(): Promise<CounsellorItem[]> {
  const list = await fetchAll<CounsellorItem>(SUPABASE_TABLES.counsellors);
  return list ?? fallbackCounsellors;
}

export async function getAchievements(): Promise<AchievementItem[]> {
  const list = await fetchAll<AchievementItem>(SUPABASE_TABLES.achievements);
  return list ?? fallbackAchievements;
}

export async function getInternships(): Promise<InternshipItem[]> {
  const list = await fetchAll<InternshipItem>(SUPABASE_TABLES.internships);
  return list ?? fallbackInternships;
}

export async function getHostelInfo(): Promise<HostelInfo> {
  const info = await fetchSingle<HostelInfo>(SUPABASE_TABLES.hostelInfo);
  return info ?? fallbackHostelInfo;
}

export async function getEvents(): Promise<{ id: string; title: string; date: string; category: string; location: string }[]> {
  const events = await fetchAll<{ id: string; title: string; date: string; category: string; location: string }>(
    SUPABASE_TABLES.events,
  );

  return (
    events ?? [
      { id: "ev1", title: "Annual Hackathon", date: "2026-03-12", category: "Tech", location: "Innovation Center" },
      { id: "ev2", title: "Placement Workshop", date: "2026-03-15", category: "Career", location: "Seminar Hall" },
      { id: "ev3", title: "Cultural Night", date: "2026-03-20", category: "Campus Life", location: "Main Auditorium" },
    ]
  );
}
