import {
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

export const demoUsers = [
  { email: "alex@campus.edu", password: "alex123", name: "Alex Rivera" },
  { email: "student@campus.edu", password: "student123", name: "Jordan Smith" },
  { email: "demo@campus.edu", password: "demo123", name: "Demo User" },
];

export const studentProfile: StudentProfile = {
  id: "student-1",
  name: "Alex Rivera",
  email: "alex@campus.edu",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  major: "Computer Science",
  year: "3rd Year",
  semester: "3-2",
  section: "Section D",
  rollNo: "23251A05T0",
  cgpa: 3.8,
  attendance: 92,
  studyHours: 4.5,
  level: 12,
  xp: 2450,
  xpToNext: 550,
  streak: 12,
};

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "End Semester Exam Schedule Released",
    category: "Exam",
    priority: "High",
    date: "Today, 10:00 AM",
    author: "Admin Office",
    isRead: false,
  },
  {
    id: "2",
    title: "Campus Recruitment: Google Drive",
    category: "Placement",
    priority: "High",
    date: "Yesterday",
    author: "Placement Cell",
    isRead: true,
  },
  {
    id: "3",
    title: "Hackathon 2026 Registration Open",
    category: "Club",
    priority: "Medium",
    date: "2 days ago",
    author: "Coding Club",
    isRead: false,
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: "1",
    name: "Prof. Sarah Williams",
    type: "faculty",
    lastMessage: "Please submit your project proposal by Friday.",
    time: "10:30 AM",
    unread: 1,
    online: true,
  },
  {
    id: "2",
    name: "CS Final Year Project",
    type: "group",
    lastMessage: "Dave: I pushed the changes to GitHub.",
    time: "9:15 AM",
    unread: 5,
    online: false,
  },
];

export const classRoutine: ClassRoutineItem[] = [
  { id: "cr1", day: "Monday", time: "09:00-10:00", room: "LH-3", subject: "Automata and Compiler Design", facultyCode: "126BW" },
  { id: "cr2", day: "Monday", time: "10:00-11:00", room: "LH-3", subject: "Managerial Economics and Financial Analysis", facultyCode: "126EG" },
  { id: "cr3", day: "Tuesday", time: "10:00-11:00", room: "LH-3", subject: "Computer Vision and Pattern Recognition", facultyCode: "126DR" },
  { id: "cr4", day: "Tuesday", time: "02:00-03:00", room: "LH-3", subject: "Introduction to Data Analytics", facultyCode: "126KJ" },
];

export const examTimeTable: ExamTimeTableItem[] = [
  { id: "et1", subject: "126EG - Managerial Economics and Financial Analysis", date: "2026-02-02", startTime: "10:00", endTime: "12:00" },
  { id: "et2", subject: "126BW - Automata and Compiler Design", date: "2026-02-03", startTime: "10:00", endTime: "12:00" },
  { id: "et3", subject: "126DR - Computer Vision and Pattern Recognition", date: "2026-02-04", startTime: "10:00", endTime: "12:00" },
];

export const examResults: ExamResultItem[] = [
  { id: "er1", subject: "Automata and Compiler Design", mid1: 20, mid2: 18, assignment1: 9, assignment2: 10, pptViva: 8, lab: 18, consolidatedMarks: 83 },
  { id: "er2", subject: "Computer Vision and Pattern Recognition", mid1: 18, mid2: 19, assignment1: 9, assignment2: 9, pptViva: 9, lab: 19, consolidatedMarks: 83 },
  { id: "er3", subject: "Managerial Economics and Financial Analysis", mid1: 17, mid2: 18, assignment1: 8, assignment2: 9, pptViva: 8, lab: 17, consolidatedMarks: 77 },
];

export const attendanceSummary: AttendanceItem[] = [
  { id: "at1", subject: "Automata and Compiler Design", held: 39, attend: 30 },
  { id: "at2", subject: "Computer Vision and Pattern Recognition", held: 45, attend: 38 },
  { id: "at3", subject: "Managerial Economics and Financial Analysis", held: 34, attend: 29 },
  { id: "at4", subject: "Mini Project-2", held: 42, attend: 36 },
];

export const counsellors: CounsellorItem[] = [
  { id: "co1", semester: "3-2", counsellorName: "Dr. Venkata Lalita Parameswari Dantu" },
  { id: "co2", semester: "3-1", counsellorName: "Dr. Sharada Adepu" },
];

export const achievements: AchievementItem[] = [
  { id: "ac1", title: "First Steps", description: "Complete your first task", rarity: "common", unlocked: true, progress: 1, maxProgress: 1 },
  { id: "ac2", title: "Study Streak", description: "Maintain a 7-day study streak", rarity: "rare", unlocked: true, progress: 12, maxProgress: 7 },
  { id: "ac3", title: "Social Butterfly", description: "Connect with 50 peers", rarity: "epic", unlocked: false, progress: 23, maxProgress: 50 },
];

export const internships: InternshipItem[] = [
  { id: "in1", role: "Frontend Intern", company: "CampusConnect Labs", from: "2026-05", to: "2026-07", status: "ongoing" },
];

export const hostelInfo: HostelInfo = {
  hostel: "H2",
  room: "317",
  roomType: "A/C with Attached Toilets",
};
