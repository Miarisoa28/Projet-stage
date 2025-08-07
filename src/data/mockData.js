// Mock data pour les tests sans backend

export const mockUsers = [
  {
    id: '1',
    im: '12345',
    password: 'password123',
    
    // Renseignements personnels
    nom: 'Rakoto',
    prenoms: 'Jean Pierre',
    dateNaissance: '1985-05-15',
    lieuNaissance: 'Antananarivo',
    nationalite: 'Malagasy',
    situationMatrimoniale: 'Marié(e)',
    nombreEnfants: '2',
    adresse: 'Lot II M 45 Ampefiloha',
    telephone: '0340123456',
    email: 'jean.rakoto@example.com',
    
    // Situation administrative
    grade: 'Cadre II',
    fonction: 'Responsable RH',
    service: 'Ressources Humaines',
    indice: '550',
    dateRecrutement: '2010-03-01',
    typeRecrutement: 'Concours',
    categoriePersonnel: 'Fonctionnaire',
    
    // Formation et études
    niveauEtudes: 'Universitaire',
    diplomes: [
      {
        diplome: 'Master en Gestion des Ressources Humaines',
        etablissement: 'Université d\'Antananarivo',
        anneeObtention: '2009'
      }
    ],
    formations: [
      {
        formation: 'Formation en Leadership',
        organisme: 'Centre de Formation Continue',
        duree: '5 jours',
        annee: '2020'
      }
    ],
    
    // Expériences professionnelles
    experiences: [
      {
        poste: 'Assistant RH',
        employeur: 'Entreprise ABC',
        periode: '2008-2010',
        description: 'Gestion du personnel'
      }
    ],
    
    // Situation géographique
    region: 'Analamanga',
    district: 'Antananarivo Renivohitra',
    commune: 'Antananarivo',
    fokontany: 'Ampefiloha',
    
    // Autres informations
    languesParlees: ['Malagasy', 'Français', 'Anglais'],
    competencesParticulieres: 'Informatique, Communication',
    
    // Données pour l'application
    leaveBalance: 25,
    registrationDate: '2024-01-15T10:00:00Z',
    isActive: true
  },
  {
    id: '2',
    im: '67890',
    password: 'test123',
    nom: 'Rasoamina',
    prenoms: 'Marie Claire',
    dateNaissance: '1990-08-22',
    lieuNaissance: 'Fianarantsoa',
    nationalite: 'Malagasy',
    situationMatrimoniale: 'Célibataire',
    nombreEnfants: '0',
    adresse: 'Lot III B 12 Behoririka',
    telephone: '0331234567',
    email: 'marie.rasoamina@example.com',
    grade: 'Cadre I',
    fonction: 'Comptable',
    service: 'Finance',
    indice: '450',
    dateRecrutement: '2015-09-01',
    typeRecrutement: 'Concours',
    categoriePersonnel: 'Fonctionnaire',
    niveauEtudes: 'Universitaire',
    diplomes: [
      {
        diplome: 'Licence en Comptabilité',
        etablissement: 'Université de Fianarantsoa',
        anneeObtention: '2013'
      }
    ],
    formations: [],
    experiences: [],
    region: 'Analamanga',
    district: 'Antananarivo Renivohitra',
    commune: 'Antananarivo',
    fokontany: 'Behoririka',
    languesParlees: ['Malagasy', 'Français'],
    competencesParticulieres: 'Excel, Sage',
    leaveBalance: 28,
    registrationDate: '2024-01-20T14:30:00Z',
    isActive: true
  }
];

export const mockAdmins = [
  {
    id: 'admin1',
    im: 'ADMIN001',
    password: 'admin123',
    nom: 'Andriamampianina',
    prenoms: 'Paul',
    email: 'admin@example.com',
    role: 'Administrateur Général',
    service: 'Administration',
    isAdmin: true
  }
];

export const mockLeaveRequests = [
  {
    id: '1',
    userId: '1',
    userName: 'Jean Pierre Rakoto',
    userIM: '12345',
    type: 'Congé annuel',
    dateDebut: '2024-02-15',
    dateFin: '2024-02-20',
    duree: 5,
    motif: 'Vacances en famille',
    status: 'En attente',
    dateCreation: '2024-02-01T10:00:00Z',
    commentaireAdmin: ''
  },
  {
    id: '2',
    userId: '2',
    userName: 'Marie Claire Rasoamina',
    userIM: '67890',
    type: 'Repos médical',
    dateDebut: '2024-02-10',
    dateFin: '2024-02-12',
    duree: 2,
    motif: 'Consultation médicale',
    status: 'Approuvé',
    dateCreation: '2024-02-05T09:30:00Z',
    commentaireAdmin: 'Demande approuvée'
  }
];

export const leaveTypes = [
  'Congé annuel',
  'Repos médical',
  'Permission',
  'Congé de maternité',
  'Congé de paternité',
  'Congé sans solde',
  'Congé exceptionnel'
];

export const grades = [
  'Agent I',
  'Agent II', 
  'Agent III',
  'Cadre I',
  'Cadre II',
  'Cadre III',
  'Cadre Supérieur'
];

export const services = [
  'Ressources Humaines',
  'Finance',
  'Informatique',
  'Administration',
  'Technique',
  'Commercial',
  'Juridique'
];

export const regions = [
  'Analamanga',
  'Vakinankaratra',
  'Itasy',
  'Bongolava',
  'Haute Matsiatra',
  'Amoron\'i Mania',
  'Vatovavy Fitovinany',
  'Ihorombe',
  'Atsimo Atsinanana',
  'Atsinanana',
  'Analanjirofo',
  'Alaotra-Mangoro',
  'Boeny',
  'Sofia',
  'Betsiboka',
  'Melaky',
  'Atsimo Andrefana',
  'Androy',
  'Anosy',
  'Menabe',
  'Diana',
  'Sava'
];