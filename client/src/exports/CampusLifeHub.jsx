import { motion } from "framer-motion";

const spots = [
  { id: 1, name: "Central Lawn", activity: "32 students here", details: "Frisbee match in progress", color: "bg-emerald-500", heat: "high" },
  { id: 2, name: "Library Annex", activity: "Quiet Zone • 85% full", details: "Best for focused study", color: "bg-blue-500", heat: "low" },
  { id: 3, name: "Main Canteen", activity: "Happy Hour: 20% off", details: "Live acoustic session starts at 4 PM", color: "bg-amber-500", heat: "medium" },
  { id: 4, name: "Innovation Lab", activity: "12 creators active", details: "3D printer available", color: "bg-indigo-500", heat: "medium" },
];

const NavigationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
);

const GiftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
);

const FlameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-rose-500 fill-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
);

const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
);

const GamepadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
);

const CoffeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

const iconMap = {
  Users: UsersIcon,
  BookOpen: BookOpenIcon,
  Coffee: CoffeeIcon,
  Zap: ZapIcon,
};

export default function CampusLifeHub() {
  return (
    <div className="space-y-6 p-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500">
            <NavigationIcon />
          </div>
          <h2 className="text-xl font-black">Live Radar</h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Real-time</span>
        </div>
      </div>

      {/* Interactive Visual Map */}
      <div className="relative aspect-[4/3] w-full bg-gray-100/30 dark:bg-gray-800/30 rounded-[2rem] border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-radial from-indigo-600/5 to-transparent" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {spots.map((spot, i) => (
          <motion.div
            key={spot.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="absolute"
            style={{ 
              top: `${20 + (i * 18)}%`, 
              left: `${15 + (i * 20) + (i % 2 * 10)}%` 
            }}
          >
            <div className="relative group/node">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-4 h-4 rounded-full blur-[2px] opacity-40 ${spot.color}`}
              />
              <div className={`absolute top-0 left-0 w-4 h-4 rounded-full ring-2 ring-white shadow-lg z-10 ${spot.color}`} />
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-all pointer-events-none whitespace-nowrap z-20">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 px-3 py-1.5 rounded-xl shadow-xl text-[10px] font-bold">
                  {spot.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="absolute bottom-4 left-4 right-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div className="flex items-center gap-3">
            <ActivityIcon />
            <p className="text-[10px] font-medium leading-tight">
              <span className="font-bold text-indigo-600">Trend:</span> The <span className="underline decoration-indigo-600/30 decoration-2">Central Lawn</span> is the most active spot right now.
            </p>
          </div>
        </div>
      </div>

      {/* Points & Coupons */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20 rounded-3xl relative overflow-hidden group cursor-pointer active:scale-95 transition-transform">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <ZapIcon />
              <span className="bg-white/20 text-[8px] px-2 py-0.5 rounded-full font-bold">BOOST</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Daily Points</p>
            <p className="text-2xl font-black">2,450</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
        </div>

        <div className="p-4 bg-gradient-to-br from-indigo-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/20 rounded-3xl relative overflow-hidden group cursor-pointer active:scale-95 transition-transform">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <GiftIcon />
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[8px] font-bold">{i}</div>
                ))}
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Coupons</p>
            <p className="text-2xl font-black">3 Active</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
        </div>
      </div>

      {/* Spots List */}
      <div className="space-y-3">
        {spots.map((spot) => (
          <motion.div
            key={spot.id}
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-600/30 transition-all cursor-pointer group"
          >
            <div className={`p-2.5 rounded-xl text-white shadow-md ${spot.color}`}>
              {spot.id === 1 ? <UsersIcon /> : spot.id === 2 ? <BookOpenIcon /> : spot.id === 3 ? <CoffeeIcon /> : <ZapIcon />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold group-hover:text-indigo-600 transition-colors">{spot.name}</h4>
                {spot.heat === "high" && <FlameIcon />}
              </div>
              <p className="text-[10px] text-gray-500 font-medium leading-tight">{spot.activity}</p>
              <p className="text-[9px] text-gray-400 italic mt-0.5">{spot.details}</p>
            </div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-100 dark:hover:bg-gray-800">
              <UserPlusIcon />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button className="flex-1 rounded-2xl h-12 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-600/50 hover:bg-indigo-600/5 group transition-colors">
          <GamepadIcon />
          <span className="text-xs font-bold">Quick Game</span>
        </button>
        <button className="flex-1 rounded-2xl h-12 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-600/50 hover:bg-indigo-600/5 group transition-colors">
          <CoffeeIcon />
          <span className="text-xs font-bold">Find Buddy</span>
        </button>
      </div>
    </div>
  );
}
