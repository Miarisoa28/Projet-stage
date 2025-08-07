# Application de Gestion des Congés et Assiduité

Une application React Native complète pour la gestion des congés et de l'assiduité du personnel, développée avec Expo et React Native Paper.

## 🚀 Fonctionnalités

### Pour les Utilisateurs
- **Inscription complète** avec formulaire en onglets :
  - Renseignements personnels
  - Situation administrative  
  - Formation et études
  - Expériences professionnelles
  - Situation géographique
  - Création de mot de passe

- **Tableau de bord personnel** :
  - Visualisation du solde de congés
  - Historique des demandes
  - Actions rapides

- **Gestion des demandes de congé** :
  - Demande de congé annuel, repos médical, permission, etc.
  - Calcul automatique de la durée
  - Validation du solde disponible
  - Suivi des statuts (En attente, Approuvé, Refusé)

- **Notifications** :
  - Suivi des demandes
  - Commentaires de l'administration
  - Historique complet

- **Fonctionnalités additionnelles** :
  - Recherche du personnel avec filtres (grade, service, région)
  - Téléchargement de la fiche de renseignement en PDF
  - Profil utilisateur complet

### Fonctionnalités Système
- **Mode sombre/clair** avec basculement automatique
- **Interface intuitive** avec Material Design 3
- **Navigation fluide** avec React Navigation
- **Données de test** pour fonctionnement sans backend
- **Authentification** sécurisée avec validation

## 🛠 Technologies Utilisées

- **React Native** avec Expo
- **React Native Paper** pour l'interface utilisateur
- **React Navigation** pour la navigation
- **AsyncStorage** pour la persistance locale
- **React Native Vector Icons** pour les icônes
- **Expo Linear Gradient** pour les dégradés

## 📱 Installation et Configuration

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn
- Expo CLI
- Expo Go app sur votre téléphone (pour les tests)

### Installation

1. **Cloner le projet** :
```bash
git clone [URL_DU_REPO]
cd gestion-conges-app
```

2. **Installer les dépendances** :
```bash
npm install
```

3. **Démarrer l'application** :
```bash
npm start
```

4. **Scanner le QR code** avec l'app Expo Go sur votre téléphone

## 🧪 Comptes de Test

### Utilisateur Standard
- **IM** : `12345`
- **Mot de passe** : `password123`

### Utilisateur Standard 2
- **IM** : `67890`
- **Mot de passe** : `test123`

### Administrateur
- **ID Admin** : `ADMIN001`
- **Mot de passe** : `admin123`

## 📋 Guide d'Utilisation

### Première Utilisation
1. Ouvrir l'application
2. Choisir "S'inscrire" pour créer un nouveau compte
3. Remplir tous les onglets du formulaire d'inscription
4. Créer un mot de passe
5. Se connecter avec les identifiants créés

### Navigation Utilisateur
- **Onglet Accueil** : Tableau de bord principal
- **Onglet Notifications** : Suivi des demandes
- **Onglet Profil** : Informations personnelles et actions

### Faire une Demande de Congé
1. Aller dans l'onglet Accueil
2. Appuyer sur le bouton FAB "Nouvelle demande" ou "Demander un congé"
3. Sélectionner le type de congé
4. Choisir les dates (la durée se calcule automatiquement)
5. Ajouter un motif/observation
6. Soumettre la demande

### Rechercher du Personnel
1. Aller dans l'onglet Profil
2. Sélectionner "Rechercher du personnel"
3. Utiliser la barre de recherche ou les filtres
4. Appuyer sur un utilisateur pour voir ses détails

## 🎨 Personnalisation

### Thèmes
L'application supporte automatiquement les modes sombre et clair :
- Basculer via l'icône soleil/lune dans la barre d'applications
- Les préférences sont sauvegardées automatiquement

### Couleurs
Les couleurs sont définies dans `src/contexts/ThemeContext.js` et peuvent être personnalisées.

## 📁 Structure du Projet

```
src/
├── components/           # Composants réutilisables
│   └── registration/    # Onglets d'inscription
├── contexts/            # Contexts React (Auth, Theme)
├── data/               # Données de test
├── navigation/         # Configuration de navigation
├── screens/            # Écrans de l'application
│   ├── user/          # Écrans utilisateur
│   └── admin/         # Écrans administrateur (à développer)
└── utils/             # Utilitaires
```

## 🔮 Fonctionnalités Futures

### Interface Administrateur (En cours)
- Tableau de bord global avec statistiques
- Gestion des utilisateurs (CRUD)
- Validation/refus des demandes de congé
- Génération de rapports d'assiduité
- Notifications pour nouvelles demandes

### Améliorations Prévues
- Intégration avec un backend réel
- Notifications push
- Synchronisation offline
- Export des données en Excel
- Système de rappels automatiques
- Gestion des remplacements

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commiter vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement

---

**Note** : Cette application est actuellement en mode développement avec des données de test. L'intégration avec un backend réel nécessitera des adaptations dans les contexts d'authentification et de gestion des données.