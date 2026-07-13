import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';


import PremiumHeader from '@/components/PremiumHeader';
import GlassCard from '@/components/GlassCard';
import GradientButton from '@/components/GradientButton';


import {
  colors,
  spacing,
  radius,
} from '@/theme';



export default function HomeScreen() {


  return (

    <View style={styles.container}>


      <PremiumHeader

        title="TuTak"

        subtitle="Premium Experience"

      />



      <ScrollView

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.content}

      >



        {/* Welcome Card */}

        <GlassCard premium>


          <Text style={styles.welcomeTitle}>

            Welcome back 👋

          </Text>



          <Text style={styles.description}>

            Manage your orders, bonuses and
            charging stations in one place.

          </Text>



          <GradientButton

            title="Explore TuTak"

            onPress={() => {}}

            style={styles.button}

          />


        </GlassCard>





        {/* Stats */}

        <View style={styles.row}>


          <GlassCard style={styles.statCard}>


            <Text style={styles.statNumber}>
              250
            </Text>


            <Text style={styles.statLabel}>
              Points
            </Text>


          </GlassCard>



          <GlassCard style={styles.statCard}>


            <Text style={styles.statNumber}>
              12
            </Text>


            <Text style={styles.statLabel}>
              Orders
            </Text>


          </GlassCard>



        </View>





        {/* Premium Feature */}

        <GlassCard>


          <Text style={styles.cardTitle}>

            Premium Features

          </Text>



          <Text style={styles.description}>

            Enjoy exclusive bonuses,
            discounts and faster services.

          </Text>


        </GlassCard>




      </ScrollView>



    </View>

  );

}




const styles = StyleSheet.create({


  container: {

    flex: 1,

    backgroundColor:
      colors.background.primary,

  },



  content: {

    padding:
      spacing.lg,

    gap:
      spacing.lg,

  },



  welcomeTitle: {

    color:
      colors.text.primary,


    fontSize:
      28,


    fontWeight:
      '700',

  },



  description: {

    color:
      colors.text.secondary,


    fontSize:
      16,


    lineHeight:
      24,


    marginTop:
      spacing.sm,

  },



  button: {

    marginTop:
      spacing.lg,

  },



  row: {

    flexDirection:
      'row',


    gap:
      spacing.md,

  },



  statCard: {

    flex: 1,

  },



  statNumber: {

    color:
      colors.text.primary,


    fontSize:
      30,


    fontWeight:
      '700',

  },



  statLabel: {

    color:
      colors.text.secondary,


    marginTop:
      spacing.xs,


  },



  cardTitle: {

    color:
      colors.text.primary,


    fontSize:
      20,


    fontWeight:
      '700',

  },


});