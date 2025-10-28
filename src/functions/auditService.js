/**
 * Servicio de Auditoría Centralizado
 * Registra todas las acciones importantes del sistema
 */

import axios from 'axios';

const API_URL = 'http://localhost:9999/api/v1';

/**
 * Obtiene la IP del cliente
 * En producción, el backend debería obtenerla del request
 */
async function getClientIP() {
  try {
    // En desarrollo local
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return '127.0.0.1';
    }
    
    // Intentar obtener IP pública (opcional, para producción)
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'IP_NO_DISPONIBLE';
    }
  } catch (error) {
    console.error('Error obteniendo IP:', error);
    return 'IP_NO_DISPONIBLE';
  }
}

/**
 * Registra una actividad en el sistema de auditoría
 * @param {string} correo - Correo del usuario que realiza la acción
 * @param {string} actividad - Descripción de la actividad
 * @param {object} detalles - Detalles adicionales (opcional)
 */
async function registrarAuditoria(correo, actividad, detalles = {}) {
  try {
    const now = new Date();
    const ip = await getClientIP();
    
    // Formato de fecha y hora según el backend
    const fecha = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const hora = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const fechaInicio = now.toISOString().slice(0, 19); // YYYY-MM-DDTHH:MM:SS
    const fechaFin = new Date(now.getTime() + 1000).toISOString().slice(0, 19); // +1 segundo

    const auditoriaData = {
      correo: correo || 'SISTEMA',
      actividad: actividad,
      fecha: fecha,
      hora: hora,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      ip: ip,
      ...detalles // Permite agregar campos adicionales si el backend los soporta
    };

    console.log('📋 Registrando auditoría:', actividad);
    
    const response = await axios.post(
      `${API_URL}/auditoria/create`,
      auditoriaData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('✅ Auditoría registrada exitosamente');
    return response.data;
  } catch (error) {
    // No bloquear la operación si falla la auditoría
    console.error('⚠️ Error al registrar auditoría:', error);
    // En producción, podrías enviar esto a un servicio de monitoreo
    return null;
  }
}

/**
 * Auditorías específicas por tipo de acción
 */

// ===== AUTENTICACIÓN =====

export async function auditLoginExitoso(correo, tipoUsuario = 'cliente') {
  return registrarAuditoria(
    correo,
    `Login exitoso - ${tipoUsuario === 'admin' ? 'Administrador' : 'Cliente'}`
  );
}

export async function auditLoginFallido(correo, motivo = 'Contraseña incorrecta') {
  return registrarAuditoria(
    correo,
    `Intento de login fallido - ${motivo}`
  );
}

export async function auditCuentaBloqueada(correo, motivo) {
  return registrarAuditoria(
    correo,
    `Intento de acceso a cuenta bloqueada - ${motivo}`
  );
}

export async function auditLogout(correo, tipoUsuario = 'cliente') {
  return registrarAuditoria(
    correo,
    `Logout - ${tipoUsuario === 'admin' ? 'Administrador' : 'Cliente'}`
  );
}

// ===== CONTRASEÑAS =====

export async function auditCambioContrasena(correo, exitoso = true) {
  return registrarAuditoria(
    correo,
    exitoso ? 'Cambio de contraseña exitoso' : 'Intento fallido de cambio de contraseña'
  );
}

export async function auditValidacionContrasena(correo, exitosa = true) {
  return registrarAuditoria(
    correo,
    `Validación de contraseña actual - ${exitosa ? 'Correcta' : 'Incorrecta'}`
  );
}

// ===== GESTIÓN DE PERMISOS =====

export async function auditAsignacionPermisoAdicional(correoAdmin, adminObjetivo, permiso) {
  return registrarAuditoria(
    correoAdmin,
    `Asignó permiso adicional "${permiso}" al administrador ${adminObjetivo}`
  );
}

export async function auditRevocacionPermisoAdicional(correoAdmin, adminObjetivo, permiso) {
  return registrarAuditoria(
    correoAdmin,
    `Revocó permiso adicional "${permiso}" del administrador ${adminObjetivo}`
  );
}

export async function auditAsignacionPermisoTemporal(correoAdmin, adminObjetivo, permiso, duracion) {
  return registrarAuditoria(
    correoAdmin,
    `Asignó permiso temporal "${permiso}" al administrador ${adminObjetivo} por ${duracion}`
  );
}

export async function auditRevocacionPermisoTemporal(correoAdmin, adminObjetivo, permiso) {
  return registrarAuditoria(
    correoAdmin,
    `Revocó permiso temporal "${permiso}" del administrador ${adminObjetivo}`
  );
}

export async function auditExtensionPermisoTemporal(correoAdmin, adminObjetivo, permiso, nuevaFecha) {
  return registrarAuditoria(
    correoAdmin,
    `Extendió permiso temporal "${permiso}" del administrador ${adminObjetivo} hasta ${nuevaFecha}`
  );
}

// ===== GESTIÓN DE ROLES =====

export async function auditCambioRol(correoAdmin, adminObjetivo, rolAnterior, rolNuevo) {
  return registrarAuditoria(
    correoAdmin,
    `Cambió el rol del administrador ${adminObjetivo} de "${rolAnterior}" a "${rolNuevo}"`
  );
}

export async function auditCreacionRol(correoAdmin, nombreRol) {
  return registrarAuditoria(
    correoAdmin,
    `Creó nuevo rol: "${nombreRol}"`
  );
}

// ===== BLOQUEO DE CUENTAS =====

export async function auditBloqueoCuenta(correoAdmin, correoObjetivo, motivo) {
  return registrarAuditoria(
    correoAdmin,
    `Bloqueó la cuenta de ${correoObjetivo} - Motivo: ${motivo}`
  );
}

export async function auditDesbloqueoCuenta(correoAdmin, correoObjetivo) {
  return registrarAuditoria(
    correoAdmin,
    `Desbloqueó la cuenta de ${correoObjetivo}`
  );
}

// ===== GESTIÓN DE USUARIOS =====

export async function auditCreacionUsuario(correoAdmin, correoNuevoUsuario, tipo) {
  return registrarAuditoria(
    correoAdmin,
    `Creó nuevo usuario ${tipo}: ${correoNuevoUsuario}`
  );
}

export async function auditEdicionUsuario(correoAdmin, correoUsuarioEditado) {
  return registrarAuditoria(
    correoAdmin,
    `Editó información del usuario: ${correoUsuarioEditado}`
  );
}

export async function auditDesactivacionUsuario(correoAdmin, correoUsuarioDesactivado) {
  return registrarAuditoria(
    correoAdmin,
    `Desactivó usuario: ${correoUsuarioDesactivado}`
  );
}

// ===== ACCIONES SOSPECHOSAS =====

export async function auditActividadSospechosa(correo, descripcion) {
  return registrarAuditoria(
    correo || 'DESCONOCIDO',
    `⚠️ ACTIVIDAD SOSPECHOSA: ${descripcion}`
  );
}

export async function auditAccesoNoAutorizado(correo, recurso) {
  return registrarAuditoria(
    correo,
    `Intento de acceso no autorizado al recurso: ${recurso}`
  );
}

// Export default del servicio principal
export default {
  registrarAuditoria,
  auditLoginExitoso,
  auditLoginFallido,
  auditCuentaBloqueada,
  auditLogout,
  auditCambioContrasena,
  auditValidacionContrasena,
  auditAsignacionPermisoAdicional,
  auditRevocacionPermisoAdicional,
  auditAsignacionPermisoTemporal,
  auditRevocacionPermisoTemporal,
  auditExtensionPermisoTemporal,
  auditCambioRol,
  auditCreacionRol,
  auditBloqueoCuenta,
  auditDesbloqueoCuenta,
  auditCreacionUsuario,
  auditEdicionUsuario,
  auditDesactivacionUsuario,
  auditActividadSospechosa,
  auditAccesoNoAutorizado
};

