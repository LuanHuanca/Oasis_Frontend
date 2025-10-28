# 📚 Índice de Documentación - Sistema Oasis Backend

## 🎯 Guía Rápida para el Equipo de Frontend

Esta carpeta contiene toda la documentación necesaria para integrar el frontend con el backend actualizado.

---

## 📖 **DOCUMENTOS DISPONIBLES**

### 🚀 **PARA FRONTEND (Prioridad Alta)**

| Documento | Descripción | Para Quién |
|-----------|-------------|------------|
| **[RESUMEN_CAMBIOS_FRONTEND.md](RESUMEN_CAMBIOS_FRONTEND.md)** | ⭐ **EMPEZAR AQUÍ** - Resumen ejecutivo de cambios críticos | Todos |
| **[DOCUMENTACION_FRONTEND_API.md](DOCUMENTACION_FRONTEND_API.md)** | 📘 Documentación completa de APIs y endpoints | Desarrolladores |
| **[EJEMPLOS_RESPUESTAS_API.md](EJEMPLOS_RESPUESTAS_API.md)** | 📨 Ejemplos reales de todas las respuestas del API | Desarrolladores |

### 🗄️ **BASE DE DATOS**

| Documento | Descripción | Para Quién |
|-----------|-------------|------------|
| **[BDD/BD_OASIS.sql](BDD/BD_OASIS.sql)** | Script principal de la base de datos | DevOps/Backend |
| **[BDD/datos.sql](BDD/datos.sql)** | Datos de prueba (roles, permisos) | DevOps/Backend |
| **[BDD/MATRIZ_PERMISOS.md](BDD/MATRIZ_PERMISOS.md)** | 📊 Tabla completa de roles y permisos | Todos |

### 🔧 **TÉCNICA (Backend)**

| Documento | Descripción | Para Quién |
|-----------|-------------|------------|
| **[RESUMEN_CAMBIOS_COMPLETO.md](RESUMEN_CAMBIOS_COMPLETO.md)** | Resumen técnico completo de implementación | Backend |
| **[SISTEMA_BLOQUEO_CUENTAS.md](SISTEMA_BLOQUEO_CUENTAS.md)** | Sistema de bloqueo de cuentas | Backend |

### 🧪 **PRUEBAS**

| Documento | Descripción | Para Quién |
|-----------|-------------|------------|
| **[http/BloqueoCuenta.http](http/BloqueoCuenta.http)** | Pruebas del sistema de bloqueo | QA/Testing |
| **[http/Admin.http](http/Admin.http)** | Pruebas de endpoints de admin | QA/Testing |
| **[http/Cliente.http](http/Cliente.http)** | Pruebas de endpoints de cliente | QA/Testing |
| **[http/GestionPermisos.http](http/GestionPermisos.http)** | Pruebas del sistema de permisos | QA/Testing |

---

## 🎯 **GUÍA DE LECTURA RECOMENDADA**

### **1️⃣ Para Desarrolladores Frontend (NUEVO):**

**Orden de lectura:**
```
1. RESUMEN_CAMBIOS_FRONTEND.md ⭐ (15 min)
   ↓
2. EJEMPLOS_RESPUESTAS_API.md 📨 (20 min)
   ↓
3. DOCUMENTACION_FRONTEND_API.md 📘 (30 min)
   ↓
4. BDD/MATRIZ_PERMISOS.md 📊 (10 min)
```

**Total: ~75 minutos**

---

### **2️⃣ Para Team Lead / Product Owner:**

**Lectura rápida:**
```
1. RESUMEN_CAMBIOS_FRONTEND.md ⭐ (Sección: "CAMBIOS CRÍTICOS")
   ↓
2. BDD/MATRIZ_PERMISOS.md 📊 (Ver matriz de permisos)
   ↓
3. DOCUMENTACION_FRONTEND_API.md 📘 (Sección: "Resumen de URLs")
```

**Total: ~20 minutos**

---

### **3️⃣ Para QA / Testing:**

**Documentos importantes:**
```
1. RESUMEN_CAMBIOS_FRONTEND.md ⭐ (Casos de prueba)
   ↓
2. EJEMPLOS_RESPUESTAS_API.md 📨 (Respuestas esperadas)
   ↓
3. http/BloqueoCuenta.http 🧪 (Scripts de prueba)
   ↓
4. http/GestionPermisos.http 🧪 (Scripts de permisos)
```

---

### **4️⃣ Para Backend / DevOps:**

**Documentos técnicos:**
```
1. RESUMEN_CAMBIOS_COMPLETO.md (Implementación completa)
   ↓
2. BDD/BD_OASIS.sql (Base de datos)
   ↓
3. BDD/datos.sql (Datos iniciales)
```

---

## 📋 **CAMBIOS PRINCIPALES (Resumen Ejecutivo)**

### ✅ **1. Sistema de Login Mejorado**
- Verificación de estado de cuenta
- Contador de intentos fallidos (máx. 5)
- Bloqueo automático
- Mensajes específicos con prefijos

### ✅ **2. Sistema de Bloqueo de Cuentas**
- Endpoints para bloquear/desbloquear
- Información detallada de estado
- Bloqueo manual por administrador
- Registro de motivos de bloqueo

### ✅ **3. Seguridad de Contraseñas**
- Historial de últimas 5 contraseñas
- Validación antes de cambio
- Mensajes de error específicos

### ✅ **4. Sistema de Permisos**
- 8 roles predefinidos
- 13 permisos disponibles
- Permisos adicionales por usuario
- Permisos temporales con expiración

---

## 🔥 **ACCIÓN INMEDIATA REQUERIDA**

### **Para Frontend - CRÍTICO:**

#### **1. Actualizar Manejo de Login (Prioridad ALTA):**
```javascript
// Detectar estos prefijos en mensajes de error:
- "CUENTA_BLOQUEADA:"
- "PASSWORD_INCORRECTO:"
```

#### **2. Agregar Contador de Intentos (Prioridad ALTA):**
```javascript
// Extraer y mostrar:
"Le quedan X intentos"
```

#### **3. Mensaje de Contacto a Soporte (Prioridad ALTA):**
```javascript
// Cuando cuenta bloqueada:
"Contacte a soporte@oasis.com"
```

**Ver detalles en:** `RESUMEN_CAMBIOS_FRONTEND.md`

---

## 🎨 **EJEMPLOS DE CÓDIGO LISTOS PARA USAR**

Todos los documentos incluyen código JavaScript/React listo para copiar y pegar:

- ✅ Función de login con manejo de errores
- ✅ Verificación de permisos
- ✅ Componente de estado de cuenta
- ✅ Componente de cambio de contraseña
- ✅ Hook personalizado para permisos

**Ver:** `DOCUMENTACION_FRONTEND_API.md` (Sección 7)

---

## 📊 **MATRIZ DE PERMISOS (Vista Rápida)**

| Rol | # Permisos | Principales |
|-----|-----------|-------------|
| Gerente | 4 | Supervisión, reportes |
| Tecnología | 4 | Gestión de usuarios |
| Seguridad | 2 | Roles y accesos |
| Contador | 4 | Contabilidad completa |
| Auditor | 3 | Documentos internos |
| Pasante TI | 1 | Solo lectura |
| Usuario | 3 | Gestión básica |
| Agente de viajes | 1 | Solicitudes de viaje |

**Ver detalles completos en:** `BDD/MATRIZ_PERMISOS.md`

---

## 🚀 **URLs BASE**

### **Desarrollo:**
```
http://localhost:9999/api/v1
```

### **Endpoints Principales:**
```
POST   /cliente/login
POST   /admin/login
GET    /bloqueo/{tipo}/{id}/info
POST   /bloqueo/{tipo}/{id}/bloquear
POST   /bloqueo/{tipo}/{id}/desbloquear
PUT    /{tipo}/{id}/password
GET    /gestion-permisos/admin/{id}/permisos-efectivos
GET    /gestion-permisos/admin/{id}/tiene-permiso/{permisoId}
```

**Ver lista completa en:** `DOCUMENTACION_FRONTEND_API.md`

---

## 🧪 **TESTING**

### **Scripts HTTP de Prueba:**
- `http/BloqueoCuenta.http` - Pruebas de bloqueo
- `http/Admin.http` - Pruebas de admin
- `http/Cliente.http` - Pruebas de cliente
- `http/GestionPermisos.http` - Pruebas de permisos

### **Herramientas Recomendadas:**
- Visual Studio Code con extensión REST Client
- Postman
- Insomnia

---

## 📞 **SOPORTE Y CONTACTO**

### **¿Dudas sobre la documentación?**
- Revisar `DOCUMENTACION_FRONTEND_API.md`
- Ver ejemplos en `EJEMPLOS_RESPUESTAS_API.md`
- Contactar al equipo de backend

### **¿Encontraste un error?**
- Reportar en el sistema de issues
- Incluir: endpoint, request, response esperada vs recibida

### **¿Necesitas más ejemplos?**
- Ver carpeta `/http/` con scripts de prueba
- Solicitar ejemplos específicos al equipo backend

---

## ✅ **CHECKLIST DE IMPLEMENTACIÓN**

### **Frontend:**
- [ ] Leer `RESUMEN_CAMBIOS_FRONTEND.md`
- [ ] Actualizar manejo de errores en login
- [ ] Implementar contador de intentos
- [ ] Agregar mensaje de cuenta bloqueada
- [ ] Implementar verificación de permisos
- [ ] Crear componentes de gestión de usuarios
- [ ] Probar todos los flujos

### **QA:**
- [ ] Probar bloqueo automático (5 intentos)
- [ ] Probar desbloqueo manual
- [ ] Probar cambio de contraseña
- [ ] Verificar validación de contraseñas antiguas
- [ ] Probar permisos por rol
- [ ] Verificar permisos adicionales
- [ ] Probar permisos temporales

### **DevOps:**
- [ ] Recrear base de datos con script actualizado
- [ ] Verificar que todos los endpoints funcionan
- [ ] Configurar variables de entorno
- [ ] Configurar emails de soporte

---

## 📅 **HISTORIAL DE VERSIONES**

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | Oct 2025 | Sistema de bloqueo de cuentas completo |
| 1.0.0 | Oct 2025 | Sistema de permisos (ROL, ADICIONAL, TEMPORAL) |
| 1.0.0 | Oct 2025 | Historial de contraseñas |
| 1.0.0 | Oct 2025 | 8 roles y 13 permisos definidos |

---

## 🎯 **PRÓXIMOS PASOS**

### **Para empezar HOY:**
1. Lee `RESUMEN_CAMBIOS_FRONTEND.md` (15 min)
2. Prueba endpoints en `http/BloqueoCuenta.http`
3. Implementa manejo de errores en login
4. Agrega contador de intentos

### **Para esta semana:**
1. Implementar sistema de permisos
2. Crear panel de gestión de usuarios
3. Agregar componentes de bloqueo/desbloqueo
4. Testing completo

### **Para próxima semana:**
1. Dashboard de seguridad
2. Notificaciones de bloqueo
3. Reportes de actividad
4. Optimizaciones

---

## 🌟 **RECURSOS ADICIONALES**

- **API Base URL:** `http://localhost:9999/api/v1`
- **Email Soporte:** `soporte@oasis.com`
- **Puerto Backend:** `9999`
- **Base de Datos:** PostgreSQL

---

**📝 Nota:** Esta documentación se actualiza continuamente. Revisa la fecha de última actualización en cada documento.

**✅ Todo el código y ejemplos son funcionales y probados.**

**🚀 ¡Listo para integrar!**

