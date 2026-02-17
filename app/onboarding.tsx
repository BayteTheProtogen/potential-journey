import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Sygnalek, SygnalekState } from '../components/mascot/Sygnalek';
import { AppText } from '../components/common/AppText';
import { AppButton } from '../components/common/AppButton';
import { AppCard } from '../components/common/AppCard';
import { useTheme } from '../context/ThemeContext';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const { colors, fontSizeLevel, setFontSizeLevel, highContrast, setHighContrast } = useTheme();
  const router = useRouter();

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
            <Sygnalek state="IDLE" size={200} />
            <AppText size={32} bold center style={styles.title}>
              Witaj! Jestem Sygnałek.
            </AppText>
            <AppText size={20} center style={styles.subtitle}>
              Twoim osobistym opiekunem w cyfrowym świecie. Razem nauczymy się, jak bezpiecznie korzystać z internetu.
            </AppText>
          </Animated.View>
        );
      case 1:
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
            <AppText size={28} bold center style={styles.title}>
              Dopasujmy tekst do Twoich potrzeb
            </AppText>
            <AppCard style={styles.configCard}>
              <AppButton
                title="Tekst Normalny"
                variant={fontSizeLevel === 'normal' ? 'primary' : 'outline'}
                onPress={() => setFontSizeLevel('normal')}
              />
              <AppButton
                title="Tekst Duży"
                variant={fontSizeLevel === 'large' ? 'primary' : 'outline'}
                onPress={() => setFontSizeLevel('large')}
              />
              <AppButton
                title="Tekst Bardzo Duży"
                variant={fontSizeLevel === 'extraLarge' ? 'primary' : 'outline'}
                onPress={() => setFontSizeLevel('extraLarge')}
              />
            </AppCard>
            <AppText size={18} center style={styles.previewText}>
              To jest przykładowy tekst, abyś mógł sprawdzić czy jest czytelny.
            </AppText>
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
            <AppText size={28} bold center style={styles.title}>
              Wysoki kontrast?
            </AppText>
            <AppCard style={styles.configCard}>
              <View style={styles.row}>
                <AppText size={22} bold>Włącz wysoki kontrast</AppText>
                <Switch
                  value={highContrast}
                  onValueChange={setHighContrast}
                  trackColor={{ false: "#767577", true: colors.primary }}
                />
              </View>
              <AppText size={16} style={{ marginTop: 10 }}>
                Dzięki temu teksty będą bardziej wyraźne, a kolory mocniej nasycone.
              </AppText>
            </AppCard>
            <Sygnalek state="THINKING" size={150} />
          </Animated.View>
        );
      case 3:
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
            <Sygnalek state="CELEBRATE" size={180} />
            <AppText size={28} bold center style={styles.title}>
              Twoja Misja
            </AppText>
            <AppText size={20} center style={styles.subtitle}>
              Internet bywa jak labirynt. Moim zadaniem jest dać Ci mapę i kompas, byś nigdy nie dał się oszukać cyfrowym piratom!
            </AppText>
          </Animated.View>
        );
      case 4:
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
            <Sygnalek state="SUCCESS" size={200} />
            <AppText size={32} bold center style={styles.title}>
              Zaczynamy?
            </AppText>
            <AppText size={20} center style={styles.subtitle}>
              Każda lekcja to krok do stania się Strażnikiem Sieci!
            </AppText>
          </Animated.View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {renderStep()}
      </View>
      <View style={styles.footer}>
        <AppButton
          title={step === 4 ? "ZACZYNAJMY!" : "DALEJ"}
          onPress={nextStep}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    marginTop: 30,
    marginBottom: 15,
  },
  subtitle: {
    opacity: 0.8,
    lineHeight: 28,
  },
  footer: {
    padding: 24,
    width: '100%',
  },
  configCard: {
    width: '100%',
    marginVertical: 20,
  },
  previewText: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }
});
