require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAsServer() {
    console.log('🔬 SIMULANDO COMPORTAMIENTO DEL SERVIDOR\n');
    console.log('═'.repeat(80));

    // Verificar API Key
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('🔑 API Key desde .env:', apiKey ? `${apiKey.substring(0, 15)}...${apiKey.substring(apiKey.length - 5)}` : 'NO ENCONTRADA');

    if (!apiKey) {
        console.error('❌ ERROR: No se encontró GEMINI_API_KEY');
        return;
    }

    console.log('\n📡 Inicializando GoogleGenerativeAI...');
    const genAI = new GoogleGenerativeAI(apiKey);

    console.log('✅ GoogleGenerativeAI inicializado');

    // Simular el mensaje del usuario
    const message = '¿Cómo puedo renovar mi pasaporte?';
    const tramite = {
        nombre: 'Consulados',
        descripcion: 'Servicios consulares para ciudadanos españoles en el extranjero'
    };

    const systemInstructions = `Eres un experto senior en trámites administrativos de España.
Tu objetivo es ayudar al usuario con el trámite de **${tramite.nombre}**.

NORMAS:
1. Responde de forma clara y profesional.
2. Usa emojis para hacer la lectura más amena.
3. Menciona documentos necesarios y plazos.

INFORMACIÓN DEL TRÁMITE:
- Descripción: ${tramite.descripcion}`;

    const fullPrompt = `${systemInstructions}\n\nPREGUNTA DEL USUARIO: ${message}\n\nRESPUESTA:`;

    console.log('\n📝 Prompt preparado (primeros 200 caracteres):');
    console.log(fullPrompt.substring(0, 200) + '...');

    try {
        console.log('\n🚀 Intentando generar contenido con gemini-1.5-flash...');

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        });

        console.log('✅ Modelo configurado');
        console.log('⏳ Llamando a generateContent...\n');

        const startTime = Date.now();
        const result = await model.generateContent(fullPrompt);
        const endTime = Date.now();

        console.log(`✅ Respuesta recibida en ${endTime - startTime}ms`);

        const response = result.response;
        const text = response.text();

        console.log('\n' + '═'.repeat(80));
        console.log('🎉 ¡ÉXITO! GEMINI RESPONDIÓ CORRECTAMENTE');
        console.log('═'.repeat(80));
        console.log('\n💬 Respuesta de Gemini:\n');
        console.log(text);
        console.log('\n' + '═'.repeat(80));
        console.log(`📏 Longitud: ${text.length} caracteres`);
        console.log('═'.repeat(80));

    } catch (error) {
        console.log('\n' + '═'.repeat(80));
        console.error('❌ ERROR AL LLAMAR A GEMINI');
        console.log('═'.repeat(80));
        console.error('\n📛 Detalles del error:');
        console.error('  • Tipo:', error.constructor.name);
        console.error('  • Mensaje:', error.message);

        if (error.response) {
            console.error('  • HTTP Status:', error.response.status);
            console.error('  • HTTP StatusText:', error.response.statusText);
        }

        if (error.code) {
            console.error('  • Código:', error.code);
        }

        console.error('\n📋 Stack trace (primeras 5 líneas):');
        const stackLines = error.stack.split('\n').slice(0, 5);
        stackLines.forEach(line => console.error('  ', line));

        console.log('\n' + '═'.repeat(80));
        console.log('🔍 DIAGNÓSTICO:');

        if (error.message.includes('API key')) {
            console.log('  ❌ Problema con la API key');
            console.log('  💡 Verifica que la key sea válida en https://aistudio.google.com/app/apikey');
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
            console.log('  ❌ Límite de uso alcanzado');
            console.log('  💡 Espera un momento o verifica tu cuota en Google AI Studio');
        } else if (error.message.includes('blocked') || error.message.includes('region')) {
            console.log('  ❌ Posible bloqueo regional');
            console.log('  💡 Asegúrate de que la VPN esté desactivada');
        } else if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
            console.log('  ❌ Problema de conexión de red');
            console.log('  💡 Verifica tu conexión a internet');
        } else {
            console.log('  ❓ Error desconocido');
            console.log('  💡 Revisa los detalles arriba');
        }
        console.log('═'.repeat(80));
    }
}

testAsServer();
