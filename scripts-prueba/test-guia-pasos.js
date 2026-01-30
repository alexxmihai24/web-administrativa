const fetch = require('node-fetch');

async function testGuiaPasos() {
    console.log('🤖 Probando el nuevo MODO GUÍA de la IA...\n');

    const url = 'http://localhost:3000/api/chat';

    // Simulamos una pregunta que requiere pasos y enlaces
    const payload = {
        message: "¿Cómo puedo solicitar el paro? Explícame los pasos.",
        slug: "sepe" // Le decimos que estamos en la sección del SEPE
    };

    console.log(`📤 Enviando pregunta: "${payload.message}" (Contexto: ${payload.slug})`);
    console.log('⏳ Esperando respuesta de la IA (Llama 3.3 70B)...\n');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log('═'.repeat(60));
        console.log('✅ RESPUESTA RECIBIDA:\n');
        console.log(data.response);
        console.log('═'.repeat(60));

        // Verificaciones
        const tienePasos = data.response.includes('1.') || data.response.includes('- ');
        const tieneEnlace = data.response.includes('http');
        const tieneCTA = data.response.includes('WhatsApp');

        console.log('\n🔍 ANÁLISIS DE CALIDAD:');
        console.log(tienePasos ? '✅ Incluye pasos numerados' : '❌ Falta estructura de pasos');
        console.log(tieneEnlace ? '✅ Incluye enlace oficial' : '❌ Falta enlace oficial (IMPORTANTE)');
        console.log(tieneCTA ? '✅ Incluye CTA de WhatsApp' : '⚠️ Falta CTA (Puede ser correcto si la respuesta fue muy simple)');

    } catch (error) {
        console.error('❌ Error al conectar con el servidor:', error.message);
        console.log('💡 Asegúrate de que "npm run dev" esté ejecutándose en otra terminal.');
    }
}

testGuiaPasos();
