import { useState, useEffect } from "react";
import { OnboardingFlow, OnboardingData } from "@/components/onboarding/OnboardingFlow";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { getStoredFamilyKey, getStoredUserData, storeFamilyKey, storeUserData } from "@/lib/utils";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [familyData, setFamilyData] = useState<{
    familyName: string;
    familyKey: string;
    userName: string;
    userAvatar: string;
    isAdmin: boolean;
  } | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const storedKey = getStoredFamilyKey();
    const userData = getStoredUserData();
    
    if (storedKey && userData.name && userData.avatar) {
      // Mock family data - in real app this would come from database
      setFamilyData({
        familyName: "The Sample Family", // This would be fetched from backend
        familyKey: storedKey,
        userName: userData.name,
        userAvatar: userData.avatar,
        isAdmin: true // This would be determined by backend
      });
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const handleOnboardingComplete = async (data: OnboardingData) => {
    // Store the data locally
    storeFamilyKey(data.familyKey!);
    storeUserData(data.userName, data.avatar);
    
    // Set the family data
    setFamilyData({
      familyName: data.mode === 'create' ? data.familyName! : "Connected Family",
      familyKey: data.familyKey!,
      userName: data.userName,
      userAvatar: data.avatar,
      isAdmin: data.mode === 'create' // Creator is admin
    });
    
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-surface">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading Family Meal Planner...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !familyData) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <Dashboard
      familyName={familyData.familyName}
      familyKey={familyData.familyKey}
      userName={familyData.userName}
      userAvatar={familyData.userAvatar}
      isAdmin={familyData.isAdmin}
    />
  );
};

export default Index;
