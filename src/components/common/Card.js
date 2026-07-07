import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const Card = ({
  children,
  style,
  elevation = 2,
  padding = spacing.md,
  backgroundColor = colors.white,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          padding,
          backgroundColor,
          elevation,
          shadowOpacity: elevation > 0 ? 0.1 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
});
