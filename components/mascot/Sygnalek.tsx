import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { AppText } from '../common/AppText';
import { useTheme } from '../../context/ThemeContext';

export type SygnalekState = 'IDLE' | 'SUCCESS' | 'ERROR' | 'THINKING' | 'CELEBRATE';

interface SygnalekProps {
  state: SygnalekState;
  size?: number;
}

const BINARY_COUNT = 12;

export const Sygnalek: React.FC<SygnalekProps> = ({ state, size = 150 }) => {
  const { colors } = useTheme();
  const bounce = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    bounce.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const getMascotString = () => {
    switch (state) {
      case 'SUCCESS': return '\\(^ヮ^)/';
      case 'ERROR': return '(╯°□°)╯';
      case 'THINKING': return '(⊙_⊙)';
      case 'CELEBRATE': return '(づ￣ ³￣)づ';
      default: return 'd(•‿•)b';
    }
  };

  const getAuraColor = () => {
    switch (state) {
      case 'SUCCESS': return colors.success;
      case 'ERROR': return colors.error;
      case 'THINKING': return colors.warning;
      default: return colors.primary;
    }
  };

  const animatedMascotStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: bounce.value * -10 },
        { scale: state === 'SUCCESS' ? withSpring(1.2) : withSpring(1) }
      ],
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Binary Aura */}
      {[...Array(BINARY_COUNT)].map((_, i) => (
        <BinaryParticle key={i} index={i} color={getAuraColor()} mascotSize={size} />
      ))}

      <Animated.View style={[styles.mascotContainer, animatedMascotStyle]}>
        <AppText
          size={size * 0.25}
          bold
          color={getAuraColor()}
          style={styles.mascotText}
        >
          {getMascotString()}
        </AppText>
      </Animated.View>
    </View>
  );
};

const BinaryParticle = ({ index, color, mascotSize }: { index: number, color: string, mascotSize: number }) => {
  const offset = useSharedValue(0);
  const opacity = useSharedValue(0);
  const char = index % 2 === 0 ? '0' : '1';

  useEffect(() => {
    const delay = index * 200;
    opacity.value = withRepeat(
      withSequence(
        withDelay(delay, withTiming(0.6, { duration: 1000 })),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      false
    );
    offset.value = withRepeat(
      withSequence(
        withDelay(delay, withTiming(1, { duration: 2000 })),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const angle = (index / BINARY_COUNT) * Math.PI * 2;
    const radius = mascotSize * 0.45;
    const x = Math.cos(angle) * radius * (0.8 + offset.value * 0.4);
    const y = Math.sin(angle) * radius * (0.8 + offset.value * 0.4);

    return {
      position: 'absolute',
      opacity: opacity.value,
      transform: [
        { translateX: x },
        { translateY: y },
        { scale: 0.5 + offset.value * 0.5 }
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <AppText bold color={color} size={14}>{char}</AppText>
    </Animated.View>
  );
};

// Helper for delay in reanimated
function withDelay(delay: number, animation: any) {
  'worklet';
  return withSequence(withTiming(0, { duration: delay }), animation);
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotText: {
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  }
});
