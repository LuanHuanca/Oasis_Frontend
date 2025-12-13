/**
 * Configuración centralizada de la API
 * Las variables de entorno se inyectan en tiempo de build por Vite
 * 
 * IMPORTANTE: En Docker, las variables de entorno se pasan durante el build.
 * En EC2, asegúrate de tener VITE_API_URL configurada en el .env antes de hacer build.
 */

// Obtener la URL de la API desde las variables de entorno
// En desarrollo local: VITE_API_URL o por defecto http://localhost:9999
// En Docker: se pasa durante el build desde docker-compose.yml
// En producción EC2: debe configurarse en el .env antes del build
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9999';

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

