require('dotenv').config();
const Groq = require('groq-sdk').default;

async function testGroq() {
    console.log('🧪 PROBANDO GROQ API (GRATIS)\n');
    console.log('═'.repeat(80));

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        console.error('❌ No se encontró GROQ_API_KEY en .env.local');
        console.log('\n💡 Pasos para configurar:');
        console.log('  1. Ve a: https://console.groq.com/keys');
        console.log('  2. Crea una nueva API key (GRATIS, sin tarjeta)');
        console.log('  3. Cópiala en .env.local como GROQ_API_KEY="gsk_..."');
        console.log('  4. Reinicia el servidor\n');
        return;
    }

    if (apiKey === 'TU_API_KEY_DE_GROQ_AQUI') {
        console.error('❌ Necesitas reemplazar el placeholder con tu API key real');
        console.log('\n💡 Pasos:');
        console.log('  1. Abre .env.local');
        console.log('  2. Reemplaza "TU_API_KEY_DE_GROQ_AQUI" con tu key real');
        console.log('  3. Guarda el archivo\n');
        return;
    }

    console.log('✅ API Key encontrada:', apiKey.substring(0, 15) + '...' + apiKey.substring(apiKey.length - 5));
    console.log('\n📡 Inicializando Groq...\n');

    try {
        const groq = new Groq({ apiKey });

        console.log('⏳ Enviando mensaje de prueba a Llama 3.3 70B...\n');

        const startTime = Date.now();

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "Eres un asistente útil y amigable."
                },
                {
                    role: "user",
                    content: "Di solo: 'Hola desde Groq con Llama 3.3'"
                }
            ],
            temperature: 0.7,
            max_tokens: 50,
        });

        const endTime = Date.now();
        const response = completion.choices[0].message.content;

        console.log('═'.repeat(80));
        console.log('✅ ¡ÉXITO! GROQ FUNCIONA CORRECTAMENTE');
        console.log('═'.repeat(80));
        console.log('\n💬 Respuesta:', response);
        console.log('⏱️  Tiempo:', endTime - startTime, 'ms', '← ¡MUY RÁPIDO!');
        console.log('🎯 Modelo:', completion.model);
        console.log('📊 Tokens usados:', completion.usage.total_tokens);
        console.log('\n' + '═'.repeat(80));
        console.log('🎉 El chatbot debería funcionar ahora!');
        console.log('💰 Y es COMPLETAMENTE GRATIS!');
        console.log('═'.repeat(80));

    } catch (error) {
        console.log('═'.repeat(80));
        console.error('❌ ERROR AL CONECTAR CON GROQ');
        console.log('═'.repeat(80));
        console.error('\n📛 Mensaje:', error.message);
        console.error('📛 Tipo:', error.constructor.name);

        if (error.code) {
            console.error('📛 Código:', error.code);
        }

        if (error.status) {
            console.error('📛 HTTP Status:', error.status);
        }

        console.log('\n🔍 DIAGNÓSTICO:');

        if (error.message.includes('API key') || error.message.includes('401')) {
            console.log('  ❌ Problema con la API key');
            console.log('  💡 Verifica que sea válida en https://console.groq.com/keys');
        } else if (error.message.includes('rate limit') || error.message.includes('429')) {
            console.log('  ❌ Demasiadas peticiones');
            console.log('  💡 Espera 1 minuto (límite: 30 peticiones/minuto)');
        } else {
            console.log('  ❓ Error desconocido');
            console.log('  💡 Revisa los detalles arriba');
        }

        console.log('═'.repeat(80));
    }
}

testGroq();
