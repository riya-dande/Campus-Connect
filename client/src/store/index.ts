import { create } from 'zustand';
import { supabase } from "@/lib/supabaseClient";

export interface Announcement {
  id: string;
  title: string;
  category: 'Exam' | 'Placement' | 'Club' | 'Holiday' | 'Academic';
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  author: string;
  isRead: boolean;
  isSaved: boolean;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  image?: string;
  caption: string;
  likes: number;
  comments: number;
  type: 'post' | 'poll' | 'event';
  timeAgo: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  type: 'faculty' | 'group' | 'peer';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
    major: string;
    year: string;
    cgpa: number;
    attendance: number;
    studyHours: number;
    mood: number; // 0-100
    level: number;
    xp: number;
    xpToNext: number;
    streak: number;
  };
  announcements: Announcement[];
  posts: Post[];
  chats: Chat[];
  achievements: Achievement[];
  activeTab: 'announcements' | 'feed' | 'chats';
  setActiveTab: (tab: 'announcements' | 'feed' | 'chats') => void;
  toggleLike: (postId: string) => void;
  markRead: (id: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Demo credentials for testing
// Removed demo credentials

export const useStore = create<UserState>((set) => ({
  isAuthenticated: false,
  user: {
    name: "Alex Rivera",
    email: "alex@campus.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    major: "Computer Science",
    year: "3rd Year",
    cgpa: 3.8,
    attendance: 92,
    studyHours: 4.5,
    mood: 75,
    level: 12,
    xp: 2450,
    xpToNext: 550,
    streak: 12,
  },
  activeTab: 'announcements',
  setActiveTab: (tab) => set({ activeTab: tab }),
  announcements: [
    {
      id: '1',
      title: 'End Semester Exam Schedule Released',
      category: 'Exam',
      priority: 'High',
      date: 'Today, 10:00 AM',
      author: 'Admin Office',
      isRead: false,
      isSaved: false,
    },
    {
      id: '2',
      title: 'Campus Recruitment: Google Drive',
      category: 'Placement',
      priority: 'High',
      date: 'Yesterday',
      author: 'Placement Cell',
      isRead: true,
      isSaved: true,
    },
    {
      id: '3',
      title: 'Hackathon 2024 Registration Open',
      category: 'Club',
      priority: 'Medium',
      date: '2 days ago',
      author: 'Coding Club',
      isRead: true,
      isSaved: false,
    },
    {
      id: '4',
      title: 'Library Closed for Renovation',
      category: 'Academic',
      priority: 'Low',
      date: 'Last week',
      author: 'Librarian',
      isRead: true,
      isSaved: false,
    }
  ],
  posts: [
    {
      id: '1',
      author: 'Photography Club',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Photo',
      image: '/attached_assets/generated_images/modern_college_campus_students_studying_outdoors.png',
      caption: 'Beautiful study vibes on the main lawn today! ☀️📚 #CampusLife',
      likes: 124,
      comments: 12,
      type: 'post',
      timeAgo: '2h'
    },
    {
      id: '2',
      author: 'Student Council',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Council',
      caption: 'Poll: Which artist do you want for the Cultural Fest?',
      likes: 450,
      comments: 89,
      type: 'poll',
      timeAgo: '5h'
    },
    {
      id: '3',
      author: 'Music Society',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Music',
      image: '/attached_assets/generated_images/college_campus_event_concert_or_festival.png',
      caption: 'Last night was electric! Thanks to everyone who came out. 🎸',
      likes: 892,
      comments: 45,
      type: 'event',
      timeAgo: '1d'
    }
  ],
  chats: [
    {
      id: '1',
      name: 'Prof. Sarah Williams',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      lastMessage: 'Please submit your project proposal by Friday.',
      time: '10:30 AM',
      unread: 1,
      online: true,
      type: 'faculty'
    },
    {
      id: '2',
      name: 'CS Final Year Project',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Project',
      lastMessage: 'Dave: I pushed the changes to GitHub.',
      time: '9:15 AM',
      unread: 5,
      online: false,
      type: 'group'
    },
    {
      id: '3',
      name: 'Jessica Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
      lastMessage: 'Are you going to the hackathon?',
      time: 'Yesterday',
      unread: 0,
      online: true,
      type: 'peer'
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first task',
      icon: '🎯',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Study Streak',
      description: 'Maintain a 7-day study streak',
      icon: '🔥',
      unlocked: true,
      progress: 12,
      maxProgress: 7,
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Connect with 50 peers',
      icon: '🦋',
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Academic Excellence',
      description: 'Achieve a GPA above 3.8',
      icon: '🎓',
      unlocked: true,
      progress: 3.8,
      maxProgress: 3.8,
      rarity: 'legendary'
    },
    {
      id: '5',
      title: 'Event Explorer',
      description: 'Attend 10 campus events',
      icon: '🎪',
      unlocked: false,
      progress: 7,
      maxProgress: 10,
      rarity: 'rare'
    }
  ],
  toggleLike: (postId) => set((state) => ({
    posts: state.posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p)
  })),
  markRead: (id) => set((state) => ({
    announcements: state.announcements.map(a => a.id === id ? { ...a, isRead: true } : a)
  })),
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      set({ isAuthenticated: false });
      return false;
    }
    // Fetch user profile from Supabase if needed
    set({
      isAuthenticated: true,
      user: {
        ...useStore.getState().user,
        name: data.user.user_metadata?.name || data.user.email,
        email: data.user.email,
        avatar: data.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`,
        // ...other fields as needed
      }
    });
    return true;
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ 
      isAuthenticated: false,
      user: {
        name: "",
        email: "",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        major: "Computer Science",
        year: "3rd Year",
        cgpa: 3.8,
        attendance: 92,
        studyHours: 4.5,
        mood: 75,
        level: 12,
        xp: 2450,
        xpToNext: 550,
        streak: 12,
      }
    });
  }
}));
