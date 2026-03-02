import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar, MapPin, Clock, Users, Search, Filter,
  Star, Heart, Share, Bookmark, Video, Music,
  Trophy, Briefcase, GraduationCap, Gamepad2,
  Microscope, Palette, Camera, Coffee
} from "lucide-react";
import { useState } from "react";
import billboardImage from '@assets/generated_images/futuristic_digital_billboard_on_campus.png';

export default function EventDiscovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Events", icon: Calendar },
    { id: "academic", label: "Academic", icon: GraduationCap },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "social", label: "Social", icon: Coffee },
    { id: "sports", label: "Sports", icon: Trophy },
    { id: "clubs", label: "Clubs", icon: Users },
    { id: "cultural", label: "Cultural", icon: Palette }
  ];

  const events = [
    {
      id: 1,
      title: "Tech Career Fair 2026",
      category: "career",
      date: "Dec 15, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      attendees: 150,
      maxAttendees: 200,
      description: "Connect with top tech companies and explore internship opportunities",
      organizer: "Career Services",
      tags: ["Tech", "Internships", "Networking"],
      featured: true,
      image: billboardImage
    },
    {
      id: 2,
      title: "AI & ML Workshop",
      category: "academic",
      date: "Dec 18, 2026",
      time: "2:00 PM - 5:00 PM",
      location: "CS Lab 201",
      attendees: 45,
      maxAttendees: 50,
      description: "Hands-on workshop on machine learning fundamentals",
      organizer: "CS Department",
      tags: ["AI", "ML", "Workshop"],
      featured: false,
      virtual: true
    },
    {
      id: 3,
      title: "Winter Formal Dance",
      category: "social",
      date: "Dec 20, 2026",
      time: "8:00 PM - 12:00 AM",
      location: "Student Center Ballroom",
      attendees: 200,
      maxAttendees: 300,
      description: "Annual winter formal with live music and great food",
      organizer: "Student Council",
      tags: ["Dance", "Music", "Formal"],
      featured: true
    },
    {
      id: 4,
      title: "Basketball Championship",
      category: "sports",
      date: "Dec 22, 2026",
      time: "3:00 PM - 6:00 PM",
      location: "Sports Complex",
      attendees: 100,
      maxAttendees: 150,
      description: "Final match of the inter-college basketball tournament",
      organizer: "Sports Committee",
      tags: ["Basketball", "Championship", "Sports"],
      featured: false
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : Calendar;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      career: "bg-blue-500",
      academic: "bg-purple-500",
      social: "bg-pink-500",
      sports: "bg-green-500",
      clubs: "bg-orange-500",
      cultural: "bg-indigo-500"
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              <Icon className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Featured Events */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Featured Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.filter(event => event.featured).map((event) => {
            const Icon = getCategoryIcon(event.category);
            return (
              <Card key={event.id} className="border border-border/50 overflow-hidden hover:shadow-lg transition-shadow">
                {event.image && (
                  <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-500/20 relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getCategoryColor(event.category)} text-white border-none`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {categories.find(cat => cat.id === event.category)?.label}
                      </Badge>
                    </div>
                    {event.virtual && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary">
                          <Video className="w-3 h-3 mr-1" />
                          Virtual
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {event.attendees}/{event.maxAttendees} attending
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      {event.virtual ? 'Join Virtual' : 'Register'}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Events */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Events</h2>
        <div className="space-y-3">
          {filteredEvents.map((event) => {
            const Icon = getCategoryIcon(event.category);
            return (
              <Card key={event.id} className="border border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(event.category)} text-white`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.organizer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {event.virtual && (
                        <Badge variant="secondary" className="text-xs">
                          <Video className="w-3 h-3 mr-1" />
                          Virtual
                        </Badge>
                      )}
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {event.attendees}/{event.maxAttendees} attending
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      {event.virtual ? 'Join Virtual' : 'Register'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}