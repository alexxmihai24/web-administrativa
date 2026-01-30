const fetch = require('node-fetch');

async function testChatCompleto() {
    console.log('🕵️‍♂️ AUDITORÍA DE CHATBOT - INICIANDO...\n');

    const url = 'http://localhost:3000/api/chat';

    // Simulo un historial de conversación realista
    const historial = [
        { role: 'assistant', content: '¡Hola! Soy el asistente IA. ¿En qué puedo ayudarte?' },
        { role: 'user', content: 'Hola, tengo una duda sobre el pasaporte.' },
        { role: 'assistant', content: 'Claro, soy experto en trámites de Consulados. ¿Qué necesitas saber?' }
    ];

    // Simulo el nuevo mensaje del usuario
    const mensajeUsuario = "¿Cómo pido cita para renovarlo? Dame los pasos.";
    const slug = "consulados"; // Contexto: Consulados

    // Construyo el payload IGUAL que el frontend
    const payload = {
        message: mensajeUsuario,
        messages: [...historial, { role: 'user', content: mensajeUsuario }],
        slug: slug
    };

    console.log(`📤 Enviando historial de ${payload.messages.length} mensajes...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        console.log('\n📥 RESPUESTA RECIBIDA:');
        console.log('─'.repeat(50));
        console.log(data.response);
        console.log('─'.repeat(50));

        // Verificaciones automáticas
        if (data.response.includes('[MODO SIN CONEXIÓN]')) {
            console.error('\n❌ ERROR CRÍTICO: El bot está en MODO SIN CONEXIÓN.');
            console.error('   Posibles causas: API Key inválida, Error de formato en mensajes, Groq caído.');
        } else {
            console.log('\n✅ ÉXITO: El bot respondió correctamente.');

            // Verificar si incluye pasos (porque pedimos pasos)
            if (data.response.includes('1.') || data.response.includes('- ')) {
                console.log('   ✨ Incluye guía paso a paso (OK)');
            } else {
                console.log('   ⚠️ OJO: No parece una lista de pasos numéricos.');
            }

            // Verificar si incluye enlaces (porque pedimos cómo)
            if (data.response.includes('http')) {
                console.log('   ✨ Incluye enlaces (OK)');
            } else {
                console.log('   ⚠️ OJO: No veo enlaces HTTP.');
            }
        }

    } catch (error) {
        console.error('\n❌ ERROR DE CONEXIÓN AL SERVIDOR LOCAL:');
        console.error(`   ${error.message}`);
        console.log('   💡 ¿Está corriendo "npm run dev"?');
    }
}

testChatCompleto();
