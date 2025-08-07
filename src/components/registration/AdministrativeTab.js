import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../contexts/ThemeContext';
import { grades, services } from '../../data/mockData';

const AdministrativeTab = ({ data, updateData, onNext, onPrevious }) => {
  const { theme } = useTheme();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.im.trim()) newErrors.im = 'Le numéro IM est requis';
    if (!data.grade) newErrors.grade = 'Le grade est requis';
    if (!data.fonction.trim()) newErrors.fonction = 'La fonction est requise';
    if (!data.service) newErrors.service = 'Le service est requis';
    if (!data.indice.trim()) newErrors.indice = 'L\'indice est requis';
    if (!data.dateRecrutement) newErrors.dateRecrutement = 'La date de recrutement est requise';
    if (!data.typeRecrutement) newErrors.typeRecrutement = 'Le type de recrutement est requis';
    if (!data.categoriePersonnel) newErrors.categoriePersonnel = 'La catégorie de personnel est requise';

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
            Situation Administrative
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              label="Numéro IM *"
              value={data.im}
              onChangeText={(text) => updateData({ im: text })}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              error={!!errors.im}
            />
            {errors.im && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.im}</Text>}

            <View style={styles.pickerContainer}>
              <Text variant="bodyMedium" style={[styles.pickerLabel, { color: theme.colors.onSurface }]}>
                Grade *
              </Text>
              <View style={[styles.pickerWrapper, { 
                borderColor: errors.grade ? theme.colors.error : theme.colors.outline,
                backgroundColor: theme.colors.surface 
              }]}>
                <Picker
                  selectedValue={data.grade}
                  onValueChange={(value) => updateData({ grade: value })}
                  style={[styles.picker, { color: theme.colors.onSurface }]}
                >
                  <Picker.Item label="Sélectionnez un grade" value="" />
                  {grades.map((grade) => (
                    <Picker.Item key={grade} label={grade} value={grade} />
                  ))}
                </Picker>
              </View>
              {errors.grade && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.grade}</Text>}
            </View>

            <TextInput
              label="Fonction *"
              value={data.fonction}
              onChangeText={(text) => updateData({ fonction: text })}
              mode="outlined"
              style={styles.input}
              error={!!errors.fonction}
            />
            {errors.fonction && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.fonction}</Text>}

            <View style={styles.pickerContainer}>
              <Text variant="bodyMedium" style={[styles.pickerLabel, { color: theme.colors.onSurface }]}>
                Service *
              </Text>
              <View style={[styles.pickerWrapper, { 
                borderColor: errors.service ? theme.colors.error : theme.colors.outline,
                backgroundColor: theme.colors.surface 
              }]}>
                <Picker
                  selectedValue={data.service}
                  onValueChange={(value) => updateData({ service: value })}
                  style={[styles.picker, { color: theme.colors.onSurface }]}
                >
                  <Picker.Item label="Sélectionnez un service" value="" />
                  {services.map((service) => (
                    <Picker.Item key={service} label={service} value={service} />
                  ))}
                </Picker>
              </View>
              {errors.service && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.service}</Text>}
            </View>

            <TextInput
              label="Indice *"
              value={data.indice}
              onChangeText={(text) => updateData({ indice: text })}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              error={!!errors.indice}
            />
            {errors.indice && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.indice}</Text>}

            <TextInput
              label="Date de recrutement * (AAAA-MM-JJ)"
              value={data.dateRecrutement}
              onChangeText={(text) => updateData({ dateRecrutement: text })}
              mode="outlined"
              style={styles.input}
              placeholder="2020-01-15"
              error={!!errors.dateRecrutement}
            />
            {errors.dateRecrutement && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.dateRecrutement}</Text>}

            <View style={styles.pickerContainer}>
              <Text variant="bodyMedium" style={[styles.pickerLabel, { color: theme.colors.onSurface }]}>
                Type de recrutement *
              </Text>
              <View style={[styles.pickerWrapper, { 
                borderColor: errors.typeRecrutement ? theme.colors.error : theme.colors.outline,
                backgroundColor: theme.colors.surface 
              }]}>
                <Picker
                  selectedValue={data.typeRecrutement}
                  onValueChange={(value) => updateData({ typeRecrutement: value })}
                  style={[styles.picker, { color: theme.colors.onSurface }]}
                >
                  <Picker.Item label="Sélectionnez le type" value="" />
                  <Picker.Item label="Concours" value="Concours" />
                  <Picker.Item label="Recrutement direct" value="Recrutement direct" />
                  <Picker.Item label="Détachement" value="Détachement" />
                  <Picker.Item label="Mutation" value="Mutation" />
                </Picker>
              </View>
              {errors.typeRecrutement && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.typeRecrutement}</Text>}
            </View>

            <View style={styles.pickerContainer}>
              <Text variant="bodyMedium" style={[styles.pickerLabel, { color: theme.colors.onSurface }]}>
                Catégorie de personnel *
              </Text>
              <View style={[styles.pickerWrapper, { 
                borderColor: errors.categoriePersonnel ? theme.colors.error : theme.colors.outline,
                backgroundColor: theme.colors.surface 
              }]}>
                <Picker
                  selectedValue={data.categoriePersonnel}
                  onValueChange={(value) => updateData({ categoriePersonnel: value })}
                  style={[styles.picker, { color: theme.colors.onSurface }]}
                >
                  <Picker.Item label="Sélectionnez la catégorie" value="" />
                  <Picker.Item label="Fonctionnaire" value="Fonctionnaire" />
                  <Picker.Item label="Contractuel" value="Contractuel" />
                  <Picker.Item label="Stagiaire" value="Stagiaire" />
                  <Picker.Item label="Vacataire" value="Vacataire" />
                </Picker>
              </View>
              {errors.categoriePersonnel && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.categoriePersonnel}</Text>}
            </View>
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

export default AdministrativeTab;