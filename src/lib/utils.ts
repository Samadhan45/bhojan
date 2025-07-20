import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a memorable family key
export function generateFamilyKey(): string {
  const adjectives = [
    'sunny', 'happy', 'bright', 'warm', 'cozy', 'fresh', 'sweet', 'spicy',
    'golden', 'silver', 'green', 'blue', 'red', 'purple', 'orange', 'pink',
    'calm', 'gentle', 'strong', 'wise', 'clever', 'kind', 'bold', 'quiet'
  ];
  
  const nouns = [
    'kitchen', 'recipe', 'spice', 'herb', 'meal', 'dish', 'plate', 'bowl',
    'river', 'mountain', 'star', 'moon', 'sun', 'tree', 'flower', 'garden',
    'bread', 'soup', 'curry', 'rice', 'naan', 'chapati', 'dal', 'masala'
  ];
  
  const suffixes = [
    'family', 'home', 'table', 'feast', 'meal', 'kitchen', 'recipe', 'dish'
  ];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${adjective}-${noun}-${suffix}`;
}

// Get stored family key from localStorage
export function getStoredFamilyKey(): string | null {
  return localStorage.getItem('family_key');
}

// Store family key in localStorage
export function storeFamilyKey(key: string): void {
  localStorage.setItem('family_key', key);
}

// Clear stored family data
export function clearStoredFamilyData(): void {
  localStorage.removeItem('family_key');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_avatar');
}

// Store user data
export function storeUserData(name: string, avatar: string): void {
  localStorage.setItem('user_name', name);
  localStorage.setItem('user_avatar', avatar);
}

// Get stored user data
export function getStoredUserData(): { name: string | null; avatar: string | null } {
  return {
    name: localStorage.getItem('user_name'),
    avatar: localStorage.getItem('user_avatar')
  };
}

// Food items management
export const storeFoodItems = (familyKey: string, foods: any[]) => {
  localStorage.setItem(`foods_${familyKey}`, JSON.stringify(foods));
};

export const getStoredFoodItems = (familyKey: string): any[] => {
  const stored = localStorage.getItem(`foods_${familyKey}`);
  if (stored) {
    return JSON.parse(stored);
  }
  // Default Maharashtrian foods
  return [
    { id: '1', name: 'Poha', description: 'Flattened rice with vegetables and spices', category: 'breakfast', type: 'veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
    { id: '2', name: 'Misal Pav', description: 'Spicy curry made from moth beans with bread', category: 'breakfast', type: 'veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
    { id: '3', name: 'Bharli Vangi', description: 'Stuffed brinjal curry', category: 'lunch', type: 'veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
    { id: '4', name: 'Chicken Kolhapuri', description: 'Spicy chicken curry from Kolhapur region', category: 'dinner', type: 'non-veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
    { id: '5', name: 'Pithla Bhakri', description: 'Besan curry with sorghum flatbread', category: 'lunch', type: 'veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
    { id: '6', name: 'Kanda Bhaji', description: 'Onion fritters', category: 'snack', type: 'veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
    { id: '7', name: 'Vada Pav', description: 'Deep fried potato dumpling in bread', category: 'snack', type: 'veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
    { id: '8', name: 'Dal Tadka', description: 'Tempered lentil curry', category: 'lunch', type: 'veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
    { id: '9', name: 'Mutton Rassa', description: 'Spicy mutton curry', category: 'dinner', type: 'non-veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
    { id: '10', name: 'Puran Poli', description: 'Sweet flatbread stuffed with lentils and jaggery', category: 'snack', type: 'veg', addedBy: 'System', addedByAvatar: '🏠', createdAt: new Date().toISOString() },
  ];
};
