import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

interface ShoppingListProps {
  mealPlan: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
  onClose: () => void;
}

export const ShoppingList = ({ mealPlan, onClose }: ShoppingListProps) => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate shopping list based on meal plan
  useEffect(() => {
    generateShoppingList();
  }, []);

  const generateShoppingList = async () => {
    setLoading(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI-generated shopping list based on Maharashtrian dishes
    const mockItems: ShoppingItem[] = [
      // Vegetables
      { id: '1', name: 'Onions (2 kg)', category: 'Vegetables', checked: false },
      { id: '2', name: 'Tomatoes (1 kg)', category: 'Vegetables', checked: false },
      { id: '3', name: 'Brinjal (500g)', category: 'Vegetables', checked: false },
      { id: '4', name: 'Potatoes (1 kg)', category: 'Vegetables', checked: false },
      { id: '5', name: 'Green chilies (100g)', category: 'Vegetables', checked: false },
      { id: '6', name: 'Ginger-Garlic paste', category: 'Vegetables', checked: false },
      
      // Dairy & Eggs
      { id: '7', name: 'Milk (1 liter)', category: 'Dairy & Eggs', checked: false },
      { id: '8', name: 'Yogurt (500g)', category: 'Dairy & Eggs', checked: false },
      { id: '9', name: 'Paneer (250g)', category: 'Dairy & Eggs', checked: false },
      
      // Meat & Poultry
      { id: '10', name: 'Chicken (1 kg)', category: 'Meat & Poultry', checked: false },
      { id: '11', name: 'Mutton (500g)', category: 'Meat & Poultry', checked: false },
      
      // Grains & Pulses
      { id: '12', name: 'Rice (2 kg)', category: 'Grains & Pulses', checked: false },
      { id: '13', name: 'Wheat flour (1 kg)', category: 'Grains & Pulses', checked: false },
      { id: '14', name: 'Besan (500g)', category: 'Grains & Pulses', checked: false },
      { id: '15', name: 'Toor dal (500g)', category: 'Grains & Pulses', checked: false },
      
      // Spices & Condiments
      { id: '16', name: 'Garam masala powder', category: 'Spices & Condiments', checked: false },
      { id: '17', name: 'Red chili powder', category: 'Spices & Condiments', checked: false },
      { id: '18', name: 'Turmeric powder', category: 'Spices & Condiments', checked: false },
      { id: '19', name: 'Coriander powder', category: 'Spices & Condiments', checked: false },
      { id: '20', name: 'Mustard seeds', category: 'Spices & Condiments', checked: false },
      
      // Snacks & Others
      { id: '21', name: 'Tea leaves', category: 'Beverages', checked: false },
      { id: '22', name: 'Coconut (1 piece)', category: 'Others', checked: false },
      { id: '23', name: 'Jaggery (250g)', category: 'Others', checked: false },
    ];
    
    setShoppingItems(mockItems);
    setLoading(false);
    toast({ title: "Shopping list generated successfully!" });
  };

  const toggleItem = (id: string) => {
    setShoppingItems(items => 
      items.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const groupedItems = shoppingItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const totalItems = shoppingItems.length;
  const checkedItems = shoppingItems.filter(item => item.checked).length;
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Generating Shopping List...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-muted rounded w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping List for Today
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Progress: {checkedItems}/{totalItems} items</span>
            <Badge variant="outline">{Math.round(progress)}% complete</Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Meal Plan Reference */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Today's Menu:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>🌅 <strong>Breakfast:</strong> {mealPlan.breakfast}</div>
            <div>🍽️ <strong>Lunch:</strong> {mealPlan.lunch}</div>
            <div>🍪 <strong>Snack:</strong> {mealPlan.snack}</div>
            <div>🌙 <strong>Dinner:</strong> {mealPlan.dinner}</div>
          </div>
        </div>

        {/* Shopping Items by Category */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="space-y-2">
              <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground border-b pb-1">
                {category} ({items.length})
              </h4>
              <div className="space-y-2">
                {items.map(item => (
                  <div 
                    key={item.id} 
                    className={`flex items-center space-x-3 p-2 rounded hover:bg-muted/50 transition-colors ${
                      item.checked ? 'opacity-60' : ''
                    }`}
                  >
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <label 
                      htmlFor={item.id}
                      className={`flex-1 cursor-pointer ${
                        item.checked ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {item.name}
                    </label>
                    {item.checked && (
                      <Check className="w-4 h-4 text-success" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              setShoppingItems(items => items.map(item => ({ ...item, checked: false })));
              toast({ title: "All items unchecked" });
            }}
          >
            Reset All
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              setShoppingItems(items => items.map(item => ({ ...item, checked: true })));
              toast({ title: "All items checked!" });
            }}
          >
            Check All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};