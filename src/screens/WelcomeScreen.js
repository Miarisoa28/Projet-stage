import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.cardContent}>
            {/* Logo placeholder */}
            <View style={[styles.logoContainer, { backgroundColor: theme.colors.outline }]}>
              <Text style={[styles.logoText, { color: theme.colors.onSurface }]}>
                LOGO
              </Text>
            </View>
            
            <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
              Gestion des Congés
            </Text>
            
            <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Système de gestion des congés et assiduité du personnel
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Se connecter
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('Register')}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                S'inscrire
              </Button>

              <Button
                mode="text"
                onPress={() => navigation.navigate('AdminLogin')}
                style={styles.adminButton}
                labelStyle={{ fontSize: 12 }}
              >
                Connexion Administrateur
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    elevation: 8,
    borderRadius: 16,
  },
  cardContent: {
    padding: 30,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    height: 50,
  },
  adminButton: {
    marginTop: 10,
  },
});

export default WelcomeScreen;