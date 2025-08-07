import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Text, IconButton, List } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';

const ExperienceTab = ({ data, updateData, onNext, onPrevious }) => {
  const { theme } = useTheme();
  const [newExperience, setNewExperience] = useState({
    poste: '',
    employeur: '',
    periode: '',
    description: ''
  });

  const addExperience = () => {
    if (newExperience.poste.trim() && newExperience.employeur.trim()) {
      const experiences = [...(data.experiences || []), newExperience];
      updateData({ experiences });
      setNewExperience({ poste: '', employeur: '', periode: '', description: '' });
    } else {
      Alert.alert('Erreur', 'Veuillez remplir au minimum le poste et l\'employeur');
    }
  };

  const removeExperience = (index) => {
    const experiences = data.experiences.filter((_, i) => i !== index);
    updateData({ experiences });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onSurface }]}>
            Expériences Professionnelles
          </Text>

          <View style={styles.section}>
            <Text variant="bodyMedium" style={[styles.sectionDescription, { color: theme.colors.onSurfaceVariant }]}>
              Ajoutez vos expériences professionnelles précédentes (optionnel)
            </Text>
            
            <Card style={[styles.addCard, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Card.Content>
                <Text variant="bodyMedium" style={[styles.addTitle, { color: theme.colors.onSurfaceVariant }]}>
                  Ajouter une expérience
                </Text>
                <TextInput
                  label="Poste occupé"
                  value={newExperience.poste}
                  onChangeText={(text) => setNewExperience({...newExperience, poste: text})}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Employeur"
                  value={newExperience.employeur}
                  onChangeText={(text) => setNewExperience({...newExperience, employeur: text})}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Période"
                  value={newExperience.periode}
                  onChangeText={(text) => setNewExperience({...newExperience, periode: text})}
                  mode="outlined"
                  style={styles.input}
                  placeholder="Ex: 2018-2020, Janvier 2019 - Mars 2021"
                />
                <TextInput
                  label="Description des tâches"
                  value={newExperience.description}
                  onChangeText={(text) => setNewExperience({...newExperience, description: text})}
                  mode="outlined"
                  style={styles.input}
                  multiline
                  numberOfLines={3}
                  placeholder="Décrivez brièvement vos responsabilités et réalisations"
                />
                <Button
                  mode="contained"
                  onPress={addExperience}
                  style={styles.addButton}
                  icon="plus"
                >
                  Ajouter l'expérience
                </Button>
              </Card.Content>
            </Card>

            {/* List of experiences */}
            {data.experiences && data.experiences.length > 0 && (
              <View style={styles.listContainer}>
                <Text variant="bodyMedium" style={[styles.listTitle, { color: theme.colors.onSurface }]}>
                  Expériences ajoutées:
                </Text>
                {data.experiences.map((experience, index) => (
                  <List.Item
                    key={index}
                    title={experience.poste}
                    description={`${experience.employeur} - ${experience.periode}`}
                    left={props => <List.Icon {...props} icon="briefcase" />}
                    right={props => (
                      <IconButton
                        {...props}
                        icon="delete"
                        iconColor={theme.colors.error}
                        onPress={() => removeExperience(index)}
                      />
                    )}
                    style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Additional Skills Section */}
          <View style={styles.section}>
            <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Langues parlées
            </Text>
            <TextInput
              label="Langues parlées"
              value={Array.isArray(data.languesParlees) ? data.languesParlees.join(', ') : data.languesParlees || ''}
              onChangeText={(text) => updateData({ languesParlees: text.split(',').map(lang => lang.trim()) })}
              mode="outlined"
              style={styles.input}
              placeholder="Ex: Malagasy, Français, Anglais"
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Compétences particulières
            </Text>
            <TextInput
              label="Compétences particulières"
              value={data.competencesParticulieres}
              onChangeText={(text) => updateData({ competencesParticulieres: text })}
              mode="outlined"
              style={styles.input}
              placeholder="Ex: Informatique, Communication, Gestion de projet"
              multiline
              numberOfLines={3}
            />
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
  sectionDescription: {
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
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

export default ExperienceTab;