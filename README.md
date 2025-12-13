# 🏝️ OASIS Frontend

Frontend de la aplicación OASIS construido con Vue.js 3, Vite y TypeScript.

---

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run serve
```

La aplicación estará disponible en: http://localhost:5173

### Producción con Docker

El frontend se construye automáticamente con Docker Compose. Ver la documentación principal en la raíz del proyecto.

---

## 📋 Requisitos

- Node.js 16+ (para desarrollo local)
- Docker (para producción)

---

## 🏗️ Estructura del Proyecto

```
src/
├── assets/          # Imágenes y recursos estáticos
├── components/      # Componentes Vue
│   ├── Admin/       # Componentes de administración
│   ├── Dashboard/   # Componentes del dashboard
│   ├── Home/        # Componentes de la página principal
│   └── ...
├── config/          # Configuración
│   └── api.js       # Configuración centralizada de la API
├── functions/       # Funciones y servicios
│   ├── auditService.js  # Servicio de auditoría
│   └── store.ts     # Store de Vuex
├── router/          # Configuración de rutas
├── utils/           # Utilidades
└── views/           # Vistas principales
```

---

## ⚙️ Configuración

### Variables de Entorno

El frontend usa variables de entorno con el prefijo `VITE_`:

- `VITE_API_URL`: URL del backend (por defecto: `http://localhost:9999`)

**En Docker:**
Las variables se pasan durante el build desde `docker-compose.yml`:

```yaml
build:
  args:
    - VITE_API_URL=${VITE_API_URL:-http://localhost:9999}
```

**En desarrollo local:**
Crea un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:9999
```

**⚠️ IMPORTANTE:** No incluyas archivos `.env` en el repositorio. Usa `.env.example` como plantilla.

---

## 🔧 Configuración de la API

La configuración de la API está centralizada en `src/config/api.js`:

```javascript
import { API_URL, BASE_URL, MAIL_URL } from '@/config/api';

// Usar en componentes
axios.get(`${API_URL}/cliente/login`)
```

**No uses URLs hardcodeadas.** Siempre usa la configuración centralizada.

---

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run serve        # Inicia servidor de desarrollo con hot-reload

# Producción
npm run build        # Construye la aplicación para producción
```

---

## 🐳 Docker

El frontend se construye en dos etapas:

1. **Build stage**: Construye la aplicación con Vite
2. **Production stage**: Sirve la aplicación con Express

**Build args:**
- `VITE_API_URL`: URL del backend (requerido)

**Puerto:**
- 3000 (configurable en docker-compose.yml)

---

## 🔍 Verificación

### Desarrollo Local

1. Inicia el servidor: `npm run serve`
2. Abre: http://localhost:5173
3. Verifica que la API esté configurada correctamente

### Producción

1. Verifica que el build se complete sin errores
2. Verifica que el contenedor esté corriendo: `docker-compose ps frontend`
3. Abre: http://localhost:3000

---

## 📝 Notas Importantes

1. **Variables de entorno**: Solo se inyectan en tiempo de build, no en runtime
2. **API centralizada**: Siempre usa `src/config/api.js` para las URLs
3. **Imágenes**: Importa las imágenes como módulos para que funcionen en Docker
4. **Build**: El build se optimiza automáticamente para producción

---

## 🛠️ Solución de Problemas

### Error: "Cannot find module '@/config/api'"

Verifica que el alias `@` esté configurado en `vite.config.js`:

```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```

### Error: "API_URL is undefined"

Verifica que `VITE_API_URL` esté configurada:
- En desarrollo: archivo `.env`
- En Docker: variable en `docker-compose.yml`

### Error: "Images not loading"

Asegúrate de importar las imágenes como módulos:

```javascript
import logoImage from '@/assets/logo.png';
// Luego usar: <img :src="logoImage" />
```

---

## 📚 Dependencias Principales

- **Vue 3**: Framework principal
- **Vite**: Build tool y dev server
- **Vue Router**: Enrutamiento
- **Vuex**: Gestión de estado
- **Axios**: Cliente HTTP
- **TypeScript**: Tipado estático

---

## 🤝 Contribuir

1. Sigue las convenciones de código existentes
2. Usa la configuración centralizada de API
3. Importa imágenes como módulos
4. No hardcodees URLs

---

## 📄 Licencia

[Tu licencia aquí]

---

**¡Disfruta desarrollando con OASIS Frontend!** 🚀
