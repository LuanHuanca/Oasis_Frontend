/**
 * Configuración centralizada de la API
 * Las variables de entorno se inyectan en tiempo de build por Vite
 * 
 * IMPORTANTE: 
 * - En desarrollo local: crear archivo .env con VITE_API_URL=http://localhost:9999
 * - En Railway: configurar variable de entorno VITE_API_URL en el dashboard de Railway
 * - La variable DEBE tener el prefijo VITE_ para ser accesible en el cliente
 */

// Obtener la URL de la API desde las variables de entorno
// En desarrollo local: VITE_API_URL o por defecto http://localhost:9999
// En producción (Railway/EC2): debe configurarse VITE_API_URL en las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9999';

// Log de depuración (siempre mostrar para debugging en producción también)
console.log('🔧 Configuración API:', {
  'VITE_API_URL (env)': import.meta.env.VITE_API_URL || 'NO DEFINIDA',
  'API_BASE_URL (usado)': API_BASE_URL,
  'API_URL (completo)': `${API_BASE_URL}/api/v1`,
  'MODE': import.meta.env.MODE,
  'DEV': import.meta.env.DEV,
  'PROD': import.meta.env.PROD,
  'Hostname actual': typeof window !== 'undefined' ? window.location.hostname : 'N/A'
});

// Advertencia si no se encontró la variable de entorno en producción
if (!import.meta.env.VITE_API_URL && (import.meta.env.PROD || import.meta.env.MODE === 'production')) {
  console.warn('⚠️ ADVERTENCIA: VITE_API_URL no está configurada. Usando valor por defecto:', API_BASE_URL);
  console.warn('⚠️ En Railway, asegúrate de configurar la variable VITE_API_URL en Settings > Variables');
  console.warn('⚠️ IMPORTANTE: Después de configurar la variable, DEBES hacer un nuevo build/deploy');
}

// Construir la URL completa de la API
export const API_URL = `${API_BASE_URL}/api/v1`;

// URL base para el backend (sin /api/v1)
export const BASE_URL = API_BASE_URL;

// URL para el servicio de correo
export const MAIL_URL = `${BASE_URL}/mail/send`;

/**
 * Construir URL completa para endpoints que ya incluyen /api/v1
 * @param {string} endpoint - Endpoint que ya incluye /api/v1 (ej: '/api/v1/cliente/login')
 * @returns {string} URL completa
 */
export const getFullApiUrl = (endpoint) => {
  if (endpoint.startsWith('/api/v1')) {
    return `${BASE_URL}${endpoint}`;
  }
  // Si el endpoint no tiene /api/v1, asumir que es relativo a API_URL
  if (endpoint.startsWith('/')) {
    return `${API_URL}${endpoint}`;
  }
  return `${API_URL}/${endpoint}`;
};

/**
 * Construir URL para endpoints que NO incluyen /api/v1
 * @param {string} endpoint - Endpoint relativo (ej: '/cliente/login')
 * @returns {string} URL completa con /api/v1
 */
export const getApiEndpoint = (endpoint) => {
  if (endpoint.startsWith('/')) {
    return `${API_URL}${endpoint}`;
  }
  return `${API_URL}/${endpoint}`;
};

/**
 * Construir URL para el servicio de correo con correo específico
 * @param {string} correo - Correo del destinatario
 * @returns {string} URL completa para el servicio de correo
 */
export const getMailUrlWithEmail = (correo) => {
  return `${BASE_URL}/mail/send/${correo}`;
};

// Exportar configuración completa
export default {
  API_URL,
  BASE_URL,
  MAIL_URL,
  getFullApiUrl,
  getApiEndpoint,
  getMailUrlWithEmail,
};

