import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    toast({
      title: "Account created (UI Demo)",
      description: "Signup screen is ready. Connect backend API to persist users.",
    });
    setLocation("/login");
  };

  const handleGoogleSignup = () => {
    toast({
      title: "Google Sign-Up UI Ready",
      description: "Connect backend OAuth to enable real Google signup.",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 18, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl"
          animate={{ x: [0, -22, 0], y: [0, -14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.section
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block"
        >
          <div className="rounded-3xl border border-border/70 bg-slate-950 p-8 text-white shadow-2xl shadow-primary/20">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold">CampusConnect</p>
                <p className="text-sm text-white/70">Create your student account</p>
              </div>
            </div>

            <h1 className="max-w-lg text-4xl font-bold leading-tight">
              Sign up once. Unlock your full campus ecosystem.
            </h1>
            <p className="mt-4 max-w-xl text-white/75">
              Built for student identity, collaboration, and progress tracking with a clean purple-first style.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Join your department and year community",
                "Track academics and discover campus events",
                "Get one identity across all CampusConnect modules",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md"
        >
          <Card className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10">
            <div className="h-1.5 bg-gradient-to-r from-primary to-purple-600" />
            <CardHeader className="pb-4 pt-7 text-center">
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription>Sign up with Google or credentials</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 px-7 pb-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignup}
                className="h-11 w-full rounded-xl border-border/80 font-medium"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5 5 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </Button>

              <div className="relative text-center text-xs uppercase text-muted-foreground">
                <span className="bg-card px-2">or use credentials</span>
                <div className="absolute inset-0 -z-10 flex items-center">
                  <div className="w-full border-t border-border/70" />
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Alex Rivera"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 rounded-xl pl-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    College Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@campus.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl pl-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-xl pl-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 rounded-xl pl-12"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isLoading}
                  loadingText="Creating account..."
                  className="h-12 w-full rounded-xl font-semibold"
                  rightIcon={!isLoading ? <ArrowRight className="h-4 w-4" /> : undefined}
                >
                  Create Account
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button type="button" className="font-semibold text-primary hover:text-primary/80" onClick={() => setLocation("/login")}>
                  Login
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
