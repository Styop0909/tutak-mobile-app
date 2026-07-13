import React, { ReactNode } from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';

import { colors, radius, spacing } from '../../theme';

interface GlassCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  premium?: boolean;
}

export default function GlassCard({
  children,
  style,
  premium = false,
}: GlassCardProps) {
  return (
    <BlurView
      intensity={premium ? 50 : 30}
      tint="dark"
      style={[
        styles.container,
        premium && styles.premium,
        style,
      ]}
    >
      <View style={styles.content}>
        {children}
      </View>
    </BlurView>
  );
}


const styles = StyleSheet.create({

  container: {
    backgroundColor: colors.glass.background,

    borderWidth: 1,
    borderColor: colors.glass.border,

    borderRadius: radius.lg,

    overflow: 'hidden',

    shadowColor: '#5B8CFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 32,

    elevation: 8,
  },


  premium: {
    borderRadius: radius.xl,

    shadowOpacity: 0.25,

    shadowRadius: 40,

    elevation: 12,
  },


  content: {
    padding: spacing.lg,
  },

});