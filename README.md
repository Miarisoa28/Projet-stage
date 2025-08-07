# Projet Stage - Frontend

Une application web moderne développée avec React, TypeScript et Tailwind CSS dans le cadre d'un projet de stage professionnel.

## 🚀 Fonctionnalités

- **Interface moderne et responsive** : Design élégant qui s'adapte à tous les appareils
- **Navigation intuitive** : Menu de navigation avec indicateur de page active
- **Formulaire de contact fonctionnel** : Interface complète pour nous contacter
- **Architecture modulaire** : Composants React réutilisables et bien structurés
- **TypeScript** : Code typé pour une meilleure maintenabilité
- **Performance optimisée** : Build optimisé avec Vite

## 🛠️ Technologies Utilisées

- **React 18** - Bibliothèque JavaScript pour la création d'interfaces utilisateur
- **TypeScript** - Superset de JavaScript avec typage statique
- **Tailwind CSS** - Framework CSS utilitaire pour un design rapide
- **Vite** - Outil de build moderne et rapide
- **React Router** - Navigation côté client
- **Lucide React** - Icônes modernes et élégantes

## 📦 Installation et Démarrage

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. Clonez le repository :
```bash
git clone <url-du-repo>
cd projet-stage
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à l'adresse `http://localhost:3000`

## 🏗️ Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Créé un build de production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run type-check` - Vérifie les types TypeScript

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # En-tête avec navigation
│   ├── Footer.tsx      # Pied de page
│   └── Layout.tsx      # Layout principal
├── pages/              # Pages de l'application
│   ├── Home.tsx        # Page d'accueil
│   ├── About.tsx       # Page à propos
│   └── Contact.tsx     # Page de contact
├── hooks/              # Hooks personnalisés (à venir)
├── utils/              # Fonctions utilitaires (à venir)
├── types/              # Types TypeScript (à venir)
├── App.tsx             # Composant principal
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux
```

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont définies dans `tailwind.config.js` :

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### Responsive Design

L'application utilise les breakpoints Tailwind CSS :
- `sm`: 640px et plus
- `md`: 768px et plus
- `lg`: 1024px et plus
- `xl`: 1280px et plus

## 📧 Contact

Pour toute question ou suggestion concernant ce projet, n'hésitez pas à utiliser le formulaire de contact de l'application ou à ouvrir une issue sur ce repository.

## 📄 Licence

Ce projet a été développé dans le cadre d'un stage professionnel.