import { motion } from "framer-motion";

const user = {
  name: "Alex Rivera",
  avatar: "https://github.com/shadcn.png",
  major: "Computer Science",
  year: "Junior Year"
};

const badges = [
  { name: 'First Step', color: 'bg-amber-500' },
  { name: 'Consistency', color: 'bg-emerald-500' },
  { name: 'Deep Learner', color: 'bg-blue-500' },
  { name: 'Innovator', color: 'bg-purple-500' },
  { name: 'Leader', color: 'bg-rose-500' },
];

const examResults = [
  { name: "Sem 5 Results", grade: "3.8/4.0", date: "Dec 2025" },
  { name: "Sem 4 Results", grade: "3.7/4.0", date: "June 2025" },
];

const certifications = [
  { name: "AWS Cloud Practitioner", issuer: "Amazon", date: "Jan 2026" },
  { name: "React Mastery", issuer: "Meta", date: "Nov 2025" },
];

const contacts = [
  { label: "Official Email", value: "alex.rivera@campus.edu" },
  { label: "Registry Office", value: "+1 (555) 012-456" },
  { label: "Dean's Office", value: "Academic Block A-102" },
];

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
);

const ClipboardCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
);

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);

const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
);

const BusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
);

const ReceiptIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

export default function Profile() {
  const [activeTab, setActiveTab] = React.useState("journey");

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto p-4 font-sans">
      {/* Premium Header Profile Card */}
      <div className="relative group">
        <div className="h-64 rounded-[2.5rem] bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-indigo-700 overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="px-10 relative -mt-20 flex flex-col md:flex-row items-end md:items-center gap-8 pb-8">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-40 h-40 rounded-full border-8 border-white dark:border-gray-900 shadow-2xl object-cover" />
            <div className="absolute bottom-2 right-2 bg-emerald-500 p-2 rounded-full border-4 border-white dark:border-gray-900 shadow-lg">
              <ShieldCheckIcon />
            </div>
          </div>
          
          <div className="flex-1 mb-2 text-white md:text-gray-900 dark:md:text-white">
             <div className="flex items-center gap-3 mb-1">
               <h1 className="text-4xl font-black tracking-tight text-white">{user.name}</h1>
               <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">Verified Student</span>
             </div>
             <p className="text-white/80 text-xl font-medium">{user.major} • {user.year}</p>
             <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <MapPinIcon />
                  <span className="text-xs font-bold text-white">Campus ID: #CS2024-089</span>
                </div>
             </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button className="rounded-full px-6 py-2.5 shadow-xl shadow-indigo-600/20 bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors">Edit Profile</button>
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition-colors"><DownloadIcon /></button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100/30 dark:bg-gray-800/30 p-1.5 rounded-[2rem] border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm flex">
            {["journey", "repository", "admin"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-10 py-3 font-bold text-sm transition-all ${
                  activeTab === tab 
                    ? "bg-indigo-600 text-white shadow-lg" 
                    : "hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                }`}
              >
                {tab === "journey" ? "My Journey" : tab === "repository" ? "Student Repository" : "Administrative"}
              </button>
            ))}
          </div>
        </div>

        {/* Journey Tab */}
        {activeTab === "journey" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-8">
              <div className="p-8 rounded-[3rem] bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-600">
                    <SparklesIcon />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Personal Growth Tracks</h2>
                    <p className="text-gray-500 text-sm font-medium">Visualizing your evolution through campus life</p>
                  </div>
                </div>
                <div className="h-64 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 rounded-2xl flex items-center justify-center text-gray-400">
                  [Development Path Component]
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 rounded-[3rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/10">
                <div className="p-3 bg-indigo-500/10 rounded-2xl w-fit mb-6 text-indigo-500">
                  <AwardIcon />
                </div>
                <h3 className="font-black text-xl mb-4">Achievement Vault</h3>
                <div className="grid grid-cols-3 gap-4">
                  {badges.map(b => (
                    <motion.div 
                      key={b.name} 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-lg ${b.color}/20`}>
                        <span className={`text-2xl ${b.color.replace('bg-', 'text-')}`}>★</span>
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase text-center leading-tight">{b.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-[3rem] bg-white/40 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-700/50">
                <div className="h-48 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 rounded-2xl flex items-center justify-center text-gray-400">
                  [Skill Radar Component]
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Repository Tab */}
        {activeTab === "repository" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {/* Exam Results */}
            <div className="rounded-[2.5rem] bg-rose-500/5 border border-rose-500/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500">
                  <ClipboardCheckIcon />
                </div>
                <h3 className="font-bold text-lg">Exam Archive</h3>
              </div>
              <div className="space-y-4">
                {examResults.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-[10px] text-gray-500">{item.date}</p>
                    </div>
                    <span className="border border-rose-200 text-rose-600 text-xs px-2 py-1 rounded-full font-bold">{item.grade}</span>
                  </div>
                ))}
                <button className="w-full text-rose-600 font-bold text-xs flex items-center justify-center gap-2 py-2 hover:bg-rose-500/5 rounded-xl transition-colors">
                  View All Results <ChevronRightIcon />
                </button>
              </div>
            </div>

            {/* Fees */}
            <div className="rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                  <CreditCardIcon />
                </div>
                <h3 className="font-bold text-lg">Fee Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/50 dark:bg-black/20">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Current Status</p>
                  <p className="text-2xl font-black text-emerald-600">Paid</p>
                  <p className="text-[10px] text-gray-500 mt-1">Semester 6 Fees: Transaction #89210</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl py-2 text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <ReceiptIcon /> Receipts
                  </button>
                  <button className="flex-1 rounded-xl py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors">Pay Fine</button>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-[2.5rem] bg-indigo-600/5 border border-indigo-600/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-600">
                  <AwardIcon />
                </div>
                <h3 className="font-bold text-lg">Certifications</h3>
              </div>
              <div className="space-y-4">
                {certifications.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-black/20">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                      <GraduationCapIcon />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight">{item.name}</p>
                      <p className="text-[10px] text-gray-500">{item.issuer}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full rounded-2xl bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20 py-3 font-bold text-xs transition-colors">Add Certificate</button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Tab */}
        {activeTab === "admin" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div className="space-y-6">
              <h3 className="text-xl font-black px-2">Campus Logistics</h3>
              <div className="space-y-4">
                <div className="p-6 rounded-[2rem] bg-white/40 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-6 group hover:shadow-md transition-shadow">
                  <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-500">
                    <BusIcon />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-lg">Bus Transport</h4>
                      <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">Active</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Route 24 • Seat A-12 • Shift: Morning</p>
                    <p className="text-[10px] font-bold text-amber-600 mt-2 uppercase tracking-widest">Live: 12 mins to reach</p>
                  </div>
                </div>

                <div className="p-6 rounded-[2rem] bg-white/40 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-6 group hover:shadow-md transition-shadow">
                  <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
                    <BuildingIcon />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-lg">Hostel Residency</h4>
                      <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">Room #304</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Block B • Floor 3 • Type: Standard Double</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-gray-500">Cleaning Status</span>
                        <span className="font-bold text-blue-600">Completed</span>
                      </div>
                      <div className="h-1 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black px-2">Official Contacts</h3>
              <div className="p-8 rounded-[2.5rem] bg-white/40 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-700/50 space-y-6">
                {contacts.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl group-hover:bg-indigo-600/10 group-hover:text-indigo-600 transition-colors">
                      {i === 0 ? <MailIcon /> : i === 1 ? <PhoneIcon /> : <BuildingIcon />}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-bold group-hover:text-indigo-600 transition-colors">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <h4 className="text-xs font-black uppercase mb-4 tracking-widest text-gray-500">Quick Support</h4>
                  <div className="flex gap-3">
                    <button className="flex-1 rounded-2xl font-bold text-xs h-12 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">Raise Ticket</button>
                    <button className="flex-1 rounded-2xl font-bold text-xs h-12 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Contact Proctor</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
