import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  colors,
  spacing,
  radius,
  typography,
  shadows,
} from '../../theme';


interface BonusCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}


const BonusCard: React.FC<BonusCardProps> = ({
  title,
  value,
  description,
  icon,
  onPress,
}) => {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.wrapper}
    >

      <LinearGradient
        colors={[
          colors.primaryGradientStart,
          colors.primaryGradientEnd,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >

        <View style={styles.glass}>

          <View style={styles.header}>

            {icon && (
              <View style={styles.icon}>
                {icon}
              </View>
            )}

            <Text style={styles.title}>
              {title}
            </Text>

          </View>


          <Text style={styles.value}>
            {value}
          </Text>


          {description && (
            <Text style={styles.description}>
              {description}
            </Text>
          )}


        </View>

      </LinearGradient>

    </TouchableOpacity>
  );
};


export default BonusCard;



const styles = StyleSheet.create({

  wrapper:{
    marginVertical: spacing.md,
    borderRadius: radius.xl,

    ...shadows.medium,
  },


  gradient:{
    borderRadius: radius.xl,
    padding: 1,
  },


  glass:{
    backgroundColor: colors.card,
    borderRadius: radius.xl,

    padding: spacing.lg,

    minHeight:150,

    justifyContent:'space-between',
  },


  header:{
    flexDirection:'row',
    alignItems:'center',
  },


  icon:{
    width:45,
    height:45,

    borderRadius:radius.md,

    alignItems:'center',
    justifyContent:'center',

    backgroundColor:'rgba(255,255,255,0.08)',

    marginRight:spacing.md,
  },


  title:{
    ...typography.subtitle,

    color:colors.textPrimary,
  },


  value:{
    marginTop:spacing.lg,

    fontSize:32,
    fontWeight:'700',

    color:colors.textPrimary,
  },


  description:{
    marginTop:spacing.sm,

    ...typography.body,

    color:colors.textSecondary,
  },

});