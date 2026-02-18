import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { LESSONS, Lesson, Question } from '../../data/lessons';
import { AppText } from '../../components/common/AppText';
import { AppButton } from '../../components/common/AppButton';
import { AppCard } from '../../components/common/AppCard';
import { Sygnalek, SygnalekState } from '../../components/mascot/Sygnalek';
import { X, CheckCircle2, AlertCircle } from 'lucide-react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const { addXP, completeLesson } = useUser();

  const lesson = LESSONS.find(l => l.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mascotState, setMascotState] = useState<SygnalekState>('IDLE');
  const [isFinished, setIsFinished] = useState(false);

  if (!lesson) return null;

  const currentQuestion = lesson.questions[currentIndex];

  const handleCheck = () => {
    const correct = currentQuestion.correctAnswer === (currentQuestion.type === 'boolean' ? (selectedOption === 'Prawda') : selectedOption);

    // Organic transition sequence
    setMascotState('THINKING');

    setTimeout(() => {
      setIsCorrect(correct);
      setShowFeedback(true);
      setMascotState(correct ? 'SUCCESS' : 'ERROR');

      if (correct) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }, 600);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setMascotState('IDLE');

    if (currentIndex < lesson.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishLesson();
    }
  };

  const finishLesson = () => {
    addXP(20);
    completeLesson(lesson.id);
    setIsFinished(true);

    // Sequence of victory
    setMascotState('SUCCESS');
    setTimeout(() => {
      setMascotState('CELEBRATE');
    }, 800);
  };

  const renderQuestion = () => {
    return (
      <View style={styles.questionContainer}>
        {currentQuestion.type === 'analysis' && (
          <AppCard style={styles.analysisCard}>
            <AppText size={14} color="#666" style={{ marginBottom: 5 }}>ANALIZA WIADOMOŚCI:</AppText>
            <AppText size={18} style={styles.analysisText}>{currentQuestion.text}</AppText>
          </AppCard>
        )}

        <AppText size={24} bold style={styles.questionText}>
          {currentQuestion.type === 'analysis' ? 'Co o tym sądzisz?' : currentQuestion.text}
        </AppText>

        <View style={styles.optionsContainer}>
          {currentQuestion.type === 'boolean' ? (
            ['Prawda', 'Fałsz'].map(opt => (
              <OptionButton
                key={opt}
                title={opt}
                selected={selectedOption === opt}
                onPress={() => setSelectedOption(opt)}
              />
            ))
          ) : (
            currentQuestion.options?.map(opt => (
              <OptionButton
                key={opt}
                title={opt}
                selected={selectedOption === opt}
                onPress={() => setSelectedOption(opt)}
              />
            ))
          )}
        </View>
      </View>
    );
  };

  if (isFinished) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.finishContainer}>
          <Sygnalek state="CELEBRATE" size={200} />
          <AppText size={32} bold center>Świetna robota!</AppText>
          <AppText size={20} center style={{ marginTop: 10 }}>
            Ukończyłeś lekcję: {lesson.title}
          </AppText>
          <AppCard style={styles.rewardCard}>
            <AppText size={24} bold color={colors.primary}>+20 XP</AppText>
            <AppText size={16}>Twoja wiedza rośnie!</AppText>
          </AppCard>
          <View style={{ width: '100%', marginTop: 20 }}>
            <AppButton title="WRÓĆ DO MAPY" onPress={() => router.replace('/(tabs)')} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X color={colors.text} size={30} />
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: colors.primary,
                width: `${((currentIndex) / lesson.questions.length) * 100}%`
              }
            ]}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mascotRow}>
          <Sygnalek state={mascotState} size={100} />
          <View style={styles.bubble}>
            <AppText size={16}>
              {mascotState === 'ERROR' ? 'Uważaj! To pułapka.' : 'Jak myślisz?'}
            </AppText>
          </View>
        </View>

        {renderQuestion()}
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title="SPRAWDŹ"
          disabled={!selectedOption}
          onPress={handleCheck}
        />
      </View>

      <Modal visible={showFeedback} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <Animated.View
            entering={SlideInDown}
            style={[
              styles.feedbackContent,
              { backgroundColor: isCorrect ? '#D7FFB8' : '#FFDFE0' }
            ]}
          >
            <View style={styles.feedbackHeader}>
              {isCorrect ? (
                <CheckCircle2 color={colors.success} size={32} />
              ) : (
                <AlertCircle color={colors.error} size={32} />
              )}
              <AppText size={22} bold color={isCorrect ? colors.success : colors.error} style={{ marginLeft: 10 }}>
                {isCorrect ? 'Doskonale!' : 'Niezupełnie...'}
              </AppText>
            </View>
            <ScrollView style={{ maxHeight: 300 }}>
              <AppText size={18} style={styles.explanation}>
                {currentQuestion.explanation}
              </AppText>
            </ScrollView>
            <AppButton
              title="DALEJ"
              variant={isCorrect ? 'primary' : 'danger'}
              onPress={nextQuestion}
            />
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const OptionButton = ({ title, selected, onPress }: { title: string, selected: boolean, onPress: () => void }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.optionButton,
        {
          backgroundColor: selected ? '#E5F4FF' : colors.card,
          borderColor: selected ? colors.secondary : colors.border,
          borderWidth: 2,
        }
      ]}
    >
      <AppText size={18} bold={selected}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  progressBarBg: {
    flex: 1,
    height: 12,
    backgroundColor: '#E5E5E5',
    borderRadius: 6,
    marginLeft: 15,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mascotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bubble: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 15,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginVertical: 8,
  },
  footer: {
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  feedbackContent: {
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  explanation: {
    marginBottom: 25,
    lineHeight: 24,
  },
  finishContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  rewardCard: {
    alignItems: 'center',
    marginVertical: 30,
  },
  analysisCard: {
    backgroundColor: '#F9F9F9',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#CCC',
    marginBottom: 20,
    padding: 15,
  },
  analysisText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#333',
  },
});
