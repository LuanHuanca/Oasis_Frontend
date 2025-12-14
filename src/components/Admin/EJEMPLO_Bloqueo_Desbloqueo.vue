<!--
  COMPONENTE DE EJEMPLO: Gestión de Bloqueo/Desbloqueo de Cuentas con Auditoría
  
  Este componente muestra cómo implementar la funcionalidad de bloqueo y desbloqueo
  de cuentas de usuarios (clientes y administradores) con auditoría integrada.
  
  Uso:
  1. Copiar y adaptar este código al componente correspondiente
  2. Asegurarse de tener el servicio de auditoría importado
  3. Adaptar según las necesidades específicas del proyecto
-->

<template>
  <div class="bloqueo-container">
    <h3>Gestión de Bloqueo de Cuentas</h3>
    
    <!-- Lista de usuarios -->
    <div v-for="user in usuarios" :key="user.id" class="user-card">
      <div class="user-info">
        <span class="user-email">{{ user.correo }}</span>
        <span :class="['user-status', user.estadoCuenta ? 'activa' : 'bloqueada']">
          {{ user.estadoCuenta ? '✅ Activa' : '🔒 Bloqueada' }}
        </span>
        <span v-if="user.intentosFallidos > 0" class="intentos-fallidos">
          ⚠️ {{ user.intentosFallidos }} intentos fallidos
        </span>
      </div>
      
      <div class="user-actions">
        <!-- Botón de bloqueo -->
        <button 
          v-if="user.estadoCuenta"
          @click="bloquearCuenta(user)"
          class="btn btn-danger"
        >
          🔒 Bloquear Cuenta
        </button>
        
        <!-- Botón de desbloqueo -->
        <button 
          v-else
          @click="desbloquearCuenta(user)"
          class="btn btn-success"
        >
          🔓 Desbloquear Cuenta
        </button>
        
        <!-- Botón para ver información de bloqueo -->
        <button 
          @click="verInfoBloqueo(user)"
          class="btn btn-info"
        >
          ℹ️ Ver Info
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/api';
import Swal from 'sweetalert2';
// @ts-ignore - Servicio de auditoría
import auditService from '@/functions/auditService';

export default {
  name: 'BloqueoDese bloqueoUsuarios',
  data() {
    return {
      usuarios: []
    };
  },
  methods: {
    /**
     * Obtener información de bloqueo de una cuenta
     */
    async verInfoBloqueo(user) {
      try {
        const tipo = user.esAdmin ? 'admin' : 'cliente';
        const id = user.esAdmin ? user.idAdmin : user.idCliente;
        
        const response = await axios.get(
          `${API_URL}/bloqueo/${tipo}/${id}/info`
        );
        
        if (response.data.code === '200-OK') {
          const info = response.data.result;
          
          Swal.fire({
            title: 'Información de la Cuenta',
            html: `
              <div style="text-align: left;">
                <p><strong>Correo:</strong> ${user.correo}</p>
                <p><strong>Estado:</strong> ${info.activa ? '✅ Activa' : '🔒 Bloqueada'}</p>
                <p><strong>Intentos Fallidos:</strong> ${info.intentosFallidos}</p>
                ${info.fechaBloqueo && info.fechaBloqueo !== 'null' ? 
                  `<p><strong>Fecha de Bloqueo:</strong> ${info.fechaBloqueo}</p>` : ''}
                ${info.motivoBloqueo && info.motivoBloqueo !== 'N/A' ? 
                  `<p><strong>Motivo:</strong> ${info.motivoBloqueo}</p>` : ''}
              </div>
            `,
            icon: 'info'
          });
        }
      } catch (error) {
        console.error('Error al obtener información de bloqueo:', error);
        Swal.fire('Error', 'No se pudo obtener la información', 'error');
      }
    },
    
    /**
     * Bloquear una cuenta manualmente
     */
    async bloquearCuenta(user) {
      try {
        // Solicitar motivo del bloqueo
        const { value: motivo } = await Swal.fire({
          title: '¿Bloquear esta cuenta?',
          html: `
            <p><strong>Usuario:</strong> ${user.correo}</p>
            <p>Esta acción impedirá que el usuario inicie sesión</p>
          `,
          input: 'textarea',
          inputLabel: 'Motivo del bloqueo',
          inputPlaceholder: 'Ingrese el motivo del bloqueo...',
          inputAttributes: {
            'aria-label': 'Motivo del bloqueo'
          },
          showCancelButton: true,
          confirmButtonText: 'Sí, bloquear',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          inputValidator: (value) => {
            if (!value) {
              return 'Debe ingresar un motivo';
            }
          }
        });
        
        if (!motivo) return;
        
        const tipo = user.esAdmin ? 'admin' : 'cliente';
        const id = user.esAdmin ? user.idAdmin : user.idCliente;
        
        // Bloquear la cuenta
        const response = await axios.post(
          `${API_URL}/bloqueo/${tipo}/${id}/bloquear`,
          { motivo }
        );
        
        if (response.data.code === '200-OK') {
          // ✅ Auditoría: Bloqueo de cuenta
          const currentUserEmail = this.$store.state.user?.result?.correo || 
                                  this.$store.state.correo || 'ADMIN';
          
          await auditService.auditBloqueoCuenta(
            currentUserEmail,
            user.correo,
            motivo
          );
          
          Swal.fire({
            icon: 'success',
            title: 'Cuenta bloqueada',
            text: 'La cuenta ha sido bloqueada correctamente'
          });
          
          // Actualizar la lista de usuarios
          await this.cargarUsuarios();
        }
      } catch (error) {
        console.error('Error al bloquear cuenta:', error);
        const msg = error?.response?.data?.message || 'Error al bloquear la cuenta';
        Swal.fire('Error', msg, 'error');
      }
    },
    
    /**
     * Desbloquear una cuenta
     */
    async desbloquearCuenta(user) {
      try {
        const result = await Swal.fire({
          title: '¿Desbloquear esta cuenta?',
          html: `
            <p><strong>Usuario:</strong> ${user.correo}</p>
            <p>El usuario podrá volver a iniciar sesión</p>
            <p><small>Los intentos fallidos se reiniciarán a 0</small></p>
          `,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, desbloquear',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#28a745'
        });
        
        if (!result.isConfirmed) return;
        
        const tipo = user.esAdmin ? 'admin' : 'cliente';
        const id = user.esAdmin ? user.idAdmin : user.idCliente;
        
        // Desbloquear la cuenta
        const response = await axios.post(
          `${API_URL}/bloqueo/${tipo}/${id}/desbloquear`
        );
        
        if (response.data.code === '200-OK') {
          // ✅ Auditoría: Desbloqueo de cuenta
          const currentUserEmail = this.$store.state.user?.result?.correo || 
                                  this.$store.state.correo || 'ADMIN';
          
          await auditService.auditDesbloqueoCuenta(
            currentUserEmail,
            user.correo
          );
          
          Swal.fire({
            icon: 'success',
            title: 'Cuenta desbloqueada',
            text: 'La cuenta ha sido desbloqueada correctamente. El usuario ya puede iniciar sesión.'
          });
          
          // Actualizar la lista de usuarios
          await this.cargarUsuarios();
        }
      } catch (error) {
        console.error('Error al desbloquear cuenta:', error);
        const msg = error?.response?.data?.message || 'Error al desbloquear la cuenta';
        Swal.fire('Error', msg, 'error');
      }
    },
    
    /**
     * Cargar lista de usuarios
     * Este método debe adaptarse según la estructura del proyecto
     */
    async cargarUsuarios() {
      try {
        // Ejemplo: Obtener clientes
        const clientesResponse = await axios.get(`${API_URL}/cliente`);
        const clientes = clientesResponse.data.map(c => ({
          ...c,
          id: c.idCliente,
          esAdmin: false
        }));
        
        // Ejemplo: Obtener administradores
        const adminsResponse = await axios.get(`${API_URL}/admin`);
        const admins = adminsResponse.data.map(a => ({
          ...a,
          id: a.idAdmin,
          esAdmin: true
        }));
        
        this.usuarios = [...clientes, ...admins];
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    }
  },
  mounted() {
    this.cargarUsuarios();
  }
};
</script>

<style scoped>
.bloqueo-container {
  padding: 20px;
}

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background: white;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user-email {
  font-weight: bold;
  font-size: 16px;
}

.user-status {
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 14px;
  display: inline-block;
  width: fit-content;
}

.user-status.activa {
  background-color: #d4edda;
  color: #155724;
}

.user-status.bloqueada {
  background-color: #f8d7da;
  color: #721c24;
}

.intentos-fallidos {
  color: #856404;
  font-size: 14px;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}
</style>

