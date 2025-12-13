/**
 * Cliente API centralizado
 * Proporciona funciones helper para hacer llamadas a la API
 * 
 * USO RECOMENDADO:
 * - Importar apiClient para usar axios configurado: import apiClient from '@/utils/apiClient'
 * - Importar funciones helper: import { getFullApiUrl, getApiEndpoint } from '@/utils/apiClient'
 * - O importar directamente de api.js: import { API_URL, BASE_URL } from '@/config/api'
 */

import axios from 'axios';
import { 
  API_URL, 
  BASE_URL, 
  MAIL_URL,
  getFullApiUrl as getFullApiUrlFromConfig,
  getApiEndpoint as getApiEndpointFromConfig,
  getMailUrlWithEmail
} from '../config/api';

// Crear instancia de axios con configuración por defecto
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en llamada API:', error);
    return Promise.reject(error);
  }
);

/**
 * Construir URL completa para endpoints que ya incluyen /api/v1
 * @param {string} endpoint - Endpoint que ya incluye /api/v1 (ej: '/api/v1/cliente/login')
 * @returns {string} URL completa
 */
export const getFullApiUrl = getFullApiUrlFromConfig;

/**
 * Construir URL para endpoints que NO incluyen /api/v1
 * @param {string} endpoint - Endpoint relativo (ej: '/cliente/login')
 * @returns {string} URL completa con /api/v1
 */
export const getApiEndpoint = getApiEndpointFromConfig;

/**
 * Construir URL para el servicio de correo
 * @param {string} correo - Correo del destinatario
 * @returns {string} URL completa para el servicio de correo
 */
export const getMailUrl = getMailUrlWithEmail;

// Exportar instancia de axios configurada
export default apiClient;

// Exportar URLs para uso directo
export { API_URL, BASE_URL, MAIL_URL };

