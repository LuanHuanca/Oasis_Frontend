/**
 * Configuración centralizada de la API
 * Las variables de entorno se inyectan en tiempo de build por Vite
 */

// Obtener la URL de la API desde las variables de entorno
// En desarrollo: VITE_API_URL o por defecto http://localhost:9999
// En producción: se debe configurar VITE_API_URL en el .env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9999';

// Construir la URL completa de la API
export const API_URL = `${API_BASE_URL}/api/v1`;

// URL base para el backend (sin /api/v1)
export const BASE_URL = API_BASE_URL;

// URL para el servicio de correo
export const MAIL_URL = `${BASE_URL}/mail/send`;

// Exportar configuración completa
export default {
  API_URL,
  BASE_URL,
  MAIL_URL,
};

