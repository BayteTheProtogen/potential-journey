import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface AppTextProps extends TextProps {
  size?: number;
  bold?: boolean;
  color?: string;
  center?: boolean;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  size = 16,
  bold = false,
  color,
  center = false,
  style,
  ...props
}) => {
  const { colors, getFontSize } = useTheme();

  return (
    <Text
      allowFontScaling={false} // We handle scaling manually via ThemeContext
      style={[
        {
          fontSize: getFontSize(size),
          fontWeight: bold ? '700' : '400',
          color: color || colors.text,
          textAlign: center ? 'center' : 'left',
          fontFamily: 'System',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
