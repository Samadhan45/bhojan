import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Coffee, 
  Sun, 
  Cookie, 
  Moon, 
  Sparkles, 
  ShoppingCart, 
  Settings,
  ThumbsUp,
  LogOut,
  ThumbsDown,
  Users,
  Utensils
} from "lucide-react";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { FoodList, FoodItem } from "@/components/food/FoodList";
import { ShoppingList } from "@/components/food/ShoppingList";
import { storeFoodItems, getStoredFoodItems } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface MealPlan {
  id: string;
  date: string;
  theme: string;
  reasoning: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
  liked?: boolean;
}

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
}

interface DashboardProps {
  familyName: string;
  familyKey: string;
  userName: string;
  userAvatar: string;
  isAdmin: boolean;
  onLogout: () => void;
}

export const Dashboard = ({ 
  familyName, 
  familyKey, 
  userName, 
  userAvatar, 
  isAdmin,
  onLogout
}: DashboardProps) => {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  // In a real app, this would be fetched from your backend. I've added a few for demonstration.
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: userName, avatar: userAvatar, isAdmin },
    { id: '2', name: 'Jane Doe', avatar: 'JD', isAdmin: false },
    { id: '3', name: 'Junior Doe', avatar: 'JR', isAdmin: false },
  ]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [activeTab, setActiveTab] = useState("today");

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Load food items and generate meal plan
  useEffect(() => {
    const storedFoods = getStoredFoodItems(familyKey);
    setFoods(storedFoods);
    generateMealPlan(storedFoods);
  }, [familyKey]);

  const generateMealPlan = async (foodList: FoodItem[] = foods) => {
    setLoading(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter foods by category for smarter suggestions
    const breakfastFoods = foodList.filter(f => f.category === 'breakfast');
    const lunchFoods = foodList.filter(f => f.category === 'lunch');
    const snackFoods = foodList.filter(f => f.category === 'snack');
    const dinnerFoods = foodList.filter(f => f.category === 'dinner');
    
    // Randomly select from available foods (AI would be smarter about nutrition)
    const mockPlan: MealPlan = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      theme: "Balanced & Nutritious 🌱",
      reasoning: "AI selected these healthy, balanced meals from your family's favorite dishes to ensure proper nutrition throughout the day.",
      breakfast: breakfastFoods[Math.floor(Math.random() * breakfastFoods.length)]?.name || "Poha",
      lunch: lunchFoods[Math.floor(Math.random() * lunchFoods.length)]?.name || "Dal Tadka with Rice",
      snack: snackFoods[Math.floor(Math.random() * snackFoods.length)]?.name || "Kanda Bhaji",
      dinner: dinnerFoods[Math.floor(Math.random() * dinnerFoods.length)]?.name || "Roti with Sabzi"
    };
    
    setMealPlan(mockPlan);
    setLoading(false);
    toast({ title: "Daily meal plan generated!", description: "Healthy meals selected from your family's food collection." });
  };

  const handleLike = (liked: boolean) => {
    if (mealPlan) {
      setMealPlan({ ...mealPlan, liked });
      toast({ 
        title: liked ? "Great! 👍" : "Noted 👎", 
        description: liked ? "We'll suggest similar meals in the future." : "We'll avoid similar combinations." 
      });
    }
  };

  const handleAddFood = (newFood: Omit<FoodItem, 'id' | 'createdAt'>) => {
    const food: FoodItem = {
      ...newFood,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedFoods = [...foods, food];
    setFoods(updatedFoods);
    storeFoodItems(familyKey, updatedFoods);
  };

  const handleEditFood = (id: string, updates: Partial<FoodItem>) => {
    const updatedFoods = foods.map(food => 
      food.id === id ? { ...food, ...updates } : food
    );
    setFoods(updatedFoods);
    storeFoodItems(familyKey, updatedFoods);
  };

  const handleDeleteFood = (id: string) => {
    const updatedFoods = foods.filter(food => food.id !== id);
    setFoods(updatedFoods);
    storeFoodItems(familyKey, updatedFoods);
  };

  const mealIcons = {
    breakfast: Coffee,
    lunch: Sun,
    snack: Cookie,
    dinner: Moon
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-surface">
        <div className="container mx-auto p-6">
          <div className="space-y-6 animate-fade-in">
            <div className="skeleton h-16 w-full rounded-xl" />
            <div className="skeleton h-32 w-full rounded-xl" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton h-48 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showShoppingList && mealPlan) {
    return (
      <div className="min-h-screen bg-gradient-surface">
        <div className="container mx-auto p-6">
          <ShoppingList 
            mealPlan={mealPlan} 
            onClose={() => setShowShoppingList(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slide-in-right">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gradient">{familyName}</h1>
            <p className="text-muted-foreground">{today}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {familyMembers.map(member => (
                      <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                        <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium leading-none">{familyName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Family Members
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {familyMembers.map(member => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback>{member.avatar}</AvatarFallback></Avatar>
                        <p className="text-sm font-medium leading-none">{member.name}</p>
                        {member.isAdmin && <Badge variant="outline">Admin</Badge>}
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <DarkModeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{userAvatar}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {familyName}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></DropdownMenuItem>}
                <DropdownMenuItem onClick={onLogout}><LogOut className="mr-2 h-4 w-4" /><span>Logout</span></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="today" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Today's Plan
            </TabsTrigger>
            <TabsTrigger value="foods" className="gap-2">
              <Utensils className="w-4 h-4" />
              Food Collection ({foods.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Today's Plan */}
            {mealPlan && (
              <Card className="card-glow animate-slide-in-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <CardTitle className="text-xl">Today's Theme</CardTitle>
                      </div>
                      <h2 className="text-2xl font-bold text-gradient">{mealPlan.theme}</h2>
                      <p className="text-muted-foreground text-sm italic">{mealPlan.reasoning}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLike(true)}
                        className={mealPlan.liked === true ? 'bg-success text-success-foreground' : ''}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLike(false)}
                        className={mealPlan.liked === false ? 'bg-destructive text-destructive-foreground' : ''}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}

            {/* Meal Cards */}
            {mealPlan && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-in-up">
                {Object.entries(mealIcons).map(([mealType, Icon], index) => (
                  <Card key={mealType} className="meal-card" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <CardTitle className="text-lg capitalize">{mealType}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="w-full justify-center text-center py-2">
                        {mealPlan[mealType as keyof typeof mealPlan] as string}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 animate-fade-in">
              <Button 
                onClick={() => setShowShoppingList(true)}
                className="btn-accent gap-2"
                size="lg"
                disabled={!mealPlan}
              >
                <ShoppingCart className="w-5 h-5" />
                Generate Shopping List
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="foods">
            <FoodList
              foods={foods}
              onAddFood={handleAddFood}
              onEditFood={handleEditFood}
              onDeleteFood={handleDeleteFood}
              currentUser={userName}
              currentUserAvatar={userAvatar}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};