import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProgress {
  xp: number;
  streak: number;
  completedLessons: string[];
  lastLoginDate: string | null;
}

interface UserContextType {
  progress: UserProgress;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  updateStreak: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>({
    xp: 0,
    streak: 0,
    completedLessons: [],
    lastLoginDate: null,
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem('userProgress');
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load progress', e);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    setProgress(newProgress);
    await AsyncStorage.setItem('userProgress', JSON.stringify(newProgress));
  };

  const addXP = (amount: number) => {
    const newProgress = { ...progress, xp: progress.xp + amount };
    saveProgress(newProgress);
  };

  const completeLesson = (lessonId: string) => {
    if (!progress.completedLessons.includes(lessonId)) {
      const newProgress = {
        ...progress,
        completedLessons: [...progress.completedLessons, lessonId],
      };
      saveProgress(newProgress);
    }
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastLoginDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = progress.streak;
      if (progress.lastLoginDate === yesterdayStr) {
        newStreak += 1;
      } else if (progress.lastLoginDate === null) {
        newStreak = 1;
      } else {
        newStreak = 1; // Streak broken, restart
      }

      saveProgress({
        ...progress,
        streak: newStreak,
        lastLoginDate: today,
      });
    }
  };

  return (
    <UserContext.Provider value={{ progress, addXP, completeLesson, updateStreak }}>
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
