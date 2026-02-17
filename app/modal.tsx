import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { AppText } from '../components/common/AppText';
import { AppCard } from '../components/common/AppCard';
import { AppButton } from '../components/common/AppButton';
import { useRouter } from 'expo-router';

export default function SettingsModal() {
  const { colors, fontSizeLevel, setFontSizeLevel, highContrast, setHighContrast } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppText size={28} bold style={styles.title}>Ustawienia</AppText>

      <AppCard style={styles.section}>
        <AppText size={20} bold style={styles.label}>Wielkość tekstu</AppText>
        <View style={styles.buttonRow}>
          <AppButton
            title="A"
            style={styles.smallBtn}
            variant={fontSizeLevel === 'normal' ? 'primary' : 'outline'}
            onPress={() => setFontSizeLevel('normal')}
          />
          <AppButton
            title="A+"
            style={styles.smallBtn}
            variant={fontSizeLevel === 'large' ? 'primary' : 'outline'}
            onPress={() => setFontSizeLevel('large')}
          />
          <AppButton
            title="A++"
            style={styles.smallBtn}
            variant={fontSizeLevel === 'extraLarge' ? 'primary' : 'outline'}
            onPress={() => setFontSizeLevel('extraLarge')}
          />
        </View>
      </AppCard>

      <AppCard style={styles.section}>
        <View style={styles.switchRow}>
          <AppText size={20} bold>Wysoki kontrast</AppText>
          <Switch
            value={highContrast}
            onValueChange={setHighContrast}
            trackColor={{ false: "#767577", true: colors.primary }}
          />
        </View>
      </AppCard>

      <AppButton
        title="GOTOWE"
        style={{ marginTop: 'auto', marginBottom: 20 }}
        onPress={() => router.back()}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallBtn: {
    width: '30%',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
