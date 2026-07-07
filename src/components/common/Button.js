import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.grey[400];
    if (variant === 'primary') return colors.primary.main;
    if (variant === 'secondary') return colors.secondary.main;
    if (variant === 'outline') return 'transparent';
    return colors.primary.main;
  };

  const getTextColor = () => {
    if (disabled) return colors.white;
    if (variant === 'outline') return colors.primary.main;
    return colors.white;
  };

  const getBorderColor = () => {
    if (variant === 'outline') return colors.primary.main;
    return 'transparent';
  };

  const getPadding = () => {
    if (size === 'small') return { paddingVertical: 8, paddingHorizontal: 16 };
    if (size === 'large') return { paddingVertical: 16, paddingHorizontal: 32 };
    return { paddingVertical: 12, paddingHorizontal: 24 };
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 2 : 0,
          ...getPadding(),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.button,
    fontWeight: '600',
  },
});
