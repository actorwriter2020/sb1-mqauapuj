import type { VoiceSettings } from './voice';

export interface UserPreferences {
  communicationStyle: 'formal' | 'casual' | 'technical';
  interactionFrequency: 'low' | 'medium' | 'high';
  primaryUseCase: string;
  aiAssistanceAreas: string[];
  voiceSettings: VoiceSettings;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}