import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Star, ArrowRight, ExternalLink } from "lucide-react";

const recommendedAlumni = [
  {
    id: 1,
    name: "Dr. Elena Chen",
    role: "Senior AI Researcher @ Google",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    tags: ["Machine Learning", "Career Advice"],
    isLive: true,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Product Lead @ Stripe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    tags: ["Product Management", "Entrepreneurship"],
    isLive: false,
  },
];

export default function AlumniSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold">Recommended Alumni</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          View All <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recommendedAlumni.map((alumni) => (
          <motion.div
            key={alumni.id}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
          >
            <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-md">
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border-2 border-primary/10">
                      <AvatarImage src={alumni.avatar} />
                      <AvatarFallback>{alumni.name[0]}</AvatarFallback>
                    </Avatar>
                    {alumni.isLive && (
                      <span className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-rose-500 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full ring-2 ring-background">
                        <Video className="w-2 h-2 fill-white" /> LIVE
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{alumni.name}</h3>
                    <p className="text-xs text-muted-foreground truncate mb-2">{alumni.role}</p>
                    <div className="flex flex-wrap gap-1">
                      {alumni.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {alumni.isLive && (
                  <Button className="w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 group">
                    Join Live Talk <ExternalLink className="ml-2 w-3 h-3 group-hover:scale-110 transition-transform" />
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
