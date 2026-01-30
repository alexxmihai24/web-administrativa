require('dotenv').config();
const OpenAI = require('openai');

async function testOpenAI() {
    console.log('🧪 PROBANDO OPENAI API\n');
    console.log('═'.repeat(80));

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error('❌ No se encontró OPENAI_API_KEY en .env.local');
        console.log('\n💡 Pasos para configurar:');
        console.log('  1. Ve a: https://platform.openai.com/api-keys');
        console.log('  2. Crea una nueva API key');
        console.log('  3. Cópiala en .env.local como OPENAI_API_KEY="sk-..."');
        console.log('  4. Reinicia el servidor\n');
        return;
    }

    if (apiKey === 'TU_API_KEY_DE_OPENAI_AQUI') {
        console.error('❌ Necesitas reemplazar el placeholder con tu API key real');
        console.log('\n💡 Pasos:');
        console.log('  1. Abre .env.local');
        console.log('  2. Reemplaza "TU_API_KEY_DE_OPENAI_AQUI" con tu key real');
        console.log('  3. Guarda el archivo\n');
        return;
    }

    console.log('✅ API Key encontrada:', apiKey.substring(0, 15) + '...' + apiKey.substring(apiKey.length - 5));
    console.log('\n📡 Inicializando OpenAI...\n');

    try {
        const openai = new OpenAI({ apiKey });

        console.log('⏳ Enviando mensaje de prueba a GPT-4o-mini...\n');

        const startTime = Date.now();

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "Eres un asistente útil y amigable."
                },
                {
                    role: "user",
                    content: "Di solo: 'Hola desde OpenAI ChatGPT'"
                }
            ],
            temperature: 0.7,
            max_tokens: 50,
        });

        const endTime = Date.now();
        const response = completion.choices[0].message.content;

        console.log('═'.repeat(80));
        console.log('✅ ¡ÉXITO! OPENAI FUNCIONA CORRECTAMENTE');
        console.log('═'.repeat(80));
        console.log('\n💬 Respuesta:', response);
        console.log('⏱️  Tiempo:', endTime - startTime, 'ms');
        console.log('🎯 Modelo:', completion.model);
        console.log('📊 Tokens usados:', completion.usage.total_tokens);
        console.log('\n' + '═'.repeat(80));
        console.log('🎉 El chatbot debería funcionar ahora!');
        console.log('═'.repeat(80));

    } catch (error) {
        console.log('═'.repeat(80));
        console.error('❌ ERROR AL CONECTAR CON OPENAI');
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

        if (error.message.includes('API key')) {
            console.log('  ❌ Problema con la API key');
            console.log('  💡 Verifica que sea válida en https://platform.openai.com/api-keys');
        } else if (error.message.includes('quota') || error.message.includes('insufficient')) {
            console.log('  ❌ Sin créditos disponibles');
            console.log('  💡 Añade un método de pago en https://platform.openai.com/account/billing');
        } else if (error.message.includes('rate limit')) {
            console.log('  ❌ Demasiadas peticiones');
            console.log('  💡 Espera un momento e intenta de nuevo');
        } else {
            console.log('  ❓ Error desconocido');
            console.log('  💡 Revisa los detalles arriba');
        }

        console.log('═'.repeat(80));
    }
}

testOpenAI();
