import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
    const logs = [];

    try {
        logs.push('🔍 Iniciando prueba de Gemini...');
        logs.push(`🔑 GEMINI_API_KEY presente: ${!!process.env.GEMINI_API_KEY}`);
        logs.push(`🔑 Primeros 20 caracteres: ${process.env.GEMINI_API_KEY?.substring(0, 20) || 'N/A'}`);

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({
                success: false,
                error: 'GEMINI_API_KEY no encontrada',
                logs
            });
        }

        logs.push('📡 Inicializando GoogleGenerativeAI...');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        logs.push('🤖 Configurando modelo gemini-1.5-flash...');
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 100,
            }
        });

        logs.push('⏳ Generando contenido...');
        const startTime = Date.now();

        const result = await model.generateContent("Di solo: 'Hola desde Gemini'");

        const endTime = Date.now();
        logs.push(`✅ Respuesta recibida en ${endTime - startTime}ms`);

        const response = result.response;
        const text = response.text();

        logs.push(`📝 Texto de respuesta: "${text}"`);

        return NextResponse.json({
            success: true,
            response: text,
            duration: endTime - startTime,
            logs
        });

    } catch (error) {
        logs.push(`❌ ERROR: ${error.message}`);
        logs.push(`📛 Tipo: ${error.constructor.name}`);

        if (error.stack) {
            logs.push(`📋 Stack: ${error.stack.split('\n').slice(0, 3).join(' | ')}`);
        }

        return NextResponse.json({
            success: false,
            error: error.message,
            errorType: error.constructor.name,
            logs
        }, { status: 500 });
    }
}
