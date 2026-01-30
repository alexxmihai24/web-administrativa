'use client';

import Link from 'next/link';

export default function TramiteCard({ titulo, descripcion, slug, icono }) {
    return (
        <Link href={`/tramite/${slug}`} className="group relative block h-full">
            {/* Glossy Gradient Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur-sm group-hover:blur-md"></div>

            {/* Card Content */}
            <div className="relative h-full bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 transform group-hover:-translate-y-2 overflow-hidden">

                {/* Background Glow inside card */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500"></div>

                {/* Icon Container with Neo-morphism feel */}
                <div className="relative mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-white/30">
                    <div className="text-blue-400 group-hover:text-yellow-400 transition-colors duration-300 transform group-hover:rotate-12">
                        {icono}
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                    {titulo}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {descripcion}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    <span className="mr-2">Comenzar trámite</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
