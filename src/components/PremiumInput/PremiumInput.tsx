import React, { useState } from 'react';

import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
  ViewStyle,
} from 'react-native';

import { BlurView } from 'expo-blur';

import {
  colors,
  radius,
  spacing,
} from '../../theme';


interface PremiumInputProps extends TextInputProps {

  label?: string;

  error?: string;

  success?: boolean;

  icon?: React.ReactNode;

  containerStyle?: ViewStyle;

}


export default function PremiumInput({
  label,
  error,
  success,
  icon,
  containerStyle,
  ...props
}: PremiumInputProps) {


  const [focused, setFocused] = useState(false);



  return (

    <View style={[
      styles.wrapper,
      containerStyle,
    ]}>



      {
        label && (

          <Text style={styles.label}>
            {label}
          </Text>

        )
      }



      <BlurView
        intensity={30}
        tint="dark"

        style={[
          styles.container,

          focused && styles.focused,

          error && styles.error,

          success && styles.success,

        ]}
      >



        {
          icon && (

            <View style={styles.icon}>
              {icon}
            </View>

          )
        }



        <TextInput

          {...props}

          placeholderTextColor={
            colors.text.tertiary
          }


          style={[
            styles.input,

            icon && styles.withIcon,

          ]}


          onFocus={() => setFocused(true)}

          onBlur={() => setFocused(false)}

        />



      </BlurView>




      {
        error && (

          <Text style={styles.errorText}>
            {error}
          </Text>

        )
      }


    </View>

  );
}



const styles = StyleSheet.create({

  wrapper: {
    width: '100%',
  },


  label: {

    color: colors.text.secondary,

    fontSize: 14,

    marginBottom: spacing.sm,

    fontWeight: '600',

  },


  container: {

    minHeight: 56,

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor:
      colors.glass.background,


    borderWidth: 1,

    borderColor:
      colors.glass.border,


    borderRadius:
      radius.md,


    overflow: 'hidden',

  },


  focused: {

    borderColor:
      colors.primary.main,


    shadowColor:
      colors.primary.main,


    shadowOpacity:
      0.25,


    shadowRadius:
      12,


    elevation:
      6,

  },


  error: {

    borderColor:
      colors.status.error,

  },


  success: {

    borderColor:
      colors.status.success,

  },


  input: {

    flex: 1,

    color:
      colors.text.primary,


    fontSize: 16,

    paddingHorizontal:
      spacing.md,

  },


  withIcon: {

    paddingLeft:
      spacing.xs,

  },


  icon: {

    marginLeft:
      spacing.md,

  },


  errorText: {

    color:
      colors.status.error,


    fontSize:
      12,


    marginTop:
      spacing.xs,

  },


});