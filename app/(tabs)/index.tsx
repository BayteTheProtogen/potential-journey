import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { LESSONS } from '../../data/lessons';
import { AppText } from '../../components/common/AppText';
import { Sygnalek } from '../../components/mascot/Sygnalek';
import { Shield, Flame, Star, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PathScreen() {
  const { colors, getFontSize } = useTheme();
  const { progress, updateStreak } = useUser();
  const router = useRouter();

  useEffect(() => {
    updateStreak();
  }, []);

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <View style={styles.headerItem}>
        <Flame color={colors.warning} size={24} fill={colors.warning} />
        <AppText bold size={18} style={{ marginLeft: 5 }}>{progress.streak}</AppText>
      </View>
      <View style={styles.headerItem}>
        <Star color={colors.primary} size={24} fill={colors.primary} />
        <AppText bold size={18} style={{ marginLeft: 5 }}>{progress.xp} XP</AppText>
      </View>
      <TouchableOpacity onPress={() => router.push('/modal')}>
        <Settings color={colors.text} size={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <Sygnalek state="IDLE" size={120} />
          <View style={styles.heroBubble}>
            <AppText size={18} bold>Witaj w Cyber-Mieście!</AppText>
            <AppText size={14}>Wybierz lekcję, aby wzmocnić swoją tarczę.</AppText>
          </View>
        </View>

        <View style={styles.pathContainer}>
          {LESSONS.map((lesson, index) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isAvailable = index === 0 || progress.completedLessons.includes(LESSONS[index - 1].id);
            const horizontalOffset = (index % 3 - 1) * 60; // Simple zigzag

            return (
              <TouchableOpacity
                key={lesson.id}
                disabled={!isAvailable}
                onPress={() => router.push(`/lesson/${lesson.id}`)}
                style={[
                  styles.nodeWrapper,
                  { transform: [{ translateX: horizontalOffset }] }
                ]}
              >
                <View style={[
                  styles.node,
                  {
                    backgroundColor: isCompleted ? colors.primary : (isAvailable ? colors.card : colors.border),
                    borderColor: isAvailable ? colors.primary : colors.border,
                    borderWidth: 4,
                  }
                ]}>
                  <Shield
                    color={isCompleted ? '#FFF' : (isAvailable ? colors.primary : '#999')}
                    size={32}
                    strokeWidth={2.5}
                  />
                </View>
                <AppText
                  size={14}
                  bold
                  center
                  style={styles.nodeLabel}
                  color={isAvailable ? colors.text : '#999'}
                >
                  {lesson.title}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F9FF',
    margin: 20,
    borderRadius: 20,
  },
  heroBubble: {
    flex: 1,
    marginLeft: 15,
  },
  pathContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  nodeWrapper: {
    alignItems: 'center',
    marginVertical: 15,
  },
  node: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // Bottom shadow for Duolingo effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 5,
  },
  nodeLabel: {
    marginTop: 8,
    width: 120,
  },
});
