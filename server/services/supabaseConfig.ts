export const SUPABASE_TABLES = {
  studentProfiles: process.env.SUPABASE_TABLE_STUDENTS ?? "student_profiles",
  announcements: process.env.SUPABASE_TABLE_ANNOUNCEMENTS ?? "announcements",
  chatThreads: process.env.SUPABASE_TABLE_CHATS ?? "chat_threads",
  classRoutine: process.env.SUPABASE_TABLE_CLASS_ROUTINE ?? "class_routine",
  examTimeTable: process.env.SUPABASE_TABLE_EXAM_TIMETABLE ?? "exam_time_table",
  examResults: process.env.SUPABASE_TABLE_EXAM_RESULTS ?? "exam_results",
  attendanceSummary: process.env.SUPABASE_TABLE_ATTENDANCE ?? "attendance_summary",
  counsellors: process.env.SUPABASE_TABLE_COUNSELLORS ?? "counsellors",
  achievements: process.env.SUPABASE_TABLE_ACHIEVEMENTS ?? "achievements",
  internships: process.env.SUPABASE_TABLE_INTERNSHIPS ?? "internships",
  hostelInfo: process.env.SUPABASE_TABLE_HOSTEL ?? "hostel_info",
  events: process.env.SUPABASE_TABLE_EVENTS ?? "events",
};

export const SUPABASE_COLUMNS = {
  announcements: {
    id: process.env.SUPABASE_ANNOUNCEMENTS_ID_COLUMN ?? "id",
    isRead: process.env.SUPABASE_ANNOUNCEMENTS_READ_COLUMN ?? "is_read",
  },
};
