import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Card, Appbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { leaveTypes, mockLeaveRequests } from '../../data/mockData';

const LeaveRequestScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    type: '',
    dateDebut: '',
    dateFin: '',
    duree: '',
    motif: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) return '';
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    
    return diffDays.toString();
  };

  const handleDateChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    
    if (field === 'dateDebut' || field === 'dateFin') {
      const duration = calculateDuration(
        field === 'dateDebut' ? value : formData.dateDebut,
        field === 'dateFin' ? value : formData.dateFin
      );
      newFormData.duree = duration;
    }
    
    setFormData(newFormData);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.type) newErrors.type = 'Le type de congé est requis';
    if (!formData.dateDebut) newErrors.dateDebut = 'La date de début est requise';
    if (!formData.dateFin) newErrors.dateFin = 'La date de fin est requise';
    if (!formData.motif.trim()) newErrors.motif = 'Le motif est requis';
    
    // Validate dates
    if (formData.dateDebut && formData.dateFin) {
      const startDate = new Date(formData.dateDebut);
      const endDate = new Date(formData.dateFin);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (startDate < today) {
        newErrors.dateDebut = 'La date de début ne peut pas être dans le passé';
      }
      
      if (endDate < startDate) {
        newErrors.dateFin = 'La date de fin doit être après la date de début';
      }
    }
    
    // Check leave balance
    const requestedDays = parseInt(formData.duree) || 0;
    if (requestedDays > user.leaveBalance && formData.type === 'Congé annuel') {
      newErrors.duree = `Vous n'avez que ${user.leaveBalance} jours de congé disponibles`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de soumettre');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      const newRequest = {
        id: Date.now().toString(),
        userId: user.id,
        userName: `${user.prenoms} ${user.nom}`,
        userIM: user.im,
        ...formData,
        status: 'En attente',
        dateCreation: new Date().toISOString(),
        commentaireAdmin: ''
      };
      
      // Add to mock data (in real app, this would be sent to backend)
      mockLeaveRequests.push(newRequest);
      
      Alert.alert(
        'Demande envoyée',
        'Votre demande de congé a été envoyée avec succès. Elle sera traitée par l\'administration.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi de la demande');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Demande de congé" />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onSurface }]}>
              Nouvelle demande
            </Text>

            {/* User Info */}
            <Card style={[styles.infoCard, { backgroundColor: theme.colors.primaryContainer }]}>
              <Card.Content>
                <Text variant="bodyMedium" style={[styles.infoText, { color: theme.colors.onPrimaryContainer }]}>
                  <Text style={styles.boldText}>Demandeur:</Text> {user.prenoms} {user.nom}
                </Text>
                <Text variant="bodyMedium" style={[styles.infoText, { color: theme.colors.onPrimaryContainer }]}>
                  <Text style={styles.boldText}>IM:</Text> {user.im}
                </Text>
                <Text variant="bodyMedium" style={[styles.infoText, { color: theme.colors.onPrimaryContainer }]}>
                  <Text style={styles.boldText}>Solde disponible:</Text> {user.leaveBalance} jours
                </Text>
              </Card.Content>
            </Card>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.pickerContainer}>
                <Text variant="bodyMedium" style={[styles.pickerLabel, { color: theme.colors.onSurface }]}>
                  Type de congé *
                </Text>
                <View style={[styles.pickerWrapper, { 
                  borderColor: errors.type ? theme.colors.error : theme.colors.outline,
                  backgroundColor: theme.colors.surface 
                }]}>
                  <Picker
                    selectedValue={formData.type}
                    onValueChange={(value) => setFormData({...formData, type: value})}
                    style={[styles.picker, { color: theme.colors.onSurface }]}
                  >
                    <Picker.Item label="Sélectionnez le type" value="" />
                    {leaveTypes.map((type) => (
                      <Picker.Item key={type} label={type} value={type} />
                    ))}
                  </Picker>
                </View>
                {errors.type && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.type}</Text>}
              </View>

              <TextInput
                label="Date de début * (AAAA-MM-JJ)"
                value={formData.dateDebut}
                onChangeText={(text) => handleDateChange('dateDebut', text)}
                mode="outlined"
                style={styles.input}
                placeholder="2024-03-15"
                error={!!errors.dateDebut}
              />
              {errors.dateDebut && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.dateDebut}</Text>}

              <TextInput
                label="Date de fin * (AAAA-MM-JJ)"
                value={formData.dateFin}
                onChangeText={(text) => handleDateChange('dateFin', text)}
                mode="outlined"
                style={styles.input}
                placeholder="2024-03-20"
                error={!!errors.dateFin}
              />
              {errors.dateFin && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.dateFin}</Text>}

              <TextInput
                label="Durée (jours)"
                value={formData.duree}
                onChangeText={(text) => setFormData({...formData, duree: text})}
                mode="outlined"
                style={styles.input}
                keyboardType="numeric"
                editable={false}
                error={!!errors.duree}
              />
              {errors.duree && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.duree}</Text>}

              <TextInput
                label="Motif/Observation *"
                value={formData.motif}
                onChangeText={(text) => setFormData({...formData, motif: text})}
                mode="outlined"
                style={styles.input}
                multiline
                numberOfLines={4}
                placeholder="Précisez le motif de votre demande..."
                error={!!errors.motif}
              />
              {errors.motif && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.motif}</Text>}
            </View>

            {/* Warning for leave balance */}
            {formData.type === 'Congé annuel' && parseInt(formData.duree) > user.leaveBalance && (
              <Card style={[styles.warningCard, { backgroundColor: theme.colors.errorContainer }]}>
                <Card.Content>
                  <Text variant="bodyMedium" style={[styles.warningText, { color: theme.colors.onErrorContainer }]}>
                    ⚠️ Attention: Cette demande dépasse votre solde de congés disponible.
                  </Text>
                </Card.Content>
              </Card>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={styles.submitButton}
              contentStyle={styles.buttonContent}
            >
              Soumettre la demande
            </Button>
          </Card.Content>
        </Card>
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
  card: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  infoCard: {
    marginBottom: 20,
  },
  infoText: {
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  formContainer: {
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
  warningCard: {
    marginBottom: 20,
  },
  warningText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  submitButton: {
    borderRadius: 8,
  },
  buttonContent: {
    height: 50,
  },
});

export default LeaveRequestScreen;