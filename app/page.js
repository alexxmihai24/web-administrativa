'use client';

import TramiteCard from '@/components/TramiteCard';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  const tramites = [
    {
      titulo: t.home.tramites.consulados.title,
      slug: "consulados",
      descripcion: t.home.tramites.consulados.description,
      icono: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      titulo: t.home.tramites.sepe.title,
      slug: "sepe",
      descripcion: t.home.tramites.sepe.description,
      icono: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      )
    },
    {
      titulo: t.home.tramites.seguridadSocial.title,
      slug: "seguridad-social",
      descripcion: t.home.tramites.seguridadSocial.description,
      icono: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      titulo: t.home.tramites.hacienda.title,
      slug: "hacienda",
      descripcion: t.home.tramites.hacienda.description,
      icono: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden text-white selection:bg-yellow-400 selection:text-black">
      {/* 
        ==============================
        HERO SECTION "MÁGICO"
        ============================== 
      */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">

        {/* FONDO ANIMADO DE BLOBS DE COLORES */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Mensaje de Bienvenida con efecto Glass */}
          <div className="inline-block mb-8 animate-fade-in">
            <span className="py-2 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 font-semibold tracking-wide shadow-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-default">
              👋 Bienvenido a la Web Administrativa de Alex
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 pb-2">
              Gestión Inteligente
            </span>
            <span className="text-gradient-animate">
              Sin Complicaciones
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in animation-delay-2000 font-light">
            {t.home.hero.subtitle}
          </p>

          {/* Stats Flotantes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto perspective-1000">
            {[
              { val: "24/7", label: t.home.hero.stats.available, color: "from-green-400 to-emerald-600" },
              { val: "4", label: t.home.hero.stats.areas, color: "from-blue-400 to-indigo-600" },
              { val: "100%", label: t.home.hero.stats.info, color: "from-purple-400 to-pink-600" },
              { val: "IA", label: t.home.hero.stats.ai, color: "from-yellow-400 to-orange-600" }
            ].map((stat, i) => (
              <div key={i} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500`}></div>
                <div className="relative bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.val}
                  </div>
                  <div className="text-sm text-gray-300 mt-2 font-medium tracking-wide uppercase">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ==============================
        SECCIÓN DE TRÁMITES (TARJETAS)
        ============================== 
      */}
      <section className="relative py-24 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
              {t.home.tramites.title}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              {t.home.tramites.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tramites.map((tramite) => (
              <TramiteCard
                key={tramite.slug}
                titulo={tramite.titulo}
                descripcion={tramite.descripcion}
                slug={tramite.slug}
                icono={tramite.icono}
              />
            ))}
          </div>

          {/* CTA DEFINITIVO */}
          <div className="mt-28 relative group max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-12 text-center border border-white/10">
              <h3 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                {t.home.cta.title}
              </h3>
              <p className="text-xl text-gray-300 mb-8 font-light leading-relaxed">
                {t.home.cta.subtitle}
              </p>
              <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:scale-110 transition-all duration-300 flex items-center justify-center mx-auto space-x-2">
                <span>{t.home.cta.button}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
