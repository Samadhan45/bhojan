import { useState, useEffect } from "react";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { OnboardingFlow, OnboardingData } from "@/components/onboarding/OnboardingFlow";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

// This would typically be a more robust session object
interface SessionData extends OnboardingData {
  familyName: string;
  isAdmin: boolean;
}

function App() {
  const [session, setSession] = useState<SessionData | null>(null);

  // Check for existing session in localStorage on initial load
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem("family-food-oracle-session");
      if (savedSession) {
        setSession(JSON.parse(savedSession));
      }
    } catch (error) {
      console.error("Could not load session:", error);
      localStorage.removeItem("family-food-oracle-session");
    }
  }, []);

  const handleLogin = (data: OnboardingData) => {
    // In a real app, you'd authenticate with a backend here.
    // We'll simulate it by creating a session object.
    const newSession: SessionData = {
      ...data,
      // For 'join', familyName would be fetched from the backend using familyKey.
      // For 'create', it's provided.
      familyName: data.familyName || `Family of ${data.familyKey}`,
      // The first user to create a family is the admin.
      isAdmin: data.mode === 'create',
    };
    localStorage.setItem("family-food-oracle-session", JSON.stringify(newSession));
    setSession(newSession);
  };

  const handleLogout = () => {
    localStorage.removeItem("family-food-oracle-session");
    setSession(null);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {session ? (
        <Dashboard {...session} onLogout={handleLogout} />
      ) : (
        <OnboardingFlow onComplete={handleLogin} />
      )}
      <Toaster />
    </ThemeProvider>
  );
}

export default App;