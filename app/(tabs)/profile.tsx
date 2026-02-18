import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { AppText } from '../../components/common/AppText';
import { AppCard } from '../../components/common/AppCard';
import { AppButton } from '../../components/common/AppButton';
import { Sygnalek } from '../../components/mascot/Sygnalek';
import { Trophy, Award, Target, Zap } from 'lucide-react-native';
import Animated, { FadeInUp, ScaleInCenter } from 'react-native-reanimated';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { progress } = useUser();

  const stats = [
    { label: 'Punkty XP', value: progress.xp, icon: Zap, color: colors.primary },
    { label: 'Dni z rzędu', value: progress.streak, icon: Target, color: colors.warning },
    { label: 'Lekcje', value: progress.completedLessons.length, icon: Award, color: colors.secondary },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Sygnalek state="IDLE" size={150} />
          <AppText size={32} bold style={{ marginTop: 20 }}>Strażnik Sieci</AppText>
          <AppText size={18} color="#666">Poziom: Początkujący</AppText>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <Animated.View
              key={i}
              entering={ScaleInCenter.delay(i * 100)}
              style={{ width: '31%' }}
            >
              <AppCard style={[styles.statCard, { width: '100%' }]}>
                <stat.icon color={stat.color} size={32} />
                <AppText size={24} bold style={{ marginTop: 10 }}>{stat.value}</AppText>
                <AppText size={14} color="#666">{stat.label}</AppText>
              </AppCard>
            </Animated.View>
          ))}
        </View>

        <View style={styles.section}>
          <AppText size={22} bold style={styles.sectionTitle}>Twoje Osiągnięcia</AppText>
          <AppCard style={styles.achievementCard}>
            <Trophy color={colors.warning} size={40} />
            <View style={styles.achievementText}>
              <AppText size={18} bold>Pierwszy Krok</AppText>
              <AppText size={14} color="#666">Ukończono pierwszą lekcję bezpieczeństwa.</AppText>
            </View>
          </AppCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  statCard: {
    width: '31%',
    alignItems: 'center',
    padding: 15,
  },
  section: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  achievementText: {
    marginLeft: 20,
    flex: 1,
  }
});
