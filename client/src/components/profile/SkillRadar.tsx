import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { subject: 'Technical', A: 120, fullMark: 150 },
  { subject: 'Communication', A: 98, fullMark: 150 },
  { subject: 'Leadership', A: 86, fullMark: 150 },
  { subject: 'Management', A: 99, fullMark: 150 },
  { subject: 'Creativity', A: 85, fullMark: 150 },
  { subject: 'Teamwork', A: 65, fullMark: 150 },
];

export default function SkillRadar() {
  return (
    <Card className="h-full border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-lg font-heading">Skill Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-2 bg-background/80 backdrop-blur rounded-lg border border-border text-xs text-muted-foreground">
            Current Semester
          </div>
        </div>
      </CardContent>
    </Card>
  );
}