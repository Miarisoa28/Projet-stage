import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Appbar, List, Badge, Button } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { mockLeaveRequests } from '../../data/mockData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // Filter requests for current user and create notifications
    const userRequests = mockLeaveRequests.filter(req => req.userId === user.id);
    
    const notifs = userRequests.map(request => ({
      id: request.id,
      title: `Demande de ${request.type}`,
      message: getNotificationMessage(request),
      status: request.status,
      date: new Date(request.dateCreation).toLocaleDateString('fr-FR'),
      type: 'leave_request',
      data: request,
      isRead: request.status !== 'En attente' // Mark as read if processed
    }));

    // Sort by date (newest first)
    notifs.sort((a, b) => new Date(b.data.dateCreation) - new Date(a.data.dateCreation));
    
    setNotifications(notifs);
  };

  const getNotificationMessage = (request) => {
    switch (request.status) {
      case 'Approuvé':
        return `Votre demande de ${request.type} du ${request.dateDebut} au ${request.dateFin} a été approuvée.`;
      case 'Refusé':
        return `Votre demande de ${request.type} du ${request.dateDebut} au ${request.dateFin} a été refusée.`;
      default:
        return `Votre demande de ${request.type} du ${request.dateDebut} au ${request.dateFin} est en cours de traitement.`;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    loadNotifications();
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

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title="Notifications" />
        {unreadCount > 0 && (
          <Badge style={[styles.badge, { backgroundColor: theme.colors.error }]}>
            {unreadCount}
          </Badge>
        )}
        <Appbar.Action
          icon={isDarkMode ? "weather-sunny" : "weather-night"}
          onPress={toggleTheme}
        />
      </Appbar.Header>

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Statistics Card */}
        <Card style={[styles.statsCard, { backgroundColor: theme.colors.primaryContainer }]}>
          <Card.Content>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={[styles.statNumber, { color: theme.colors.onPrimaryContainer }]}>
                  {notifications.length}
                </Text>
                <Text variant="bodyMedium" style={[styles.statLabel, { color: theme.colors.onPrimaryContainer }]}>
                  Total
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={[styles.statNumber, { color: theme.colors.onPrimaryContainer }]}>
                  {unreadCount}
                </Text>
                <Text variant="bodyMedium" style={[styles.statLabel, { color: theme.colors.onPrimaryContainer }]}>
                  Non lues
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={[styles.statNumber, { color: theme.colors.onPrimaryContainer }]}>
                  {notifications.filter(n => n.data.status === 'Approuvé').length}
                </Text>
                <Text variant="bodyMedium" style={[styles.statLabel, { color: theme.colors.onPrimaryContainer }]}>
                  Approuvées
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Notifications List */}
        <View style={styles.notificationsContainer}>
          <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Historique des notifications
          </Text>
          
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                style={[
                  styles.notificationCard, 
                  { 
                    backgroundColor: notification.isRead ? theme.colors.surface : theme.colors.surfaceVariant,
                    borderLeftWidth: notification.isRead ? 0 : 4,
                    borderLeftColor: theme.colors.primary
                  }
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <Card.Content>
                  <View style={styles.notificationHeader}>
                    <View style={styles.notificationTitleContainer}>
                      <MaterialCommunityIcons 
                        name={getStatusIcon(notification.status)} 
                        size={20} 
                        color={getStatusColor(notification.status)} 
                      />
                      <Text 
                        variant="bodyLarge" 
                        style={[
                          styles.notificationTitle, 
                          { color: theme.colors.onSurface },
                          !notification.isRead && { fontWeight: 'bold' }
                        ]}
                      >
                        {notification.title}
                      </Text>
                    </View>
                    <Text variant="bodySmall" style={[styles.notificationDate, { color: theme.colors.onSurfaceVariant }]}>
                      {notification.date}
                    </Text>
                  </View>
                  
                  <Text variant="bodyMedium" style={[styles.notificationMessage, { color: theme.colors.onSurfaceVariant }]}>
                    {notification.message}
                  </Text>
                  
                  {notification.data.commentaireAdmin && (
                    <View style={[styles.commentContainer, { backgroundColor: theme.colors.tertiaryContainer }]}>
                      <Text variant="bodySmall" style={[styles.commentLabel, { color: theme.colors.onTertiaryContainer }]}>
                        Commentaire de l'administration:
                      </Text>
                      <Text variant="bodySmall" style={[styles.commentText, { color: theme.colors.onTertiaryContainer }]}>
                        {notification.data.commentaireAdmin}
                      </Text>
                    </View>
                  )}
                  
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(notification.status) }]}>
                    <Text variant="bodySmall" style={[styles.statusText, { color: theme.colors.onPrimary }]}>
                      {notification.status}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Card style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons 
                    name="bell-off" 
                    size={48} 
                    color={theme.colors.onSurfaceVariant} 
                  />
                  <Text variant="bodyLarge" style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
                    Aucune notification
                  </Text>
                  <Text variant="bodyMedium" style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
                    Vous n'avez aucune notification pour le moment.
                  </Text>
                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('DashboardTab', { screen: 'LeaveRequest' })}
                    style={styles.emptyButton}
                  >
                    Faire une demande
                  </Button>
                </View>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>
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
  badge: {
    position: 'absolute',
    top: 8,
    right: 60,
  },
  statsCard: {
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
  },
  statLabel: {
    marginTop: 4,
  },
  notificationsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  notificationCard: {
    marginBottom: 12,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationTitle: {
    marginLeft: 8,
    flex: 1,
  },
  notificationDate: {
    marginLeft: 8,
  },
  notificationMessage: {
    marginBottom: 12,
    lineHeight: 20,
  },
  commentContainer: {
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  commentLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    fontStyle: 'italic',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyCard: {
    elevation: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    borderRadius: 8,
  },
});

export default NotificationsScreen;