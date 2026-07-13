import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  colors,
  spacing,
  radius,
  typography,
  shadows,
} from '../../theme';


interface MenuCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}


const MenuCard: React.FC<MenuCardProps> = ({
  title,
  description,
  icon,
  onPress,
}) => {

  return (

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.container}
    >

      <View style={styles.card}>


        <View style={styles.iconWrapper}>
          {icon}
        </View>


        <View style={styles.content}>

          <Text style={styles.title}>
            {title}
          </Text>


          {description && (

            <Text style={styles.description}>
              {description}
            </Text>

          )}

        </View>


      </View>

    </TouchableOpacity>

  );
};


export default MenuCard;



const styles = StyleSheet.create({

  container:{
    marginBottom:spacing.md,
  },


  card:{

    flexDirection:'row',
    alignItems:'center',

    backgroundColor:colors.card,

    borderRadius:radius.lg,

    borderWidth:1,
    borderColor:'rgba(255,255,255,0.08)',

    padding:spacing.lg,

    ...shadows.light,

  },


  iconWrapper:{

    width:55,
    height:55,

    borderRadius:radius.md,

    justifyContent:'center',
    alignItems:'center',

    backgroundColor:'rgba(91,140,255,0.15)',

    marginRight:spacing.md,

  },


  content:{
    flex:1,
  },


  title:{

    ...typography.subtitle,

    color:colors.textPrimary,

  },


  description:{

    marginTop:spacing.xs,

    ...typography.bodySmall,

    color:colors.textSecondary,

  },


});