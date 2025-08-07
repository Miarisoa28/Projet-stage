import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// User Screens
import UserDashboardScreen from '../screens/user/UserDashboardScreen';
import LeaveRequestScreen from '../screens/user/LeaveRequestScreen';
import NotificationsScreen from '../screens/user/NotificationsScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import SearchUsersScreen from '../screens/user/SearchUsersScreen';
import DownloadProfileScreen from '../screens/user/DownloadProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={UserDashboardScreen} />
    <Stack.Screen name="LeaveRequest" component={LeaveRequestScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="SearchUsers" component={SearchUsersScreen} />
    <Stack.Screen name="DownloadProfile" component={DownloadProfileScreen} />
  </Stack.Navigator>
);

const UserDashboardNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'DashboardTab':
              iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
              break;
            case 'NotificationsTab':
              iconName = focused ? 'bell' : 'bell-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              iconName = 'help-circle';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Accueil',
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
};

export default UserDashboardNavigator;