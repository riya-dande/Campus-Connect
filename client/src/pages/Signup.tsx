import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/store";

type University = { id: string; name: string; domain: string };
type College = { id: string; university_id: string; college_name: string; domain: string };
type Role = "university_admin" | "college_admin" | "student";
type StaffRole = "management" | "dean" | "hod" | "faculty";
type Department = "cse" | "eee" | "ece" | "it" | "etm" | "csd" | "csm";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useStore();

  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [year, setYear] = useState("");
  const [empId, setEmpId] = useState("");
  const [staffRole, setStaffRole] = useState<StaffRole>("faculty");
  const [department, setDepartment] = useState<Department>("cse");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [universities, setUniversities] = useState<University[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [universityId, setUniversityId] = useState<string>("");
  const [collegeId, setCollegeId] = useState<string>("");

  useEffect(() => {
    if (!supabase) return;
    const loadData = async () => {
      const { data: uniData } = await supabase.from("universities").select("id,name,domain");
      const { data: colData } = await supabase.from("colleges").select("id,university_id,college_name,domain");
      if (Array.isArray(uniData)) setUniversities(uniData);
      if (Array.isArray(colData)) setColleges(colData);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!universityId && universities.length) {
      setUniversityId(universities[0].id);
    }
  }, [universities, universityId]);

  useEffect(() => {
    const trimmed = fullName.trim();
    if (trimmed) {
      setUsername(trimmed);
    }
  }, [fullName]);

  useEffect(() => {
    if (role !== "student") return;
    const emailLocal = email.split("@")[0]?.trim() ?? "";
    if (!emailLocal) return;
    setRollNo(emailLocal);
  }, [email, role]);

  useEffect(() => {
    if (!universityId) return;
    const firstCollege = colleges.find((c) => c.university_id === universityId);
    if (firstCollege && !collegeId) {
      setCollegeId(firstCollege.id);
    }
  }, [collegeId, colleges, universityId]);

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => !universityId || college.university_id === universityId);
  }, [colleges, universityId]);

  const expectedDomain = useMemo(() => {
    const selectedUniversity = universities.find((u) => u.id === universityId);
    const selectedCollege = colleges.find((c) => c.id === collegeId);
    return role === "university_admin" ? selectedUniversity?.domain : selectedCollege?.domain;
  }, [collegeId, colleges, role, universities, universityId]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const isStudent = role === "student";
    const isStaff = role !== "student";
    const emailLocal = email.split("@")[0]?.trim() ?? "";

    const resolvedUsername = fullName.trim();
    if (!resolvedUsername) {
      setError("Full name is required.");
      return;
    }

    if (isStudent) {
      const resolvedRollNo = emailLocal;
      if (!resolvedRollNo) {
        setError("Roll number is required.");
        return;
      }
      if (!year.trim()) {
        setError("Year is required.");
        return;
      }
    }

    if (isStaff) {
      if (!empId.trim()) {
        setError("Employee ID is required.");
        return;
      }
      if (!staffRole) {
        setError("Staff role is required.");
        return;
      }
      if (!department) {
        setError("Department is required.");
        return;
      }
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const emailDomain = email.split("@")[1]?.toLowerCase();
    const selectedUniversity = universities.find((u) => u.id === universityId);
    const selectedCollege = colleges.find((c) => c.id === collegeId);

    if (role === "university_admin" && !selectedUniversity) {
      setError("Please select your university.");
      return;
    }
    if (role !== "university_admin" && !selectedCollege) {
      setError("Please select your college.");
      return;
    }

    const expectedDomain =
      role === "university_admin"
        ? selectedUniversity?.domain
        : selectedCollege?.domain;

    if (!emailDomain || !expectedDomain || emailDomain !== expectedDomain.toLowerCase()) {
      setError(`Email domain must match ${expectedDomain ?? "your institute"} domain.`);
      return;
    }

    setIsLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name: fullName,
        username: resolvedUsername,
        role,
        universityId: universityId || null,
        collegeId: collegeId || null,
        rollNo: isStudent ? emailLocal : null,
        year: isStudent ? year.trim() : null,
        empId: isStaff ? empId.trim() : null,
        staffRole: isStaff ? staffRole : null,
        department: isStaff ? department : null,
      }),
    });

    let payload: any = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(payload?.message ?? "Signup failed. Please try again.");
      return;
    }

    toast({
      title: "Account created",
      description: "Signup successful. Signing you in...",
    });

    setIsLoading(false);

    const loginResult = await login(email, password);
    if (loginResult.success) {
      const nextRole = loginResult.role ?? role;
      if (nextRole === "university_admin") {
        setLocation("/dashboard/university-admin");
      } else if (nextRole === "college_admin") {
        setLocation("/dashboard/college-admin");
      } else {
        setLocation("/dashboard/student");
      }
    } else {
      setLocation("/login");
    }
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

      <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-8 sm:px-6 lg:px-8">
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

              <form onSubmit={handleSignup} className="space-y-5">
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
                  <label htmlFor="username" className="mb-2 block text-sm font-medium">
                    Username (from display name)
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="username"
                      placeholder="Auto from full name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 rounded-xl pl-12"
                      readOnly
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    This comes from the display name in Supabase Auth.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Role
                    </label>
                    <Select value={role} onValueChange={(value) => setRole(value as Role)}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university_admin">University Admin</SelectItem>
                        <SelectItem value="college_admin">College Admin</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Pick the dashboard you need access to.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      University
                    </label>
                    <Select value={universityId} onValueChange={setUniversityId}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder={universities.length ? "Select university" : "No universities found"} />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((uni) => (
                          <SelectItem key={uni.id} value={uni.id}>
                            {uni.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {role !== "university_admin" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      College
                    </label>
                    <Select value={collegeId} onValueChange={setCollegeId}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder={filteredColleges.length ? "Select college" : "No colleges found"} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredColleges.map((college) => (
                          <SelectItem key={college.id} value={college.id}>
                            {college.college_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {role === "student" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="rollno" className="mb-2 block text-sm font-medium">
                        Roll Number
                      </label>
                      <Input
                        id="rollno"
                        placeholder="23xxxxx"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        className="h-12 rounded-xl"
                        readOnly
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        Auto-filled from email (before @).
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Year
                      </label>
                      <Select value={year} onValueChange={setYear}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st Year">1st Year</SelectItem>
                          <SelectItem value="2nd Year">2nd Year</SelectItem>
                          <SelectItem value="3rd Year">3rd Year</SelectItem>
                          <SelectItem value="4th Year">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {role !== "student" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="empid" className="mb-2 block text-sm font-medium">
                        Employee ID
                      </label>
                      <Input
                        id="empid"
                        placeholder="EMP-1023"
                        value={empId}
                        onChange={(e) => setEmpId(e.target.value)}
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Staff Role
                      </label>
                      <Select value={staffRole} onValueChange={(value) => setStaffRole(value as StaffRole)}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="management">Management</SelectItem>
                          <SelectItem value="dean">Dean</SelectItem>
                          <SelectItem value="hod">HOD</SelectItem>
                          <SelectItem value="faculty">Faculty</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Department
                      </label>
                      <Select value={department} onValueChange={(value) => setDepartment(value as Department)}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Select dept" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cse">CSE</SelectItem>
                          <SelectItem value="eee">EEE</SelectItem>
                          <SelectItem value="ece">ECE</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="etm">ETM</SelectItem>
                          <SelectItem value="csd">CSD</SelectItem>
                          <SelectItem value="csm">CSM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Institute Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="rollno@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl pl-12"
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {expectedDomain ? `Required domain: ${expectedDomain}` : "Select a university/college to see the required domain."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
