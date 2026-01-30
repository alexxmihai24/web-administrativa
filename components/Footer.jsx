import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 justify-items-center text-center md:text-left">
                    {/* Columna 1: Enlaces Rápidos */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center md:justify-start space-x-2">
                                    <span>→</span>
                                    <span>Inicio</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tramite/consulados" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center md:justify-start space-x-2">
                                    <span>→</span>
                                    <span>Consulados</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tramite/sepe" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center md:justify-start space-x-2">
                                    <span>→</span>
                                    <span>SEPE</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tramite/seguridad-social" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center md:justify-start space-x-2">
                                    <span>→</span>
                                    <span>Seguridad Social</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tramite/hacienda" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center md:justify-start space-x-2">
                                    <span>→</span>
                                    <span>Hacienda</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 2: Contacto */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Contacto</h3>
                        <div className="space-y-3 text-gray-300 text-sm flex flex-col items-center md:items-start">
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span>amihaita831@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span>+34 900 123 456</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>Montilla, España</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separador */}
                <div className="border-t border-gray-700 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Asesor Administrativo Alex. Todos los derechos reservados.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                                Política de Privacidad
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                                Términos de Uso
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
