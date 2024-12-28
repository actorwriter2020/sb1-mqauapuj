const STORAGE_KEYS = {
  preferences: 'ai_assistant_preferences',
} as const;

export function savePreferences(preferences: UserPreferences): void {
  localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(preferences));
}

export function loadPreferences(): UserPreferences | null {
  const saved = localStorage.getItem(STORAGE_KEYS.preferences);
  return saved ? JSON.parse(saved) : null;
}