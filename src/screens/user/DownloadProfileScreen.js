import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Appbar, List, Divider } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DownloadProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'PDF généré',
        'Votre fiche de renseignement a été générée avec succès. Dans une vraie application, le fichier serait téléchargé ou partagé.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la génération du PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const previewSections = [
    {
      title: 'RENSEIGNEMENTS PERSONNELS',
      items: [
        { label: 'Nom', value: user.nom },
        { label: 'Prénoms', value: user.prenoms },
        { label: 'Date de naissance', value: new Date(user.dateNaissance).toLocaleDateString('fr-FR') },
        { label: 'Lieu de naissance', value: user.lieuNaissance },
        { label: 'Nationalité', value: user.nationalite },
        { label: 'Situation matrimoniale', value: user.situationMatrimoniale },
        { label: 'Nombre d\'enfants', value: user.nombreEnfants || '0' },
        { label: 'Adresse', value: user.adresse },
        { label: 'Téléphone', value: user.telephone },
        { label: 'Email', value: user.email },
      ]
    },
    {
      title: 'SITUATION ADMINISTRATIVE',
      items: [
        { label: 'Numéro IM', value: user.im },
        { label: 'Grade', value: user.grade },
        { label: 'Fonction', value: user.fonction },
        { label: 'Service', value: user.service },
        { label: 'Indice', value: user.indice },
        { label: 'Date de recrutement', value: new Date(user.dateRecrutement).toLocaleDateString('fr-FR') },
        { label: 'Type de recrutement', value: user.typeRecrutement },
        { label: 'Catégorie de personnel', value: user.categoriePersonnel },
      ]
    },
    {
      title: 'FORMATION ET ÉTUDES',
      items: [
        { label: 'Niveau d\'études', value: user.niveauEtudes },
        ...(user.diplomes && user.diplomes.length > 0 ? [
          { label: 'Diplômes', value: user.diplomes.map(d => `${d.diplome} (${d.etablissement}, ${d.anneeObtention})`).join('\n') }
        ] : []),
        ...(user.formations && user.formations.length > 0 ? [
          { label: 'Formations', value: user.formations.map(f => `${f.formation} (${f.organisme}, ${f.duree})`).join('\n') }
        ] : []),
      ]
    },
    {
      title: 'EXPÉRIENCES PROFESSIONNELLES',
      items: user.experiences && user.experiences.length > 0 ? 
        user.experiences.map((exp, index) => ({
          label: `Expérience ${index + 1}`,
          value: `${exp.poste} chez ${exp.employeur} (${exp.periode})`
        })) : [
          { label: 'Expériences', value: 'Aucune expérience renseignée' }
        ]
    },
    {
      title: 'SITUATION GÉOGRAPHIQUE',
      items: [
        { label: 'Région', value: user.region },
        { label: 'District', value: user.district },
        { label: 'Commune', value: user.commune },
        { label: 'Fokontany', value: user.fokontany || 'Non renseigné' },
      ]
    },
    {
      title: 'INFORMATIONS COMPLÉMENTAIRES',
      items: [
        { label: 'Langues parlées', value: Array.isArray(user.languesParlees) ? user.languesParlees.join(', ') : user.languesParlees || 'Non renseigné' },
        { label: 'Compétences particulières', value: user.competencesParticulieres || 'Non renseigné' },
      ]
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Télécharger ma fiche" />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        {/* Header Info */}
        <Card style={[styles.headerCard, { backgroundColor: theme.colors.primaryContainer }]}>
          <Card.Content>
            <View style={styles.headerContent}>
              <MaterialCommunityIcons 
                name="file-pdf-box" 
                size={48} 
                color={theme.colors.onPrimaryContainer} 
              />
              <View style={styles.headerText}>
                <Text variant="headlineSmall" style={[styles.headerTitle, { color: theme.colors.onPrimaryContainer }]}>
                  Fiche de renseignement
                </Text>
                <Text variant="bodyMedium" style={[styles.headerSubtitle, { color: theme.colors.onPrimaryContainer }]}>
                  {user.prenoms} {user.nom}
                </Text>
                <Text variant="bodySmall" style={[styles.headerIM, { color: theme.colors.onPrimaryContainer }]}>
                  IM: {user.im}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Download Options */}
        <Card style={[styles.optionsCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="bodyLarge" style={[styles.optionsTitle, { color: theme.colors.onSurface }]}>
              Options de téléchargement
            </Text>

            <List.Item
              title="Format PDF"
              description="Fiche officielle au format PDF"
              left={props => <List.Icon {...props} icon="file-pdf-box" color={theme.colors.error} />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />

            <Divider style={styles.divider} />

            <List.Item
              title="Partager par email"
              description="Envoyer la fiche par email"
              left={props => <List.Icon {...props} icon="email" color={theme.colors.primary} />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>

        {/* Preview */}
        <Card style={[styles.previewCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="bodyLarge" style={[styles.previewTitle, { color: theme.colors.onSurface }]}>
              Aperçu du contenu
            </Text>

            {previewSections.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.previewSection}>
                <Text variant="bodyMedium" style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                  {section.title}
                </Text>
                
                {section.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.previewItem}>
                    <Text variant="bodySmall" style={[styles.itemLabel, { color: theme.colors.onSurfaceVariant }]}>
                      {item.label}:
                    </Text>
                    <Text variant="bodySmall" style={[styles.itemValue, { color: theme.colors.onSurface }]}>
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Generate Button */}
        <Card style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={generatePDF}
              loading={isGenerating}
              disabled={isGenerating}
              style={styles.generateButton}
              contentStyle={styles.buttonContent}
              icon="download"
            >
              {isGenerating ? 'Génération en cours...' : 'Générer et télécharger PDF'}
            </Button>

            <Text variant="bodySmall" style={[styles.disclaimer, { color: theme.colors.onSurfaceVariant }]}>
              Le fichier PDF généré contiendra toutes vos informations personnelles et administratives.
              Assurez-vous que vos données sont à jour avant de télécharger.
            </Text>
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
  headerCard: {
    marginBottom: 16,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    marginBottom: 2,
  },
  headerIM: {
    opacity: 0.8,
  },
  optionsCard: {
    marginBottom: 16,
    elevation: 2,
  },
  optionsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  divider: {
    marginVertical: 8,
  },
  previewCard: {
    marginBottom: 16,
    elevation: 2,
  },
  previewTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  previewSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  previewItem: {
    marginBottom: 6,
    paddingLeft: 8,
  },
  itemLabel: {
    fontWeight: '600',
    marginBottom: 2,
  },
  itemValue: {
    marginLeft: 8,
    lineHeight: 18,
  },
  actionCard: {
    marginBottom: 16,
    elevation: 2,
  },
  generateButton: {
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonContent: {
    height: 50,
  },
  disclaimer: {
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default DownloadProfileScreen;