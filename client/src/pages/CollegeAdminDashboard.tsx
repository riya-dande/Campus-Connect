import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";

export default function CollegeAdminDashboard() {
  const { user } = useStore();

  return (
    <div className="space-y-6">
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">College Admin Dashboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage students and announcements for your college.
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button className="rounded-full">Add Student</Button>
          <Button variant="outline" className="rounded-full">Post Announcement</Button>
          <Button variant="outline" className="rounded-full">View Students</Button>
        </CardContent>
      </Card>

      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Info</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Logged in as <span className="font-semibold text-foreground">{user.name}</span> (College Admin)
        </CardContent>
      </Card>
    </div>
  );
}
