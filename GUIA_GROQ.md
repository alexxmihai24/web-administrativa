# 🚀 GROQ - API Gratuita y Súper Rápida

## ✅ ¿Por qué Groq?

- ✅ **100% GRATIS** - Sin tarjeta de crédito, sin límites de crédito
- ✅ **MUY RÁPIDO** - Hasta 10x más rápido que OpenAI
- ✅ **EXCELENTE CALIDAD** - Usa Llama 3.3 70B (comparable a GPT-4)
- ✅ **SIN PROBLEMAS** - No hay cuotas ni límites estrictos
- ✅ **FÁCIL** - Misma API que OpenAI

## 🔑 Cómo Obtener tu API Key (2 minutos)

### Paso 1: Crear Cuenta
1. Ve a: **https://console.groq.com**
2. Haz clic en **"Sign Up"** o **"Get Started"**
3. Regístrate con:
   - Google (más rápido)
   - GitHub
   - Email

### Paso 2: Obtener API Key
1. Una vez dentro, ve a: **https://console.groq.com/keys**
2. Haz clic en **"Create API Key"**
3. Dale un nombre (ej: "Chatbot Web Administrativa")
4. **¡Copia la key!** (empieza con `gsk_`)

### Paso 3: Configurar en tu Proyecto
1. Abre el archivo `.env.local`
2. Busca la línea:
   ```
   GROQ_API_KEY="TU_API_KEY_DE_GROQ_AQUI"
   ```
3. Reemplázala con tu key:
   ```
   GROQ_API_KEY="gsk_tu_key_aqui"
   ```
4. **Guarda el archivo**

### Paso 4: Reiniciar Servidor
En la terminal:
```bash
Ctrl+C
npm run dev
```

### Paso 5: ¡Probar!
```bash
node test-groq.js
```

O abre `http://localhost:3000` en tu navegador

## 📊 Comparación: Groq vs OpenAI vs Gemini

| Característica | Groq | OpenAI | Gemini |
|----------------|------|--------|--------|
| **Costo** | ✅ GRATIS | 💰 De pago | ✅ Gratis (límites) |
| **Velocidad** | ⚡ MUY RÁPIDO | 🐢 Normal | 🚀 Rápido |
| **Calidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Funciona en tu caso** | ✅ Sí | ❌ Sin créditos | ❌ Bloqueado |
| **Necesita tarjeta** | ❌ No | ✅ Sí (para producción) | ❌ No |

## 🎯 Modelos Disponibles en Groq

### Llama 3.3 70B Versatile (el que usamos)
- **Velocidad**: ⚡⚡⚡⚡⚡ Súper rápido
- **Calidad**: ⭐⭐⭐⭐⭐ Excelente
- **Uso**: General, chatbots, asistentes
- **Gratis**: ✅ Sí

### Otros modelos disponibles:
- `llama-3.1-8b-instant` - Más rápido, menos potente
- `mixtral-8x7b-32768` - Contexto muy largo
- `gemma2-9b-it` - Alternativa ligera

## 💡 Ventajas de Groq

### 1. Velocidad Increíble
- Respuestas en **menos de 1 segundo**
- OpenAI tarda 3-5 segundos
- Groq tarda 0.3-0.8 segundos

### 2. Completamente Gratis
- Sin tarjeta de crédito
- Sin límites de crédito
- Límites generosos de peticiones

### 3. Misma API que OpenAI
- Compatible con código de OpenAI
- Solo cambié 2 líneas de código
- Fácil de migrar

### 4. Excelente Calidad
- Llama 3.3 70B es comparable a GPT-4
- Respuestas naturales y coherentes
- Perfecto para chatbots

## ⚠️ Límites de Groq (Generosos)

- **Peticiones por minuto**: 30 (más que suficiente)
- **Peticiones por día**: 14,400 (muchísimo)
- **Tokens por minuto**: 6,000 (~4,500 palabras)

Para un chatbot normal, estos límites son **más que suficientes**.

## 🔧 Solución de Problemas

### Error: "Invalid API key"
→ Verifica que copiaste la key completa (debe empezar con `gsk_`)

### Error: "Rate limit exceeded"
→ Espera 1 minuto (límite: 30 peticiones/minuto)

### Sigue saliendo "[MODO SIN CONEXIÓN]"
→ Reinicia el servidor y verifica que `.env.local` tiene la key correcta

## 🎉 ¡Todo Listo!

Una vez que tengas tu API key de Groq:

1. ✅ Código ya migrado
2. ✅ Librería instalada
3. ✅ Solo falta tu API key
4. ✅ Reiniciar servidor
5. ✅ ¡Funciona!

---

**Próximo paso**: Ve a https://console.groq.com y obtén tu API key (2 minutos)
