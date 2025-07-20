import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const avatarOptions = [
  { id: '🍳', emoji: '🍳', name: 'Chef' },
  { id: '👨‍🍳', emoji: '👨‍🍳', name: 'Male Chef' },
  { id: '👩‍🍳', emoji: '👩‍🍳', name: 'Female Chef' },
  { id: '🥘', emoji: '🥘', name: 'Cooking' },
  { id: '🍅', emoji: '🍅', name: 'Tomato' },
  { id: '🥕', emoji: '🥕', name: 'Carrot' },
  { id: '🌶️', emoji: '🌶️', name: 'Pepper' },
  { id: '🥒', emoji: '🥒', name: 'Cucumber' },
  { id: '🧄', emoji: '🧄', name: 'Garlic' },
  { id: '🧅', emoji: '🧅', name: 'Onion' },
  { id: '🥬', emoji: '🥬', name: 'Lettuce' },
  { id: '🥦', emoji: '🥦', name: 'Broccoli' },
  { id: '🍖', emoji: '🍖', name: 'Meat' },
  { id: '🐟', emoji: '🐟', name: 'Fish' },
  { id: '🐔', emoji: '🐔', name: 'Chicken' },
  { id: '🥛', emoji: '🥛', name: 'Milk' }
];

interface AvatarGridProps {
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
}

export const AvatarGrid = ({ selectedAvatar, onSelect }: AvatarGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {avatarOptions.map((option) => (
        <Avatar
          key={option.id}
          className={`w-12 h-12 cursor-pointer transition-all duration-200 hover:scale-110 ${
            selectedAvatar === option.id 
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
              : 'hover:ring-2 hover:ring-muted ring-offset-2 ring-offset-background'
          }`}
          onClick={() => onSelect(option.id)}
        >
          <AvatarFallback className="text-lg bg-muted hover:bg-muted/80">
            {option.emoji}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};