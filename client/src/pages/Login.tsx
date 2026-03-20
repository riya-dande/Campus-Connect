import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/store";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useStore();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 700));
    const result = await login(email, password);

    if (result.success) {
      const role = result.role ?? "student";
      if (role === "university_admin") {
        setLocation("/dashboard/university-admin");
      } else if (role === "college_admin") {
        setLocation("/dashboard/college-admin");
      } else {
        setLocation("/dashboard/student");
      }
    } else {
      setError(result.error ?? "Invalid email or password. If you just signed up, confirm your email first.");
    }

    setIsLoading(false);
  };

  const handleGoogleAuth = () => {
    toast({
      title: "Google Sign-In UI Ready",
      description: "Connect backend OAuth to enable real Google login.",
    });
  };


  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 24, 0], y: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, -16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md"
        >
          <Card className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10">
            <div className="h-1.5 bg-gradient-to-r from-primary to-purple-600" />
            <CardHeader className="pb-4 pt-7 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>Sign in with your campus credentials</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 px-7 pb-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleAuth}
                className="h-11 w-full rounded-xl border-border/80 font-medium"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5 5 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative text-center text-xs uppercase text-muted-foreground">
                <span className="bg-card px-2">or use credentials</span>
                <div className="absolute inset-0 -z-10 flex items-center">
                  <div className="w-full border-t border-border/70" />
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Roll Number / Username / Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="text"
                      placeholder="23xxxxx"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl pl-12"
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    You can use roll number, staff username, or full email.
                  </p>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-xl pl-12 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 h-4 w-4" />
                    <div>
                      <p className="font-medium">Login failed</p>
                      <p className="text-xs text-destructive/90">{error}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  className="h-12 w-full rounded-xl font-semibold"
                  rightIcon={!isLoading ? <ArrowRight className="h-4 w-4" /> : undefined}
                >
                  Login
                </Button>

                
              </form>

              <p className="text-center text-sm text-muted-foreground">
                New to CampusConnect?{" "}
                <button type="button" className="font-semibold text-primary hover:text-primary/80" onClick={() => setLocation("/signup")}>
                  Create account
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
