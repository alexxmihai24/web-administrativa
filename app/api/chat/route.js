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

        // ... (configuración tramitesConfig igual que antes) ...

        // ... (systemInstructions igual que antes) ...

        let aiResponse = "";

        try {
            // ... (logs de conexión) ...

            // Construir historial de mensajes para Groq
            let conversationHistory = [
                { role: "system", content: systemInstructions }
            ];

            if (messages && Array.isArray(messages)) {
                // Si viene historial completo del frontend, lo usamos
                // Filtramos solo user y assistant para evitar errores, y quitamos mensajes de error previos
                const cleanHistory = messages.map(m => ({
                    role: m.role === 'user' ? 'user' : 'assistant',
                    content: m.content
                }));
                conversationHistory = [...conversationHistory, ...cleanHistory];

                // Aseguramos que el último mensaje sea el del usuario (si no está ya incluido)
                const lastMsg = cleanHistory[cleanHistory.length - 1];
                if (!lastMsg || lastMsg.content !== message) {
                    conversationHistory.push({ role: "user", content: message });
                }

            } else {
                // Modo antiguo (sin historial), solo mensaje actual
                conversationHistory.push({ role: "user", content: message });
            }

            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: conversationHistory, // Usamos el historial
                temperature: 0.7,
                max_tokens: 1024,
            });

            // ... (resto igual) ...
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
