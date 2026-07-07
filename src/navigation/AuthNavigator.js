import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { OTPScreen } from '../screens/Auth/OTPScreen';
import { colors } from '../theme/colors';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.text.primary,
        },
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{ title: 'Verify OTP' }}
      />
    </Stack.Navigator>
  );
};
