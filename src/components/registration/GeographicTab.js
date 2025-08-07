import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../contexts/ThemeContext';
import { regions } from '../../data/mockData';

const GeographicTab = ({ data, updateData, onNext, onPrevious }) => {
  const { theme } = useTheme();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.region) newErrors.region = 'La région est requise';
    if (!data.district.trim()) newErrors.district = 'Le district est requis';
    if (!data.commune.trim()) newErrors.commune = 'La commune est requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    } else {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de continuer');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onSurface }]}>
            Situation Géographique
          </Text>

          <Text variant="bodyMedium" style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            Renseignez votre localisation géographique administrative
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.pickerContainer}>
              <Text variant="bodyMedium" style={[styles.pickerLabel, { color: theme.colors.onSurface }]}>
                Région *
              </Text>
              <View style={[styles.pickerWrapper, { 
                borderColor: errors.region ? theme.colors.error : theme.colors.outline,
                backgroundColor: theme.colors.surface 
              }]}>
                <Picker
                  selectedValue={data.region}
                  onValueChange={(value) => updateData({ region: value })}
                  style={[styles.picker, { color: theme.colors.onSurface }]}
                >
                  <Picker.Item label="Sélectionnez une région" value="" />
                  {regions.map((region) => (
                    <Picker.Item key={region} label={region} value={region} />
                  ))}
                </Picker>
              </View>
              {errors.region && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.region}</Text>}
            </View>

            <TextInput
              label="District *"
              value={data.district}
              onChangeText={(text) => updateData({ district: text })}
              mode="outlined"
              style={styles.input}
              error={!!errors.district}
            />
            {errors.district && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.district}</Text>}

            <TextInput
              label="Commune *"
              value={data.commune}
              onChangeText={(text) => updateData({ commune: text })}
              mode="outlined"
              style={styles.input}
              error={!!errors.commune}
            />
            {errors.commune && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.commune}</Text>}

            <TextInput
              label="Fokontany"
              value={data.fokontany}
              onChangeText={(text) => updateData({ fokontany: text })}
              mode="outlined"
              style={styles.input}
            />
          </View>

          {/* Information Card */}
          <Card style={[styles.infoCard, { backgroundColor: theme.colors.primaryContainer }]}>
            <Card.Content>
              <Text variant="bodyMedium" style={[styles.infoText, { color: theme.colors.onPrimaryContainer }]}>
                ℹ️ Ces informations géographiques sont importantes pour l'administration 
                et les statistiques de répartition du personnel.
              </Text>
            </Card.Content>
          </Card>

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
    marginBottom: 12,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
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
    height: 50,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 8,
    marginTop: 4,
  },
  infoCard: {
    marginBottom: 20,
  },
  infoText: {
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
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

export default GeographicTab;