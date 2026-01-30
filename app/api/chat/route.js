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

        // Información básica de trámites (sin base de datos)
        const tramitesInfo = {
            'consulados': {
                nombre: 'Consulados',
                descripcion: 'Servicios consulares para ciudadanos españoles en el extranjero'
            },
            'sepe': {
                nombre: 'SEPE',
                descripcion: 'Servicio Público de Empleo Estatal - Prestaciones por desempleo'
            },
            'seguridad-social': {
                nombre: 'Seguridad Social',
                descripcion: 'Trámites relacionados con la Seguridad Social'
            },
            'hacienda': {
                nombre: 'Hacienda',
                descripcion: 'Agencia Tributaria - Impuestos y declaraciones'
            }
        };

        const tramite = tramitesInfo[slug] || {
            nombre: 'Trámite Administrativo',
            descripcion: 'Trámite administrativo en España'
        };

        // System Instructions para Gemini
        const systemInstructions = `Eres un experto senior en trámites administrativos de España (Gestor Administrativo Colegiado).
Tu objetivo es ayudar al usuario con el trámite de **${tramite.nombre}** de forma efectiva.

PERSONALIDAD REQUERIDA PARA ESTE TRÁMITE (${tramite.nombre}):
${tramite.nombre.includes('Hacienda') ? '- Tono: Serio, preciso y enfocado en evitar multas. Los plazos son sagrados.' : ''}
${tramite.nombre.includes('Consulado') || tramite.nombre.includes('Extranjería') ? '- Tono: Empático, tranquilizador y claro. Muchos usuarios son extranjeros y pueden estar estresados con su residencia.' : ''}
${tramite.nombre.includes('SEPE') || tramite.nombre.includes('Empleo') ? '- Tono: Motivador pero realista. Enfocado en derechos del trabajador y prestaciones.' : ''}
${tramite.nombre.includes('Seguridad Social') ? '- Tono: Servicial y paciente. La burocracia aquí es compleja.' : ''}
- Si no encaja en los anteriores: Tono profesional, eficiente y resolutivo.

NORMAS IMPORTANTES:
1. Responde de forma clara, estructurada y profesional.
2. Usa emojis para hacer la lectura más amena (ej: 📄, 📅, 💰).
3. Si te preguntan algo fuera de temas administrativos, deriva educadamente al tema.
4. Siempre basa tus respuestas en normativa española vigente.
5. Menciona documentos necesarios y plazos claramente.
6. OBLIGATORIO: AL FINAL DE TU RESPUESTA, SIEMPRE AÑADE ESTE TEXTO EXACTO (con saltos de línea):
   
   "\\n\\n✨ **¿Te parece complicado?**\\n👉 **Pincha en el icono de WhatsApp verde de la esquina** y yo me encargo de todo personalmente. ¡Sin citas previas ni esperas!"

INFORMACIÓN ADICIONAL DEL TRÁMITE:
- Descripción: ${tramite.descripcion}`;


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
            aiResponse = `[MODO SIN CONEXIÓN] Lo siento, en este momento tengo dificultades para conectar con mi cerebro de IA, pero puedo darte información básica sobre **${tramite.nombre}**.

${tramite.descripcion}

**Trámites comunes:**
${tramite.nombre === 'Consulados' ? '- Renovación de pasaporte\n- Solicitud de visados\n- Registro de matrícula consular' : ''}
${tramite.nombre === 'SEPE' ? '- Solicitud de paro\n- Renovación de demanda\n- Cursos de formación' : ''}
${tramite.nombre === 'Seguridad Social' ? '- Vida laboral\n- Altas y bajas\n- Tarjeta Sanitaria Europea' : ''}
${tramite.nombre === 'Hacienda' ? '- Declaración de la Renta\n- Certificados tributarios\n- Alta de autónomos' : ''}

💡 Para una ayuda más personalizada, por favor usa el botón de **WhatsApp** que verás en esta página para hablar con un agente humano.`;
        }

        return NextResponse.json({
            response: aiResponse,
            tramite: tramite.nombre,
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
