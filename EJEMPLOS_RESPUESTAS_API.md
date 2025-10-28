# 📨 Ejemplos de Respuestas del API - Sistema Oasis

## 🎯 Guía Visual de Todas las Respuestas Posibles

Este documento muestra ejemplos reales de todas las respuestas que tu frontend recibirá del backend.

---

## 1. 🔐 LOGIN

### ✅ **Login Exitoso - Cliente**

**Request:**
```http
POST /api/v1/cliente/login
Content-Type: application/json

{
  "correo": "juan@ejemplo.com",
  "password": "Password123"
}
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "idCliente": 5,
    "correo": "juan@ejemplo.com",
    "estadoCuenta": true,
    "intentosFallidos": 0,
    "fechaBloqueo": null,
    "motivoBloqueo": null,
    "idPersona": 10
  }
}
```

---

### ❌ **Login - Cuenta Bloqueada**

**Request:**
```http
POST /api/v1/cliente/login
Content-Type: application/json

{
  "correo": "bloqueado@ejemplo.com",
  "password": "cualquierPassword"
}
```

**Response: 400 Bad Request**
```json
{
  "code": "LOGIN-500",
  "message": "CUENTA_BLOQUEADA: Su cuenta ha sido bloqueada. Por favor, contacte a soporte o envíe un correo a soporte@oasis.com para su desbloqueo. Motivo: Bloqueado automáticamente por 5 intentos fallidos",
  "result": null
}
```

**Frontend debe:**
- Detectar prefijo `CUENTA_BLOQUEADA:`
- Mostrar mensaje de contacto a soporte
- No permitir reintentos
- Mostrar email de soporte: `soporte@oasis.com`

---

### ⚠️ **Login - Contraseña Incorrecta (Intento 1/5)**

**Request:**
```http
POST /api/v1/cliente/login
Content-Type: application/json

{
  "correo": "juan@ejemplo.com",
  "password": "passwordIncorrecta"
}
```

**Response: 400 Bad Request**
```json
{
  "code": "LOGIN-500",
  "message": "PASSWORD_INCORRECTO: Contraseña incorrecta. Le quedan 4 intentos.",
  "result": null
}
```

**Frontend debe:**
- Detectar prefijo `PASSWORD_INCORRECTO:`
- Extraer número de intentos restantes (regex: `/Le quedan (\d+) intentos/`)
- Mostrar contador visual
- Advertir si quedan ≤ 2 intentos

---

### ⚠️ **Login - Último Intento (5/5 - Bloqueo Automático)**

**Request:**
```http
POST /api/v1/cliente/login
Content-Type: application/json

{
  "correo": "juan@ejemplo.com",
  "password": "passwordIncorrecta"
}
```

**Response: 400 Bad Request**
```json
{
  "code": "LOGIN-500",
  "message": "CUENTA_BLOQUEADA: Su cuenta ha sido bloqueada por múltiples intentos fallidos. Contacte a soporte@oasis.com para desbloquearla.",
  "result": null
}
```

**Frontend debe:**
- Mostrar mensaje crítico de bloqueo
- Ofrecer opción de contactar soporte
- No permitir más intentos de login

---

### ❌ **Login - Correo No Existe**

**Request:**
```http
POST /api/v1/cliente/login
Content-Type: application/json

{
  "correo": "noexiste@ejemplo.com",
  "password": "Password123"
}
```

**Response: 400 Bad Request**
```json
{
  "code": "LOGIN-500",
  "message": "Correo o contraseña incorrectos",
  "result": null
}
```

**Frontend debe:**
- Mostrar mensaje genérico (seguridad)
- No revelar si el correo existe o no

---

## 2. 👤 CREACIÓN DE USUARIOS

### ✅ **Crear Cliente Exitoso**

**Request:**
```http
POST /api/v1/cliente
Content-Type: application/json

{
  "correo": "nuevocliente@ejemplo.com",
  "password": "Password123",
  "idPersona": 15
}
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "idCliente": 25,
    "correo": "nuevocliente@ejemplo.com",
    "estadoCuenta": true,
    "intentosFallidos": 0,
    "fechaBloqueo": null,
    "motivoBloqueo": null,
    "idPersona": 15
  }
}
```

**Nota:** `estadoCuenta`, `intentosFallidos` se inicializan automáticamente.

---

### ✅ **Crear Admin Exitoso**

**Request:**
```http
POST /api/v1/admin
Content-Type: application/json

{
  "correo": "nuevoadmin@ejemplo.com",
  "password": "AdminPass123",
  "idPersona": 20,
  "rol": {
    "idRol": 2
  }
}
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "idAdmin": 12,
    "correo": "nuevoadmin@ejemplo.com",
    "estadoCuenta": true,
    "intentosFallidos": 0,
    "fechaBloqueo": null,
    "motivoBloqueo": null,
    "idPersona": 20,
    "rol": {
      "idRol": 2,
      "rol": "Tecnología"
    }
  }
}
```

**Nota:** Los permisos predeterminados del rol se asignan automáticamente.

---

## 3. 🔒 BLOQUEO DE CUENTAS

### ✅ **Obtener Info de Cuenta - Activa**

**Request:**
```http
GET /api/v1/bloqueo/cliente/5/info
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "clienteId": 5,
    "activa": true,
    "bloqueada": false,
    "intentosFallidos": 0,
    "fechaBloqueo": "null",
    "motivoBloqueo": "N/A"
  }
}
```

**UI Sugerido:**
```
✅ CUENTA ACTIVA
Sin intentos fallidos
```

---

### ⚠️ **Obtener Info de Cuenta - Con Intentos Fallidos**

**Request:**
```http
GET /api/v1/bloqueo/cliente/5/info
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "clienteId": 5,
    "activa": true,
    "bloqueada": false,
    "intentosFallidos": 3,
    "fechaBloqueo": "null",
    "motivoBloqueo": "N/A"
  }
}
```

**UI Sugerido:**
```
⚠️ CUENTA ACTIVA
⚠️ 3 intentos fallidos registrados
```

---

### 🔒 **Obtener Info de Cuenta - Bloqueada**

**Request:**
```http
GET /api/v1/bloqueo/cliente/5/info
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "clienteId": 5,
    "activa": false,
    "bloqueada": true,
    "intentosFallidos": 5,
    "fechaBloqueo": "2025-10-28T10:30:00",
    "motivoBloqueo": "Bloqueado automáticamente por 5 intentos fallidos"
  }
}
```

**UI Sugerido:**
```
🔒 CUENTA BLOQUEADA
Fecha: 28/10/2025 10:30
Motivo: Bloqueado automáticamente por 5 intentos fallidos
[Botón: Desbloquear]
```

---

### ✅ **Bloquear Cuenta Manualmente**

**Request:**
```http
POST /api/v1/bloqueo/cliente/5/bloquear
Content-Type: application/json

{
  "motivo": "Actividad sospechosa detectada"
}
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "clienteId": 5,
    "motivo": "Actividad sospechosa detectada",
    "bloqueado": true
  }
}
```

---

### ✅ **Desbloquear Cuenta**

**Request:**
```http
POST /api/v1/bloqueo/cliente/5/desbloquear
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "clienteId": 5,
    "bloqueado": false,
    "intentosFallidos": 0
  }
}
```

---

## 4. 🔑 CAMBIO DE CONTRASEÑA

### ✅ **Cambio Exitoso**

**Request:**
```http
PUT /api/v1/cliente/5/password
Content-Type: application/json

{
  "password": "NuevaPassword456"
}
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "idCliente": 5,
    "correo": "juan@ejemplo.com",
    "message": "Contraseña actualizada exitosamente"
  }
}
```

---

### ❌ **Contraseña Ya Usada**

**Request:**
```http
PUT /api/v1/cliente/5/password
Content-Type: application/json

{
  "password": "PasswordAntigua123"
}
```

**Response: 400 Bad Request**
```json
{
  "code": "PASSWORD-500",
  "message": "La nueva contraseña ya fue usada anteriormente. Elija otra.",
  "result": null
}
```

**Frontend debe:**
- Mostrar: "Esta contraseña ya fue usada. Por seguridad, elija una diferente"
- Sugerir crear una nueva contraseña

---

### ❌ **Contraseña Igual a la Actual**

**Request:**
```http
PUT /api/v1/cliente/5/password
Content-Type: application/json

{
  "password": "MismaPasswordActual123"
}
```

**Response: 400 Bad Request**
```json
{
  "code": "PASSWORD-500",
  "message": "La nueva contraseña no puede ser igual a la actual",
  "result": null
}
```

---

### ✅ **Validar Contraseña Actual - Correcta**

**Request:**
```http
POST /api/v1/cliente/5/validate-password
Content-Type: application/json

{
  "password": "PasswordActual123"
}
```

**Response: 200 OK**
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

### ❌ **Validar Contraseña Actual - Incorrecta**

**Request:**
```http
POST /api/v1/cliente/5/validate-password
Content-Type: application/json

{
  "password": "PasswordIncorrecta"
}
```

**Response: 400 Bad Request**
```json
{
  "code": "VALIDATE-500",
  "result": {
    "valid": false,
    "message": "Contraseña incorrecta"
  }
}
```

---

## 5. 🎫 PERMISOS

### ✅ **Obtener Permisos Efectivos**

**Request:**
```http
GET /api/v1/gestion-permisos/admin/5/permisos-efectivos
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": [
    {
      "idPermiso": 1,
      "permiso": "Editar usuario",
      "tipoPermiso": "ROL",
      "origen": "Tecnología",
      "activo": true
    },
    {
      "idPermiso": 6,
      "permiso": "Subir documentos internos",
      "tipoPermiso": "ADICIONAL",
      "origen": "Asignado manualmente",
      "activo": true,
      "fechaAsignacion": "2025-10-28T10:00:00"
    },
    {
      "idPermiso": 9,
      "permiso": "Registrar cuentas",
      "tipoPermiso": "TEMPORAL",
      "origen": "Válido hasta 2025-11-05",
      "activo": true,
      "fechaInicio": "2025-10-28T00:00:00",
      "fechaFin": "2025-11-05T23:59:59"
    }
  ]
}
```

**UI Sugerido:**
```
📋 PERMISOS DEL USUARIO

ROL (Tecnología):
  ✅ Editar usuario
  ✅ Desactivar usuario
  ✅ Ver lista de usuarios
  ✅ Revisar accesos de red

ADICIONALES:
  ✅ Subir documentos internos
     (Asignado: 28/10/2025)

TEMPORALES:
  ⏰ Registrar cuentas
     (Expira: 05/11/2025)
```

---

### ✅ **Verificar Permiso Específico - Tiene**

**Request:**
```http
GET /api/v1/gestion-permisos/admin/5/tiene-permiso/1
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "tienePermiso": true,
    "tipoPermiso": "ROL",
    "origen": "Tecnología",
    "detalles": {
      "permisoId": 1,
      "permisoNombre": "Editar usuario",
      "activo": true
    }
  }
}
```

**Uso:** Mostrar/habilitar botón "Editar Usuario"

---

### ❌ **Verificar Permiso Específico - No Tiene**

**Request:**
```http
GET /api/v1/gestion-permisos/admin/5/tiene-permiso/13
```

**Response: 200 OK**
```json
{
  "code": "200-OK",
  "result": {
    "tienePermiso": false,
    "tipoPermiso": null,
    "origen": null,
    "detalles": {
      "permisoId": 13,
      "permisoNombre": "Crear solicitud de viaje",
      "activo": false
    }
  }
}
```

**Uso:** Ocultar/deshabilitar botón "Crear Viaje"

---

## 📊 TABLA DE CÓDIGOS DE RESPUESTA

| Código | Tipo | Descripción |
|--------|------|-------------|
| `200-OK` | ✅ Éxito | Operación exitosa |
| `LOGIN-500` | ❌ Error | Error en login |
| `BLOQUEO-500` | ❌ Error | Error en operación de bloqueo |
| `DESBLOQUEO-500` | ❌ Error | Error en desbloqueo |
| `PASSWORD-500` | ❌ Error | Error en cambio de contraseña |
| `VALIDATE-500` | ❌ Error | Error en validación |
| `INFO-500` | ❌ Error | Error obteniendo información |

---

## 🎨 COMPONENTE DE EJEMPLO - REACT

```javascript
function ErrorDisplay({ error }) {
  if (!error) return null;
  
  const message = error.message || '';
  
  // Cuenta bloqueada
  if (message.includes('CUENTA_BLOQUEADA')) {
    return (
      <div className="alert alert-danger">
        <h4>🔒 Cuenta Bloqueada</h4>
        <p>Su cuenta ha sido bloqueada por seguridad.</p>
        <p>
          Por favor, contacte a nuestro equipo de soporte:
          <a href="mailto:soporte@oasis.com" className="btn btn-link">
            soporte@oasis.com
          </a>
        </p>
      </div>
    );
  }
  
  // Password incorrecto
  if (message.includes('PASSWORD_INCORRECTO')) {
    const match = message.match(/Le quedan (\d+) intentos/);
    const remaining = match ? parseInt(match[1]) : 0;
    
    const severity = remaining <= 2 ? 'danger' : 'warning';
    
    return (
      <div className={`alert alert-${severity}`}>
        <h4>❌ Contraseña Incorrecta</h4>
        <p>Le quedan <strong>{remaining}</strong> intentos.</p>
        {remaining <= 2 && (
          <p className="text-danger">
            <strong>⚠️ ADVERTENCIA:</strong> Después de {remaining} intentos más, 
            su cuenta será bloqueada automáticamente.
          </p>
        )}
      </div>
    );
  }
  
  // Contraseña ya usada
  if (message.includes('ya fue usada anteriormente')) {
    return (
      <div className="alert alert-info">
        <h4>🔄 Contraseña Ya Usada</h4>
        <p>Por seguridad, no puede reutilizar contraseñas anteriores.</p>
        <p>Por favor, elija una contraseña diferente.</p>
      </div>
    );
  }
  
  // Error genérico
  return (
    <div className="alert alert-warning">
      <h4>⚠️ Error</h4>
      <p>{message}</p>
    </div>
  );
}
```

---

## ✅ CHECKLIST DE RESPUESTAS A MANEJAR

### Login:
- [ ] ✅ Login exitoso
- [ ] 🔒 Cuenta bloqueada
- [ ] ❌ Contraseña incorrecta (con contador)
- [ ] ❌ Correo no existe

### Bloqueo:
- [ ] ✅ Info de cuenta activa
- [ ] ⚠️ Info con intentos fallidos
- [ ] 🔒 Info cuenta bloqueada
- [ ] ✅ Bloqueo exitoso
- [ ] ✅ Desbloqueo exitoso

### Contraseñas:
- [ ] ✅ Cambio exitoso
- [ ] ❌ Contraseña ya usada
- [ ] ❌ Contraseña igual a actual
- [ ] ✅ Validación correcta
- [ ] ❌ Validación incorrecta

### Permisos:
- [ ] ✅ Lista de permisos
- [ ] ✅ Tiene permiso
- [ ] ❌ No tiene permiso

---

**📅 Última actualización:** Octubre 2025  
**🔧 Todas las respuestas son reales del backend**

