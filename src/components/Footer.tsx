export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-900">Projet Stage</h3>
            <p className="text-gray-600 text-sm">
              Application développée dans le cadre d'un stage
            </p>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Projet Stage. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  )
}