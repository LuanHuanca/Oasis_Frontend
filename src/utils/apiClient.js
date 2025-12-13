/**
 * Cliente API centralizado
 * Proporciona funciones helper para hacer llamadas a la API
 */

import axios from 'axios';
import { API_URL, BASE_URL, MAIL_URL } from '../config/api';

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
 * Construir URL completa para endpoints de la API
 * @param {string} endpoint - Endpoint relativo (ej: '/cliente/login')
 * @returns {string} URL completa
 */
export const getApiUrl = (endpoint) => {
  // Si el endpoint ya incluye /api/v1, usar BASE_URL
  if (endpoint.startsWith('/api/v1')) {
    return `${BASE_URL}${endpoint}`;
  }
  // Si el endpoint comienza con /, agregarlo a API_URL
  if (endpoint.startsWith('/')) {
    return `${API_URL}${endpoint}`;
  }
  // Si no, agregar / antes
  return `${API_URL}/${endpoint}`;
};

/**
 * Construir URL para el servicio de correo
 * @param {string} correo - Correo del destinatario
 * @returns {string} URL completa para el servicio de correo
 */
export const getMailUrl = (correo) => {
  return `${MAIL_URL}/${correo}`;
};

// Exportar instancia de axios configurada
export default apiClient;

// Exportar URLs para uso directo
export { API_URL, BASE_URL, MAIL_URL };

