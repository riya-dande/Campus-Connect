export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  major: string;
  year: string;
  semester: string;
  section: string;
  rollNo: string;
  cgpa: number;
  attendance: number;
  studyHours: number;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
}

export interface Announcement {
  id: string;
  title: string;
  category: "Exam" | "Placement" | "Club" | "Holiday" | "Academic";
  priority: "High" | "Medium" | "Low";
  date: string;
  author: string;
  isRead: boolean;
}

export interface ChatThread {
  id: string;
  name: string;
  type: "faculty" | "group" | "peer";
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface ClassRoutineItem {
  id: string;
  day: string;
  time: string;
  room: string;
  subject: string;
  facultyCode: string;
}

export interface ExamTimeTableItem {
  id: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ExamResultItem {
  id: string;
  subject: string;
  mid1: number;
  mid2: number;
  assignment1: number;
  assignment2: number;
  pptViva: number;
  lab: number;
  consolidatedMarks: number;
}

export interface AttendanceItem {
  id: string;
  subject: string;
  held: number;
  attend: number;
}

export interface CounsellorItem {
  id: string;
  semester: string;
  counsellorName: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface InternshipItem {
  id: string;
  role: string;
  company: string;
  from: string;
  to: string;
  status: "ongoing" | "completed";
}

export interface HostelInfo {
  hostel: string;
  room: string;
  roomType: string;
}
