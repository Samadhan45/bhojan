import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, ArrowRight, Copy, Check } from "lucide-react";
import { AvatarGrid } from "./AvatarGrid";
import { generateFamilyKey } from "@/lib/utils";

export interface OnboardingData {
  mode: 'join' | 'create';
  familyKey?: string;
  familyName?: string;
  userName: string;
  avatar: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState<'mode' | 'details'>('mode');
  const [mode, setMode] = useState<'join' | 'create'>('join');
  const [familyKey, setFamilyKey] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [keyCopied, setKeyCopied] = useState(false);

  useEffect(() => {
    if (mode === 'create' && step === 'details' && !generatedKey) {
      setGeneratedKey(generateFamilyKey());
    }
  }, [mode, step, generatedKey]);

  const handleModeSelect = (selectedMode: 'join' | 'create') => {
    setMode(selectedMode);
    setStep('details');
  };

  const handleSubmit = () => {
    const data: OnboardingData = {
      mode,
      userName,
      avatar: selectedAvatar,
    };

    if (mode === 'join') {
      data.familyKey = familyKey;
    } else {
      data.familyName = familyName;
      data.familyKey = generatedKey;
    }

    onComplete(data);
  };

  const copyFamilyKey = async () => {
    await navigator.clipboard.writeText(generatedKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const isValid = userName && selectedAvatar && 
    (mode === 'join' ? familyKey : familyName);

  if (step === 'mode') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-surface">
        <div className="w-full max-w-md space-y-6 animate-slide-in-up">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gradient">
              Family Meal Planner
            </h1>
            <p className="text-muted-foreground text-lg">
              AI-powered meal planning for families
            </p>
          </div>

          <div className="grid gap-4">
            <Card 
              className="card-warm cursor-pointer hover:scale-105 transition-transform duration-200 border-2 hover:border-primary"
              onClick={() => handleModeSelect('join')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Join Family</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Connect to an existing family meal planner using a family key
                </p>
              </CardContent>
            </Card>

            <Card 
              className="card-warm cursor-pointer hover:scale-105 transition-transform duration-200 border-2 hover:border-accent"
              onClick={() => handleModeSelect('create')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-2">
                  <Plus className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Create Family</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Start a new family meal planner and invite your loved ones
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-surface">
      <Card className="w-full max-w-lg card-warm animate-slide-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {mode === 'join' ? 'Join Your Family' : 'Create Your Family'}
          </CardTitle>
          <p className="text-muted-foreground">
            {mode === 'join' 
              ? 'Enter your family key and personal details'
              : 'Set up your family meal planner'
            }
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {mode === 'join' ? (
            <div className="space-y-2">
              <Label htmlFor="familyKey">Family Key</Label>
              <Input
                id="familyKey"
                placeholder="e.g., mango-river-star"
                value={familyKey}
                onChange={(e) => setFamilyKey(e.target.value)}
                className="text-center font-mono"
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="familyName">Family Name</Label>
                <Input
                  id="familyName"
                  placeholder="The Johnson Family"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                />
              </div>
              
              {generatedKey && (
                <div className="space-y-2">
                  <Label>Your Family Key</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-sm px-3 py-2 flex-1">
                      {generatedKey}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyFamilyKey}
                      className="shrink-0"
                    >
                      {keyCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Share this key with family members to join your meal planner
                  </p>
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="userName">Your Name</Label>
            <Input
              id="userName"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Choose Your Avatar</Label>
            <AvatarGrid 
              selectedAvatar={selectedAvatar}
              onSelect={setSelectedAvatar}
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full btn-primary"
            size="lg"
          >
            {mode === 'join' ? 'Join Family' : 'Create Family'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};