import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Mic } from 'lucide-react';
import type { VoiceSettings, Voice } from '../types/voice';
import { getAvailableVoices } from '../utils/speech';

interface VoiceSettingsProps {
  settings: VoiceSettings;
  onChange: (settings: VoiceSettings) => void;
}

export function VoiceSettings({ settings, onChange }: VoiceSettingsProps) {
  const [voices, setVoices] = useState<Voice[]>([]);

  useEffect(() => {
    getAvailableVoices().then(systemVoices => {
      const mappedVoices: Voice[] = systemVoices.map(v => ({
        id: v.voiceURI,
        name: v.name,
        lang: v.lang,
        gender: v.name.toLowerCase().includes('female') ? 'female' : 
                v.name.toLowerCase().includes('male') ? 'male' : 'neutral'
      }));
      setVoices(mappedVoices);
    });
  }, []);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Voice Settings</h3>
        <button
          onClick={() => onChange({ ...settings, enabled: !settings.enabled })}
          className={`p-2 rounded-full ${settings.enabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
        >
          {settings.enabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {settings.enabled && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Voice</label>
            <select
              value={settings.voice.id}
              onChange={(e) => {
                const voice = voices.find(v => v.id === e.target.value);
                if (voice) {
                  onChange({ ...settings, voice });
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {voices.map(voice => (
                <option key={voice.id} value={voice.id}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => onChange({ ...settings, volume: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) => onChange({ ...settings, rate: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pitch</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => onChange({ ...settings, pitch: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}