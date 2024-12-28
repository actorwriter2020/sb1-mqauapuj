export interface VoiceSettings {
  enabled: boolean;
  voice: Voice;
  pitch: number;
  rate: number;
  volume: number;
}

export interface Voice {
  id: string;
  name: string;
  lang: string;
  gender: 'male' | 'female' | 'neutral';
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: false,
  voice: {
    id: 'default',
    name: 'Default',
    lang: 'en-US',
    gender: 'neutral'
  },
  pitch: 1,
  rate: 1,
  volume: 1
};