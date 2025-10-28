# 📘 Documentación de API - Sistema Oasis Backend

## 🎯 Cambios Implementados para Frontend

Este documento detalla todos los cambios en las APIs y nuevos endpoints disponibles para el frontend.

---

## 📋 **ÍNDICE**

1. [Sistema de Autenticación (Login)](#1-sistema-de-autenticación-login)
2. [Creación de Usuarios](#2-creación-de-usuarios)
3. [Sistema de Bloqueo de Cuentas](#3-sistema-de-bloqueo-de-cuentas)
4. [Cambio de Contraseñas](#4-cambio-de-contraseñas)
5. [Sistema de Permisos](#5-sistema-de-permisos)
6. [Manejo de Errores](#6-manejo-de-errores)
7. [Ejemplos de Integración](#7-ejemplos-de-integración)

---

# 1. Sistema de Autenticación (Login)

## 🔄 **CAMBIOS PRINCIPALES:**

### ✅ **Verificación de Estado de Cuenta**
El login ahora verifica si la cuenta está bloqueada ANTES de validar la contraseña.

### ✅ **Contador de Intentos Fallidos**
El sistema registra intentos fallidos y bloquea automáticamente después de 5 intentos.

### ✅ **Mensajes Específicos**
Los mensajes de error ahora incluyen prefijos para identificar el tipo de error.

---

## 📍 **ENDPOINTS DE LOGIN**

### **1.1. Login de Cliente**

```http
POST /api/v1/cliente/login
Content-Type: application/json

{
  "correo": "cliente@ejemplo.com",
  "password": "miPassword123"
}
```

**Respuestas Posibles:**

#### ✅ **Login Exitoso (200 OK)**
```json
{
  "code": "200-OK",
  "result": {
    "idCliente": 1,
    "correo": "cliente@ejemplo.com",
    "estadoCuenta": true,
    "idPersona": 5
  }
}
```

#### ❌ **Cuenta Bloqueada (400 Bad Request)**
```json
{
  "code": "LOGIN-500",
  "message": "CUENTA_BLOQUEADA: Su cuenta ha sido bloqueada. Por favor, contacte a soporte o envíe un correo a soporte@oasis.com para su desbloqueo. Motivo: Bloqueado automáticamente por 5 intentos fallidos",
  "result": null
}
```

#### ❌ **Contraseña Incorrecta (400 Bad Request)**
```json
{
  "code": "LOGIN-500",
  "message": "PASSWORD_INCORRECTO: Contraseña incorrecta. Le quedan 3 intentos.",
  "result": null
}
```

#### ❌ **Correo No Encontrado (400 Bad Request)**
```json
{
  "code": "LOGIN-500",
  "message": "Correo o contraseña incorrectos",
  "result": null
}
```

---

### **1.2. Login de Administrador**

```http
POST /api/v1/admin/login
Content-Type: application/json

{
  "correo": "admin@ejemplo.com",
  "password": "adminPassword123"
}
```

**Respuestas:** Idénticas al login de cliente, pero con campos de admin.

---

## 🎨 **RECOMENDACIONES PARA FRONTEND:**

### **Detectar Tipo de Error:**

```javascript
async function handleLogin(correo, password) {
  try {
    const response = await fetch('/api/v1/cliente/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      const message = data.message || '';
      
      // Detectar tipo de error por prefijo
      if (message.includes('CUENTA_BLOQUEADA')) {
        // Mostrar mensaje de cuenta bloqueada
        showBlockedAccountMessage();
      } else if (message.includes('PASSWORD_INCORRECTO')) {
        // Extraer intentos restantes
        const match = message.match(/Le quedan (\d+) intentos/);
        const remaining = match ? parseInt(match[1]) : 0;
        showPasswordError(remaining);
      } else {
        // Error genérico
        showGenericError(message);
      }
      return null;
    }
    
    // Login exitoso
    return data.result;
    
  } catch (error) {
    console.error('Error en login:', error);
    return null;
  }
}
```

### **Mostrar Contador de Intentos:**

```javascript
function showPasswordError(remainingAttempts) {
  if (remainingAttempts <= 0) {
    alert('Su cuenta ha sido bloqueada por seguridad. Contacte a soporte.');
  } else if (remainingAttempts <= 2) {
    alert(`⚠️ ADVERTENCIA: Contraseña incorrecta. Le quedan ${remainingAttempts} intentos antes del bloqueo.`);
  } else {
    alert(`Contraseña incorrecta. Le quedan ${remainingAttempts} intentos.`);
  }
}
```

---

# 2. Creación de Usuarios

## 📍 **ENDPOINTS DE CREACIÓN**

### **2.1. Crear Cliente**

```http
POST /api/v1/cliente
Content-Type: application/json

{
  "correo": "nuevocliente@ejemplo.com",
  "password": "Password123",
  "idPersona": 10
}
```

**Cambios:**
- ✅ El backend ahora inicializa automáticamente:
  - `estadoCuenta = true` (cuenta activa)
  - `intentosFallidos = 0`
  - `fechaBloqueo = null`
  - `motivoBloqueo = null`

**Respuesta Exitosa:**
```json
{
  "code": "200-OK",
  "result": {
    "idCliente": 15,
    "correo": "nuevocliente@ejemplo.com",
    "estadoCuenta": true,
    "intentosFallidos": 0,
    "idPersona": 10
  }
}
```

---

### **2.2. Crear Administrador**

```http
POST /api/v1/admin
Content-Type: application/json

{
  "correo": "nuevoadmin@ejemplo.com",
  "password": "AdminPass123",
  "idPersona": 12,
  "rol": {
    "idRol": 1
  }
}
```

**Cambios:**
- ✅ El backend ahora inicializa automáticamente:
  - `estadoCuenta = true`
  - `intentosFallidos = 0`
  - `fechaBloqueo = null`
  - `motivoBloqueo = null`
- ✅ Se asignan permisos predeterminados según el rol

**Respuesta Exitosa:**
```json
{
  "code": "200-OK",
  "result": {
    "idAdmin": 8,
    "correo": "nuevoadmin@ejemplo.com",
    "estadoCuenta": true,
    "intentosFallidos": 0,
    "idPersona": 12,
    "rol": {
      "idRol": 1,
      "rol": "Gerente"
    }
  }
}
```

---

# 3. Sistema de Bloqueo de Cuentas

## 🆕 **NUEVOS ENDPOINTS**

### **3.1. Obtener Información de Bloqueo - Cliente**

```http
GET /api/v1/bloqueo/cliente/{id}/info
```

**Respuesta:**
```json
{
  "code": "200-OK",
  "result": {
    "clienteId": 1,
    "activa": true,
    "bloqueada": false,
    "intentosFallidos": 2,
    "fechaBloqueo": "null",
    "motivoBloqueo": "N/A"
  }
}
```

**Uso en Frontend:**
```javascript
async function checkAccountStatus(clienteId) {
  const response = await fetch(`/api/v1/bloqueo/cliente/${clienteId}/info`);
  const data = await response.json();
  
  if (data.result.bloqueada) {
    console.log('Cuenta bloqueada:', data.result.motivoBloqueo);
    return false;
  }
  
  if (data.result.intentosFallidos > 0) {
    console.log(`Advertencia: ${data.result.intentosFallidos} intentos fallidos`);
  }
  
  return true;
}
```

---

### **3.2. Bloquear Cuenta Manualmente - Cliente**

```http
POST /api/v1/bloqueo/cliente/{id}/bloquear
Content-Type: application/json

{
  "motivo": "Actividad sospechosa detectada"
}
```

**Respuesta:**
```json
{
  "code": "200-OK",
  "result": {
    "clienteId": 1,
    "motivo": "Actividad sospechosa detectada",
    "bloqueado": true
  }
}
```

---

### **3.3. Desbloquear Cuenta - Cliente**

```http
POST /api/v1/bloqueo/cliente/{id}/desbloquear
```

**Respuesta:**
```json
{
  "code": "200-OK",
  "result": {
    "clienteId": 1,
    "bloqueado": false,
    "intentosFallidos": 0
  }
}
```

---

### **3.4. Endpoints Equivalentes para Administradores**

```http
GET /api/v1/bloqueo/admin/{id}/info
POST /api/v1/bloqueo/admin/{id}/bloquear
POST /api/v1/bloqueo/admin/{id}/desbloquear
```

**Comportamiento idéntico a los de cliente.**

---

## 🎨 **COMPONENTE DE EJEMPLO - ESTADO DE CUENTA**

```javascript
// Componente React para mostrar estado de cuenta
function AccountStatusBadge({ userId, userType = 'cliente' }) {
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    fetchAccountStatus();
  }, [userId]);
  
  async function fetchAccountStatus() {
    const response = await fetch(`/api/v1/bloqueo/${userType}/${userId}/info`);
    const data = await response.json();
    setStatus(data.result);
  }
  
  if (!status) return <div>Cargando...</div>;
  
  return (
    <div className={`badge ${status.bloqueada ? 'badge-danger' : 'badge-success'}`}>
      {status.bloqueada ? (
        <>
          <span>🔒 BLOQUEADA</span>
          <small>{status.motivoBloqueo}</small>
        </>
      ) : (
        <>
          <span>✅ ACTIVA</span>
          {status.intentosFallidos > 0 && (
            <small>⚠️ {status.intentosFallidos} intentos fallidos</small>
          )}
        </>
      )}
    </div>
  );
}
```

---

# 4. Cambio de Contraseñas

## 📍 **ENDPOINTS DE CAMBIO DE CONTRASEÑA**

### **4.1. Cambiar Contraseña - Cliente**

```http
PUT /api/v1/cliente/{id}/password
Content-Type: application/json

{
  "password": "nuevaPassword123"
}
```

**Validaciones del Backend:**
- ✅ No puede ser igual a la contraseña actual
- ✅ No puede coincidir con las últimas 5 contraseñas
- ✅ Se guarda en historial de contraseñas

**Respuestas:**

#### ✅ Exitoso
```json
{
  "code": "200-OK",
  "result": {
    "idCliente": 1,
    "correo": "cliente@ejemplo.com",
    "message": "Contraseña actualizada exitosamente"
  }
}
```

#### ❌ Contraseña Ya Usada
```json
{
  "code": "PASSWORD-500",
  "message": "La nueva contraseña ya fue usada anteriormente. Elija otra.",
  "result": null
}
```

---

### **4.2. Validar Contraseña Actual - Cliente**

```http
POST /api/v1/cliente/{id}/validate-password
Content-Type: application/json

{
  "password": "passwordActual123"
}
```

**Respuesta:**
```json
{
  "code": "200-OK",
  "result": {
    "valid": true,
    "message": "Contraseña válida"
  }
}
```

---

### **4.3. Endpoints Equivalentes para Administradores**

```http
PUT /api/v1/admin/{id}/password
POST /api/v1/admin/{id}/validate-password
```

---

## 🎨 **FLUJO COMPLETO DE CAMBIO DE CONTRASEÑA**

```javascript
async function changePassword(userId, currentPassword, newPassword) {
  try {
    // Paso 1: Validar contraseña actual
    const validateResponse = await fetch(`/api/v1/cliente/${userId}/validate-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: currentPassword })
    });
    
    const validateData = await validateResponse.json();
    
    if (!validateData.result.valid) {
      alert('❌ Contraseña actual incorrecta');
      return false;
    }
    
    // Paso 2: Cambiar contraseña
    const changeResponse = await fetch(`/api/v1/cliente/${userId}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword })
    });
    
    const changeData = await changeResponse.json();
    
    if (!changeResponse.ok) {
      if (changeData.message.includes('ya fue usada anteriormente')) {
        alert('❌ Esta contraseña ya fue usada antes. Por seguridad, elija una diferente.');
      } else if (changeData.message.includes('no puede ser igual a la actual')) {
        alert('❌ La nueva contraseña debe ser diferente a la actual.');
      } else {
        alert(`❌ Error: ${changeData.message}`);
      }
      return false;
    }
    
    // Éxito
    alert('✅ Contraseña actualizada exitosamente');
    return true;
    
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    alert('❌ Error de conexión');
    return false;
  }
}
```

---

# 5. Sistema de Permisos

## 📍 **ENDPOINTS DE PERMISOS**

### **5.1. Obtener Permisos Efectivos de un Admin**

```http
GET /api/v1/gestion-permisos/admin/{adminId}/permisos-efectivos
```

**Respuesta:**
```json
{
  "code": "200-OK",
  "result": [
    {
      "idPermiso": 1,
      "permiso": "Editar usuario",
      "tipoPermiso": "ROL",
      "origen": "Tecnología"
    },
    {
      "idPermiso": 6,
      "permiso": "Subir documentos internos",
      "tipoPermiso": "ADICIONAL",
      "origen": "Asignado manualmente"
    },
    {
      "idPermiso": 9,
      "permiso": "Registrar cuentas",
      "tipoPermiso": "TEMPORAL",
      "origen": "Válido hasta 2025-11-05",
      "fechaFin": "2025-11-05T23:59:59"
    }
  ]
}
```

**Tipos de Permisos:**
- `ROL`: Permisos predeterminados del rol
- `ADICIONAL`: Permisos extra asignados individualmente
- `TEMPORAL`: Permisos con fecha de expiración

---

### **5.2. Verificar Si Tiene un Permiso Específico**

```http
GET /api/v1/gestion-permisos/admin/{adminId}/tiene-permiso/{permisoId}
```

**Respuesta:**
```json
{
  "code": "200-OK",
  "result": {
    "tienePermiso": true,
    "tipoPermiso": "ROL",
    "origen": "Gerente",
    "detalles": {
      "permisoId": 2,
      "permisoNombre": "Desactivar usuario",
      "activo": true
    }
  }
}
```

---

### **5.3. Asignar Permiso Adicional**

```http
POST /api/v1/gestion-permisos/admin/{adminId}/permiso-adicional
Content-Type: application/json

{
  "permisoId": 6,
  "motivo": "Necesita acceso temporal para auditoría"
}
```

---

### **5.4. Asignar Permiso Temporal**

```http
POST /api/v1/gestion-permisos/admin/{adminId}/permiso-temporal
Content-Type: application/json

{
  "permisoId": 9,
  "dias": 7,
  "motivo": "Reemplazo de contador durante vacaciones"
}
```

O con fecha específica:

```json
{
  "permisoId": 9,
  "fechaInicio": "2025-11-01T00:00:00",
  "fechaFin": "2025-11-07T23:59:59",
  "motivo": "Reemplazo programado"
}
```

---

## 🎨 **COMPONENTE DE PERMISOS**

```javascript
// Hook para verificar permisos
function usePermission(adminId, permisoId) {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkPermission();
  }, [adminId, permisoId]);
  
  async function checkPermission() {
    try {
      const response = await fetch(
        `/api/v1/gestion-permisos/admin/${adminId}/tiene-permiso/${permisoId}`
      );
      const data = await response.json();
      setHasPermission(data.result.tienePermiso);
    } catch (error) {
      console.error('Error checking permission:', error);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  }
  
  return { hasPermission, loading };
}

// Uso
function EditUserButton({ adminId }) {
  const { hasPermission, loading } = usePermission(adminId, 1); // ID 1 = Editar usuario
  
  if (loading) return <button disabled>Cargando...</button>;
  if (!hasPermission) return null;
  
  return <button onClick={handleEdit}>Editar Usuario</button>;
}
```

---

# 6. Manejo de Errores

## 🚨 **CÓDIGOS DE ERROR COMUNES**

| Código | Descripción | Acción Frontend |
|--------|-------------|-----------------|
| `CUENTA_BLOQUEADA` | Cuenta bloqueada | Mostrar mensaje de contacto a soporte |
| `PASSWORD_INCORRECTO` | Contraseña incorrecta | Mostrar contador de intentos |
| `LOGIN-500` | Error general de login | Mostrar mensaje de error |
| `BLOQUEO-500` | Error en operación de bloqueo | Reintentar o notificar error |
| `PASSWORD-500` | Error en cambio de contraseña | Mostrar validaciones específicas |

---

## 🎨 **MANEJADOR GLOBAL DE ERRORES**

```javascript
function handleApiError(error, context = 'operación') {
  const message = error.message || error.toString();
  
  // Cuenta bloqueada
  if (message.includes('CUENTA_BLOQUEADA')) {
    return {
      type: 'blocked',
      title: '🔒 Cuenta Bloqueada',
      message: 'Su cuenta ha sido bloqueada por seguridad. Por favor, contacte a soporte@oasis.com',
      action: 'contact_support'
    };
  }
  
  // Contraseña incorrecta con intentos
  if (message.includes('PASSWORD_INCORRECTO')) {
    const match = message.match(/Le quedan (\d+) intentos/);
    const remaining = match ? parseInt(match[1]) : 0;
    
    return {
      type: 'password_error',
      title: '❌ Contraseña Incorrecta',
      message: `Le quedan ${remaining} intentos antes del bloqueo`,
      remaining: remaining,
      action: remaining <= 2 ? 'warning' : 'info'
    };
  }
  
  // Contraseña ya usada
  if (message.includes('ya fue usada anteriormente')) {
    return {
      type: 'password_reused',
      title: '🔄 Contraseña Ya Usada',
      message: 'Por seguridad, no puede reutilizar contraseñas anteriores',
      action: 'choose_different'
    };
  }
  
  // Error genérico
  return {
    type: 'generic',
    title: '❌ Error',
    message: `Error en ${context}: ${message}`,
    action: 'retry'
  };
}
```

---

# 7. Ejemplos de Integración

## 🎨 **EJEMPLO COMPLETO: PÁGINA DE LOGIN**

```javascript
import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/v1/cliente/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const message = data.message || '';
        
        if (message.includes('CUENTA_BLOQUEADA')) {
          setError({
            type: 'blocked',
            message: 'Su cuenta está bloqueada. Contacte a soporte@oasis.com'
          });
        } else if (message.includes('PASSWORD_INCORRECTO')) {
          const match = message.match(/Le quedan (\d+) intentos/);
          const remaining = match ? parseInt(match[1]) : 0;
          setAttemptsRemaining(remaining);
          setError({
            type: 'password',
            message: `Contraseña incorrecta. ${remaining} intentos restantes`
          });
        } else {
          setError({
            type: 'generic',
            message: 'Credenciales incorrectas'
          });
        }
        return;
      }
      
      // Login exitoso
      localStorage.setItem('user', JSON.stringify(data.result));
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError({
        type: 'network',
        message: 'Error de conexión. Intente nuevamente.'
      });
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        
        {error && (
          <div className={`alert alert-${error.type === 'blocked' ? 'danger' : 'warning'}`}>
            {error.message}
            {error.type === 'blocked' && (
              <a href="mailto:soporte@oasis.com" className="btn-link">
                Contactar Soporte
              </a>
            )}
          </div>
        )}
        
        {attemptsRemaining < 5 && attemptsRemaining > 0 && (
          <div className="attempts-warning">
            ⚠️ {attemptsRemaining} intentos restantes
          </div>
        )}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
```

---

## 🎨 **EJEMPLO: PANEL DE ADMINISTRACIÓN DE USUARIOS**

```javascript
function UserManagementPanel({ adminId }) {
  const [users, setUsers] = useState([]);
  const { hasPermission: canEdit } = usePermission(adminId, 1); // Editar usuario
  const { hasPermission: canDeactivate } = usePermission(adminId, 2); // Desactivar usuario
  
  async function handleBlockUser(userId) {
    if (!confirm('¿Está seguro de bloquear esta cuenta?')) return;
    
    try {
      const response = await fetch(`/api/v1/bloqueo/cliente/${userId}/bloquear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          motivo: 'Bloqueado manualmente por administrador'
        })
      });
      
      if (response.ok) {
        alert('✅ Cuenta bloqueada exitosamente');
        refreshUserList();
      }
    } catch (error) {
      alert('❌ Error al bloquear cuenta');
    }
  }
  
  async function handleUnblockUser(userId) {
    try {
      const response = await fetch(`/api/v1/bloqueo/cliente/${userId}/desbloquear`, {
        method: 'POST'
      });
      
      if (response.ok) {
        alert('✅ Cuenta desbloqueada exitosamente');
        refreshUserList();
      }
    } catch (error) {
      alert('❌ Error al desbloquear cuenta');
    }
  }
  
  return (
    <div className="user-panel">
      <h2>Gestión de Usuarios</h2>
      
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Estado</th>
            <th>Intentos Fallidos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.correo}</td>
              <td>
                <span className={user.estadoCuenta ? 'badge-success' : 'badge-danger'}>
                  {user.estadoCuenta ? 'Activa' : 'Bloqueada'}
                </span>
              </td>
              <td>{user.intentosFallidos}</td>
              <td>
                {canEdit && (
                  <button onClick={() => editUser(user.id)}>
                    Editar
                  </button>
                )}
                
                {canDeactivate && (
                  user.estadoCuenta ? (
                    <button onClick={() => handleBlockUser(user.id)} className="btn-danger">
                      Bloquear
                    </button>
                  ) : (
                    <button onClick={() => handleUnblockUser(user.id)} className="btn-success">
                      Desbloquear
                    </button>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

# 📊 Resumen de URLs por Funcionalidad

## **AUTENTICACIÓN**
- `POST /api/v1/cliente/login` - Login cliente
- `POST /api/v1/admin/login` - Login admin

## **CREACIÓN DE USUARIOS**
- `POST /api/v1/cliente` - Crear cliente
- `POST /api/v1/admin` - Crear admin

## **BLOQUEO DE CUENTAS**
- `GET /api/v1/bloqueo/{tipo}/{id}/info` - Info de bloqueo
- `POST /api/v1/bloqueo/{tipo}/{id}/bloquear` - Bloquear cuenta
- `POST /api/v1/bloqueo/{tipo}/{id}/desbloquear` - Desbloquear cuenta

## **CONTRASEÑAS**
- `PUT /api/v1/{tipo}/{id}/password` - Cambiar contraseña
- `POST /api/v1/{tipo}/{id}/validate-password` - Validar contraseña

## **PERMISOS**
- `GET /api/v1/gestion-permisos/admin/{id}/permisos-efectivos` - Todos los permisos
- `GET /api/v1/gestion-permisos/admin/{id}/tiene-permiso/{permisoId}` - Verificar permiso
- `POST /api/v1/gestion-permisos/admin/{id}/permiso-adicional` - Asignar adicional
- `POST /api/v1/gestion-permisos/admin/{id}/permiso-temporal` - Asignar temporal

**Nota:** `{tipo}` puede ser `cliente` o `admin`

---

# 🔧 Variables de Entorno

```env
# Backend URL
REACT_APP_API_URL=http://localhost:9999/api/v1

# Configuración de intentos
REACT_APP_MAX_LOGIN_ATTEMPTS=5

# Email de soporte
REACT_APP_SUPPORT_EMAIL=soporte@oasis.com
```

---

# 📞 Contacto para Dudas

- **Backend Developer:** [Tu nombre]
- **Documentación completa:** Ver archivos en `/BDD/`
- **Ejemplos HTTP:** Ver archivos en `/http/`

---

✅ **Documento actualizado:** Octubre 2025

