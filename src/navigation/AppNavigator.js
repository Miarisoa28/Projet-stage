import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Auth Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// User Screens
import UserDashboardNavigator from './UserDashboardNavigator';

// Admin Screens
import AdminDashboardNavigator from './AdminDashboardNavigator';

// Loading Screen
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          // Authenticated screens
          isAdmin ? (
            <Stack.Screen name="AdminDashboard" component={AdminDashboardNavigator} />
          ) : (
            <Stack.Screen name="UserDashboard" component={UserDashboardNavigator} />
          )
        ) : (
          // Authentication screens
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;