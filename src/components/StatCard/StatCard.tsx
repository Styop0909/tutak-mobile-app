import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  colors,
  spacing,
  radius,
  typography,
  shadows,
} from '../../theme';


interface StatCardProps {

  title: string;

  value: string | number;

  subtitle?: string;

  icon?: React.ReactNode;

}


const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
}) => {


  return (

    <View style={styles.card}>


      <View style={styles.top}>


        {
          icon && (

            <View style={styles.icon}>
              {icon}
            </View>

          )
        }


        <Text style={styles.title}>
          {title}
        </Text>


      </View>



      <Text style={styles.value}>
        {value}
      </Text>



      {
        subtitle && (

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

        )
      }


    </View>

  );

};


export default StatCard;



const styles = StyleSheet.create({

  card:{

    flex:1,

    backgroundColor:colors.card,

    borderRadius:radius.lg,

    borderWidth:1,

    borderColor:'rgba(255,255,255,0.08)',

    padding:spacing.lg,

    minHeight:130,

    ...shadows.light,

  },


  top:{

    flexDirection:'row',

    alignItems:'center',

  },


  icon:{

    width:42,

    height:42,

    borderRadius:radius.md,

    backgroundColor:'rgba(91,140,255,0.15)',

    justifyContent:'center',

    alignItems:'center',

    marginRight:spacing.sm,

  },


  title:{

    ...typography.bodySmall,

    color:colors.textSecondary,

  },


  value:{

    marginTop:spacing.md,

    fontSize:30,

    fontWeight:'700',

    color:colors.textPrimary,

  },


  subtitle:{

    marginTop:spacing.xs,

    ...typography.bodySmall,

    color:colors.textSecondary,

  },


});