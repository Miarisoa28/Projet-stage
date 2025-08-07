import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Appbar, List, Divider } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const profileSections = [
    {
      title: 'Informations personnelles',
      icon: 'account',
      items: [
        { label: 'Nom complet', value: `${user.prenoms} ${user.nom}` },
        { label: 'Date de naissance', value: new Date(user.dateNaissance).toLocaleDateString('fr-FR') },
        { label: 'Lieu de naissance', value: user.lieuNaissance },
        { label: 'Nationalité', value: user.nationalite },
        { label: 'Situation matrimoniale', value: user.situationMatrimoniale },
        { label: 'Nombre d\'enfants', value: user.nombreEnfants || '0' },
      ]
    },
    {
      title: 'Contact',
      icon: 'phone',
      items: [
        { label: 'Adresse', value: user.adresse },
        { label: 'Téléphone', value: user.telephone },
        { label: 'Email', value: user.email },
      ]
    },
    {
      title: 'Situation administrative',
      icon: 'briefcase',
      items: [
        { label: 'Numéro IM', value: user.im },
        { label: 'Grade', value: user.grade },
        { label: 'Fonction', value: user.fonction },
        { label: 'Service', value: user.service },
        { label: 'Indice', value: user.indice },
        { label: 'Date de recrutement', value: new Date(user.dateRecrutement).toLocaleDateString('fr-FR') },
        { label: 'Type de recrutement', value: user.typeRecrutement },
        { label: 'Catégorie', value: user.categoriePersonnel },
      ]
    },
    {
      title: 'Localisation',
      icon: 'map-marker',
      items: [
        { label: 'Région', value: user.region },
        { label: 'District', value: user.district },
        { label: 'Commune', value: user.commune },
        { label: 'Fokontany', value: user.fokontany || 'Non renseigné' },
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Rechercher du personnel',
      subtitle: 'Trouver d\'autres employés',
      icon: 'account-search',
      onPress: () => navigation.navigate('SearchUsers'),
      color: theme.colors.secondary
    },
    {
      title: 'Télécharger ma fiche',
      subtitle: 'Fiche de renseignement PDF',
      icon: 'download',
      onPress: () => navigation.navigate('DownloadProfile'),
      color: theme.colors.primary
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title="Mon Profil" />
        <Appbar.Action
          icon={isDarkMode ? "weather-sunny" : "weather-night"}
          onPress={toggleTheme}
        />
        <Appbar.Action
          icon="logout"
          onPress={logout}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <Card style={[styles.headerCard, { backgroundColor: theme.colors.primaryContainer }]}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                <MaterialCommunityIcons 
                  name="account" 
                  size={32} 
                  color={theme.colors.onPrimary} 
                />
              </View>
              <View style={styles.profileInfo}>
                <Text variant="headlineSmall" style={[styles.profileName, { color: theme.colors.onPrimaryContainer }]}>
                  {user.prenoms} {user.nom}
                </Text>
                <Text variant="bodyLarge" style={[styles.profileTitle, { color: theme.colors.onPrimaryContainer }]}>
                  {user.fonction}
                </Text>
                <Text variant="bodyMedium" style={[styles.profileService, { color: theme.colors.onPrimaryContainer }]}>
                  {user.service} • IM: {user.im}
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
          
          {quickActions.map((action, index) => (
            <Card key={index} style={[styles.actionCard, { backgroundColor: theme.colors.surface }]} onPress={action.onPress}>
              <Card.Content>
                <List.Item
                  title={action.title}
                  description={action.subtitle}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon={action.icon} 
                      color={action.color}
                    />
                  )}
                  right={props => (
                    <List.Icon 
                      {...props} 
                      icon="chevron-right" 
                      color={theme.colors.onSurfaceVariant}
                    />
                  )}
                />
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Profile Information Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <Card style={[styles.sectionCard, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons 
                    name={section.icon} 
                    size={24} 
                    color={theme.colors.primary} 
                  />
                  <Text variant="bodyLarge" style={[styles.sectionHeaderText, { color: theme.colors.onSurface }]}>
                    {section.title}
                  </Text>
                </View>
                
                <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
                
                {section.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.infoItem}>
                    <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                      {item.label}:
                    </Text>
                    <Text variant="bodyMedium" style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                      {item.value}
                    </Text>
                  </View>
                ))}
              </Card.Content>
            </Card>
          </View>
        ))}

        {/* Education and Experience */}
        {(user.diplomes && user.diplomes.length > 0) && (
          <View style={styles.sectionContainer}>
            <Card style={[styles.sectionCard, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <View style={styles.sectionHeader}>
                  <MaterialCommunityIcons 
                    name="school" 
                    size={24} 
                    color={theme.colors.primary} 
                  />
                  <Text variant="bodyLarge" style={[styles.sectionHeaderText, { color: theme.colors.onSurface }]}>
                    Formation
                  </Text>
                </View>
                
                <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
                
                <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Niveau d'études: {user.niveauEtudes}
                </Text>
                
                {user.diplomes.map((diplome, index) => (
                  <View key={index} style={styles.diplomeItem}>
                    <Text variant="bodyMedium" style={[styles.diplomeTitle, { color: theme.colors.onSurface }]}>
                      {diplome.diplome}
                    </Text>
                    <Text variant="bodySmall" style={[styles.diplomeDetails, { color: theme.colors.onSurfaceVariant }]}>
                      {diplome.etablissement} - {diplome.anneeObtention}
                    </Text>
                  </View>
                ))}
              </Card.Content>
            </Card>
          </View>
        )}

        {/* Additional Info */}
        <View style={styles.sectionContainer}>
          <Card style={[styles.sectionCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons 
                  name="information" 
                  size={24} 
                  color={theme.colors.primary} 
                />
                <Text variant="bodyLarge" style={[styles.sectionHeaderText, { color: theme.colors.onSurface }]}>
                  Informations complémentaires
                </Text>
              </View>
              
              <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
              
              {user.languesParlees && user.languesParlees.length > 0 && (
                <View style={styles.infoItem}>
                  <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Langues parlées:
                  </Text>
                  <Text variant="bodyMedium" style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                    {Array.isArray(user.languesParlees) ? user.languesParlees.join(', ') : user.languesParlees}
                  </Text>
                </View>
              )}
              
              {user.competencesParticulieres && (
                <View style={styles.infoItem}>
                  <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                    Compétences particulières:
                  </Text>
                  <Text variant="bodyMedium" style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                    {user.competencesParticulieres}
                  </Text>
                </View>
              )}
              
              <View style={styles.infoItem}>
                <Text variant="bodyMedium" style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Date d'inscription:
                </Text>
                <Text variant="bodyMedium" style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                  {new Date(user.registrationDate).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            </Card.Content>
          </Card>
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
  headerCard: {
    marginBottom: 20,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  profileService: {
    opacity: 0.8,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  actionCard: {
    marginBottom: 8,
    elevation: 2,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionCard: {
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  divider: {
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    marginLeft: 8,
  },
  diplomeItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#E0E0E0',
  },
  diplomeTitle: {
    fontWeight: '600',
  },
  diplomeDetails: {
    marginTop: 2,
  },
});

export default ProfileScreen;