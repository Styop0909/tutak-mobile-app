import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { BlurView } from 'expo-blur';

import {
  colors,
  radius,
  spacing,
} from '../../theme';



interface PremiumHeaderProps {

  title: string;

  subtitle?: string;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  onRightPress?: () => void;

  style?: ViewStyle;

}



export default function PremiumHeader({

  title,

  subtitle,

  leftIcon,

  rightIcon,

  onRightPress,

  style,

}: PremiumHeaderProps) {


  return (

    <BlurView

      intensity={40}

      tint="dark"

      style={[
        styles.container,
        style,
      ]}

    >


      <View style={styles.content}>


        {
          leftIcon && (

            <View style={styles.left}>
              {leftIcon}
            </View>

          )
        }



        <View style={styles.center}>


          <Text style={styles.title}>
            {title}
          </Text>



          {
            subtitle && (

              <Text style={styles.subtitle}>
                {subtitle}
              </Text>

            )
          }


        </View>



        {
          rightIcon && (

            <TouchableOpacity

              onPress={onRightPress}

              style={styles.right}

            >

              {rightIcon}

            </TouchableOpacity>

          )
        }



      </View>


    </BlurView>

  );
}



const styles = StyleSheet.create({


  container: {

    backgroundColor:
      colors.glass.background,


    borderBottomWidth: 1,

    borderColor:
      colors.glass.border,


    overflow: 'hidden',

  },



  content: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',


    paddingHorizontal:
      spacing.lg,


    paddingVertical:
      spacing.md,

  },



  left: {

    width: 40,

    height: 40,


    borderRadius:
      radius.full,


    alignItems: 'center',

    justifyContent: 'center',

  },



  center: {

    flex: 1,

    marginLeft:
      spacing.md,

  },



  title: {

    color:
      colors.text.primary,


    fontSize:
      22,


    fontWeight:
      '700',


    letterSpacing:
      -0.5,

  },



  subtitle: {

    color:
      colors.text.secondary,


    fontSize:
      14,


    marginTop:
      spacing.xs,

  },



  right: {

    width: 40,

    height: 40,


    borderRadius:
      radius.md,


    alignItems: 'center',

    justifyContent: 'center',


    backgroundColor:
      colors.glass.light,

  },


});