import React, { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Chat } from './components/Chat';
import type { UserPreferences } from './types';
import { loadPreferences, savePreferences } from './utils/storage';
import { DEFAULT_VOICE_SETTINGS } from './types/voice';

function App() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(() => {
    const saved = loadPreferences();
    if (saved) {
      // Ensure voice settings are properly initialized
      return {
        ...saved,
        voiceSettings: saved.voiceSettings || DEFAULT_VOICE_SETTINGS,
      };
    }
    return null;
  });

  const handlePreferencesUpdate = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    savePreferences(newPreferences);
  };

  if (!preferences) {
    return <Onboarding onComplete={handlePreferencesUpdate} />;
  }

  return (
    <Chat
      preferences={preferences}
      onUpdatePreferences={handlePreferencesUpdate}
    />
  );
}

export default App;