# 🚀 Resumen Rápido de Cambios - Para Frontend

## ⚡ **CAMBIOS CRÍTICOS QUE DEBES SABER**

### 1. 🔐 **LOGIN - CAMBIOS IMPORTANTES**

#### **Antes:**
```javascript
// Login simple
POST /api/v1/cliente/login
Response: { "code": "200-OK", "result": {...} }
```

#### **Ahora:**
```javascript
// Login con validaciones de seguridad
POST /api/v1/cliente/login

// Respuestas posibles:
✅ Login exitoso: { "code": "200-OK", "result": {...} }
❌ Cuenta bloqueada: { "message": "CUENTA_BLOQUEADA: ..." }
⚠️ Password incorrecto: { "message": "PASSWORD_INCORRECTO: Le quedan X intentos" }
```

**⚠️ ACCIÓN REQUERIDA:**
- Detectar mensajes con prefijos `CUENTA_BLOQUEADA` y `PASSWORD_INCORRECTO`
- Mostrar contador de intentos restantes
- Mostrar mensaje de contacto a soporte cuando esté bloqueado

---

### 2. 👤 **CREACIÓN DE USUARIOS - SIN CAMBIOS EN API**

```javascript
// Endpoints NO cambiaron
POST /api/v1/cliente
POST /api/v1/admin

// Pero ahora el backend inicializa automáticamente:
// - estadoCuenta = true
// - intentosFallidos = 0
```

**✅ NO REQUIERE CAMBIOS EN TU CÓDIGO**

---

### 3. 🔒 **NUEVO: SISTEMA DE BLOQUEO DE CUENTAS**

#### **Nuevos Endpoints:**

```javascript
// Ver estado de cuenta
GET /api/v1/bloqueo/cliente/{id}/info
GET /api/v1/bloqueo/admin/{id}/info

// Bloquear/Desbloquear
POST /api/v1/bloqueo/cliente/{id}/bloquear
POST /api/v1/bloqueo/cliente/{id}/desbloquear
```

**⚠️ USAR PARA:**
- Panel de administración de usuarios
- Mostrar estado de cuenta (activa/bloqueada)
- Bloqueo manual por administrador

---

### 4. 🔑 **CAMBIO DE CONTRASEÑA - NUEVAS VALIDACIONES**

```javascript
// Cambiar contraseña
PUT /api/v1/cliente/{id}/password
Body: { "password": "nuevaPassword" }

// Validaciones automáticas del backend:
✅ No puede ser igual a la actual
✅ No puede coincidir con últimas 5 contraseñas
```

**⚠️ MANEJAR ERRORES:**
```javascript
// Errores posibles:
- "La nueva contraseña ya fue usada anteriormente"
- "La nueva contraseña no puede ser igual a la actual"
```

---

### 5. 🎫 **NUEVO: SISTEMA DE PERMISOS**

```javascript
// Verificar si un admin tiene un permiso
GET /api/v1/gestion-permisos/admin/{adminId}/tiene-permiso/{permisoId}

// Obtener todos los permisos de un admin
GET /api/v1/gestion-permisos/admin/{adminId}/permisos-efectivos
```

**⚠️ USAR PARA:**
- Mostrar/ocultar botones según permisos
- Validar acciones antes de ejecutarlas

---

## 📋 **CHECKLIST DE IMPLEMENTACIÓN**

### **Prioridad ALTA (Crítico):**

- [ ] **Actualizar manejo de errores en login**
  - Detectar `CUENTA_BLOQUEADA`
  - Detectar `PASSWORD_INCORRECTO` y extraer intentos restantes
  - Mostrar mensajes apropiados

- [ ] **Agregar contador de intentos fallidos**
  - Mostrar "Le quedan X intentos" en login
  - Advertencia especial cuando quedan ≤ 2 intentos

- [ ] **Agregar mensaje de cuenta bloqueada**
  - Mostrar: "Cuenta bloqueada. Contacte a soporte@oasis.com"
  - Incluir botón/link para contactar soporte

---

### **Prioridad MEDIA (Importante):**

- [ ] **Implementar verificación de permisos**
  - Crear hook/función para verificar permisos
  - Ocultar botones/funciones según permisos del admin

- [ ] **Panel de gestión de usuarios**
  - Mostrar estado de cuenta (activa/bloqueada)
  - Botones para bloquear/desbloquear
  - Solo mostrar si admin tiene permisos

---

### **Prioridad BAJA (Opcional):**

- [ ] **Dashboard de seguridad**
  - Mostrar cuentas bloqueadas
  - Mostrar usuarios con intentos fallidos
  - Gráficos de actividad de login

- [ ] **Notificaciones**
  - Email cuando cuenta se bloquea
  - Alerta al admin cuando hay múltiples intentos fallidos

---

## 🎨 **CÓDIGO DE EJEMPLO - IMPLEMENTACIÓN RÁPIDA**

### **1. Login con Manejo de Errores:**

```javascript
async function login(email, password) {
  try {
    const response = await fetch('/api/v1/cliente/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      const msg = data.message || '';
      
      // Cuenta bloqueada
      if (msg.includes('CUENTA_BLOQUEADA')) {
        showError('🔒 Cuenta bloqueada. Contacte a soporte@oasis.com');
        return null;
      }
      
      // Password incorrecto
      if (msg.includes('PASSWORD_INCORRECTO')) {
        const match = msg.match(/Le quedan (\d+) intentos/);
        const remaining = match ? match[1] : 0;
        showError(`❌ Contraseña incorrecta. Le quedan ${remaining} intentos`);
        return null;
      }
      
      // Error genérico
      showError('❌ Credenciales incorrectas');
      return null;
    }
    
    // Login exitoso
    return data.result;
    
  } catch (error) {
    showError('❌ Error de conexión');
    return null;
  }
}
```

---

### **2. Verificar Permiso:**

```javascript
async function hasPermission(adminId, permisoId) {
  try {
    const response = await fetch(
      `/api/v1/gestion-permisos/admin/${adminId}/tiene-permiso/${permisoId}`
    );
    const data = await response.json();
    return data.result.tienePermiso;
  } catch {
    return false;
  }
}

// Uso:
if (await hasPermission(adminId, 1)) {
  // Mostrar botón "Editar Usuario"
}
```

---

### **3. Mostrar Estado de Cuenta:**

```javascript
async function getAccountStatus(userId) {
  const response = await fetch(`/api/v1/bloqueo/cliente/${userId}/info`);
  const data = await response.json();
  
  return {
    blocked: data.result.bloqueada,
    attempts: data.result.intentosFallidos,
    reason: data.result.motivoBloqueo
  };
}

// Uso en UI:
const status = await getAccountStatus(userId);
if (status.blocked) {
  showBadge('🔒 BLOQUEADA', 'danger');
} else if (status.attempts > 0) {
  showBadge(`⚠️ ${status.attempts} intentos fallidos`, 'warning');
} else {
  showBadge('✅ ACTIVA', 'success');
}
```

---

## 📊 **TABLA RÁPIDA DE URLS**

| Funcionalidad | Método | URL | Cambió? |
|--------------|--------|-----|---------|
| Login Cliente | POST | `/api/v1/cliente/login` | ⚠️ Respuestas |
| Login Admin | POST | `/api/v1/admin/login` | ⚠️ Respuestas |
| Crear Cliente | POST | `/api/v1/cliente` | ✅ No |
| Crear Admin | POST | `/api/v1/admin` | ✅ No |
| Cambiar Password | PUT | `/api/v1/{tipo}/{id}/password` | ⚠️ Validaciones |
| Info Bloqueo | GET | `/api/v1/bloqueo/{tipo}/{id}/info` | 🆕 Nuevo |
| Bloquear Cuenta | POST | `/api/v1/bloqueo/{tipo}/{id}/bloquear` | 🆕 Nuevo |
| Desbloquear | POST | `/api/v1/bloqueo/{tipo}/{id}/desbloquear` | 🆕 Nuevo |
| Verificar Permiso | GET | `/api/v1/gestion-permisos/admin/{id}/tiene-permiso/{pid}` | 🆕 Nuevo |

---

## 🔥 **LO MÁS IMPORTANTE - RESUMEN EN 3 PUNTOS**

### 1️⃣ **LOGIN AHORA TIENE 3 TIPOS DE RESPUESTA:**
```
✅ Exitoso
❌ Cuenta Bloqueada (contactar soporte)
⚠️ Password Incorrecto (X intentos restantes)
```

### 2️⃣ **DESPUÉS DE 5 INTENTOS FALLIDOS:**
```
La cuenta se bloquea automáticamente
Solo puede desbloquearse manualmente
```

### 3️⃣ **NUEVOS ENDPOINTS DE BLOQUEO:**
```
GET /info      → Ver estado
POST /bloquear → Bloquear
POST /desbloquear → Desbloquear
```

---

## 🆘 **SOPORTE**

**¿Dudas sobre la implementación?**
- Ver documentación completa: `DOCUMENTACION_FRONTEND_API.md`
- Ver ejemplos HTTP: carpeta `/http/`
- Contactar al equipo de backend

---

## ✅ **TESTING**

### **Probar Bloqueo Automático:**
1. Hacer 5 logins con contraseña incorrecta
2. Verificar que aparece mensaje "CUENTA_BLOQUEADA"
3. Verificar que no permite login aunque la contraseña sea correcta

### **Probar Desbloqueo:**
1. Llamar endpoint `/desbloquear`
2. Verificar que login funciona normalmente
3. Verificar que contador de intentos está en 0

---

**📅 Última actualización:** Octubre 2025  
**🔧 Versión del Backend:** 1.0.0  
**⚡ Base URL:** `http://localhost:9999/api/v1`

