import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
  withSpring,
  withDelay,
  interpolate,
} from 'react-native-reanimated';
import { AppText } from '../common/AppText';
import { useTheme } from '../../context/ThemeContext';

export type SygnalekState = 'IDLE' | 'SUCCESS' | 'ERROR' | 'THINKING' | 'CELEBRATE';

interface SygnalekProps {
  state: SygnalekState;
  size?: number;
}

const BINARY_COUNT = 15;

export const Sygnalek: React.FC<SygnalekProps> = ({ state, size = 150 }) => {
  const { colors } = useTheme();

  // Animation values
  const breath = useSharedValue(0);
  const blink = useSharedValue(1);
  const dance = useSharedValue(0);
  const shake = useSharedValue(0);

  useEffect(() => {
    // Breathing animation
    breath.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    );

    // Blinking loop
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        blink.value = withSequence(
          withTiming(0, { duration: 100 }),
          withTiming(1, { duration: 100 })
        );
      }
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (state === 'CELEBRATE' || state === 'SUCCESS') {
      dance.value = withRepeat(
        withSequence(
          withTiming(-1, { duration: 300 }),
          withTiming(1, { duration: 300 })
        ),
        -1,
        true
      );
    } else {
      dance.value = withSpring(0);
    }

    if (state === 'ERROR') {
      shake.value = withRepeat(
        withSequence(
          withTiming(-5, { duration: 50 }),
          withTiming(5, { duration: 50 })
        ),
        6,
        true
      );
    } else {
      shake.value = 0;
    }
  }, [state]);

  const getMascotParts = () => {
    switch (state) {
      case 'SUCCESS':
        return { left: '( ', eye: '^', mouth: ' ヮ ', eyeRight: '^', right: ' )' };
      case 'ERROR':
        return { left: '( ', eye: '°', mouth: ' □ ', eyeRight: '°', right: ' )' };
      case 'THINKING':
        return { left: '( ', eye: '⊙', mouth: ' _ ', eyeRight: '⊙', right: ' )' };
      case 'CELEBRATE':
        return { left: '(づ ', eye: '￣', mouth: ' ³ ', eyeRight: '￣', right: ' )づ' };
      default:
        return { left: '( ', eye: '•', mouth: ' ‿ ', eyeRight: '•', right: ' )' };
    }
  };

  const parts = getMascotParts();

  const getAuraColor = () => {
    switch (state) {
      case 'SUCCESS': return colors.success;
      case 'ERROR': return colors.error;
      case 'THINKING': return colors.warning;
      default: return colors.primary;
    }
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(breath.value, [0, 1], [0, -size * 0.05]) },
        { rotate: `${dance.value * 5}deg` },
        { translateX: shake.value },
        { scale: state === 'CELEBRATE' || state === 'SUCCESS' ? withSpring(1.15) : withSpring(1) }
      ],
    };
  });

  const eyeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scaleY: blink.value }
      ],
    };
  });

  const fontSize = size * 0.22;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Binary Aura */}
      <View style={StyleSheet.absoluteFill}>
        {[...Array(BINARY_COUNT)].map((_, i) => (
          <BinaryParticle key={i} index={i} color={getAuraColor()} mascotSize={size} />
        ))}
      </View>

      <Animated.View style={[styles.mascotContainer, animatedContainerStyle, { width: size, height: size }]}>
        <View style={styles.faceRow}>
          <AppText size={fontSize} bold color={getAuraColor()} numberOfLines={1} adjustsFontSizeToFit>{parts.left}</AppText>
          <Animated.View style={eyeStyle}>
            <AppText size={fontSize} bold color={getAuraColor()} numberOfLines={1} adjustsFontSizeToFit>{parts.eye}</AppText>
          </Animated.View>
          <AppText size={fontSize} bold color={getAuraColor()} numberOfLines={1} adjustsFontSizeToFit>{parts.mouth}</AppText>
          <Animated.View style={eyeStyle}>
            <AppText size={fontSize} bold color={getAuraColor()} numberOfLines={1} adjustsFontSizeToFit>{parts.eyeRight}</AppText>
          </Animated.View>
          <AppText size={fontSize} bold color={getAuraColor()} numberOfLines={1} adjustsFontSizeToFit>{parts.right}</AppText>
        </View>
      </Animated.View>
    </View>
  );
};

const BinaryParticle = ({ index, color, mascotSize }: { index: number, color: string, mascotSize: number }) => {
  const offset = useSharedValue(0);
  const opacity = useSharedValue(0);
  const char = index % 2 === 0 ? '0' : '1';

  useEffect(() => {
    const delay = index * 150;
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
        withDelay(delay, withTiming(1, { duration: 2500 })),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const angle = (index / BINARY_COUNT) * Math.PI * 2;
    const radius = mascotSize * 0.5;
    const x = Math.cos(angle) * radius * (0.7 + offset.value * 0.5);
    const y = Math.sin(angle) * radius * (0.7 + offset.value * 0.5);

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      opacity: opacity.value,
      transform: [
        { translateX: x - 5 },
        { translateY: y - 5 },
        { scale: 0.4 + offset.value * 0.6 }
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <AppText bold color={color} size={14}>{char}</AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mascotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
