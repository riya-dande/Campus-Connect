import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock3,
  GraduationCap,
  LineChart,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: BookOpen,
      title: "Academic Command Center",
      description: "Track attendance, assignments, and exam prep in one clean workspace.",
    },
    {
      icon: MessageSquare,
      title: "Social + Communication Hub",
      description: "Follow campus life, message peers, and collaborate with clubs and teams.",
    },
    {
      icon: Briefcase,
      title: "Career & Placement Support",
      description: "Practice, prepare, and stay ready for internships and placement drives.",
    },
    {
      icon: Calendar,
      title: "Smart Calendar + Reminders",
      description: "Get timely reminders for classes, deadlines, and campus events.",
    },
  ];

  const outcomes = [
    {
      title: "Students stay organized",
      description: "Daily agenda, tasks, and announcements live in one place.",
      icon: Clock3,
    },
    {
      title: "Teams collaborate faster",
      description: "Study groups and club communications stop getting scattered.",
      icon: Users,
    },
    {
      title: "Mentors guide with context",
      description: "Progress signals help faculty and mentors support students better.",
      icon: Brain,
    },
  ];

  const steps = [
    {
      title: "Sign in and set your profile",
      description: "Add your major, year, and goals so the dashboard adapts to you.",
      icon: ShieldCheck,
    },
    {
      title: "Pick your focus areas",
      description: "Academics, social, events, and career modules are ready from day one.",
      icon: LineChart,
    },
    {
      title: "Get reminders and insights",
      description: "Receive nudges, deadlines, and progress visibility to stay on track.",
      icon: BellRing,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-[-120px] top-[-100px] h-[360px] w-[360px] rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 28, 0], y: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-140px] top-[80px] h-[420px] w-[420px] rounded-full bg-purple-500/15 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-160px] left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                CampusConnect
              </span>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-5"
                onClick={() => setLocation("/login")}
              >
                Log In
              </Button>
              <Button
                size="lg"
                className="rounded-full px-7"
                onClick={() => setLocation("/login")}
              >
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Student-first campus operating system
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="max-w-2xl text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl"
              >
                Your mini project with
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> real campus value</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 max-w-xl text-lg text-muted-foreground"
              >
                CampusConnect introduces exactly what it does at the top level: academics, communication,
                events, and placement readiness. Built to feel modern, clear, and attractive to students.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Button
                  size="lg"
                  className="h-12 rounded-full px-8 font-semibold"
                  onClick={() => setLocation("/login")}
                >
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border/70 px-8 font-semibold"
                  onClick={() => setLocation("/login")}
                >
                  Try Demo Login
                </Button>
              </motion.div>

            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-2xl shadow-primary/10 backdrop-blur-sm"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">What students get</p>
              <div className="space-y-3">
                {[
                  "One dashboard for classes, tasks, and deadlines",
                  "Activity feed + chat for campus communication",
                  "Career prep and placement alerts in context",
                  "Progress signals that motivate daily consistency",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground/90">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Top-level product modules</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Landing now clearly introduces the platform architecture before students log in.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/70 bg-card/90 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">How it works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A simple 3-step flow that makes the project story easy to explain in reviews and demos.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="mb-2 text-sm font-semibold text-primary">Step {index + 1}</p>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Student experience outcomes</h2>
            <p className="mt-4 text-muted-foreground">Focused on usability, speed, and visibility.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border bg-card">
                  <CardContent className="p-6">
                    <outcome.icon className="mb-3 h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{outcome.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{outcome.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary to-purple-600 px-8 py-12 shadow-2xl shadow-primary/20"
          >
            <h2 className="text-3xl font-bold text-white">Ready to showcase your project with impact?</h2>
            <p className="mt-4 text-lg text-white/85">
              A strong landing + matching login builds first impression quality for demos and reviews.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8 h-12 rounded-full px-8 font-semibold"
              onClick={() => setLocation("/login")}
            >
              Continue to Login
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border bg-card py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">CampusConnect</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 CampusConnect. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
