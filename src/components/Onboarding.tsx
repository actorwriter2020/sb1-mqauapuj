import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { UserPreferences } from '../types';
import { DEFAULT_VOICE_SETTINGS } from '../types/voice';
import { WelcomeHero } from './welcome/WelcomeHero';

const initialPreferences: UserPreferences = {
  communicationStyle: 'casual',
  interactionFrequency: 'medium',
  primaryUseCase: '',
  aiAssistanceAreas: [],
  voiceSettings: DEFAULT_VOICE_SETTINGS,
};

interface OnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(-1); // Start at -1 for welcome screen
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);

  if (step === -1) {
    return <WelcomeHero onStart={() => setStep(0)} />;
  }

  const steps = [/* ... existing steps ... */];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* ... existing onboarding UI ... */}
    </div>
  );
}