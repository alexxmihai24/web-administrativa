// Test del endpoint de diagnóstico con salida completa
async function testGeminiEndpoint() {
    console.log('🔬 Probando endpoint de diagnóstico /api/test-gemini\n');

    try {
        const response = await fetch('http://localhost:3000/api/test-gemini');
        const data = await response.json();

        // Mostrar TODO el objeto JSON
        console.log(JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testGeminiEndpoint();
