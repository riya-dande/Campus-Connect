# CampusConnect - Complete UI/UX Redesign Plan

## Project Overview
Transform CampusConnect into a comprehensive student engagement platform with a modern, intuitive interface following the user's detailed specifications.

---

## Phase 1: Landing Page (Home)

### 1.1 Landing Page Structure
- **Hero Section**: Platform introduction with animated visuals
- **Features Section**: Key platform capabilities (4-6 cards)
- **Testimonials**: Student/ alumni success stories
- **CTA Section**: Login and Sign Up buttons
- **Footer**: Links, contact info, social media

### 1.2 Pages Required
- `Landing.tsx` - Main landing page with marketing content

---

## Phase 2: Authentication

### 2.1 Existing Components (Already Implemented)
- Login page with form validation
- Demo credentials system
- Error handling

### 2.2 New Components
- `Signup.tsx` - Registration page (optional)
- For now, use existing login with demo accounts

---

## Phase 3: Dashboard Layout

### 3.1 Updated Sidebar Structure
```
Sidebar Navigation:
├── 📊 Dashboard (Overview)
├── 🔗 Hub (Social + Professional)
├── 🏫 Campus Zones
│   ├── Academics
│   ├── Placements
│   └── Extra-curricular
└── 👤 Profile
```

### 3.2 Shell Component Updates
- Modify Shell.tsx to support new navigation
- Add collapsible sidebar
- Add user avatar and quick actions
- Responsive design for mobile

---

## Phase 4: Dashboard Page

### 4.1 Overview Components
- **Welcome Banner**: Student name, greeting, quick stats
- **Attendance Card**: Today's attendance, weekly overview
- **CGPA Tracker**: Current CGPA, semester progress
- **Performance Widget**: Recent grades, trends
- **Calendar Widget**: Upcoming events, deadlines
- **To-Do List**: Task creation, completion, prioritization
- **Daily Schedule**: Timetable view for the day
- **AI Insights Card**: Personalized tips, reminders

### 4.2 Components to Create
- `components/dashboard/WelcomeBanner.tsx`
- `components/dashboard/AttendanceCard.tsx`
- `components/dashboard/CGPAWidget.tsx`
- `components/dashboard/PerformanceWidget.tsx`
- `components/dashboard/CalendarWidget.tsx`
- `components/dashboard/TodoList.tsx`
- `components/dashboard/ScheduleWidget.tsx`
- `components/dashboard/AIInsights.tsx`

---

## Phase 5: Hub Page (Social + Professional)

### 5.1 Hub Sections
- **Posts Feed**: Social media style posts with likes, comments, shares
- **Connect**: Find and connect with peers, alumni, seniors
- **Messages**: Direct messaging and chat rooms
- **Groups**: Create and join study groups, clubs
- **Club Corner**: Discover and manage campus clubs

### 5.2 Components to Create
- `components/hub/PostsFeed.tsx`
- `components/hub/ConnectPanel.tsx`
- `components/hub/MessagesPanel.tsx`
- `components/hub/GroupsList.tsx`
- `components/hub/ClubCorner.tsx`
- `components/hub/CreatePost.tsx`

---

## Phase 6: Campus Zones

### 6.1 Academics Zone
- **Courses**: All enrolled courses per semester
- **Faculty**: Professor info, office hours, contact
- **Semester Weightage**: Grade distribution, credits
- **Attendance**: Per-course attendance tracking
- **Grades**: Internal assessments, exams, final grades
- **Study Groups**: Join/create study groups
- **Assignments**: Pending, submitted, graded
- **Projects Corner**: Project submissions, milestones
- **Resources**: Notes, PDFs, video links
- **Exam Zone**: Previous papers, practice tests
- **AI Insights**: Flashcards, reminders, tips
- **Counseling**: Book appointment, mental health resources
- **Feedback**: Course feedback forms

### 6.2 Placement Zone
- **Performance**: CGPA, skills dashboard
- **Events**: Placement drives, company visits
- **Courses**: Recommended courses for placements
- **Problems**: Practice problems, coding challenges
- **Tips**: Resume tips, interview prep
- **Learning Plans**: Journey-based skill development

### 6.3 Extra-Curricular Zone
- **Club Activities**: List of all clubs
- **Events**: Cultural, technical, sports events
- **Volunteering**: Volunteer opportunities
- **Sports**: intramural sports, gym access

### 6.4 Components to Create
- `components/campus/AcademicsMain.tsx`
- `components/campus/CourseCard.tsx`
- `components/campus/FacultyList.tsx`
- `components/campus/GradeTracker.tsx`
- `components/campus/AttendanceTracker.tsx`
- `components/campus/AssignmentList.tsx`
- `components/campus/ExamZone.tsx`
- `components/campus/StudyGroups.tsx`
- `components/campus/PlacementZone.tsx`
- `components/campus/ExtraCurricular.tsx`

---

## Phase 7: Profile Page

### 7.1 Profile Sections
- **Personal Info**: Name, photo, student ID, email, phone
- **Academic Info**: Major, year, semester, CGPA
- **Fee Details**: Pending fees, payment history
- **Scholarships**: Applied, received, eligible
- **Hostel/Bus**: Room details, bus route
- **Documents**:上传 certificates, documents
- **ID Card**: Digital ID card with QR code
- **Library**: Borrowed books, due dates
- **Notifications**: Recent updates, alerts

### 7.2 Components to Create
- `components/profile/PersonalInfo.tsx`
- `components/profile/AcademicDetails.tsx`
- `components/profile/FeeDetails.tsx`
- `components/profile/Scholarships.tsx`
- `components/profile/HostelBus.tsx`
- `components/profile/Documents.tsx`
- `components/profile/DigitalID.tsx`
- `components/profile/LibraryCard.tsx`
- `components/profile/Notifications.tsx`

---

## Implementation Order

1. **Week 1**: Landing Page + Shell Layout
2. **Week 2**: Dashboard Overview + Widgets
3. **Week 3**: Hub Page + Social Features
4. **Week 4**: Campus Zones - Academics
5. **Week 5**: Campus Zones - Placements + Extra
6. **Week 6**: Profile Page + Final Polish

---

## Design Guidelines (Match Existing UI)

- **Color Palette**: Primary (indigo/purple), white backgrounds, subtle shadows
- **Typography**: Same font families as existing components
- **Components**: Use existing shadcn/ui components
- **Animations**: Framer Motion for transitions
- **Responsive**: Mobile-first design with collapsible sidebar
- **Icons**: Lucide React icons throughout
