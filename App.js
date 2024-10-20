import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import Settings from './screens/Settings';
import AddActivity from './screens/AddActivity';
import AddDiet from './screens/AddDiet';
import DataProvider from './context/DataContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  const { currentTheme } = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Activities') {
            iconName = focused ? "walk" : "walk-outline";
          } else if (route.name === 'Diet') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: currentTheme.headerColor },
        tabBarActiveTintColor: currentTheme.color,
        tabBarInactiveTintColor: currentTheme.color,
      })}
    >
      <BottomTab.Screen name="Activities" component={Activities} />
      <BottomTab.Screen name="Diet" component={Diet} />
      <BottomTab.Screen name="Settings" component={Settings} />
    </BottomTab.Navigator>
  );
}

function ThemedApp() {
  const { currentTheme } = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: currentTheme.headerColor },
          headerTintColor: currentTheme.color,
        }}
      >
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="AddActivity"
          component={AddActivity}
          options={{
            title: "Add an Activity",
            headerBackTitle: "Activities",
          }}
        />
        <Stack.Screen
          name="AddDiet"
          component={AddDiet}
          options={{
            title: "Add A Diet Entry",
            headerBackTitle: "Diet",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <ThemedApp />
      </DataProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});