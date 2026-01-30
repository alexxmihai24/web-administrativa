require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiDirect() {
    console.log('🔍 Probando conexión directa con Gemini API...\n');
    console.log('═'.repeat(80));

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('❌ No se encontró GEMINI_API_KEY en .env');
        return;
    }

    console.log('✅ API Key encontrada:', apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 5));
    console.log('\n📡 Intentando generar contenido con Gemini...\n');

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        });

        const prompt = "Responde en una sola línea: ¿Cuál es la capital de España?";

        console.log('📝 Prompt de prueba:', prompt);
        console.log('\n⏳ Esperando respuesta...\n');

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        console.log('═'.repeat(80));
        console.log('✅ ¡ÉXITO! Gemini respondió correctamente:');
        console.log('═'.repeat(80));
        console.log('\n💬 Respuesta:', text);
        console.log('\n' + '═'.repeat(80));
        console.log('🎉 La API de Gemini está funcionando correctamente sin VPN!');
        console.log('═'.repeat(80));

    } catch (error) {
        console.log('═'.repeat(80));
        console.error('❌ ERROR AL CONECTAR CON GEMINI:');
        console.log('═'.repeat(80));
        console.error('\n📛 Tipo de error:', error.constructor.name);
        console.error('📛 Mensaje:', error.message);

        if (error.response) {
            console.error('📛 Respuesta HTTP:', error.response.status, error.response.statusText);
            console.error('📛 Datos:', error.response.data);
        }

        if (error.code) {
            console.error('📛 Código de error:', error.code);
        }

        console.error('\n📋 Stack completo:');
        console.error(error.stack);
        console.log('\n' + '═'.repeat(80));

        // Diagnóstico
        console.log('\n🔍 DIAGNÓSTICO:');
        if (error.message.includes('API key')) {
            console.log('  → Problema con la API key. Verifica que sea válida.');
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
            console.log('  → Has alcanzado el límite de uso de la API.');
        } else if (error.message.includes('blocked') || error.message.includes('region')) {
            console.log('  → Posible bloqueo regional. Verifica tu ubicación/VPN.');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            console.log('  → Problema de red. Verifica tu conexión a internet.');
        } else {
            console.log('  → Error desconocido. Revisa los detalles arriba.');
        }
        console.log('═'.repeat(80));
    }
}

testGeminiDirect();
