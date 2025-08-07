import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUsers, mockAdmins } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const adminData = await AsyncStorage.getItem('isAdmin');
      
      if (userData) {
        setUser(JSON.parse(userData));
        setIsAdmin(adminData === 'true');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (im, password, asAdmin = false) => {
    try {
      if (asAdmin) {
        const admin = mockAdmins.find(a => a.im === im && a.password === password);
        if (admin) {
          await AsyncStorage.setItem('user', JSON.stringify(admin));
          await AsyncStorage.setItem('isAdmin', 'true');
          setUser(admin);
          setIsAdmin(true);
          return { success: true };
        }
      } else {
        const foundUser = mockUsers.find(u => u.im === im && u.password === password);
        if (foundUser) {
          await AsyncStorage.setItem('user', JSON.stringify(foundUser));
          await AsyncStorage.setItem('isAdmin', 'false');
          setUser(foundUser);
          setIsAdmin(false);
          return { success: true };
        }
      }
      return { success: false, message: 'IM ou mot de passe incorrect' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Erreur de connexion' };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate user registration
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        registrationDate: new Date().toISOString(),
        leaveBalance: 30, // 30 jours de congé par défaut
      };
      
      // In a real app, this would be sent to the backend
      mockUsers.push(newUser);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Erreur lors de l\'inscription' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('isAdmin');
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, message: 'Erreur lors de la mise à jour' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};