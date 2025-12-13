/**
 * Declaración de tipos para el módulo de configuración de API
 */
export const API_URL: string;
export const BASE_URL: string;
export const MAIL_URL: string;

export function getFullApiUrl(endpoint: string): string;
export function getApiEndpoint(endpoint: string): string;
export function getMailUrlWithEmail(correo: string): string;

declare const _default: {
  API_URL: string;
  BASE_URL: string;
  MAIL_URL: string;
  getFullApiUrl: (endpoint: string) => string;
  getApiEndpoint: (endpoint: string) => string;
  getMailUrlWithEmail: (correo: string) => string;
};

export default _default;

