<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <div class="popup-header">
        <h2>Gestión de Permisos</h2>
        <button @click="closePopup" class="btn-close">
          &times;
        </button>
      </div>

      <!-- Advertencia para admin principal o usuario actual -->
      <div v-if="!canEditPermissions" class="warning-box">
        <p v-if="isAdminPrincipal">
          ⚠️ <strong>Administrador Principal:</strong> Este es el administrador principal del sistema. 
          No se pueden modificar sus permisos ni su rol por seguridad.
        </p>
        <p v-else-if="isCurrentUser">
          ⚠️ <strong>Tu cuenta:</strong> No puedes modificar tus propios permisos o rol. 
          Solicita a otro administrador que realice los cambios necesarios.
        </p>
      </div>

      <div class="admin-details">
        <div class="input-group">
          <label>ID:</label>
          <input type="text" v-model="admin.idAdmin" disabled class="input-disabled">
        </div>
        <div class="input-group">
          <label>Correo:</label>
          <input type="text" v-model="admin.correo" disabled class="input-disabled">
        </div>
        <div class="input-group">
          <label>Rol:</label>
          <select v-model="selectedRolId" :disabled="!isEditingRole || !canEditPermissions" class="input-select">
            <option v-for="rol in roles" :key="rol.idRol" :value="rol.idRol">{{ rol.rol }}</option>
          </select>
        </div>
        <div class="input-group">
          <button 
            v-if="!isEditingRole" 
            @click="enableRoleEditing" 
            class="btn btn-small btn-primary"
            :disabled="!canEditPermissions"
          >
            🔄 Cambiar Rol
          </button>
          <button 
            v-else 
            @click="saveRoleChange" 
            class="btn btn-small btn-success"
          >
            💾 Guardar Rol
          </button>
        </div>
      </div>

      <hr class="separator">

      <!-- PERMISOS DEL ROL -->
      <div class="permissions-section">
        <h3>🔵 Permisos del Rol ({{  admin.rol?.rol || 'N/A' }})</h3>
        <p class="description">Estos permisos los tienen todos los administradores con este rol</p>
        <div class="chips-container role-chips">
          <span v-for="permiso in permisosRol" :key="permiso.idPermiso" class="chip chip-role">
            {{ permiso.permiso }}
          </span>
          <span v-if="permisosRol.length === 0" class="no-permissions">
            (Sin permisos de rol asignados)
          </span>
        </div>
      </div>

      <hr class="separator">

      <!-- PERMISOS ADICIONALES (PERMANENTES) -->
      <div class="permissions-section">
        <div class="section-header">
          <h3>🟢 Permisos Adicionales (Permanentes)</h3>
          <button 
            v-if="!isEditingAdicionales" 
            @click="enableAdicionalesEditing" 
            class="btn btn-small btn-primary"
            :disabled="!canEditPermissions"
          >
            ➕ Gestionar
          </button>
        </div>
        <p class="description">Permisos especiales solo para este administrador (se mantienen al cambiar de rol)</p>
        <div class="chips-container adicionales-chips">
          <span v-for="permiso in isEditingAdicionales ? editedAdicionales : permisosAdicionales" 
                :key="permiso.idPermiso" 
                class="chip chip-adicional">
            {{ permiso.permiso }}
            <button v-if="isEditingAdicionales" @click="removeAdicional(permiso.idPermiso)" class="btn-chip-remove">
              &times;
            </button>
          </span>
          <span v-if="(isEditingAdicionales ? editedAdicionales.length : permisosAdicionales.length) === 0" class="no-permissions">
            (Sin permisos adicionales)
          </span>
        </div>

        <div v-if="isEditingAdicionales" class="available-section">
          <h4>Permisos Disponibles para Agregar:</h4>
          <div class="chips-container available-chips">
            <span v-for="permiso in availableAdicionalesPermisos" :key="permiso.idPermiso" class="chip chip-available">
              {{ permiso.permiso }}
              <button @click="addAdicional(permiso.idPermiso)" class="btn-chip-add">
                +
              </button>
            </span>
            <span v-if="availableAdicionalesPermisos.length === 0" class="no-permissions">
              (Todos los permisos ya están asignados)
            </span>
          </div>
          <div class="edit-actions">
            <button @click="cancelAdicionalesEditing" class="btn btn-secondary">
              Cancelar
            </button>
            <button @click="saveAdicionales" class="btn btn-success">
              💾 Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      <hr class="separator">

      <!-- PERMISOS TEMPORALES -->
      <div class="permissions-section">
        <div class="section-header">
          <h3>🟡 Permisos Temporales</h3>
          <button 
            v-if="!showAddTemporal" 
            @click="enableTemporalAdd" 
            class="btn btn-small btn-primary"
            :disabled="!canEditPermissions"
          >
            ➕ Agregar Temporal
          </button>
        </div>
        <p class="description">Permisos con fecha de expiración (proyectos, pasantías, emergencias)</p>

        <!-- Formulario para agregar permiso temporal -->
        <div v-if="showAddTemporal" class="temporal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Permiso:</label>
              <select v-model="newTemporal.permisoId" class="input-select">
                <option value="">Seleccione un permiso</option>
                <option v-for="permiso in availableTemporalesPermisos" :key="permiso.idPermiso" :value="permiso.idPermiso">
                  {{ permiso.permiso }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Tipo de duración:</label>
              <select v-model="newTemporal.tipoDuracion" class="input-select">
                <option value="dias">Por Días</option>
                <option value="horas">Por Horas</option>
                <option value="fecha">Fecha Específica</option>
              </select>
            </div>
          </div>

          <div class="form-row" v-if="newTemporal.tipoDuracion === 'dias'">
            <div class="form-group">
              <label>Número de días:</label>
              <input type="number" v-model.number="newTemporal.dias" min="1" class="input-text" />
            </div>
          </div>

          <div class="form-row" v-if="newTemporal.tipoDuracion === 'horas'">
            <div class="form-group">
              <label>Número de horas:</label>
              <input type="number" v-model.number="newTemporal.horas" min="1" class="input-text" />
            </div>
          </div>

          <div class="form-row" v-if="newTemporal.tipoDuracion === 'fecha'">
            <div class="form-group">
              <label>Fecha y hora de finalización:</label>
              <input type="datetime-local" v-model="newTemporal.fechaFin" class="input-text" />
            </div>
          </div>

          <div class="form-group full-width">
            <label>Motivo:</label>
            <textarea v-model="newTemporal.motivo" placeholder="Ej: Proyecto especial, Pasantía, Emergencia..." class="input-textarea"></textarea>
          </div>

          <div class="edit-actions">
            <button @click="cancelTemporalAdd" class="btn btn-secondary">
              Cancelar
            </button>
            <button @click="saveTemporalPermiso" class="btn btn-success">
              💾 Asignar Permiso Temporal
            </button>
          </div>
        </div>

        <!-- Lista de permisos temporales existentes -->
        <div class="temporales-list">
          <div v-for="temporal in permisosTemporales" :key="temporal.idPermisoTemporal" class="temporal-item">
            <div class="temporal-info">
              <span class="temporal-permiso">{{ temporal.permiso?.permiso || 'Permiso desconocido' }}</span>
              <span :class="['temporal-status', isTemporalActivo(temporal) ? 'status-active' : 'status-inactive']">
                {{ isTemporalActivo(temporal) ? '✅ Activo' : '❌ Expirado' }}
              </span>
            </div>
            <div class="temporal-details">
              <span class="temporal-date">🕐 Expira: {{ formatDate(temporal.fechaFin) }}</span>
              <span class="temporal-motivo" v-if="temporal.motivo">📝 {{ temporal.motivo }}</span>
            </div>
            <div class="temporal-actions" v-if="isTemporalActivo(temporal)">
              <button @click="extendTemporal(temporal)" class="btn btn-mini btn-warning">
                ⏰ Extender
              </button>
              <button @click="revokeTemporal(temporal.idPermisoTemporal)" class="btn btn-mini btn-danger">
                ❌ Revocar
              </button>
            </div>
          </div>
          <div v-if="permisosTemporales.length === 0" class="no-permissions">
            (Sin permisos temporales)
          </div>
        </div>
      </div>

      <hr class="separator">

      <!-- RESUMEN DE PERMISOS EFECTIVOS -->
      <div class="permissions-section summary-section">
        <h3>📊 Permisos Efectivos Totales</h3>
        <p class="description">Todos los permisos que tiene actualmente este administrador</p>
        <div class="chips-container summary-chips">
          <span v-for="permiso in permisosEfectivos" :key="permiso.idPermiso" class="chip chip-summary">
            {{ permiso.permiso }}
          </span>
          <span v-if="permisosEfectivos.length === 0" class="no-permissions">
            (Sin permisos)
          </span>
        </div>
      </div>

      <div class="popup-footer">
        <button @click="closePopup" class="btn btn-secondary">
          Cerrar
        </button>
      </div>
    </div>

    <!-- Modal para extender permiso temporal -->
    <div v-if="showExtendModal" class="modal-overlay" @click.self="showExtendModal = false">
      <div class="modal-content">
        <h3>Extender Permiso Temporal</h3>
        <p><strong>Permiso:</strong> {{ extendingTemporal?.permiso.permiso }}</p>
        <div class="form-group">
          <label>Nueva fecha y hora de finalización:</label>
          <input type="datetime-local" v-model="newFechaFin" class="input-text" />
        </div>
        <div class="edit-actions">
          <button @click="showExtendModal = false" class="btn btn-secondary">
            Cancelar
          </button>
          <button @click="confirmExtend" class="btn btn-success">
            💾 Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  props: {
    show: Boolean,
    adminId: Number
  },
  data() {
    return {
      admin: {
        idAdmin: '',
        correo: '',
        rol: {
          idRol: '',
          rol: ''
        }
      },
      roles: [],
      allPermisos: [],
      permisosRol: [],
      permisosAdicionales: [],
      permisosTemporales: [],
      permisosEfectivos: [],
      
      // Edición de rol
      selectedRolId: '',
      isEditingRole: false,
      
      // Edición de permisos adicionales
      isEditingAdicionales: false,
      editedAdicionales: [],
      availableAdicionalesPermisos: [],
      
      // Gestión de permisos temporales
      showAddTemporal: false,
      availableTemporalesPermisos: [],
      newTemporal: {
        permisoId: '',
        tipoDuracion: 'dias',
        dias: 30,
        horas: 24,
        fechaFin: '',
        motivo: ''
      },
      
      // Modal de extender
      showExtendModal: false,
      extendingTemporal: null,
      newFechaFin: ''
    };
  },
  computed: {
    // Verificar si es el usuario actual (el que está logueado)
    isCurrentUser() {
      return this.$store.state.id && Number(this.adminId) === Number(this.$store.state.id);
    },
    
    // Verificar si es el administrador principal (ID 1 o rol específico)
    isAdminPrincipal() {
      // Puedes ajustar esta lógica según tu sistema
      // Opción 1: Por ID (el admin con ID 1 es el principal)
      return Number(this.adminId) === 1;
      
      // Opción 2: Por rol específico (descomenta si prefieres usar esta opción)
      // return this.admin.rol?.rol === 'Super Administrador' || this.admin.rol?.rol === 'Root';
    },
    
    // Verificar si se pueden editar los permisos de este admin
    canEditPermissions() {
      // No se puede editar al admin principal
      if (this.isAdminPrincipal) {
        return false;
      }
      // Un admin no puede editarse a sí mismo
      if (this.isCurrentUser) {
        return false;
      }
      return true;
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchData();
      }
    }
  },
  methods: {
    async fetchData() {
      try {
        // Obtener datos del admin
        const adminResponse = await axios.get(`http://localhost:9999/api/v1/admin/${this.adminId}`);
        this.admin = adminResponse.data.result;
        this.selectedRolId = this.admin.rol.idRol;

        // Obtener todos los roles
        const rolesResponse = await axios.get('http://localhost:9999/api/v1/rol');
        this.roles = rolesResponse.data.result;

        // Obtener todos los permisos disponibles
        const permisosResponse = await axios.get('http://localhost:9999/api/v1/permiso');
        this.allPermisos = permisosResponse.data.result;

        // Obtener resumen de permisos del admin
        const resumenResponse = await axios.get(
          `http://localhost:9999/api/v1/gestion-permisos/admin/${this.adminId}/resumen`
        );
        const resumen = resumenResponse.data.result;

        this.permisosRol = resumen.permisosRol || [];
        this.permisosAdicionales = resumen.permisosAdicionales || [];
        this.permisosEfectivos = resumen.permisosEfectivos || [];

        // Obtener permisos temporales con información completa (fecha, motivo, estado)
        try {
          const temporalesResponse = await axios.get(
            `http://localhost:9999/api/v1/permiso-temporal/admin/${this.adminId}`
          );
          this.permisosTemporales = temporalesResponse.data.result || [];
        } catch (error) {
          console.error('Error al obtener permisos temporales:', error);
          this.permisosTemporales = [];
        }

        this.editedAdicionales = [...this.permisosAdicionales];
        this.updateAvailablePermisos();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos del administrador', 'error');
      }
    },

    updateAvailablePermisos() {
      // Obtener todos los IDs de permisos que ya tiene el admin
      const idsRol = this.permisosRol.map(p => p.idPermiso);
      const idsAdicionales = this.editedAdicionales.map(p => p.idPermiso);
      const idsTemporales = this.permisosTemporales
        .filter(t => this.isTemporalActivo(t))
        .map(t => t.permiso.idPermiso);
      
      // Combinar todos los IDs que ya están asignados
      const todosLosIds = [...new Set([...idsRol, ...idsAdicionales, ...idsTemporales])];
      
      console.log('IDs de permisos de rol:', idsRol);
      console.log('IDs de permisos adicionales editados:', idsAdicionales);
      console.log('IDs de permisos temporales activos:', idsTemporales);
      console.log('Todos los IDs ya asignados:', todosLosIds);

      // Permisos disponibles para adicionales (excluir los que ya tiene en cualquier categoría)
      this.availableAdicionalesPermisos = this.allPermisos.filter(
        p => !todosLosIds.includes(p.idPermiso)
      );

      // Permisos disponibles para temporales (excluir los que ya tiene en cualquier categoría)
      this.availableTemporalesPermisos = this.allPermisos.filter(
        p => !todosLosIds.includes(p.idPermiso)
      );

      console.log('Permisos disponibles para adicionales:', this.availableAdicionalesPermisos.length);
      console.log('Permisos disponibles para temporales:', this.availableTemporalesPermisos.length);
    },

    // ===== GESTIÓN DE ROL =====
    enableRoleEditing() {
      this.isEditingRole = true;
    },

    async saveRoleChange() {
      try {
        // Validación 1: Verificar si es el admin principal
        if (this.isAdminPrincipal) {
          Swal.fire({
            icon: 'error',
            title: 'Operación no permitida',
            text: 'No puedes cambiar el rol del administrador principal del sistema.'
          });
          this.isEditingRole = false;
          return;
        }

        // Validación 2: Verificar si es el usuario actual
        if (this.isCurrentUser) {
          Swal.fire({
            icon: 'error',
            title: 'Operación no permitida',
            text: 'No puedes cambiar tu propio rol. Solicita a otro administrador que lo haga.'
          });
          this.isEditingRole = false;
          return;
        }

        if (this.selectedRolId === this.admin.rol.idRol) {
          Swal.fire('Info', 'El rol no ha cambiado', 'info');
          this.isEditingRole = false;
          return;
        }

        // Confirmar el cambio de rol
        const confirmResult = await Swal.fire({
          title: '¿Cambiar rol del administrador?',
          html: `
            <p><strong>IMPORTANTE:</strong> Al cambiar el rol se eliminarán:</p>
            <ul style="text-align: left; margin: 10px 40px;">
              <li>✖️ Todos los permisos adicionales (${this.permisosAdicionales.length})</li>
              <li>✖️ Todos los permisos temporales (${this.permisosTemporales.length})</li>
            </ul>
            <p>Solo mantendrá los permisos del nuevo rol.</p>
          `,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, cambiar rol',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33'
        });

        if (!confirmResult.isConfirmed) {
          return;
        }

        // 1. Limpiar TODOS los permisos personales (adicionales + temporales) con el nuevo endpoint
        console.log('Limpiando todos los permisos personales del admin...');
        try {
          const limpiarResponse = await axios.delete(
            `http://localhost:9999/api/v1/gestion-permisos/admin/${this.adminId}/limpiar-todos-permisos`
          );
          console.log('Respuesta de limpieza de permisos:', limpiarResponse.data);
        } catch (error) {
          console.error('Error al limpiar permisos:', error);
          // Continuar con el cambio de rol aunque falle la limpieza
        }

        // 2. Cambiar el rol
        const response = await axios.put(
          `http://localhost:9999/api/v1/admin/updateRole/${this.adminId}`,
          { rolId: this.selectedRolId }
        );

        if (response.data.code === '200-OK') {
          const msg = response.data.message || 'Rol actualizado correctamente. Todos los permisos personales han sido eliminados.';
          Swal.fire('Éxito', msg, 'success');
          this.isEditingRole = false;
          await this.fetchData();
          this.emitPermissionsUpdate();
          this.$emit('update');
        }
      } catch (error) {
        console.error('Error al cambiar el rol:', error);
        const msg = error?.response?.data?.message || 'Error al cambiar el rol';
        Swal.fire('Error', msg, 'error');
      }
    },

    // ===== GESTIÓN DE PERMISOS ADICIONALES =====
    enableAdicionalesEditing() {
      // Validación: No se puede editar al admin principal
      if (this.isAdminPrincipal) {
        Swal.fire({
          icon: 'error',
          title: 'Operación no permitida',
          text: 'No puedes modificar los permisos del administrador principal del sistema.'
        });
        return;
      }

      // Validación: No se puede editar a sí mismo
      if (this.isCurrentUser) {
        Swal.fire({
          icon: 'error',
          title: 'Operación no permitida',
          text: 'No puedes modificar tus propios permisos. Solicita a otro administrador que lo haga.'
        });
        return;
      }

      this.isEditingAdicionales = true;
      this.editedAdicionales = [...this.permisosAdicionales];
      this.updateAvailablePermisos();
    },

    addAdicional(permisoId) {
      const permiso = this.allPermisos.find(p => p.idPermiso === permisoId);
      if (permiso && !this.editedAdicionales.some(p => p.idPermiso === permisoId)) {
        this.editedAdicionales.push(permiso);
        this.updateAvailablePermisos();
      }
    },

    removeAdicional(permisoId) {
      this.editedAdicionales = this.editedAdicionales.filter(p => p.idPermiso !== permisoId);
      this.updateAvailablePermisos();
    },

    cancelAdicionalesEditing() {
      this.isEditingAdicionales = false;
      this.editedAdicionales = [...this.permisosAdicionales];
      this.updateAvailablePermisos();
    },

    async saveAdicionales() {
      try {
        const currentIds = this.permisosAdicionales.map(p => p.idPermiso);
        const newIds = this.editedAdicionales.map(p => p.idPermiso);

        console.log('IDs actuales:', currentIds);
        console.log('IDs nuevos:', newIds);

        // Permisos a agregar
        const toAdd = newIds.filter(id => !currentIds.includes(id));
        
        // Permisos a eliminar
        const toRemove = currentIds.filter(id => !newIds.includes(id));

        console.log('Permisos a agregar:', toAdd);
        console.log('Permisos a eliminar:', toRemove);

        // Eliminar permisos primero
        for (const permisoId of toRemove) {
          console.log(`Eliminando permiso adicional ${permisoId} del admin ${this.adminId}`);
          const deleteResponse = await axios.delete(
            `http://localhost:9999/api/v1/gestion-permisos/admin/${this.adminId}/permiso-adicional/${permisoId}`
          );
          console.log('Respuesta de eliminación:', deleteResponse.data);
        }

        // Agregar nuevos permisos
        for (const permisoId of toAdd) {
          console.log(`Agregando permiso adicional ${permisoId} al admin ${this.adminId}`);
          const addResponse = await axios.post(
            `http://localhost:9999/api/v1/gestion-permisos/admin/${this.adminId}/permiso-adicional`,
            { permisoId }
          );
          console.log('Respuesta de adición:', addResponse.data);
        }

        const msg = `Permisos actualizados: ${toAdd.length} agregados, ${toRemove.length} eliminados`;
        Swal.fire('Éxito', msg, 'success');
        this.isEditingAdicionales = false;
        await this.fetchData();
        this.emitPermissionsUpdate();
      } catch (error) {
        console.error('Error al guardar permisos adicionales:', error);
        console.error('Detalle del error:', error.response?.data);
        const msg = error?.response?.data?.message || 'Error al guardar los permisos';
        Swal.fire('Error', msg, 'error');
      }
    },

    // ===== GESTIÓN DE PERMISOS TEMPORALES =====
    enableTemporalAdd() {
      // Validación: No se puede editar al admin principal
      if (this.isAdminPrincipal) {
        Swal.fire({
          icon: 'error',
          title: 'Operación no permitida',
          text: 'No puedes asignar permisos temporales al administrador principal del sistema.'
        });
        return;
      }

      // Validación: No se puede editar a sí mismo
      if (this.isCurrentUser) {
        Swal.fire({
          icon: 'error',
          title: 'Operación no permitida',
          text: 'No puedes asignar permisos temporales a ti mismo. Solicita a otro administrador que lo haga.'
        });
        return;
      }

      this.showAddTemporal = true;
    },

    cancelTemporalAdd() {
      this.showAddTemporal = false;
      this.newTemporal = {
        permisoId: '',
        tipoDuracion: 'dias',
        dias: 30,
        horas: 24,
        fechaFin: '',
        motivo: ''
      };
    },

    async saveTemporalPermiso() {
      try {
        if (!this.newTemporal.permisoId) {
          Swal.fire('Error', 'Debe seleccionar un permiso', 'error');
          return;
        }

        if (!this.newTemporal.motivo) {
          Swal.fire('Error', 'Debe ingresar un motivo', 'error');
          return;
        }

        // Validar que el permiso no esté ya asignado en ninguna categoría
        const permisoId = parseInt(this.newTemporal.permisoId);
        
        // Verificar en permisos de rol
        const yaEnRol = this.permisosRol.some(p => p.idPermiso === permisoId);
        if (yaEnRol) {
          Swal.fire('Error', 'Este permiso ya está asignado en los permisos del rol', 'error');
          return;
        }

        // Verificar en permisos adicionales
        const yaEnAdicionales = this.permisosAdicionales.some(p => p.idPermiso === permisoId);
        if (yaEnAdicionales) {
          Swal.fire('Error', 'Este permiso ya está asignado como permiso adicional', 'error');
          return;
        }

        // Verificar en permisos temporales activos
        const yaEnTemporales = this.permisosTemporales.some(
          t => this.isTemporalActivo(t) && t.permiso.idPermiso === permisoId
        );
        if (yaEnTemporales) {
          Swal.fire('Error', 'Este permiso ya está asignado como permiso temporal activo', 'error');
          return;
        }

        let endpoint = '';
        let body = {
          adminId: this.adminId,
          permisoId: this.newTemporal.permisoId,
          motivo: this.newTemporal.motivo
        };

        if (this.newTemporal.tipoDuracion === 'dias') {
          endpoint = 'http://localhost:9999/api/v1/permiso-temporal/asignar-por-dias';
          body.dias = this.newTemporal.dias;
        } else if (this.newTemporal.tipoDuracion === 'horas') {
          endpoint = 'http://localhost:9999/api/v1/permiso-temporal/asignar-por-horas';
          body.horas = this.newTemporal.horas;
        } else if (this.newTemporal.tipoDuracion === 'fecha') {
          if (!this.newTemporal.fechaFin) {
            Swal.fire('Error', 'Debe ingresar una fecha de finalización', 'error');
            return;
          }
          endpoint = 'http://localhost:9999/api/v1/permiso-temporal/asignar';
          body.fechaFin = this.newTemporal.fechaFin.replace('T', ' ') + ':00';
        }

        const response = await axios.post(endpoint, body);

        if (response.data.code === '200-OK') {
          Swal.fire('Éxito', 'Permiso temporal asignado correctamente', 'success');
          this.cancelTemporalAdd();
          await this.fetchData();
          this.emitPermissionsUpdate();
        }
      } catch (error) {
        console.error('Error al asignar permiso temporal:', error);
        const msg = error?.response?.data?.message || 'Error al asignar el permiso temporal';
        Swal.fire('Error', msg, 'error');
      }
    },

    extendTemporal(temporal) {
      this.extendingTemporal = temporal;
      // Convertir la fecha actual a formato datetime-local
      const fecha = new Date(temporal.fechaFin);
      const offset = fecha.getTimezoneOffset();
      const localDate = new Date(fecha.getTime() - (offset * 60 * 1000));
      this.newFechaFin = localDate.toISOString().slice(0, 16);
      this.showExtendModal = true;
    },

    async confirmExtend() {
      try {
        if (!this.newFechaFin) {
          Swal.fire('Error', 'Debe ingresar una nueva fecha', 'error');
          return;
        }

        const response = await axios.put(
          `http://localhost:9999/api/v1/permiso-temporal/${this.extendingTemporal.idPermisoTemporal}/extender`,
          {
            nuevaFechaFin: this.newFechaFin.replace('T', ' ') + ':00'
          }
        );

        if (response.data.code === '200-OK') {
          Swal.fire('Éxito', 'Permiso temporal extendido correctamente', 'success');
          this.showExtendModal = false;
          await this.fetchData();
          this.emitPermissionsUpdate();
        }
      } catch (error) {
        console.error('Error al extender permiso temporal:', error);
        const msg = error?.response?.data?.message || 'Error al extender el permiso';
        Swal.fire('Error', msg, 'error');
      }
    },

    async revokeTemporal(idPermisoTemporal) {
      try {
        const result = await Swal.fire({
          title: '¿Está seguro?',
          text: 'Se revocará este permiso temporal',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, revocar',
          cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
          const response = await axios.put(
            `http://localhost:9999/api/v1/permiso-temporal/${idPermisoTemporal}/revocar`
          );

          if (response.data.code === '200-OK') {
            Swal.fire('Éxito', 'Permiso temporal revocado correctamente', 'success');
            await this.fetchData();
            this.emitPermissionsUpdate();
          }
        }
      } catch (error) {
        console.error('Error al revocar permiso temporal:', error);
        const msg = error?.response?.data?.message || 'Error al revocar el permiso';
        Swal.fire('Error', msg, 'error');
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        const date = new Date(dateString);
        // Verificar si la fecha es válida
        if (isNaN(date.getTime())) return 'N/A';
        
        return date.toLocaleString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'N/A';
      }
    },

    isTemporalActivo(temporal) {
      // Verificar primero si tiene la propiedad activo del backend
      if (temporal.hasOwnProperty('activo')) {
        return temporal.activo;
      }
      
      // Si no, verificar manualmente comparando con la fecha actual
      if (!temporal.fechaFin) return false;
      
      try {
        const fechaFin = new Date(temporal.fechaFin);
        const ahora = new Date();
        return fechaFin > ahora;
      } catch (error) {
        return false;
      }
    },

    emitPermissionsUpdate() {
      this.$emit('permissionsSaved', {
        adminId: this.adminId,
        permisosEfectivos: this.permisosEfectivos
      });
      this.$emit('update');
    },

    closePopup() {
      this.isEditingRole = false;
      this.isEditingAdicionales = false;
      this.showAddTemporal = false;
      this.showExtendModal = false;
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
/* --- 1. POPUP BASE --- */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
  overflow-y: auto;
  padding: 20px 0;
}

.popup-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow-y: auto;
  margin: auto;
}

/* --- 2. CABECERA Y DETALLES --- */
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.popup-header h2 {
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1;
}

.btn-close:hover {
  color: #333;
}

/* --- CAJA DE ADVERTENCIA --- */
.warning-box {
  background-color: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.warning-box p {
  margin: 0;
  color: #856404;
  font-size: 0.95rem;
  line-height: 1.5;
}

.warning-box strong {
  color: #664d03;
}

.admin-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
}

.input-disabled {
  background-color: #f5f5f5;
  color: #888;
}

.input-select:disabled {
  opacity: 0.7;
}

/* --- 3. SECCIONES DE PERMISOS --- */
.separator {
  border: 0;
  height: 1px;
  background-color: #e0e0e0;
  margin: 25px 0;
}

.permissions-section {
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.permissions-section h3 {
  font-size: 1.15rem;
  color: #333;
  margin: 0 0 10px 0;
}

.permissions-section h4 {
  font-size: 1rem;
  color: #555;
  margin: 15px 0 10px 0;
}

.description {
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0 15px 0;
  font-style: italic;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  min-height: 40px;
}

.role-chips {
  border: 1px solid #bbdefb;
  background-color: #f5f9ff;
}

.adicionales-chips {
  border: 1px solid #c8e6c9;
  background-color: #f1f8f4;
}

.available-chips {
  border: 1px solid #fff9c4;
  background-color: #fffef7;
}

.summary-chips {
  border: 1px solid #e1bee7;
  background-color: #f9f5fa;
}

.chip {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 20px;
  white-space: nowrap;
}

.chip-role {
  background-color: #e3f2fd;
  color: #1976d2;
  border: 1px solid #90caf9;
}

.chip-adicional {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.chip-available {
  background-color: #fffde7;
  color: #f9a825;
  border: 1px solid #fff59d;
}

.chip-summary {
  background-color: #f3e5f5;
  color: #7b1fa2;
  border: 1px solid #ce93d8;
}

.chip button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
  transition: transform 0.1s;
}

.btn-chip-remove {
  color: #e57373;
}

.btn-chip-remove:hover {
  transform: scale(1.2);
}

.btn-chip-add {
  color: #64b5f6;
}

.btn-chip-add:hover {
  transform: scale(1.2);
}

.no-permissions {
  color: #a0a0a0;
  font-style: italic;
  padding: 6px 10px;
}

/* --- 4. FORMULARIOS --- */
.temporal-form,
.available-section {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
  font-size: 0.9rem;
}

.input-text,
.input-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 0.9rem;
}

.input-textarea {
  resize: vertical;
  min-height: 60px;
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

/* --- 5. LISTA DE PERMISOS TEMPORALES --- */
.temporales-list {
  margin-top: 15px;
}

.temporal-item {
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  margin-bottom: 10px;
}

.temporal-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.temporal-permiso {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.temporal-status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-active {
  background-color: #c8e6c9;
  color: #2e7d32;
}

.status-inactive {
  background-color: #ffcdd2;
  color: #c62828;
}

.temporal-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #666;
}

.temporal-date,
.temporal-motivo {
  display: block;
}

.temporal-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* --- 6. BOTONES --- */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn:disabled:hover {
  opacity: 0.5;
  transform: none;
}

.btn-small {
  padding: 6px 12px;
  font-size: 0.85rem;
}

.btn-mini {
  padding: 4px 8px;
  font-size: 0.8rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #1e7e34;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-warning {
  background-color: #ffc107;
  color: #333;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

/* --- 7. FOOTER --- */
.popup-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #eee;
  margin-top: 20px;
}

.summary-section {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
}

/* --- 8. MODAL PARA EXTENDER --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-content h3 {
  margin-top: 0;
  color: #333;
}

.modal-content p {
  margin: 10px 0;
  color: #666;
}

/* --- 9. RESPONSIVE --- */
@media (max-width: 768px) {
  .popup-content {
    width: 95%;
    padding: 20px;
  }

  .admin-details {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
