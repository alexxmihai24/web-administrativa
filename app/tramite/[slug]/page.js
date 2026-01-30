'use client';

import { use } from 'react';
import Link from 'next/link';
import ChatBox from '@/components/ChatBox';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { useLanguage } from '@/lib/LanguageContext';
import { CONTACT_CONFIG } from '@/lib/contact-config';

export default function TramitePage({ params }) {
    // Desempaquetar params (Next.js 15 los hace asíncronos)
    const { slug } = use(params);
    const { t, tramites } = useLanguage();

    const tramite = tramites[slug] || {
        titulo: 'Trámite no encontrado',
        descripcion: 'El trámite solicitado no existe',
        contenido: []
    };

    // Crear mensaje personalizado para WhatsApp (para el botón del sidebar)
    const whatsappMessage = encodeURIComponent(
        `Hola, necesito ayuda con el trámite de ${tramite.titulo}`
    );
    const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-12 text-blue-50">
            <FloatingWhatsApp tramiteTitulo={tramite.titulo} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center space-x-2 text-sm">
                    <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                        {t.tramitePage.breadcrumb.home}
                    </Link>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-400">{t.tramitePage.breadcrumb.tramites}</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-white font-semibold">{tramite.titulo}</span>
                </nav>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-2xl shadow-2xl p-6 md:p-12 mb-8 text-white border border-blue-500/20 backdrop-blur-sm">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                        {tramite.titulo}
                    </h1>
                    <p className="text-lg md:text-xl text-blue-200/90">
                        {tramite.descripcion}
                    </p>
                </div>

                {/* Contenido Principal - Chat ocupa la mayor parte */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna Principal - ChatBox */}
                    <div className="lg:col-span-2">
                        <ChatBox slug={slug} />
                    </div>

                    {/* Sidebar - Info adicional */}
                    <div className="space-y-6">
                        {/* Trámites disponibles */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                {t.tramitePage.available}
                            </h2>
                            <ul className="space-y-3">
                                {tramite.contenido.map((item, index) => (
                                    <li key={index} className="flex items-start space-x-2 group">
                                        <div className="shrink-0 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mt-0.5">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-sm">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Consejos */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                {t.tramitePage.tips}
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{t.tramitePage.tip1}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{t.tramitePage.tip2}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{t.tramitePage.tip3}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
