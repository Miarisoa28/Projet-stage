import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Button, Appbar, FAB } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { mockLeaveRequests } from '../../data/mockData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserDashboardScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    loadUserRequests();
  }, []);

  const loadUserRequests = () => {
    // Filter requests for current user
    const requests = mockLeaveRequests.filter(req => req.userId === user.id);
    setUserRequests(requests);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    loadUserRequests();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approuvé':
        return theme.colors.primary;
      case 'Refusé':
        return theme.colors.error;
      default:
        return theme.colors.outline;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approuvé':
        return 'check-circle';
      case 'Refusé':
        return 'close-circle';
      default:
        return 'clock';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content 
          title="Tableau de bord" 
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Appbar.Action
          icon={isDarkMode ? "weather-sunny" : "weather-night"}
          onPress={toggleTheme}
        />
        <Appbar.Action
          icon="logout"
          onPress={logout}
        />
      </Appbar.Header>

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Card */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="headlineSmall" style={[styles.welcomeTitle, { color: theme.colors.onSurface }]}>
              Bonjour, {user.prenoms} !
            </Text>
            <Text variant="bodyMedium" style={[styles.welcomeSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              {user.fonction} - {user.service}
            </Text>
          </Card.Content>
        </Card>

        {/* Leave Balance Card */}
        <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}>
          <Card.Content>
            <View style={styles.balanceContainer}>
              <MaterialCommunityIcons 
                name="calendar-check" 
                size={32} 
                color={theme.colors.onPrimaryContainer} 
              />
              <View style={styles.balanceTextContainer}>
                <Text variant="bodyMedium" style={[styles.balanceLabel, { color: theme.colors.onPrimaryContainer }]}>
                  Solde de congés
                </Text>
                <Text variant="headlineMedium" style={[styles.balanceValue, { color: theme.colors.onPrimaryContainer }]}>
                  {user.leaveBalance} jours
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Actions rapides
          </Text>
          
          <View style={styles.actionsGrid}>
            <Card style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}>
              <Card.Content style={styles.actionContent}>
                <MaterialCommunityIcons 
                  name="calendar-plus" 
                  size={24} 
                  color={theme.colors.primary} 
                />
                <Text variant="bodyMedium" style={[styles.actionText, { color: theme.colors.onSurface }]}>
                  Demander un congé
                </Text>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('LeaveRequest')}
                  style={styles.actionButton}
                  compact
                >
                  Accéder
                </Button>
              </Card.Content>
            </Card>

            <Card style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}>
              <Card.Content style={styles.actionContent}>
                <MaterialCommunityIcons 
                  name="account-search" 
                  size={24} 
                  color={theme.colors.secondary} 
                />
                <Text variant="bodyMedium" style={[styles.actionText, { color: theme.colors.onSurface }]}>
                  Rechercher personnel
                </Text>
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate('SearchUsers')}
                  style={styles.actionButton}
                  compact
                >
                  Accéder
                </Button>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Recent Requests */}
        <View style={styles.requestsContainer}>
          <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Mes demandes récentes
          </Text>
          
          {userRequests.length > 0 ? (
            userRequests.slice(0, 3).map((request) => (
              <Card key={request.id} style={[styles.requestCard, { backgroundColor: theme.colors.surface }]}>
                <Card.Content>
                  <View style={styles.requestHeader}>
                    <Text variant="bodyLarge" style={[styles.requestType, { color: theme.colors.onSurface }]}>
                      {request.type}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
                      <MaterialCommunityIcons 
                        name={getStatusIcon(request.status)} 
                        size={16} 
                        color={theme.colors.onPrimary} 
                      />
                      <Text variant="bodySmall" style={[styles.statusText, { color: theme.colors.onPrimary }]}>
                        {request.status}
                      </Text>
                    </View>
                  </View>
                  <Text variant="bodyMedium" style={[styles.requestDate, { color: theme.colors.onSurfaceVariant }]}>
                    Du {request.dateDebut} au {request.dateFin} ({request.duree} jours)
                  </Text>
                  <Text variant="bodySmall" style={[styles.requestMotif, { color: theme.colors.onSurfaceVariant }]}>
                    {request.motif}
                  </Text>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Card style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <Text variant="bodyMedium" style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
                  Aucune demande récente
                </Text>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('LeaveRequest')}
        label="Nouvelle demande"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  welcomeTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontStyle: 'italic',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
  },
  balanceValue: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    elevation: 2,
  },
  actionContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionText: {
    textAlign: 'center',
    marginVertical: 8,
  },
  actionButton: {
    marginTop: 8,
  },
  requestsContainer: {
    marginBottom: 80, // Space for FAB
  },
  requestCard: {
    marginBottom: 8,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestType: {
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  requestDate: {
    marginBottom: 4,
  },
  requestMotif: {
    fontStyle: 'italic',
  },
  emptyCard: {
    elevation: 1,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default UserDashboardScreen;