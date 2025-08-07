import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, IconButton } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { login } = useAuth();
  const [im, setIM] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!im || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const result = await login(im, password, false);
      if (result.success) {
        navigation.navigate('UserDashboard');
      } else {
        Alert.alert('Erreur de connexion', result.message);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            iconColor={theme.colors.onPrimary}
            size={24}
            onPress={() => navigation.goBack()}
          />
          <IconButton
            icon={isDarkMode ? "weather-sunny" : "weather-night"}
            iconColor={theme.colors.onPrimary}
            size={24}
            onPress={toggleTheme}
          />
        </View>

        <View style={styles.content}>
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.cardContent}>
              <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
                Connexion
              </Text>
              
              <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                Connectez-vous à votre compte
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Numéro IM"
                  value={im}
                  onChangeText={setIM}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />

                <TextInput
                  label="Mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
              </View>

              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Se connecter
              </Button>

              <View style={styles.footer}>
                <Text style={{ color: theme.colors.onSurfaceVariant }}>
                  Pas encore de compte ?{' '}
                </Text>
                <Button
                  mode="text"
                  onPress={() => navigation.navigate('Register')}
                  compact
                >
                  S'inscrire
                </Button>
              </View>

              <View style={styles.testCredentials}>
                <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
                  Test: IM: 12345, Mot de passe: password123
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
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
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContent: {
    height: 50,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testCredentials: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
});

export default LoginScreen;