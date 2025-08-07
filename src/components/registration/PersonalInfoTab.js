import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Text, SegmentedButtons } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';

const PersonalInfoTab = ({ data, updateData, onNext }) => {
  const { theme } = useTheme();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!data.prenoms.trim()) newErrors.prenoms = 'Les prénoms sont requis';
    if (!data.dateNaissance) newErrors.dateNaissance = 'La date de naissance est requise';
    if (!data.lieuNaissance.trim()) newErrors.lieuNaissance = 'Le lieu de naissance est requis';
    if (!data.situationMatrimoniale) newErrors.situationMatrimoniale = 'La situation matrimoniale est requise';
    if (!data.adresse.trim()) newErrors.adresse = 'L\'adresse est requise';
    if (!data.telephone.trim()) newErrors.telephone = 'Le téléphone est requis';
    if (!data.email.trim()) newErrors.email = 'L\'email est requis';
    
    // Email validation
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    // Phone validation
    if (data.telephone && !/^0[0-9]{9}$/.test(data.telephone)) {
      newErrors.telephone = 'Format de téléphone invalide (ex: 0331234567)';
    }

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

  const situationOptions = [
    { value: 'Célibataire', label: 'Célibataire' },
    { value: 'Marié(e)', label: 'Marié(e)' },
    { value: 'Divorcé(e)', label: 'Divorcé(e)' },
    { value: 'Veuf(ve)', label: 'Veuf(ve)' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onSurface }]}>
            Renseignements Personnels
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              label="Nom *"
              value={data.nom}
              onChangeText={(text) => updateData({ nom: text })}
              mode="outlined"
              style={styles.input}
              error={!!errors.nom}
            />
            {errors.nom && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.nom}</Text>}

            <TextInput
              label="Prénoms *"
              value={data.prenoms}
              onChangeText={(text) => updateData({ prenoms: text })}
              mode="outlined"
              style={styles.input}
              error={!!errors.prenoms}
            />
            {errors.prenoms && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.prenoms}</Text>}

            <TextInput
              label="Date de naissance * (AAAA-MM-JJ)"
              value={data.dateNaissance}
              onChangeText={(text) => updateData({ dateNaissance: text })}
              mode="outlined"
              style={styles.input}
              placeholder="1990-01-15"
              error={!!errors.dateNaissance}
            />
            {errors.dateNaissance && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.dateNaissance}</Text>}

            <TextInput
              label="Lieu de naissance *"
              value={data.lieuNaissance}
              onChangeText={(text) => updateData({ lieuNaissance: text })}
              mode="outlined"
              style={styles.input}
              error={!!errors.lieuNaissance}
            />
            {errors.lieuNaissance && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.lieuNaissance}</Text>}

            <TextInput
              label="Nationalité"
              value={data.nationalite}
              onChangeText={(text) => updateData({ nationalite: text })}
              mode="outlined"
              style={styles.input}
            />

            <Text variant="bodyMedium" style={[styles.sectionLabel, { color: theme.colors.onSurface }]}>
              Situation matrimoniale *
            </Text>
            <SegmentedButtons
              value={data.situationMatrimoniale}
              onValueChange={(value) => updateData({ situationMatrimoniale: value })}
              buttons={situationOptions}
              style={styles.segmentedButtons}
            />
            {errors.situationMatrimoniale && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.situationMatrimoniale}</Text>}

            <TextInput
              label="Nombre d'enfants"
              value={data.nombreEnfants}
              onChangeText={(text) => updateData({ nombreEnfants: text })}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
            />

            <TextInput
              label="Adresse *"
              value={data.adresse}
              onChangeText={(text) => updateData({ adresse: text })}
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={2}
              error={!!errors.adresse}
            />
            {errors.adresse && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.adresse}</Text>}

            <TextInput
              label="Téléphone * (ex: 0331234567)"
              value={data.telephone}
              onChangeText={(text) => updateData({ telephone: text })}
              mode="outlined"
              style={styles.input}
              keyboardType="phone-pad"
              error={!!errors.telephone}
            />
            {errors.telephone && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.telephone}</Text>}

            <TextInput
              label="Email *"
              value={data.email}
              onChangeText={(text) => updateData({ email: text })}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
            />
            {errors.email && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.email}</Text>}
          </View>

          <Button
            mode="contained"
            onPress={handleNext}
            style={styles.nextButton}
            contentStyle={styles.buttonContent}
          >
            Suivant
          </Button>
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
  sectionLabel: {
    marginBottom: 8,
    marginTop: 8,
    fontWeight: '600',
  },
  segmentedButtons: {
    marginBottom: 12,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 8,
    marginTop: -8,
  },
  nextButton: {
    borderRadius: 8,
  },
  buttonContent: {
    height: 50,
  },
});

export default PersonalInfoTab;