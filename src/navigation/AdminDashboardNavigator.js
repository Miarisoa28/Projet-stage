import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Admin Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import AdminRequestsScreen from '../screens/admin/AdminRequestsScreen';
import AdminSettingsScreen from '../screens/admin/AdminSettingsScreen';
import UserDetailScreen from '../screens/admin/UserDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={AdminDashboardScreen} />
  </Stack.Navigator>
);

const UsersStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Users" component={AdminUsersScreen} />
    <Stack.Screen name="UserDetail" component={UserDetailScreen} />
  </Stack.Navigator>
);

const RequestsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Requests" component={AdminRequestsScreen} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Settings" component={AdminSettingsScreen} />
  </Stack.Navigator>
);

const AdminDashboardNavigator = () => {
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
            case 'UsersTab':
              iconName = focused ? 'account-group' : 'account-group-outline';
              break;
            case 'RequestsTab':
              iconName = focused ? 'file-document' : 'file-document-outline';
              break;
            case 'SettingsTab':
              iconName = focused ? 'cog' : 'cog-outline';
              break;
            default:
              iconName = 'help-circle';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.error, // Red color for admin
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
          tabBarLabel: 'Tableau de bord',
        }}
      />
      <Tab.Screen
        name="UsersTab"
        component={UsersStack}
        options={{
          tabBarLabel: 'Personnel',
        }}
      />
      <Tab.Screen
        name="RequestsTab"
        component={RequestsStack}
        options={{
          tabBarLabel: 'Demandes',
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Paramètres',
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminDashboardNavigator;