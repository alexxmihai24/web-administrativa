# ✅ CHECKLIST: Activar el Chatbot con OpenAI

## 📋 Pasos Rápidos (10 minutos)

### ☐ Paso 1: Obtener API Key de OpenAI
- [ ] Ir a: https://platform.openai.com/signup
- [ ] Crear cuenta o iniciar sesión
- [ ] Ir a: https://platform.openai.com/api-keys
- [ ] Hacer clic en "Create new secret key"
- [ ] Copiar la key (empieza con `sk-proj-` o `sk-`)

### ☐ Paso 2: Configurar la API Key
- [ ] Abrir el archivo `.env.local` en tu proyecto
- [ ] Buscar la línea: `OPENAI_API_KEY="TU_API_KEY_DE_OPENAI_AQUI"`
- [ ] Reemplazar con tu key real: `OPENAI_API_KEY="sk-proj-..."`
- [ ] Guardar el archivo

### ☐ Paso 3: Reiniciar el Servidor
- [ ] En la terminal, presionar `Ctrl+C`
- [ ] Ejecutar: `npm run dev`
- [ ] Esperar a ver: `✓ Ready in...`

### ☐ Paso 4: Probar el Chatbot
**Opción A - Script de prueba:**
- [ ] Ejecutar: `node test-openai.js`
- [ ] Verificar que dice: "✅ ¡ÉXITO! OPENAI FUNCIONA CORRECTAMENTE"

**Opción B - En el navegador:**
- [ ] Abrir: http://localhost:3000
- [ ] Ir a una página de trámite
- [ ] Enviar un mensaje al chatbot
- [ ] Verificar que NO dice "[MODO SIN CONEXIÓN]"

### ☐ Paso 5: ¡Listo!
- [ ] El chatbot funciona correctamente
- [ ] Las respuestas son rápidas y naturales
- [ ] No hay errores en la consola

## 🎯 Resultado Esperado

✅ Chatbot responde normalmente
✅ Sin mensaje "[MODO SIN CONEXIÓN]"
✅ Respuestas de ChatGPT (GPT-4o-mini)
✅ Funciona en tu navegador
✅ No más problemas de conexión

## ⚠️ Si Algo Falla

### Error: "Incorrect API key provided"
→ Verifica que copiaste la key completa (debe empezar con `sk-`)

### Error: "You exceeded your current quota"
→ Necesitas añadir método de pago o crear otra cuenta

### Sigue saliendo "[MODO SIN CONEXIÓN]"
→ Reinicia el servidor y ejecuta `node test-openai.js`

## 📚 Documentos de Ayuda

- `RESUMEN_SOLUCION.md` - Guía completa
- `MIGRACION_OPENAI.md` - Detalles técnicos
- `test-openai.js` - Script de prueba

---

**¡Mucha suerte! 🚀**
