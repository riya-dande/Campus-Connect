import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORIES = [
  { id: 1, user: "Tech Club", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop", active: true },
  { id: 2, user: "Music Fest", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=100&h=100&fit=crop", active: true },
  { id: 3, user: "Alex R.", image: "https://github.com/shadcn.png", active: false },
  { id: 4, user: "Sports Hub", image: "https://images.unsplash.com/photo-1461896756986-930d04b1207e?w=100&h=100&fit=crop", active: true },
  { id: 5, user: "Art Society", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&h=100&fit=crop", active: false },
];

const TRENDING_TOPICS = [
  { tag: "#Hackathon2026", posts: "1.2k", growth: "up" },
  { tag: "#CampusFest", posts: "850", growth: "up" },
  { tag: "#CanteenReview", posts: "420", growth: "down" },
  { tag: "#ExamMemes", posts: "2.5k", growth: "up" },
];

const FEEDS = [
  {
    id: 1,
    user: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", badge: "Influencer" },
    content: "Just finished the 48-hour hackathon! 🚀 Our team built an AI that predicts canteen queue times. So proud of everyone! #Hackathon2026 #CodeLife",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop",
    likes: 245,
    comments: 42,
    time: "2h ago",
    isHot: true
  },
  {
    id: 2,
    user: { name: "Department of AI", avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop", badge: "Official" },
    content: "Guest lecture by Dr. Aris today at 3 PM in the Main Auditorium. Topics: Quantum Neural Networks. Don't miss out! 🎓",
    likes: 156,
    comments: 12,
    time: "4h ago",
    isHot: false
  }
];

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
);

const FlameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const TrendingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
);

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
);

const SmileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
);

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);

export default function SocialHub() {
  const [activeTab, setActiveTab] = useState("for-you");

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pb-20 p-4 font-sans">
      {/* Left Sidebar */}
      <div className="hidden lg:flex flex-col w-72 shrink-0 space-y-6 sticky top-24 h-fit">
        <div className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-200/50 dark:border-gray-700/50">
          <div className="space-y-2">
            {[
              { icon: GlobeIcon, label: "Explore", id: "for-you" },
              { icon: UsersIcon, label: "Clubs", id: "clubs" },
              { icon: StarIcon, label: "Bookmarks", id: "bookmarks" },
              { icon: TrendingIcon, label: "Leaderboard", id: "ranks" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-start gap-4 h-12 px-4 rounded-2xl font-bold transition-all ${
                  activeTab === item.id 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "hover:bg-indigo-600/10 hover:text-indigo-600"
                }`}
              >
                <item.icon />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-2 mb-6">
            <TrendingIcon />
            <h3 className="font-black text-sm uppercase tracking-widest">Trending Now</h3>
          </div>
          <div className="space-y-6">
            {TRENDING_TOPICS.map((topic) => (
              <div key={topic.tag} className="group cursor-pointer">
                <p className="font-bold text-sm group-hover:text-indigo-600 transition-colors">{topic.tag}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-gray-500 font-medium">{topic.posts} posts</p>
                  {topic.growth === "up" ? (
                    <span className="bg-emerald-500/10 text-emerald-500 text-[8px] px-2 py-0.5 rounded-full font-bold">Rising</span>
                  ) : (
                    <span className="bg-rose-500/10 text-rose-500 text-[8px] px-2 py-0.5 rounded-full font-bold">Quiet</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Feed */}
      <div className="flex-1 space-y-8">
        {/* Stories Section */}
        <div className="relative overflow-x-auto">
          <div className="flex gap-4 pb-4">
            <div className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
              <div className="w-20 h-20 rounded-[2rem] bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-600/5 transition-all">
                <PlusIcon />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Post</span>
            </div>
            
            {STORIES.map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center gap-2 shrink-0 cursor-pointer"
              >
                <div className={`w-20 h-20 rounded-[2rem] p-1 transition-all ${
                  story.active 
                    ? "bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 shadow-lg shadow-indigo-600/20" 
                    : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  <div className="w-full h-full rounded-[1.8rem] bg-white dark:bg-gray-900 p-1">
                    <img src={story.image} alt={story.user} className="w-full h-full rounded-[1.6rem] object-cover" />
                  </div>
                </div>
                <span className="text-[10px] font-bold truncate w-20 text-center">{story.user}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Create Post Card */}
        <div className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-indigo-600/5">
          <div className="flex gap-4">
            <img src="https://github.com/shadcn.png" alt="Avatar" className="w-12 h-12 rounded-2xl object-cover" />
            <div className="flex-1">
              <input 
                type="text"
                placeholder="What's happening on campus?" 
                className="w-full bg-gray-100/50 dark:bg-gray-800/50 border-none rounded-2xl h-12 px-6 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-1">
                  {[
                    { icon: ImageIcon, color: "text-blue-500", label: "Media" },
                    { icon: VideoIcon, color: "text-emerald-500", label: "Live" },
                    { icon: MusicIcon, color: "text-amber-500", label: "Audio" },
                    { icon: SmileIcon, color: "text-rose-500", label: "Feeling" },
                  ].map((item) => (
                    <button key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-xs h-9 transition-colors">
                      <span className={item.color}><item.icon /></span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </button>
                  ))}
                </div>
                <button className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-8 font-black text-white h-10 shadow-lg shadow-indigo-600/20 transition-colors">Post</button>
              </div>
            </div>
          </div>
        </div>

        {/* Post Feeds */}
        <AnimatePresence>
          <div className="space-y-8">
            {FEEDS.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[3rem] border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={post.user.avatar} alt={post.user.name} className="w-14 h-14 rounded-2xl border-2 border-indigo-600/20 object-cover" />
                          {post.isHot && (
                            <div className="absolute -top-1 -right-1 bg-rose-500 p-1 rounded-lg border-2 border-white dark:border-gray-900">
                              <FlameIcon />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black tracking-tight">{post.user.name}</h4>
                            <span className={`text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full font-black ${
                              post.user.badge === "Official" 
                                ? "bg-indigo-600 text-white" 
                                : "bg-amber-400 text-amber-950"
                            }`}>
                              {post.user.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 font-bold">{post.time} • Public</p>
                        </div>
                      </div>
                      <button className="p-2 rounded-full opacity-40 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                        <MoreIcon />
                      </button>
                    </div>

                    <p className="text-lg font-medium leading-relaxed mb-6">
                      {post.content.split(' ').map((word, j) => 
                        word.startsWith('#') ? (
                          <span key={j} className="text-indigo-600 font-bold cursor-pointer hover:underline mr-1">{word} </span>
                        ) : word + ' '
                      )}
                    </p>

                    {post.image && (
                      <div className="rounded-[2.5rem] overflow-hidden mb-8 border border-gray-200/30 dark:border-gray-700/30 group-hover:scale-[1.01] transition-transform duration-700">
                        <img src={post.image} className="w-full h-auto object-cover" alt="Post content" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full hover:bg-rose-500/10 hover:text-rose-500 transition-colors group/btn">
                          <HeartIcon />
                          <span className="font-black text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full hover:bg-indigo-600/10 hover:text-indigo-600 transition-colors">
                          <MessageIcon />
                          <span className="font-black text-sm">{post.comments}</span>
                        </button>
                      </div>
                      <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <ShareIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* Right Sidebar */}
      <div className="hidden xl:flex flex-col w-80 shrink-0 space-y-8 sticky top-24 h-fit">
        <div className="p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-[3rem] shadow-xl shadow-indigo-600/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 rounded-xl">
                <StarIcon />
              </div>
              <h3 className="font-black text-sm uppercase tracking-widest">Top Creators</h3>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex items-center justify-between bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black opacity-60">#{rank}</span>
                    <img src={`https://i.pravatar.cc/100?u=${rank}`} alt={`User ${rank}`} className="w-8 h-8 rounded-xl border border-white/20 object-cover" />
                    <span className="text-xs font-bold">User_{rank}</span>
                  </div>
                  <span className="bg-white/20 text-white text-[8px] px-2 py-1 rounded-full font-bold">+{1200 / rank} XP</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-white text-indigo-600 hover:bg-white/90 font-black rounded-2xl h-11 text-xs transition-colors">View Rankings</button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[3rem] border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="font-black text-sm uppercase tracking-widest mb-6 px-2">Discover Clubs</h3>
          <div className="space-y-6">
            {[
              { name: "Photography", members: "1.2k", color: "bg-blue-500" },
              { name: "Entrepreneurship", members: "850", color: "bg-rose-500" },
              { name: "Anime Society", members: "2.4k", color: "bg-amber-500" },
            ].map((club) => (
              <div key={club.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold ${club.color}`}>
                    {club.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-black group-hover:text-indigo-600 transition-colors">{club.name}</p>
                    <p className="text-[10px] text-gray-500 font-bold">{club.members} members</p>
                  </div>
                </div>
                <button className="px-4 h-8 text-[10px] font-black border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors">Join</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
