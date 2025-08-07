import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card, Text, Divider } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';

const FinalizeTab = ({ data, updateData, onPrevious, onRegister }) => {
  const { theme } = useTheme();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (data.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de continuer');
      return;
    }

    setIsLoading(true);
    try {
      await onRegister();
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    const requiredFields = [
      'nom', 'prenoms', 'dateNaissance', 'lieuNaissance', 'situationMatrimoniale',
      'adresse', 'telephone', 'email', 'im', 'grade', 'fonction', 'service',
      'indice', 'dateRecrutement', 'typeRecrutement', 'categoriePersonnel',
      'niveauEtudes', 'region', 'district', 'commune'
    ];
    
    const completedFields = requiredFields.filter(field => 
      data[field] && data[field].toString().trim() !== ''
    ).length;
    
    return Math.round((completedFields / requiredFields.length) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onSurface }]}>
            Finaliser l'inscription
          </Text>

          {/* Completion Status */}
          <Card style={[styles.statusCard, { backgroundColor: theme.colors.primaryContainer }]}>
            <Card.Content>
              <Text variant="bodyMedium" style={[styles.statusTitle, { color: theme.colors.onPrimaryContainer }]}>
                Progression de l'inscription
              </Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.outline }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: theme.colors.primary,
                        width: `${completionPercentage}%`
                      }
                    ]} 
                  />
                </View>
                <Text variant="bodyLarge" style={[styles.progressText, { color: theme.colors.onPrimaryContainer }]}>
                  {completionPercentage}% complété
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Summary Section */}
          <View style={styles.summarySection}>
            <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Résumé de vos informations
            </Text>
            
            <Card style={[styles.summaryCard, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Card.Content>
                <Text variant="bodyMedium" style={[styles.summaryText, { color: theme.colors.onSurfaceVariant }]}>
                  <Text style={styles.boldText}>Nom complet:</Text> {data.prenoms} {data.nom}
                </Text>
                <Text variant="bodyMedium" style={[styles.summaryText, { color: theme.colors.onSurfaceVariant }]}>
                  <Text style={styles.boldText}>IM:</Text> {data.im}
                </Text>
                <Text variant="bodyMedium" style={[styles.summaryText, { color: theme.colors.onSurfaceVariant }]}>
                  <Text style={styles.boldText}>Fonction:</Text> {data.fonction}
                </Text>
                <Text variant="bodyMedium" style={[styles.summaryText, { color: theme.colors.onSurfaceVariant }]}>
                  <Text style={styles.boldText}>Service:</Text> {data.service}
                </Text>
                <Text variant="bodyMedium" style={[styles.summaryText, { color: theme.colors.onSurfaceVariant }]}>
                  <Text style={styles.boldText}>Email:</Text> {data.email}
                </Text>
              </Card.Content>
            </Card>
          </View>

          <Divider style={styles.divider} />

          {/* Password Section */}
          <View style={styles.passwordSection}>
            <Text variant="bodyLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Créer votre mot de passe
            </Text>
            
            <Text variant="bodyMedium" style={[styles.passwordDescription, { color: theme.colors.onSurfaceVariant }]}>
              Créez un mot de passe sécurisé pour accéder à votre compte
            </Text>

            <TextInput
              label="Mot de passe *"
              value={data.password}
              onChangeText={(text) => updateData({ password: text })}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              error={!!errors.password}
            />
            {errors.password && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.password}</Text>}

            <TextInput
              label="Confirmer le mot de passe *"
              value={data.confirmPassword}
              onChangeText={(text) => updateData({ confirmPassword: text })}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.confirmPassword}</Text>}

            {/* Password Requirements */}
            <Card style={[styles.requirementsCard, { backgroundColor: theme.colors.tertiaryContainer }]}>
              <Card.Content>
                <Text variant="bodySmall" style={[styles.requirementsTitle, { color: theme.colors.onTertiaryContainer }]}>
                  Exigences du mot de passe:
                </Text>
                <Text variant="bodySmall" style={[styles.requirement, { color: theme.colors.onTertiaryContainer }]}>
                  • Au moins 6 caractères
                </Text>
                <Text variant="bodySmall" style={[styles.requirement, { color: theme.colors.onTertiaryContainer }]}>
                  • Combinaison de lettres et chiffres recommandée
                </Text>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={onPrevious}
              style={[styles.button, styles.previousButton]}
              contentStyle={styles.buttonContent}
              disabled={isLoading}
            >
              Précédent
            </Button>
            
            <Button
              mode="contained"
              onPress={handleRegister}
              style={[styles.button, styles.registerButton]}
              contentStyle={styles.buttonContent}
              loading={isLoading}
              disabled={isLoading || completionPercentage < 85}
            >
              Terminer l'inscription
            </Button>
          </View>

          {completionPercentage < 85 && (
            <Text variant="bodySmall" style={[styles.warningText, { color: theme.colors.error }]}>
              Veuillez compléter au moins 85% des informations requises avant de finaliser l'inscription.
            </Text>
          )}
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
  statusCard: {
    marginBottom: 20,
  },
  statusTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontWeight: 'bold',
  },
  summarySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryCard: {
    marginBottom: 8,
  },
  summaryText: {
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 20,
  },
  passwordSection: {
    marginBottom: 20,
  },
  passwordDescription: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 8,
    marginTop: -8,
  },
  requirementsCard: {
    marginTop: 8,
  },
  requirementsTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  requirement: {
    marginLeft: 8,
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
  registerButton: {
    marginLeft: 6,
  },
  warningText: {
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});

export default FinalizeTab;