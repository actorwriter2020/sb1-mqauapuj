import React, { useState, useEffect } from 'react';
import { Send, Bot, User, Settings } from 'lucide-react';
import type { Message, UserPreferences } from '../types';
import { VoiceSettings } from './VoiceSettings';
import { speak } from '../utils/speech';

interface ChatProps {
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export function Chat({ preferences, onUpdatePreferences }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your AI assistant. Based on your preferences, I'll communicate in a ${preferences.communicationStyle} style. How can I help you today?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're interested in ${input}. How can I assist you further with this?`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      
      if (preferences.voiceSettings.enabled) {
        speak(aiMessage.content, preferences.voiceSettings);
      }
    }, 1000);
  };

  const handleVoiceSettingsChange = (voiceSettings: VoiceSettings) => {
    onUpdatePreferences({ ...preferences, voiceSettings });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Bot className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="font-semibold">AI Assistant</h1>
            <p className="text-sm text-gray-500">
              {preferences.communicationStyle} communication · {preferences.interactionFrequency} frequency
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {showSettings && (
        <div className="p-4 border-b">
          <VoiceSettings
            settings={preferences.voiceSettings}
            onChange={handleVoiceSettingsChange}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex space-x-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                {message.sender === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div
                className={`rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white shadow-sm border border-gray-100'
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-200 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}