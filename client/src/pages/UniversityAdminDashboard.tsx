import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";

export default function UniversityAdminDashboard() {
  const { user } = useStore();

  return (
    <div className="space-y-6">
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">University Admin Dashboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage universities and colleges across the network.
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button className="rounded-full">Add University</Button>
          <Button variant="outline" className="rounded-full">Add College</Button>
          <Button variant="outline" className="rounded-full">View Colleges</Button>
        </CardContent>
      </Card>

      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Info</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Logged in as <span className="font-semibold text-foreground">{user.name}</span> (University Admin)
        </CardContent>
      </Card>
    </div>
  );
}
