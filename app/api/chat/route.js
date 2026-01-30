import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Inicializar Groq (API gratuita y rápida)
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(request) {
    try {
        const { message, messages, slug } = await request.json(); // Ahora aceptamos 'messages' (historial)

        if ((!message && !messages) || !slug) {
            return NextResponse.json(
                { error: 'Faltan parámetros requeridos' },
                { status: 400 }
            );
        }

        // Información detallada de trámites y personalidades
        const tramitesConfig = {
            'consulados': {
                nombre: 'Consulados Rumanos y Extranjería (NIE/TIE)',
                descripcion: 'Pasaportes rumanos (eConsulat) y NIE/TIE español (Extranjería).',
                rol: 'Eres un Experto en Burocracia para Rumanos en España.',
                foco: 'Dominas DOS mundos: 1) Trámites de RUMANÍA (eConsulat, Pasaportes) y 2) Trámites de ESPAÑA (Extranjería, NIE, TIE, Certificado UE).',
                tono: 'Cercano, paciente y resolutivo. Sabes que conseguir cita en Extranjería o eConsulat es difícil y ayudas con trucos y pasos claros.',
                keywords: ['eConsulat', 'SIMU', 'Pasaporte rumano', 'Título de viaje', 'NIE', 'TIE', 'Cita Previa Extranjería', 'Toma de huellas', 'Certificado UE'],
                emoji: '🇷🇴🇪🇸',
                links: {
                    econsulat: 'https://www.econsulat.ro/',
                    cita_extranjeria: 'https://icp.administracionespublicas.gob.es/icpplus/index.html',
                    tasas_nie: 'https://sede.policia.gob.es/portalCitizen/content/impresos/tasa790.png'
                }
            },
            'sepe': {
                nombre: 'SEPE (Empleo)',
                descripcion: 'Prestaciones por desempleo, subsidios y orientación laboral.',
                rol: 'Eres un Orientador Laboral y Experto en Prestaciones del SEPE.',
                foco: 'Tu prioridad es maximizar las prestaciones del usuario y ayudarle a entender sus derechos.',
                tono: 'Motivador, práctico y directo. Usas lenguaje sencillo para explicar burocracia.',
                keywords: ['Días cotizados', 'DARDE', 'Prestación contributiva', 'Subsidio', 'Paro', 'ERTE'],
                emoji: '🏗️',
                links: {
                    sede: 'https://sede.sepe.gob.es/portalSede/procedimientos-y-servicios.html',
                    cita: 'https://sede.sepe.gob.es/portalSede/procedimientos-y-servicios/personas/proteccion-por-desempleo/cita-previa.html'
                }
            },
            'seguridad-social': {
                nombre: 'Seguridad Social',
                descripcion: 'Afiliación, vida laboral, pensiones e ingreso mínimo vital.',
                rol: 'Eres un Gestor Administrativo experto en Seguridad Social.',
                foco: 'Tu prioridad es explicar requisitos de cotización, bajas y jubilaciones.',
                tono: 'Servicial, paciente y detallista. La Seguridad Social es compleja y tú la simplificas.',
                keywords: ['Base de cotización', 'Vida laboral', 'Incapacidad temporal', 'Jubilación', 'IMV', 'Alta/Baja'],
                emoji: '🏥',
                links: {
                    tu_seg_social: 'https://sede-tu.seg-social.gob.es/',
                    importass: 'https://portal.seg-social.gob.es/wps/portal/importass'
                }
            },
            'hacienda': {
                nombre: 'Hacienda (Agencia Tributaria)',
                descripcion: 'Impuestos, declaraciones de la renta, altas censales y certificados.',
                rol: 'Eres un Asesor Fiscal Senior especializado en la Agencia Tributaria.',
                foco: 'Tu prioridad es el cumplimiento fiscal, evitar sanciones y optimizar declaraciones.',
                tono: 'Profesional, preciso y muy serio con los plazos. Transmites seguridad jurídica.',
                keywords: ['Ejercicio fiscal', 'Base imponible', 'Deducción', 'Modelo 100', 'Modelo 303', 'IRPF', 'IVA'],
                emoji: '💰',
                links: {
                    sede: 'https://sede.agenciatributaria.gob.es/',
                    renta: 'https://sede.agenciatributaria.gob.es/Sede/Renta.html'
                }
            }
        };

        const config = tramitesConfig[slug] || {
            nombre: 'Trámite Administrativo General',
            descripcion: 'Asistencia general para trámites en España.',
            rol: 'Eres un Asistente Virtual Administrativo General.',
            foco: 'Tu prioridad es resolver dudas generales sobre administración pública.',
            tono: 'Cortés y eficiente.',
            keywords: [],
            emoji: '🏛️',
            links: {}
        };

        // System Instructions Avanzadas y CONCISAS
        const systemInstructions = `${config.rol}
Tu especialidad es: **${config.nombre}**.

OBJETIVO PRINCIPAL:
Comportarte como un humano experto. **NO sueltes toda la información de golpe.** Ten una conversación fluida.

ENLACES ÚTILES QUE PUEDES USAR (Solo si viene al caso):
${JSON.stringify(config.links, null, 2)}

REGLAS DE ORO (SÍGUELAS ESTRICTAMENTE):
1.  **SÉ BREVE Y CONCISO**: En general, tus respuestas no deben superar las 3-4 frases.
2.  **EXCEPCIÓN MODO GUÍA - PASO A PASO**: Si preguntan "CÓMO" hacer algo o piden pasos:
    - Enumera los documentos necesarios.
    - Explica paso a paso dónde clicar en la web oficial (ej: "Entra en el enlace, selecciona provincia, elige trámite...").
    - **Usa los enlaces** proporcionados.
3.  **SI EL USUARIO SOLO SALUDA (ej: "Hola")**: Responde SOLO devolviendo el saludo y preguntando en qué puedes ayudar con ${config.nombre}.
4.  **SI EL USUARIO DA LAS GRACIAS O SE DESPIDE**: Responde amablemente y despídete. **(SIN MENSAJE DE VENTA)**.
5.  **PERSONALIDAD**: ${config.tono}

CIERRE DE VENTA OBLIGATORIO (Solo cuando expliques un trámite complicado o el usuario parezca confundido):

"\\n\\n🚀 **¿Se te hace complicado o no encuentras cita?**\\n👉 Yo me encargo de todo el trámite por ti por solo **10€/trámite**. Pincha en el icono de **WhatsApp** y empezamos."`;

        let aiResponse = "";

        try {
            // ... (logs de conexión) ...
            const startTime = Date.now(); // Definir startTime aquí para que esté disponible en el try

            // Construir historial de mensajes para Groq
            let conversationHistory = [
                { role: "system", content: systemInstructions }
            ];

            if (messages && Array.isArray(messages) && messages.length > 0) {
                // Filtrar mensajes válidos (que tengan contenido y rol correcto)
                const cleanHistory = messages
                    .filter(m => m.content && (m.role === 'user' || m.role === 'assistant'))
                    .map(m => ({
                        role: m.role,
                        content: String(m.content) // Asegurar que sea string
                    }));

                conversationHistory = [...conversationHistory, ...cleanHistory];
            } else {
                // Si no hay historial, usamos el mensaje actual si existe
                if (message) {
                    conversationHistory.push({ role: "user", content: String(message) });
                }
            }

            // Asegurarse de que el último mensaje es del usuario (Groq a veces falla si el último es assistant)
            // Y asegurar que no enviamos un historial donde el último mensaje ya es el que queremos responder
            const lastMsg = conversationHistory[conversationHistory.length - 1];
            if (message && (!lastMsg || lastMsg.content !== message || lastMsg.role !== 'user')) {
                conversationHistory.push({ role: "user", content: String(message) });
            }

            // LOG DE DEPURACIÓN (Para ver qué enviamos)
            console.log('📤 Enviando a Groq:', JSON.stringify(conversationHistory.map(m => ({ r: m.role, c: m.content.substring(0, 50) + '...' })), null, 2));

            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: conversationHistory,
                temperature: 0.7,
                max_tokens: 1024,
            });

            const endTime = Date.now();
            aiResponse = completion.choices[0].message.content;

            console.log('✅ Respuesta de Groq recibida correctamente');
            console.log('📏 Longitud de respuesta:', aiResponse.length, 'caracteres');
            console.log('⏱️  Tiempo:', endTime - startTime, 'ms');
            console.log('🚀 Modelo usado:', completion.model);

        } catch (groqError) {
            console.error('⚠️ Error CONECTANDO con Groq:', groqError); // Log completo del error
            console.error('⚠️ Detalles del error:', JSON.stringify(groqError.error || {}, null, 2)); // Detalles si existen

            // RESPUESTA DE CONTINGENCIA (FALLBACK)
            aiResponse = `[MODO SIN CONEXIÓN] Lo siento, ha habido un problema técnico momentáneo.
            
            Pero aquí tienes la información básica para **${config.nombre}**:
            
            ${config.descripcion}
            
            🚀 **Si necesitas ayuda urgente o el trámite es complejo**:
            👉 Pulsa el botón de **WhatsApp** y habla directamente con Alex (10€/trámite).`;
        }

        return NextResponse.json({
            response: aiResponse,
            tramite: config.nombre,
            consultaId: null, // Sin base de datos por ahora
            ragInfo: {
                similarQueriesFound: 0,
                usedRAG: false
            }
        });

    } catch (error) {
        console.error('🔥 Error CRÍTICO en API chat:', error);

        return NextResponse.json(
            {
                error: 'Error interno del servidor',
                details: error.message
            },
            { status: 500 }
        );
    }
}
