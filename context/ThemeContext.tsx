import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FontSizeLevel = 'normal' | 'large' | 'extraLarge';

interface ThemeContextType {
  fontSizeLevel: FontSizeLevel;
  setFontSizeLevel: (level: FontSizeLevel) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  colors: any;
  getFontSize: (baseSize: number) => number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [fontSizeLevel, setFontSizeLevel] = useState<FontSizeLevel>('normal');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedFontSize = await AsyncStorage.getItem('fontSizeLevel');
      const savedHighContrast = await AsyncStorage.getItem('highContrast');
      if (savedFontSize) setFontSizeLevel(savedFontSize as FontSizeLevel);
      if (savedHighContrast) setHighContrast(savedHighContrast === 'true');
    } catch (e) {
      console.error('Failed to load theme settings', e);
    }
  };

  const saveFontSizeLevel = async (level: FontSizeLevel) => {
    setFontSizeLevel(level);
    await AsyncStorage.setItem('fontSizeLevel', level);
  };

  const saveHighContrast = async (value: boolean) => {
    setHighContrast(value);
    await AsyncStorage.setItem('highContrast', String(value));
  };

  const getFontSize = (baseSize: number) => {
    const multipliers = {
      normal: 1,
      large: 1.25,
      extraLarge: 1.5,
    };
    return baseSize * multipliers[fontSizeLevel];
  };

  const colors = {
    primary: highContrast ? '#0000FF' : '#58CC02', // Duolingo green or high-vis blue
    secondary: highContrast ? '#000000' : '#1CB0F6',
    background: highContrast ? '#FFFFFF' : '#FFFFFF',
    text: highContrast ? '#000000' : '#4B4B4B',
    error: '#FF4B4B',
    success: '#58CC02',
    warning: '#FFC800',
    card: highContrast ? '#EEEEEE' : '#F7F7F7',
    border: highContrast ? '#000000' : '#E5E5E5',
  };

  return (
    <ThemeContext.Provider
      value={{
        fontSizeLevel,
        setFontSizeLevel: saveFontSizeLevel,
        highContrast,
        setHighContrast: saveHighContrast,
        colors,
        getFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
