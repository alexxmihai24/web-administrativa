import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Inicializar Groq (API gratuita y rápida)
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(request) {
    try {
        const { message, slug } = await request.json();

        if (!message || !slug) {
            return NextResponse.json(
                { error: 'Faltan parámetros requeridos' },
                { status: 400 }
            );
        }

        console.log(`📩 Mensaje recibido: "${message}" para slug: ${slug}`);

        // Información detallada de trámites y personalidades
        const tramitesConfig = {
            'consulados': {
                nombre: 'Consulados y Extranjería',
                descripcion: 'Trámites consulares, visados, pasaportes y legalizaciones.',
                rol: 'Eres un Experto en Derecho Internacional y Extranjería.',
                foco: 'Tu prioridad es ayudar a expatriados y extranjeros con su documentación legal.',
                tono: 'Empático, claro y tranquilizador. Entiendes que la burocracia internacional es estresante.',
                keywords: ['Cita previa', 'Tasa 790', 'Legalización única', 'Pasaporte', 'Visado', 'NIE', 'TIE'],
                emoji: '🛂'
            },
            'sepe': {
                nombre: 'SEPE (Empleo)',
                descripcion: 'Prestaciones por desempleo, subsidios y orientación laboral.',
                rol: 'Eres un Orientador Laboral y Experto en Prestaciones del SEPE.',
                foco: 'Tu prioridad es maximizar las prestaciones del usuario y ayudarle a entender sus derechos.',
                tono: 'Motivador, práctico y directo. Usas lenguaje sencillo para explicar burocracia.',
                keywords: ['Días cotizados', 'DARDE', 'Prestación contributiva', 'Subsidio', 'Paro', 'ERTE'],
                emoji: '🏗️'
            },
            'seguridad-social': {
                nombre: 'Seguridad Social',
                descripcion: 'Afiliación, vida laboral, pensiones e ingreso mínimo vital.',
                rol: 'Eres un Gestor Administrativo experto en Seguridad Social.',
                foco: 'Tu prioridad es explicar requisitos de cotización, bajas y jubilaciones.',
                tono: 'Servicial, paciente y detallista. La Seguridad Social es compleja y tú la simplificas.',
                keywords: ['Base de cotización', 'Vida laboral', 'Incapacidad temporal', 'Jubilación', 'IMV', 'Alta/Baja'],
                emoji: '🏥'
            },
            'hacienda': {
                nombre: 'Hacienda (Agencia Tributaria)',
                descripcion: 'Impuestos, declaraciones de la renta, altas censales y certificados.',
                rol: 'Eres un Asesor Fiscal Senior especializado en la Agencia Tributaria.',
                foco: 'Tu prioridad es el cumplimiento fiscal, evitar sanciones y optimizar declaraciones.',
                tono: 'Profesional, preciso y muy serio con los plazos. Transmites seguridad jurídica.',
                keywords: ['Ejercicio fiscal', 'Base imponible', 'Deducción', 'Modelo 100', 'Modelo 303', 'IRPF', 'IVA'],
                emoji: '💰'
            }
        };

        const config = tramitesConfig[slug] || {
            nombre: 'Trámite Administrativo General',
            descripcion: 'Asistencia general para trámites en España.',
            rol: 'Eres un Asistente Virtual Administrativo General.',
            foco: 'Tu prioridad es resolver dudas generales sobre administración pública.',
            tono: 'Cortés y eficiente.',
            keywords: [],
            emoji: '🏛️'
        };

        // System Instructions Avanzadas
        const systemInstructions = `${config.rol}
Tu especialidad es: **${config.nombre}**.

CONTEXTO DEL USUARIO:
- El usuario está consultando sobre: ${config.descripcion}
- ${config.foco}

PERSONALIDAD Y TONO:
- Tono general: ${config.tono}
- Usa emojis relacionados: ${config.emoji}
- Palabras clave que sueles usar: ${config.keywords.join(', ')}.

NORMAS DE RESPUESTA:
1.  **Responde directamente** a la duda del usuario. No des rodeos.
2.  **Estructura tu respuesta**: Usa viñetas, negritas para conceptos clave y pasos numerados.
3.  **Cita normativa**: Si es relevante, menciona la ley o modelo (ej: "según el modelo 145").
4.  **Plazos y Requisitos**: Siempre destaca los plazos importantes y documentos necesarios.
5.  **Despedida con Venta**: Tu objetivo final es que el usuario contrate nuestros servicios si el trámite es complejo.

CIERRE OBLIGATORIO (al final de CADA respuesta, deja 2 líneas vacías antes):
"\\n\\n✨ **¿Te parece complicado?**\\n👉 **Pincha en el icono de WhatsApp verde de la esquina** y yo me encargo de todo personalmente. ¡Sin citas previas ni esperas!"`;


        let aiResponse = "";


        try {
            console.log('📡 Conectando con Groq API (GRATIS)...');
            console.log('🔑 API Key presente:', !!process.env.GROQ_API_KEY);

            console.log('⏳ Generando contenido con Llama 3.3 70B...');
            const startTime = Date.now();

            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile", // Modelo gratuito y muy potente
                messages: [
                    {
                        role: "system",
                        content: systemInstructions
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
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
            console.error('⚠️ Error conectando con Groq:');
            console.error('  - Mensaje:', groqError.message);
            console.error('  - Tipo:', groqError.constructor.name);
            if (groqError.stack) {
                console.error('  - Stack:', groqError.stack.split('\n').slice(0, 3).join('\n'));
            }

            // RESPUESTA DE CONTINGENCIA (FALLBACK)
            aiResponse = `[MODO SIN CONEXIÓN] Lo siento, en este momento tengo dificultades para conectar con mi cerebro de IA, pero puedo darte información básica sobre **${config.nombre}**.

${config.descripcion}

**Trámites comunes:**
${config.nombre.includes('Consulado') ? '- Renovación de pasaporte\n- Solicitud de visados\n- Registro de matrícula consular' : ''}
${config.nombre.includes('SEPE') ? '- Solicitud de paro\n- Renovación de demanda\n- Cursos de formación' : ''}
${config.nombre.includes('Seguridad Social') ? '- Vida laboral\n- Altas y bajas\n- Tarjeta Sanitaria Europea' : ''}
${config.nombre.includes('Hacienda') ? '- Declaración de la Renta\n- Certificados tributarios\n- Alta de autónomos' : ''}

💡 Para una ayuda más personalizada, por favor usa el botón de **WhatsApp** que verás en esta página para hablar con un agente humano.`;
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
