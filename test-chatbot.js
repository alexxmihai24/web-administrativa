// Script de prueba para el chatbot con más detalles
async function testChatbot() {
    console.log('🧪 Probando el chatbot...\n');
    console.log('═'.repeat(80));

    try {
        console.log('📤 Enviando mensaje: "¿Cómo puedo renovar mi pasaporte?"');
        console.log('📍 Slug: consulados\n');

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

        console.log('📡 Estado HTTP:', response.status, response.statusText);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('\n❌ ERROR EN LA RESPUESTA:');
            console.error(JSON.stringify(errorData, null, 2));
            return;
        }

        const data = await response.json();

        console.log('\n✅ ¡CHATBOT FUNCIONANDO CORRECTAMENTE!');
        console.log('═'.repeat(80));
        console.log('\n💬 RESPUESTA DE LA IA:\n');
        console.log(data.response);
        console.log('\n' + '═'.repeat(80));
        console.log('\n📊 INFORMACIÓN ADICIONAL:');
        console.log('  • Trámite:', data.tramite);
        console.log('  • ID de consulta:', data.consultaId || 'N/A (sin BD)');
        console.log('  • RAG usado:', data.ragInfo?.usedRAG ? 'Sí' : 'No');
        console.log('  • Consultas similares:', data.ragInfo?.similarQueriesFound || 0);
        console.log('\n' + '═'.repeat(80));
        console.log('\n🎉 ¡La API de Gemini está funcionando sin la VPN!');

    } catch (error) {
        console.error('\n❌ ERROR AL PROBAR EL CHATBOT:');
        console.error('  Mensaje:', error.message);
        console.error('  Stack:', error.stack);
    }
}

testChatbot();
