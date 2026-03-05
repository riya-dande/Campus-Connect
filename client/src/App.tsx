import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Shell from "@/components/layout/Shell";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import Hub from "@/pages/Hub";
import CampusZones from "@/pages/CampusZones";
import Profile from "@/pages/Profile";
import Messages from "@/pages/Messages";
import MentorWidget from "@/components/ai/MentorWidget";
import { useStore } from "@/store";

// Page wrapper with Shell (for authenticated pages)
function ProtectedPage({ component: Component }: { component: React.ComponentType }) {
  return (
    <Shell>
      <Component />
      <MentorWidget />
    </Shell>
  );
}

function Router() {
  const { isAuthenticated } = useStore();
  
  return (
    <Switch>
      {/* Landing Page - Public */}
      <Route path="/" component={Landing} />
      
      {/* Login Page - Public */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      
      {/* Protected routes - redirect to login if not authenticated */}
      <Route path="/dashboard">
        {isAuthenticated ? <ProtectedPage component={Home} /> : <Login />}
      </Route>
      
      <Route path="/hub">
        {isAuthenticated ? <ProtectedPage component={Hub} /> : <Login />}
      </Route>
      
      <Route path="/campus-zones">
        {isAuthenticated ? <ProtectedPage component={CampusZones} /> : <Login />}
      </Route>
      
      <Route path="/profile">
        {isAuthenticated ? <ProtectedPage component={Profile} /> : <Login />}
      </Route>
      
      <Route path="/messages">
        {isAuthenticated ? <ProtectedPage component={Messages} /> : <Login />}
      </Route>
      
      {/* Legacy route - redirect to dashboard if authenticated, otherwise login */}
      <Route path="/home">
        {isAuthenticated ? <ProtectedPage component={Home} /> : <Login />}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
