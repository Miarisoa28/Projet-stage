import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Text, IconButton, List } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';

const EducationTab = ({ data, updateData, onNext, onPrevious }) => {
  const { theme } = useTheme();
  const [newDiplome, setNewDiplome] = useState({
    diplome: '',
    etablissement: '',
    anneeObtention: ''
  });
  const [newFormation, setNewFormation] = useState({
    formation: '',
    organisme: '',
    duree: '',
    annee: ''
  });

  const addDiplome = () => {
    if (newDiplome.diplome.trim() && newDiplome.etablissement.trim()) {
      const diplomes = [...(data.diplomes || []), newDiplome];
      updateData({ diplomes });
      setNewDiplome({ diplome: '', etablissement: '', anneeObtention: '' });
    } else {
      Alert.alert('Erreur', 'Veuillez remplir au minimum le diplôme et l\'établissement');
    }
  };

  const removeDiplome = (index) => {
    const diplomes = data.diplomes.filter((_, i) => i !== index);
    updateData({ diplomes });
  };

  const addFormation = () => {
    if (newFormation.formation.trim()) {
      const formations = [...(data.formations || []), newFormation];
      updateData({ formations });
      setNewFormation({ formation: '', organisme: '', duree: '', annee: '' });
    } else {
      Alert.alert('Erreur', 'Veuillez remplir au minimum le nom de la formation');
    }
  };

  const removeFormation = (index) => {
    const formations = data.formations.filter((_, i) => i !== index);
    updateData({ formations });
  };

  const handleNext = () => {
    if (!data.niveauEtudes.trim()) {
      Alert.alert('Erreur', 'Veuillez indiquer votre niveau d\'études');
      return;
    }
    onNext();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onSurface }]}>
            Formation et Études
          </Text>

          <View style={styles.section}>
            <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Niveau d'études *
            </Text>
            <TextInput
              label="Niveau d'études"
              value={data.niveauEtudes}
              onChangeText={(text) => updateData({ niveauEtudes: text })}
              mode="outlined"
              style={styles.input}
              placeholder="Ex: Universitaire, Secondaire, Primaire"
            />
          </View>

          {/* Diplômes Section */}
          <View style={styles.section}>
            <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Diplômes
            </Text>
            
            <Card style={[styles.addCard, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Card.Content>
                <Text variant="bodyMedium" style={[styles.addTitle, { color: theme.colors.onSurfaceVariant }]}>
                  Ajouter un diplôme
                </Text>
                <TextInput
                  label="Diplôme"
                  value={newDiplome.diplome}
                  onChangeText={(text) => setNewDiplome({...newDiplome, diplome: text})}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Établissement"
                  value={newDiplome.etablissement}
                  onChangeText={(text) => setNewDiplome({...newDiplome, etablissement: text})}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Année d'obtention"
                  value={newDiplome.anneeObtention}
                  onChangeText={(text) => setNewDiplome({...newDiplome, anneeObtention: text})}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="2020"
                />
                <Button
                  mode="contained"
                  onPress={addDiplome}
                  style={styles.addButton}
                  icon="plus"
                >
                  Ajouter le diplôme
                </Button>
              </Card.Content>
            </Card>

            {/* List of diplomes */}
            {data.diplomes && data.diplomes.length > 0 && (
              <View style={styles.listContainer}>
                <Text variant="bodyMedium" style={[styles.listTitle, { color: theme.colors.onSurface }]}>
                  Diplômes ajoutés:
                </Text>
                {data.diplomes.map((diplome, index) => (
                  <List.Item
                    key={index}
                    title={diplome.diplome}
                    description={`${diplome.etablissement} - ${diplome.anneeObtention}`}
                    left={props => <List.Icon {...props} icon="school" />}
                    right={props => (
                      <IconButton
                        {...props}
                        icon="delete"
                        iconColor={theme.colors.error}
                        onPress={() => removeDiplome(index)}
                      />
                    )}
                    style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Formations Section */}
          <View style={styles.section}>
            <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Formations complémentaires
            </Text>
            
            <Card style={[styles.addCard, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Card.Content>
                <Text variant="bodyMedium" style={[styles.addTitle, { color: theme.colors.onSurfaceVariant }]}>
                  Ajouter une formation
                </Text>
                <TextInput
                  label="Formation"
                  value={newFormation.formation}
                  onChangeText={(text) => setNewFormation({...newFormation, formation: text})}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Organisme"
                  value={newFormation.organisme}
                  onChangeText={(text) => setNewFormation({...newFormation, organisme: text})}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Durée"
                  value={newFormation.duree}
                  onChangeText={(text) => setNewFormation({...newFormation, duree: text})}
                  mode="outlined"
                  style={styles.input}
                  placeholder="Ex: 5 jours, 2 semaines"
                />
                <TextInput
                  label="Année"
                  value={newFormation.annee}
                  onChangeText={(text) => setNewFormation({...newFormation, annee: text})}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="2023"
                />
                <Button
                  mode="contained"
                  onPress={addFormation}
                  style={styles.addButton}
                  icon="plus"
                >
                  Ajouter la formation
                </Button>
              </Card.Content>
            </Card>

            {/* List of formations */}
            {data.formations && data.formations.length > 0 && (
              <View style={styles.listContainer}>
                <Text variant="bodyMedium" style={[styles.listTitle, { color: theme.colors.onSurface }]}>
                  Formations ajoutées:
                </Text>
                {data.formations.map((formation, index) => (
                  <List.Item
                    key={index}
                    title={formation.formation}
                    description={`${formation.organisme} - ${formation.duree} (${formation.annee})`}
                    left={props => <List.Icon {...props} icon="certificate" />}
                    right={props => (
                      <IconButton
                        {...props}
                        icon="delete"
                        iconColor={theme.colors.error}
                        onPress={() => removeFormation(index)}
                      />
                    )}
                    style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
                  />
                ))}
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={onPrevious}
              style={[styles.button, styles.previousButton]}
              contentStyle={styles.buttonContent}
            >
              Précédent
            </Button>
            
            <Button
              mode="contained"
              onPress={handleNext}
              style={[styles.button, styles.nextButton]}
              contentStyle={styles.buttonContent}
            >
              Suivant
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  addCard: {
    marginBottom: 16,
  },
  addTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  input: {
    marginBottom: 12,
  },
  addButton: {
    borderRadius: 8,
  },
  listContainer: {
    marginTop: 8,
  },
  listTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  listItem: {
    marginBottom: 4,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
  buttonContent: {
    height: 50,
  },
  previousButton: {
    marginRight: 6,
  },
  nextButton: {
    marginLeft: 6,
  },
});

export default EducationTab;