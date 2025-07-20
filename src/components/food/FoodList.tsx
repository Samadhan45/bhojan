import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, Edit2, Trash2, Utensils } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  type: 'veg' | 'non-veg';
  addedBy: string;
  addedByAvatar: string;
  createdAt: string;
}

interface FoodListProps {
  foods: FoodItem[];
  onAddFood: (food: Omit<FoodItem, 'id' | 'createdAt'>) => void;
  onEditFood: (id: string, food: Partial<FoodItem>) => void;
  onDeleteFood: (id: string) => void;
  currentUser: string;
  currentUserAvatar: string;
}

export const FoodList = ({ 
  foods, 
  onAddFood, 
  onEditFood, 
  onDeleteFood, 
  currentUser, 
  currentUserAvatar 
}: FoodListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [memberFilter, setMemberFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    category: "lunch" as const,
    type: "veg" as const
  });

  // Get unique members for filter
  const uniqueMembers = Array.from(new Set(foods.map(f => f.addedBy)));

  // Filter foods
  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || food.category === categoryFilter;
    const matchesType = typeFilter === "all" || food.type === typeFilter;
    const matchesMember = memberFilter === "all" || food.addedBy === memberFilter;
    
    return matchesSearch && matchesCategory && matchesType && matchesMember;
  });

  const handleAddFood = () => {
    if (!newFood.name.trim()) {
      toast({ title: "Please enter a food name", variant: "destructive" });
      return;
    }
    
    onAddFood({
      ...newFood,
      addedBy: currentUser,
      addedByAvatar: currentUserAvatar
    });
    
    setNewFood({ name: "", description: "", category: "lunch", type: "veg" });
    setIsAddDialogOpen(false);
    toast({ title: "Food item added successfully!" });
  };

  const handleEditFood = () => {
    if (!editingFood || !editingFood.name.trim()) return;
    
    onEditFood(editingFood.id, {
      name: editingFood.name,
      description: editingFood.description,
      category: editingFood.category,
      type: editingFood.type
    });
    
    setEditingFood(null);
    toast({ title: "Food item updated successfully!" });
  };

  const handleDeleteFood = (id: string) => {
    onDeleteFood(id);
    toast({ title: "Food item deleted successfully!" });
  };

  const categoryIcons = {
    breakfast: "☀️",
    lunch: "🍽️", 
    snack: "🍪",
    dinner: "🌙"
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            <CardTitle>Family Food Collection ({filteredFoods.length})</CardTitle>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Food
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Food Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Food Name</Label>
                  <Input
                    id="name"
                    value={newFood.name}
                    onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                    placeholder="e.g., Masala Dosa"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newFood.description}
                    onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                    placeholder="Brief description of the dish..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select value={newFood.category} onValueChange={(value: any) => setNewFood({ ...newFood, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select value={newFood.type} onValueChange={(value: any) => setNewFood({ ...newFood, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddFood} className="w-full">
                  Add Food Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="veg">Vegetarian</SelectItem>
              <SelectItem value="non-veg">Non-Veg</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={memberFilter} onValueChange={setMemberFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              {uniqueMembers.map(member => (
                <SelectItem key={member} value={member}>{member}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Food Items Grid */}
        <div className="grid gap-3 max-h-96 overflow-y-auto">
          {filteredFoods.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Utensils className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No food items found</p>
            </div>
          ) : (
            filteredFoods.map((food) => (
              <div key={food.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-lg">{categoryIcons[food.category]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{food.name}</h4>
                      <Badge variant={food.type === 'veg' ? 'secondary' : 'destructive'} className="text-xs">
                        {food.type === 'veg' ? '🌱 Veg' : '🍖 Non-Veg'}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {food.category}
                      </Badge>
                    </div>
                    {food.description && (
                      <p className="text-sm text-muted-foreground">{food.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-4 h-4">
                        <AvatarFallback className="text-xs">{food.addedByAvatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">Added by {food.addedBy}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingFood(food)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteFood(food.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={!!editingFood} onOpenChange={() => setEditingFood(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Food Item</DialogTitle>
          </DialogHeader>
          {editingFood && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Food Name</Label>
                <Input
                  id="edit-name"
                  value={editingFood.name}
                  onChange={(e) => setEditingFood({ ...editingFood, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingFood.description}
                  onChange={(e) => setEditingFood({ ...editingFood, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={editingFood.category} onValueChange={(value: any) => setEditingFood({ ...editingFood, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={editingFood.type} onValueChange={(value: any) => setEditingFood({ ...editingFood, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veg">Vegetarian</SelectItem>
                      <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleEditFood} className="w-full">
                Update Food Item
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};