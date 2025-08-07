import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

// Import tab components
import PersonalInfoTab from '../components/registration/PersonalInfoTab';
import AdministrativeTab from '../components/registration/AdministrativeTab';
import EducationTab from '../components/registration/EducationTab';
import ExperienceTab from '../components/registration/ExperienceTab';
import GeographicTab from '../components/registration/GeographicTab';
import FinalizeTab from '../components/registration/FinalizeTab';

const RegisterScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { register } = useAuth();
  
  const [index, setIndex] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    // Personal info
    nom: '',
    prenoms: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: 'Malagasy',
    situationMatrimoniale: '',
    nombreEnfants: '',
    adresse: '',
    telephone: '',
    email: '',
    
    // Administrative
    im: '',
    grade: '',
    fonction: '',
    service: '',
    indice: '',
    dateRecrutement: '',
    typeRecrutement: '',
    categoriePersonnel: '',
    
    // Education
    niveauEtudes: '',
    diplomes: [],
    formations: [],
    
    // Experience
    experiences: [],
    
    // Geographic
    region: '',
    district: '',
    commune: '',
    fokontany: '',
    
    // Other
    languesParlees: [],
    competencesParticulieres: '',
    
    // Password (final step)
    password: '',
    confirmPassword: '',
  });

  const [routes] = useState([
    { key: 'personal', title: 'Personnel' },
    { key: 'administrative', title: 'Administratif' },
    { key: 'education', title: 'Formation' },
    { key: 'experience', title: 'Expérience' },
    { key: 'geographic', title: 'Géographique' },
    { key: 'finalize', title: 'Finaliser' },
  ]);

  const updateRegistrationData = (newData) => {
    setRegistrationData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (index < routes.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleRegister = async () => {
    try {
      const result = await register(registrationData);
      if (result.success) {
        Alert.alert(
          'Inscription réussie',
          'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      } else {
        Alert.alert('Erreur', result.message);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription');
    }
  };

  const renderScene = SceneMap({
    personal: () => (
      <PersonalInfoTab
        data={registrationData}
        updateData={updateRegistrationData}
        onNext={handleNext}
      />
    ),
    administrative: () => (
      <AdministrativeTab
        data={registrationData}
        updateData={updateRegistrationData}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    ),
    education: () => (
      <EducationTab
        data={registrationData}
        updateData={updateRegistrationData}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    ),
    experience: () => (
      <ExperienceTab
        data={registrationData}
        updateData={updateRegistrationData}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    ),
    geographic: () => (
      <GeographicTab
        data={registrationData}
        updateData={updateRegistrationData}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    ),
    finalize: () => (
      <FinalizeTab
        data={registrationData}
        updateData={updateRegistrationData}
        onPrevious={handlePrevious}
        onRegister={handleRegister}
      />
    ),
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: theme.colors.surface }}
      labelStyle={{ 
        color: theme.colors.onSurface,
        fontSize: 12,
        fontWeight: 'bold',
      }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      scrollEnabled
      tabStyle={{ width: 120 }}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Inscription" />
        <Appbar.Action
          icon={isDarkMode ? "weather-sunny" : "weather-night"}
          onPress={toggleTheme}
        />
      </Appbar.Header>
      
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    flex: 1,
  },
});

export default RegisterScreen;