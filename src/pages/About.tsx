import { CheckCircle, Code2, Globe, Smartphone } from 'lucide-react'

export default function About() {
  const technologies = [
    'React 18',
    'TypeScript',
    'Tailwind CSS',
    'Vite',
    'React Router',
    'Lucide React Icons'
  ]

  const objectives = [
    'Créer une interface utilisateur moderne et intuitive',
    'Utiliser les dernières technologies web',
    'Assurer une expérience responsive sur tous les appareils',
    'Implémenter les meilleures pratiques de développement',
    'Optimiser les performances et l\'accessibilité'
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          À Propos du Projet
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez les objectifs et technologies de ce projet de stage
        </p>
      </div>

      {/* Project Description */}
      <section className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Description du Projet
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Ce projet a été développé dans le cadre d'un stage professionnel avec pour objectif 
          de créer une application web moderne utilisant les dernières technologies du 
          développement frontend. L'application démontre l'utilisation de React avec TypeScript, 
          une architecture de composants bien structurée, et un design responsive élégant.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Le projet met l'accent sur les bonnes pratiques de développement, l'accessibilité, 
          et l'expérience utilisateur, tout en utilisant des outils modernes pour optimiser 
          les performances et la maintenabilité du code.
        </p>
      </section>

      {/* Objectives */}
      <section className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Objectifs du Projet
        </h2>
        <div className="space-y-4">
          {objectives.map((objective, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">{objective}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Technologies Utilisées
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Code2 className="w-4 h-4 text-primary-600" />
              <span className="text-gray-700 font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Application Web
          </h3>
          <p className="text-gray-600 text-sm">
            Accessible depuis n'importe quel navigateur moderne
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <Smartphone className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Design Responsive
          </h3>
          <p className="text-gray-600 text-sm">
            Optimisé pour tous les types d'appareils
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <Code2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Code Moderne
          </h3>
          <p className="text-gray-600 text-sm">
            Développé avec les dernières technologies
          </p>
        </div>
      </section>
    </div>
  )
}