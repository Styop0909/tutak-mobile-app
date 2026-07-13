import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
} from 'react-native';

import MenuCard from './src/components/MenuCard';
import ProductCard from './src/components/ProductCard';
import StatCard from './src/components/StatCard';
export default function App() {

  return (
    <SafeAreaView
      style={{
        flex:1,
        backgroundColor:'#0A0A0F',
        padding:20,
      }}
    >

      <View>

        <Text
          style={{
            color:'#fff',
            fontSize:28,
            fontWeight:'700',
            marginBottom:20,
          }}
        >
          TuTak Test
        </Text>


        <MenuCard
          title="Charging Stations"
          description="Find nearest charging stations"
          onPress={()=>{
            console.log('Menu clicked');
          }}
        />


        <MenuCard
          title="Building Materials"
          description="Order construction products"
        />
<ProductCard
  title="Cement 50kg"
  description="Premium construction material"
  price="2500 ֏"
/>
<StatCard
  title="Bonus Points"
  value="850"
  subtitle="Available balance"
/>
      </View>

    </SafeAreaView>
  );
}