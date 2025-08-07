import { ArrowRight, Code, Palette, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    {
      icon: Code,
      title: 'Développement Moderne',
      description: 'Utilisation des dernières technologies React, TypeScript et Tailwind CSS'
    },
    {
      icon: Palette,
      title: 'Design Élégant',
      description: 'Interface utilisateur moderne et responsive pour tous les appareils'
    },
    {
      icon: Zap,
      title: 'Performance Optimisée',
      description: 'Application rapide et efficace grâce à Vite et aux meilleures pratiques'
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenue sur
            <span className="text-primary-600 block">Projet Stage</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Une application web moderne développée avec React, TypeScript et Tailwind CSS 
            dans le cadre d'un projet de stage professionnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              En savoir plus
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Caractéristiques Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-lg mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Projet en Chiffres
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">TypeScript</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">React 18</div>
              <div className="text-gray-600">Framework</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">Responsive</div>
              <div className="text-gray-600">Design</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">Moderne</div>
              <div className="text-gray-600">UI/UX</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}