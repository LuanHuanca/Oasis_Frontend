# ✅ Verificar Conexión Frontend-Backend

## El Backend Está Funcionando ✅

El backend está funcionando correctamente:
- ✅ Endpoint de hoteles responde: https://oasisbackend-production-eb4d.up.railway.app/api/v1/hotel
- ✅ El health check muestra `DOWN` pero no es crítico si los endpoints funcionan

## Verificación desde el Frontend

### Paso 1: Verificar qué URL está usando el Frontend

1. Abre tu frontend en Railway: `https://oasisfrontend-production.up.railway.app/`
2. Abre la consola del navegador (F12)
3. Busca el log: `🔧 Configuración API:`

**¿Qué deberías ver?**
```javascript
🔧 Configuración API: {
  'VITE_API_URL (env)': 'https://oasisbackend-production-eb4d.up.railway.app',
  'API_BASE_URL (usado)': 'https://oasisbackend-production-eb4d.up.railway.app',
  'API_URL (completo)': 'https://oasisbackend-production-eb4d.up.railway.app/api/v1',
  ...
}
```

**Si ves `localhost:9999` o `undefined`**: El build no incluyó la variable → Necesitas hacer un nuevo build

### Paso 2: Probar Conexión desde la Consola del Navegador

Abre la consola (F12) en tu frontend y ejecuta:

```javascript
// Test 1: Verificar que el backend sea accesible desde el frontend
fetch('https://oasisbackend-production-eb4d.up.railway.app/api/v1/hotel', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
.then(response => {
  console.log('✅ Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('✅ Datos recibidos:', data);
  console.log('✅ Conexión exitosa! El backend es accesible desde el frontend');
})
.catch(error => {
  console.error('❌ Error:', error);
  if (error.message.includes('CORS')) {
    console.error('🚨 Problema de CORS - El backend no permite el origen del frontend');
    console.error('Origen del frontend:', window.location.origin);
  } else if (error.message.includes('Failed to fetch')) {
    console.error('🚨 Error de red - No se puede conectar al backend');
  }
});
```

### Paso 3: Verificar CORS

Si el test anterior falla con error de CORS, verifica:

1. **Backend debe permitir el origen del frontend:**
   - Origen del frontend: `https://oasisfrontend-production.up.railway.app`
   - El backend debe tener CORS configurado para permitir este origen

2. **Ya actualicé `CorsConfig.java`** para permitir cualquier origen (`*`)
   - **Necesitas hacer redeploy del backend** para aplicar los cambios

### Paso 4: Verificar en la Pestaña Network

1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Network**
3. Recarga la página
4. Busca peticiones a `/api/v1/hotel` o al backend
5. Haz clic en la petición y revisa:
   - **Request URL**: ¿Es la URL correcta de Railway?
   - **Status**: ¿200 OK o error?
   - **Response Headers**: ¿Tiene `Access-Control-Allow-Origin`?
   - **Error**: ¿Qué mensaje de error muestra?

## Soluciones Según el Problema

### Problema 1: Frontend usa `localhost:9999`

**Causa**: El build se hizo antes de configurar `VITE_API_URL`

**Solución**:
1. Railway Dashboard → Frontend → Settings → Variables
2. Verifica que `VITE_API_URL=https://oasisbackend-production-eb4d.up.railway.app`
3. **Haz un nuevo build/redeploy** del frontend

### Problema 2: Error de CORS

**Causa**: El backend no permite el origen del frontend

**Solución**:
1. Ya actualicé `CorsConfig.java` para permitir cualquier origen
2. **Haz redeploy del backend** en Railway
3. Verifica que los endpoints tengan `@CrossOrigin(origins = "*")`

### Problema 3: Network Error (sin CORS)

**Causa**: El backend no es accesible o hay problema de red

**Solución**:
1. Verifica que el backend esté en estado "Active" en Railway
2. Prueba acceder directamente desde tu navegador: `https://oasisbackend-production-eb4d.up.railway.app/api/v1/hotel`
3. Si funciona desde el navegador pero no desde el frontend → Es problema de CORS

## Prueba Rápida Completa

Copia y pega esto en la consola del navegador en tu frontend:

```javascript
(async () => {
  console.log('🧪 Iniciando pruebas de conexión...\n');
  
  // Test 1: URL configurada
  const apiUrl = window.location.origin.includes('railway') 
    ? 'https://oasisbackend-production-eb4d.up.railway.app/api/v1' 
    : 'http://localhost:9999/api/v1';
  
  console.log('📍 URL que se debería usar:', apiUrl);
  
  // Test 2: Conexión básica
  try {
    const response = await fetch(`${apiUrl.replace('/api/v1', '')}/api/v1/hotel`);
    const data = await response.json();
    console.log('✅ Test 1 - Conexión exitosa:', response.status);
    console.log('✅ Datos recibidos:', data.result?.length || 0, 'hoteles');
  } catch (error) {
    console.error('❌ Test 1 - Error:', error.message);
    if (error.message.includes('CORS')) {
      console.error('   → Problema de CORS');
    } else if (error.message.includes('Failed to fetch')) {
      console.error('   → Problema de red');
    }
  }
  
  // Test 3: Verificar headers CORS
  try {
    const response = await fetch(`${apiUrl.replace('/api/v1', '')}/api/v1/hotel`, {
      method: 'OPTIONS'
    });
    console.log('✅ Test 2 - CORS preflight:', response.status);
    const corsHeader = response.headers.get('Access-Control-Allow-Origin');
    console.log('   → Access-Control-Allow-Origin:', corsHeader || 'NO ENCONTRADO');
  } catch (error) {
    console.error('❌ Test 2 - Error CORS:', error.message);
  }
  
  console.log('\n✨ Pruebas completadas');
})();
```

---

**Si después de estos tests sigue sin funcionar**, comparte:
1. Los resultados de los tests de la consola
2. Qué ves en la pestaña Network cuando falla
3. Los logs del frontend (consola del navegador)
4. Si hiciste redeploy después de los cambios

