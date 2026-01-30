# ✅ CHECKLIST: Activar Chatbot con Groq (GRATIS)

## 🎯 Pasos Rápidos (2 minutos)

### ☐ Paso 1: Crear Cuenta en Groq (30 segundos)
- [ ] Ir a: **https://console.groq.com**
- [ ] Hacer clic en "Sign Up" o "Get Started"
- [ ] Registrarse con Google (más rápido) o email
- [ ] **¡No necesitas tarjeta de crédito!** ✅

### ☐ Paso 2: Obtener API Key (30 segundos)
- [ ] Una vez dentro, ir a: **https://console.groq.com/keys**
- [ ] Hacer clic en "Create API Key"
- [ ] Darle un nombre (ej: "Chatbot Web")
- [ ] Copiar la key (empieza con `gsk_`)

### ☐ Paso 3: Configurar la API Key (30 segundos)
- [ ] Abrir el archivo `.env.local` en tu proyecto
- [ ] Buscar la línea: `GROQ_API_KEY="TU_API_KEY_DE_GROQ_AQUI"`
- [ ] Reemplazar con tu key real: `GROQ_API_KEY="gsk_..."`
- [ ] Guardar el archivo

### ☐ Paso 4: Reiniciar el Servidor (10 segundos)
- [ ] En la terminal, presionar `Ctrl+C`
- [ ] Ejecutar: `npm run dev`
- [ ] Esperar a ver: `✓ Ready in...`

### ☐ Paso 5: Probar el Chatbot (30 segundos)
**Opción A - Script de prueba:**
- [ ] Ejecutar: `node test-groq.js`
- [ ] Verificar que dice: "✅ ¡ÉXITO! GROQ FUNCIONA CORRECTAMENTE"

**Opción B - En el navegador:**
- [ ] Abrir: http://localhost:3000
- [ ] Ir a una página de trámite
- [ ] Enviar un mensaje al chatbot
- [ ] Verificar que NO dice "[MODO SIN CONEXIÓN]"

### ☐ Paso 6: ¡Listo! 🎉
- [ ] El chatbot funciona correctamente
- [ ] Las respuestas son rápidas (< 1 segundo)
- [ ] Es completamente GRATIS
- [ ] No hay errores en la consola

## 🎯 Resultado Esperado

✅ Chatbot responde normalmente
✅ Sin mensaje "[MODO SIN CONEXIÓN]"
✅ Respuestas de Llama 3.3 70B (muy buena calidad)
✅ MUY RÁPIDO (< 1 segundo)
✅ 100% GRATIS (sin tarjeta)
✅ Funciona en tu navegador

## 💰 Costos

- **Groq**: $0.00 - COMPLETAMENTE GRATIS ✅
- **OpenAI**: $0.50 por 1000 conversaciones
- **Diferencia**: ¡Ahorras dinero!

## ⚡ Velocidad

- **Groq**: ~0.5 segundos por respuesta
- **OpenAI**: ~3 segundos por respuesta
- **Diferencia**: ¡6x más rápido!

## ⚠️ Si Algo Falla

### Error: "Invalid API key"
→ Verifica que copiaste la key completa (debe empezar con `gsk_`)

### Error: "Rate limit exceeded"
→ Espera 1 minuto (límite: 30 peticiones/minuto, muy generoso)

### Sigue saliendo "[MODO SIN CONEXIÓN]"
→ Reinicia el servidor y ejecuta `node test-groq.js`

## 📚 Documentos de Ayuda

- `GUIA_GROQ.md` - Guía completa
- `test-groq.js` - Script de prueba
- `resumen-groq.js` - Resumen visual

## 🔗 Enlaces Importantes

- **Crear cuenta**: https://console.groq.com
- **Obtener API key**: https://console.groq.com/keys
- **Documentación**: https://console.groq.com/docs

---

**Tiempo total**: ~2 minutos
**Costo**: $0.00 (GRATIS)
**Dificultad**: ⭐ Muy fácil

**¡Mucha suerte! 🚀**
