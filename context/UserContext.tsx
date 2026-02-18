import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProgress {
  xp: number;
  streak: number;
  completedLessons: string[];
  lastLoginDate: string | null;
  hasSeenOnboarding: boolean;
}

interface UserContextType {
  progress: UserProgress;
  isLoading: boolean;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  updateStreak: () => void;
  setOnboardingComplete: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<UserProgress>({
    xp: 0,
    streak: 0,
    completedLessons: [],
    lastLoginDate: null,
    hasSeenOnboarding: false,
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem('userProgress');
      if (saved) {
        setProgress(prev => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch (e) {
      console.error('Failed to load progress', e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    await AsyncStorage.setItem('userProgress', JSON.stringify(newProgress));
  };

  const addXP = (amount: number) => {
    setProgress(prev => {
      const updated = { ...prev, xp: prev.xp + amount };
      saveProgress(updated);
      return updated;
    });
  };

  const completeLesson = (lessonId: string) => {
    setProgress(prev => {
      if (!prev.completedLessons.includes(lessonId)) {
        const updated = {
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId],
        };
        saveProgress(updated);
        return updated;
      }
      return prev;
    });
  };

  const setOnboardingComplete = () => {
    setProgress(prev => {
      const updated = { ...prev, hasSeenOnboarding: true };
      saveProgress(updated);
      return updated;
    });
  };

  const updateStreak = () => {
    setProgress(prev => {
      const today = new Date().toISOString().split('T')[0];
      if (prev.lastLoginDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreak = prev.streak;
        if (prev.lastLoginDate === yesterdayStr) {
          newStreak += 1;
        } else {
          newStreak = 1; // New or broken streak
        }

        const updated = {
          ...prev,
          streak: newStreak,
          lastLoginDate: today,
        };
        saveProgress(updated);
        return updated;
      }
      return prev;
    });
  };

  return (
    <UserContext.Provider value={{ progress, isLoading, addXP, completeLesson, updateStreak, setOnboardingComplete }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
