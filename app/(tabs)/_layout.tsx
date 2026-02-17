import React from 'react';
import { Tabs } from 'expo-router';
import { Home, User, Trophy } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'NAUKA',
          tabBarIcon: ({ color }) => <Home color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'RANKING',
          tabBarIcon: ({ color }) => <Trophy color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFIL',
          tabBarIcon: ({ color }) => <User color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
