import React from 'react';

import {
View,
Text,
StyleSheet
} from 'react-native';

import {
colors
} from '../../theme';



export default function MenuScreen(){

return(

<View style={styles.container}>

<Text style={styles.text}>
Menu
</Text>

</View>

);

}



const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.background.primary,
alignItems:'center',
justifyContent:'center'
},


text:{
color:'#fff',
fontSize:24
}

});