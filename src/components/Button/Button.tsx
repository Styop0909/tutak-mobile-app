import React from 'react';

import {
 TouchableOpacity,
 Text,
 StyleSheet
} from 'react-native';


import {
 colors,
 radius,
 spacing
} from '../../theme';



interface Props {

title:string;

onPress:()=>void;

}


export default function Button({
title,
onPress
}:Props){


return (

<TouchableOpacity

onPress={onPress}

style={styles.button}

>

<Text style={styles.text}>
{title}
</Text>


</TouchableOpacity>

);


}



const styles=StyleSheet.create({

button:{


backgroundColor:colors.primary.main,

paddingVertical:spacing.md,

paddingHorizontal:spacing.lg,

borderRadius:radius.md,

alignItems:'center',

justifyContent:'center'

},


text:{

color:'#fff',

fontSize:16,

fontWeight:'600'

}

});