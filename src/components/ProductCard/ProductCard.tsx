import React from 'react';

import {
  View,
  Text,
  Image,
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


interface ProductCardProps {

  title: string;

  price: string;

  image?: string;

  description?: string;

  onPress?: () => void;

}



const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  description,
  onPress,
}) => {


  return (

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.container}
    >


      <View style={styles.card}>


        {
          image && (

            <Image
              source={{uri:image}}
              style={styles.image}
            />

          )
        }



        <View style={styles.content}>


          <Text style={styles.title}>
            {title}
          </Text>



          {
            description && (

              <Text style={styles.description}>
                {description}
              </Text>

            )
          }



          <Text style={styles.price}>
            {price}
          </Text>


        </View>


      </View>


    </TouchableOpacity>

  );

};


export default ProductCard;



const styles = StyleSheet.create({

  container:{
    marginBottom:spacing.md,
  },


  card:{

    backgroundColor:colors.card,

    borderRadius:radius.lg,

    borderWidth:1,

    borderColor:'rgba(255,255,255,0.08)',

    overflow:'hidden',

    ...shadows.light,

  },


  image:{

    width:'100%',

    height:180,

  },


  content:{

    padding:spacing.lg,

  },


  title:{

    ...typography.subtitle,

    color:colors.textPrimary,

  },


  description:{

    marginTop:spacing.sm,

    ...typography.bodySmall,

    color:colors.textSecondary,

  },


  price:{

    marginTop:spacing.md,

    fontSize:22,

    fontWeight:'700',

    color:colors.primary,

  },


});