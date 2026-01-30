// Script de prueba detallado para capturar la respuesta completa
async function testChatbotDetailed() {
    console.log('🧪 PRUEBA DETALLADA DEL CHATBOT\n');
    console.log('═'.repeat(80));

    try {
        console.log('📤 Enviando petición POST a /api/chat...');
        console.log('📍 URL: http://localhost:3000/api/chat');
        console.log('📦 Payload:', JSON.stringify({
            message: '¿Cómo puedo renovar mi pasaporte?',
            slug: 'consulados'
        }, null, 2));
        console.log('\n⏳ Esperando respuesta...\n');

        const startTime = Date.now();

        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: '¿Cómo puedo renovar mi pasaporte?',
                slug: 'consulados'
            }),
        });

        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log('═'.repeat(80));
        console.log('📡 RESPUESTA HTTP RECIBIDA');
        console.log('═'.repeat(80));
        console.log(`  ⏱️  Tiempo de respuesta: ${duration}ms`);
        console.log(`  📊 Estado: ${response.status} ${response.statusText}`);
        console.log(`  📋 Headers:`, Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            console.log('\n❌ ERROR: Respuesta no exitosa');
            const errorText = await response.text();
            console.log('  📄 Cuerpo de error:', errorText);
            return;
        }

        const data = await response.json();

        console.log('\n' + '═'.repeat(80));
        console.log('✅ RESPUESTA JSON PARSEADA');
        console.log('═'.repeat(80));

        // Mostrar la respuesta completa de la IA
        console.log('\n💬 RESPUESTA DE LA IA:');
        console.log('─'.repeat(80));
        console.log(data.response);
        console.log('─'.repeat(80));

        // Información adicional
        console.log('\n📊 METADATOS:');
        console.log(`  • Trámite: ${data.tramite}`);
        console.log(`  • ID de consulta: ${data.consultaId || 'N/A'}`);
        console.log(`  • RAG usado: ${data.ragInfo?.usedRAG ? 'Sí' : 'No'}`);
        console.log(`  • Consultas similares: ${data.ragInfo?.similarQueriesFound || 0}`);
        console.log(`  • Longitud de respuesta: ${data.response.length} caracteres`);

        // Verificar si es respuesta de contingencia
        if (data.response.includes('[MODO SIN CONEXIÓN]')) {
            console.log('\n⚠️  ADVERTENCIA: Se usó la respuesta de contingencia');
            console.log('    Esto significa que Gemini no respondió correctamente.');
        } else {
            console.log('\n🎉 ¡ÉXITO! Gemini respondió correctamente');
        }

        console.log('\n' + '═'.repeat(80));

    } catch (error) {
        console.log('\n' + '═'.repeat(80));
        console.error('❌ ERROR EN LA PRUEBA');
        console.log('═'.repeat(80));
        console.error('  Tipo:', error.constructor.name);
        console.error('  Mensaje:', error.message);
        console.error('  Stack:', error.stack);
    }
}

testChatbotDetailed();
