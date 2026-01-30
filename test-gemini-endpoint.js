// Test del endpoint de diagnóstico
async function testGeminiEndpoint() {
    console.log('🔬 Probando endpoint de diagnóstico /api/test-gemini\n');
    console.log('═'.repeat(80));

    try {
        console.log('📤 Enviando petición GET...\n');

        const response = await fetch('http://localhost:3000/api/test-gemini');

        console.log(`📡 Estado HTTP: ${response.status} ${response.statusText}\n`);

        const data = await response.json();

        console.log('═'.repeat(80));
        console.log('📋 LOGS DEL SERVIDOR:');
        console.log('═'.repeat(80));
        data.logs.forEach((log, index) => {
            console.log(`  ${index + 1}. ${log}`);
        });

        console.log('\n' + '═'.repeat(80));

        if (data.success) {
            console.log('✅ ¡ÉXITO! GEMINI FUNCIONA EN NEXT.JS');
            console.log('═'.repeat(80));
            console.log(`\n💬 Respuesta de Gemini: "${data.response}"`);
            console.log(`⏱️  Duración: ${data.duration}ms`);
        } else {
            console.log('❌ ERROR EN GEMINI');
            console.log('═'.repeat(80));
            console.log(`\n📛 Error: ${data.error}`);
            if (data.errorType) {
                console.log(`📛 Tipo: ${data.errorType}`);
            }
        }

        console.log('\n' + '═'.repeat(80));

    } catch (error) {
        console.error('\n❌ Error al llamar al endpoint:', error.message);
    }
}

testGeminiEndpoint();
