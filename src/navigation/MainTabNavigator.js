import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { MenuScreen } from '../screens/Menu/MenuScreen';
import { CartScreen } from '../screens/Cart/CartScreen';
import { OrdersScreen } from '../screens/Orders/OrdersScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { colors } from '../theme/colors';
import { useCartStore } from '../store/cartStore';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  const { totalItems } = useCartStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Menu':
              iconName = 'coffee';
              break;
            case 'Cart':
              iconName = 'shopping-bag';
              break;
            case 'Orders':
              iconName = 'clipboard';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'circle';
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.grey[400],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.grey[200],
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.white,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.grey[200],
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.text.primary,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: 'Menu',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.error,
            color: colors.white,
            fontSize: 10,
            paddingHorizontal: 6,
          },
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Orders',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
