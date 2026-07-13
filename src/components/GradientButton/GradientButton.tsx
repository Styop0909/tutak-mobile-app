import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  colors,
  radius,
  spacing,
} from '../../theme';


interface GradientButtonProps {
  title: string;
  onPress: () => void;

  loading?: boolean;

  disabled?: boolean;

  style?: ViewStyle;

  textStyle?: TextStyle;
}


export default function GradientButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}: GradientButtonProps) {

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}

      style={({ pressed }) => [
        styles.wrapper,

        pressed && styles.pressed,

        style,
      ]}
    >

      <LinearGradient
        colors={[
          colors.gradient.start,
          colors.gradient.end,
        ]}

        start={{
          x: 0,
          y: 0,
        }}

        end={{
          x: 1,
          y: 1,
        }}

        style={styles.button}
      >

        {
          loading ? (

            <ActivityIndicator
              color="#FFFFFF"
            />

          ) : (

            <Text
              style={[
                styles.text,
                textStyle,
              ]}
            >
              {title}
            </Text>

          )
        }


      </LinearGradient>


    </Pressable>
  );
}



const styles = StyleSheet.create({

  wrapper: {

    borderRadius: radius.md,

    shadowColor: '#5B8CFF',

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.25,

    shadowRadius: 20,

    elevation: 8,

  },


  button: {

    paddingVertical: spacing.md,

    paddingHorizontal: spacing.lg,

    borderRadius: radius.md,

    alignItems: 'center',

    justifyContent: 'center',

    minHeight: 52,

  },


  text: {

    color: colors.text.primary,

    fontSize: 16,

    fontWeight: '600',

  },


  pressed: {

    transform: [
      {
        scale: 0.96,
      },
    ],

  },


});