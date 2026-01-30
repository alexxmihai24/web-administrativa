# 🔄 Migración de Gemini a OpenAI (ChatGPT)

## ✅ Cambios Realizados

He migrado el chatbot de **Google Gemini** a **OpenAI ChatGPT** para resolver el problema de conexión.

### Archivos Modificados:
1. ✅ `app/api/chat/route.js` - Ahora usa OpenAI en lugar de Gemini
2. ✅ `package.json` - Añadida dependencia `openai`
3. ✅ `.env.local` - Añadido placeholder para `OPENAI_API_KEY`

### Modelo Usado:
- **GPT-4o-mini** - Rápido, económico y muy capaz para este uso

## 🔑 Cómo Obtener tu API Key de OpenAI

### Paso 1: Crear Cuenta en OpenAI

1. Ve a: **https://platform.openai.com/signup**
2. Regístrate con tu email o cuenta de Google/Microsoft
3. Verifica tu email si es necesario

### Paso 2: Obtener la API Key

1. Inicia sesión en: **https://platform.openai.com**
2. Haz clic en tu perfil (esquina superior derecha)
3. Selecciona **"API keys"** o ve directamente a: **https://platform.openai.com/api-keys**
4. Haz clic en **"Create new secret key"**
5. Dale un nombre (ej: "Chatbot Web Administrativa")
6. **¡IMPORTANTE!** Copia la key inmediatamente (solo se muestra una vez)
   - Formato: `sk-proj-...` (empieza con `sk-`)

### Paso 3: Configurar la API Key

1. Abre el archivo `.env.local` en tu proyecto
2. Reemplaza `TU_API_KEY_DE_OPENAI_AQUI` con tu API key real:
   ```
   OPENAI_API_KEY="sk-proj-tu-key-aqui"
   ```
3. Guarda el archivo

### Paso 4: Reiniciar el Servidor

1. Detén el servidor (Ctrl+C en la terminal)
2. Vuelve a ejecutar: `npm run dev`
3. Espera a que diga "✓ Ready in..."

### Paso 5: Probar el Chatbot

1. Abre tu navegador en `http://localhost:3000`
2. Ve a una página de trámite
3. Envía un mensaje al chatbot
4. ¡Debería funcionar! 🎉

## 💰 Costos de OpenAI

### Créditos Gratuitos:
- OpenAI ofrece **$5 USD en créditos gratuitos** para nuevas cuentas
- Esto es suficiente para miles de mensajes de prueba

### Modelo GPT-4o-mini (el que estamos usando):
- **Entrada**: $0.150 por 1M tokens (~750,000 palabras)
- **Salida**: $0.600 por 1M tokens (~750,000 palabras)
- **Ejemplo**: 1000 conversaciones de chatbot ≈ $0.50 USD

### Comparación con Gemini:
- Gemini tiene límite de peticiones gratuitas por minuto
- OpenAI es de pago pero muy económico
- GPT-4o-mini es más barato que GPT-3.5-turbo

## 🔍 Verificar que Funciona

### Opción A: Probar en el Navegador
1. Servidor corriendo en `http://localhost:3000`
2. Abre el chatbot
3. Envía: "Hola, ¿cómo estás?"
4. Debería responder sin "[MODO SIN CONEXIÓN]"

### Opción B: Script de Prueba
Ejecuta en la terminal:
```bash
node test-openai.js
```

## ⚠️ Solución de Problemas

### Error: "Incorrect API key provided"
- ✅ Verifica que copiaste la key completa (empieza con `sk-`)
- ✅ No debe tener espacios al inicio o final
- ✅ Debe estar entre comillas en `.env.local`

### Error: "You exceeded your current quota"
- ✅ Has agotado tus créditos gratuitos
- ✅ Necesitas añadir un método de pago en OpenAI
- ✅ O esperar al siguiente mes

### Sigue saliendo "[MODO SIN CONEXIÓN]"
- ✅ Reinicia el servidor (Ctrl+C y `npm run dev`)
- ✅ Verifica que `.env.local` tiene la key correcta
- ✅ Comprueba que no hay errores en la consola del servidor

## 🔄 Volver a Gemini (si quieres)

Si consigues que Gemini funcione más adelante, puedes volver a cambiarlo:

1. Desinstalar OpenAI: `npm uninstall openai`
2. Restaurar el código original de `app/api/chat/route.js`
3. Usar `GEMINI_API_KEY` en lugar de `OPENAI_API_KEY`

## 📊 Ventajas de OpenAI vs Gemini

### OpenAI (ChatGPT):
- ✅ Más estable en España
- ✅ Mejor documentación
- ✅ Respuestas más naturales
- ✅ Funciona bien con Next.js
- ❌ De pago (pero muy barato)

### Gemini:
- ✅ Gratuito (con límites)
- ✅ Muy rápido
- ❌ Problemas de conexión en tu caso
- ❌ Límites de peticiones por minuto

## 🎯 Próximos Pasos

1. **Obtén tu API key de OpenAI** (5 minutos)
2. **Configúrala en `.env.local`**
3. **Reinicia el servidor**
4. **Prueba el chatbot**
5. **¡Disfruta!** 🎉

---

**Última actualización**: 2026-01-30 17:25 CET
**Estado**: Código migrado - Esperando API key de OpenAI
