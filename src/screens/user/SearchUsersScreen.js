import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Appbar, Searchbar, List, Chip, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../contexts/ThemeContext';
import { mockUsers, grades, services, regions } from '../../data/mockData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchUsersScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [filters, setFilters] = useState({
    grade: '',
    service: '',
    region: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters]);

  const applyFilters = () => {
    let filtered = mockUsers.filter(user => {
      const matchesSearch = searchQuery === '' || 
        user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.prenoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.im.includes(searchQuery) ||
        user.fonction.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = filters.grade === '' || user.grade === filters.grade;
      const matchesService = filters.service === '' || user.service === filters.service;
      const matchesRegion = filters.region === '' || user.region === filters.region;

      return matchesSearch && matchesGrade && matchesService && matchesRegion;
    });

    setFilteredUsers(filtered);
  };

  const clearFilters = () => {
    setFilters({ grade: '', service: '', region: '' });
    setSearchQuery('');
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  const showUserDetails = (user) => {
    Alert.alert(
      `${user.prenoms} ${user.nom}`,
      `IM: ${user.im}\nFonction: ${user.fonction}\nService: ${user.service}\nGrade: ${user.grade}\nEmail: ${user.email}\nTéléphone: ${user.telephone}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Rechercher personnel" />
        <Appbar.Action
          icon="filter"
          onPress={() => setShowFilters(!showFilters)}
        />
      </Appbar.Header>

      <View style={styles.content}>
        {/* Search Bar */}
        <Searchbar
          placeholder="Rechercher par nom, IM, fonction..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
        />

        {/* Filters */}
        {showFilters && (
          <Card style={[styles.filtersCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <View style={styles.filtersHeader}>
                <Text variant="bodyLarge" style={[styles.filtersTitle, { color: theme.colors.onSurface }]}>
                  Filtres
                </Text>
                {activeFiltersCount > 0 && (
                  <Chip
                    mode="outlined"
                    onPress={clearFilters}
                    style={styles.clearChip}
                  >
                    Effacer ({activeFiltersCount})
                  </Chip>
                )}
              </View>

              <View style={styles.filterRow}>
                <View style={styles.pickerContainer}>
                  <Text variant="bodyMedium" style={[styles.pickerLabel, { color: theme.colors.onSurface }]}>
                    Grade
                  </Text>
                  <View style={[styles.pickerWrapper, { 
                    borderColor: theme.colors.outline,
                    backgroundColor: theme.colors.surface 
                  }]}>
                    <Picker
                      selectedValue={filters.grade}
                      onValueChange={(value) => setFilters({...filters, grade: value})}
                      style={[styles.picker, { color: theme.colors.onSurface }]}
                    >
                      <Picker.Item label="Tous les grades" value="" />
                      {grades.map((grade) => (
                        <Picker.Item key={grade} label={grade} value={grade} />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.pickerContainer}>
                  <Text variant="bodyMedium" style={[styles.pickerLabel, { color: theme.colors.onSurface }]}>
                    Service
                  </Text>
                  <View style={[styles.pickerWrapper, { 
                    borderColor: theme.colors.outline,
                    backgroundColor: theme.colors.surface 
                  }]}>
                    <Picker
                      selectedValue={filters.service}
                      onValueChange={(value) => setFilters({...filters, service: value})}
                      style={[styles.picker, { color: theme.colors.onSurface }]}
                    >
                      <Picker.Item label="Tous les services" value="" />
                      {services.map((service) => (
                        <Picker.Item key={service} label={service} value={service} />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.pickerContainer}>
                  <Text variant="bodyMedium" style={[styles.pickerLabel, { color: theme.colors.onSurface }]}>
                    Région
                  </Text>
                  <View style={[styles.pickerWrapper, { 
                    borderColor: theme.colors.outline,
                    backgroundColor: theme.colors.surface 
                  }]}>
                    <Picker
                      selectedValue={filters.region}
                      onValueChange={(value) => setFilters({...filters, region: value})}
                      style={[styles.picker, { color: theme.colors.onSurface }]}
                    >
                      <Picker.Item label="Toutes les régions" value="" />
                      {regions.map((region) => (
                        <Picker.Item key={region} label={region} value={region} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Results */}
        <View style={styles.resultsContainer}>
          <Text variant="bodyLarge" style={[styles.resultsTitle, { color: theme.colors.onBackground }]}>
            Résultats ({filteredUsers.length})
          </Text>

          <ScrollView style={styles.scrollView}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Card 
                  key={user.id} 
                  style={[styles.userCard, { backgroundColor: theme.colors.surface }]}
                  onPress={() => showUserDetails(user)}
                >
                  <Card.Content>
                    <List.Item
                      title={`${user.prenoms} ${user.nom}`}
                      description={`${user.fonction} - ${user.service}`}
                      left={props => (
                        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                          <MaterialCommunityIcons 
                            name="account" 
                            size={24} 
                            color={theme.colors.onPrimary} 
                          />
                        </View>
                      )}
                      right={props => (
                        <View style={styles.userInfo}>
                          <Text variant="bodySmall" style={[styles.userIM, { color: theme.colors.primary }]}>
                            IM: {user.im}
                          </Text>
                          <Text variant="bodySmall" style={[styles.userGrade, { color: theme.colors.onSurfaceVariant }]}>
                            {user.grade}
                          </Text>
                        </View>
                      )}
                    />
                    
                    <View style={styles.userTags}>
                      <Chip 
                        mode="outlined" 
                        compact
                        style={styles.chip}
                        textStyle={{ fontSize: 12 }}
                      >
                        {user.service}
                      </Chip>
                      <Chip 
                        mode="outlined" 
                        compact
                        style={styles.chip}
                        textStyle={{ fontSize: 12 }}
                      >
                        {user.region}
                      </Chip>
                    </View>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Card style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]}>
                <Card.Content>
                  <View style={styles.emptyContainer}>
                    <MaterialCommunityIcons 
                      name="account-search" 
                      size={48} 
                      color={theme.colors.onSurfaceVariant} 
                    />
                    <Text variant="bodyLarge" style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
                      Aucun résultat
                    </Text>
                    <Text variant="bodyMedium" style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
                      Aucun personnel ne correspond à vos critères de recherche.
                    </Text>
                    <Button
                      mode="outlined"
                      onPress={clearFilters}
                      style={styles.emptyButton}
                    >
                      Effacer les filtres
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
    elevation: 2,
  },
  filtersCard: {
    marginBottom: 16,
    elevation: 2,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filtersTitle: {
    fontWeight: 'bold',
  },
  clearChip: {
    height: 32,
  },
  filterRow: {
    gap: 12,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  pickerLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
  },
  userCard: {
    marginBottom: 12,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'flex-end',
  },
  userIM: {
    fontWeight: 'bold',
  },
  userGrade: {
    marginTop: 2,
  },
  userTags: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  chip: {
    height: 28,
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

export default SearchUsersScreen;