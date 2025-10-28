<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <div class="popup-header">
        <h2>Gestión de Permisos</h2>
        <button @click="closePopup" class="btn-close">
          &times;
        </button>
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
          <select v-model="admin.rol.idRol" :disabled="!isEditing" class="input-select">
            <option v-for="rol in roles" :key="rol.idRol" :value="rol.idRol">{{ rol.rol }}</option>
          </select>
        </div>
      </div>

      <hr class="separator">

      <div class="permissions-section">
        <h3>Permisos Asignados (Actuales)</h3>
        <div class="chips-container current-chips">
          <span v-for="permiso in isEditing ? editedPermisos : currentPermisos" :key="permiso.idPermiso" class="chip chip-success">
            {{ permiso.permiso }}
            <button v-if="isEditing" @click="removePermiso(permiso.idPermiso)" class="btn-chip-remove">
              &times;
            </button>
          </span>
          <span v-if="(isEditing ? editedPermisos.length : currentPermisos.length) === 0" class="no-permissions">
             (Sin permisos asignados)
          </span>
        </div>
      </div>

      <div v-if="isEditing" class="permissions-section">
        <h3>Permisos Disponibles</h3>
        <div class="chips-container available-chips">
          <span v-for="permiso in availablePermisos" :key="permiso.idPermiso" class="chip chip-info">
            {{ permiso.permiso }}
            <button @click="addPermiso(permiso.idPermiso)" class="btn-chip-add">
              +
            </button>
          </span>
          <span v-if="availablePermisos.length === 0" class="no-permissions">
             (No hay permisos disponibles)
          </span>
        </div>
      </div>

      <hr class="separator">

      <div class="popup-actions">
        <button v-if="!isEditing" @click="enableEditing" class="btn btn-primary">
          📝 Editar Permisos y Rol
        </button>
        <template v-else>
          <button @click="closePopup" class="btn btn-secondary">
            Cancelar
          </button>
          <button @click="savePermissions" class="btn btn-success">
            💾 Guardar Cambios
          </button>
        </template>
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
          idRol: ''
        }
      },
      roles: [],
      allPermisos: [],
      // Permisos locales adicionales (frontend only)
      extraPermisos: [
        { idPermiso: -101, permiso: 'Editar usuario' },
        { idPermiso: -102, permiso: 'Desactivar usuario' },
        { idPermiso: -103, permiso: 'Ver lista de usuarios' },
        { idPermiso: -104, permiso: 'Asignar roles' },
        { idPermiso: -105, permiso: 'Revisar accesos de red' },
        { idPermiso: -106, permiso: 'Subir documentos internos' },
        { idPermiso: -107, permiso: 'Ver documentos internos' },
        { idPermiso: -108, permiso: 'Registrar cuentas' },
        { idPermiso: -109, permiso: 'Editar cuentas' },
        { idPermiso: -110, permiso: 'Eliminar comprobante' },
        { idPermiso: -111, permiso: 'Ver reportes contables' },
        { idPermiso: -112, permiso: 'Crear solicitud de viaje' }
      ],
      currentPermisos: [],
      availablePermisos: [],
      isEditing: false,
      editedPermisos: [],
      originalRolId: ''
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchData();
      }
    },
    // Cuando se cambie el rol mientras estamos editando, aplicar permisos por defecto del rol
    'admin.rol.idRol'(newVal, oldVal) {
      if (this.isEditing && newVal) {
        // Buscar el nombre del rol en la lista de roles
        const rolObj = this.roles.find(r => String(r.idRol) === String(newVal));
        if (rolObj && rolObj.rol) {
          this.applyRoleDefaults(rolObj.rol);
        }
      }
    }
  },
  methods: {
    applyRoleDefaults(roleName) {
      if (!roleName) return;
      const name = String(roleName).toLowerCase().trim();
      const roleDefaults = {
        'tecnologia': ['Editar usuario', 'Desactivar usuario', 'Ver lista de usuarios', 'Revisar accesos de red'],
        'gerente': ['Ver documentos internos', 'Ver reportes contables'],
        'seguridad': ['Asignar roles', 'Revisar accesos de red'],
        'contador': ['Registrar cuentas', 'Editar cuentas', 'Eliminar comprobante', 'Ver reportes contables'],
        'auditor': ['Ver lista de usuarios', 'Ver documentos internos', 'Ver reportes contables'],
        'pasantes ti': ['Subir documentos internos', 'Ver documentos internos'],
        'usuario': ['Editar usuario']
      };

      const defaults = roleDefaults[name];
      if (!defaults) return;

      // Encontrar los objetos de permiso en allPermisos por nombre (case-insensitive)
      const matched = [];
      defaults.forEach(d => {
        const found = this.allPermisos.find(p => String(p.permiso).toLowerCase() === String(d).toLowerCase());
        if (found) matched.push(found);
      });

      // Si no se encontraron algunos permisos porque no existen, intentar buscarlos en extraPermisos
      if (matched.length < defaults.length) {
        defaults.forEach(d => {
          const exists = matched.some(m => String(m.permiso).toLowerCase() === String(d).toLowerCase());
          if (!exists) {
            const extra = this.extraPermisos.find(p => String(p.permiso).toLowerCase() === String(d).toLowerCase());
            if (extra) matched.push(extra);
          }
        });
      }

      // Reemplazar los permisos editados por los defaults encontrados
      if (matched.length) {
        this.editedPermisos = matched.slice();
        this.updateAvailablePermisos();
      }
    },
    async fetchData() {
      try {
        const adminResponse = await axios.get(`http://localhost:9999/api/v1/admin/${this.adminId}`);
        this.admin = adminResponse.data.result;
        this.originalRolId = this.admin.rol.idRol;

        const rolesResponse = await axios.get('http://localhost:9999/api/v1/rol');
        this.roles = rolesResponse.data.result;

        const allPermisosResponse = await axios.get('http://localhost:9999/api/v1/permiso');
        this.allPermisos = allPermisosResponse.data.result || [];
        // Añadir permisos locales si no existen en la lista del backend
        this.extraPermisos.forEach(extra => {
          const exists = this.allPermisos.some(p => p.permiso === extra.permiso);
          if (!exists) {
            this.allPermisos.push(extra);
          }
        });

        const userPermisosResponse = await axios.get(`http://localhost:9999/api/v1/adminpermiso/admin/${this.adminId}`);
        // mapear a objetos { idPermiso, permiso }
        this.currentPermisos = userPermisosResponse.data.result.map(item => item.permiso);

        // Si existe un override frontend para este admin, usarlo en lugar de lo que venga del backend
        try {
          const overrides = this.$store && this.$store.state && this.$store.state.sidebarOverrides;
          if (overrides && overrides[String(this.adminId)] && overrides[String(this.adminId)].length) {
            this.currentPermisos = overrides[String(this.adminId)];
          }
        } catch (e) {
          // no bloquear si falla
          console.error('Error leyendo overrides del store:', e);
        }

        this.editedPermisos = [...this.currentPermisos];

        this.updateAvailablePermisos();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },
    updateAvailablePermisos() {
      this.availablePermisos = this.allPermisos.filter(permiso => 
        !this.editedPermisos.some(currentPermiso => currentPermiso.idPermiso === permiso.idPermiso)
      );
    },
    enableEditing() {
      this.isEditing = true;
      this.editedPermisos = [...this.currentPermisos];
      this.admin.rol.idRol = this.originalRolId;
      this.updateAvailablePermisos();
    },
    async savePermissions() {
      try {
        // Nota: operación frontend-only (no cambios en backend)
        // Actualizar rol localmente
        if (this.admin.rol.idRol !== this.originalRolId) {
          this.originalRolId = this.admin.rol.idRol;
        }

        // Reemplazar permisos actuales por los editados (frontend)
        this.currentPermisos = [...this.editedPermisos];

        this.isEditing = false;
        Swal.fire('Éxito', 'Cambios aplicados en el frontend (no persistidos)', 'success');
        // Emitir evento con permisos asignados (objetos completos) para que el padre/otros componentes los usen
        const permisoObjects = this.currentPermisos.map(p => ({ idPermiso: p.idPermiso, permiso: p.permiso }));
        this.$emit('permissionsSaved', {
          adminId: this.adminId,
          permisos: permisoObjects
        });
        // Guardar override en el store para que la UI no sea sobreescrita por refrescos del backend
        try {
          if (this.$store && this.$store.commit) {
            this.$store.commit('setSidebarOverride', { adminId: this.adminId, permisos: permisoObjects });
            // Actualizar también la lista que muestra la sidebar (solo nombres)
            this.$store.commit('setSidebarPermisos', permisoObjects.map(p => p.permiso));
          }
        } catch (e) {
          console.error('No se pudo guardar override en el store:', e);
        }
        this.$emit('update');
        this.closePopup();
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        Swal.fire('Error', 'Hubo un problema al aplicar los cambios', 'error');
      }
    },
    addPermiso(permisoId) {
      const permiso = this.availablePermisos.find(p => p.idPermiso === permisoId);
      if (permiso) {
        this.editedPermisos.push(permiso);
        this.updateAvailablePermisos();
      }
    },
    removePermiso(permisoId) {
      this.editedPermisos = this.editedPermisos.filter(p => p.idPermiso !== permisoId);
      this.updateAvailablePermisos();
    },
    closePopup() {
      this.isEditing = false;
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
  background: rgba(0, 0, 0, 0.6); /* Oscurecido más fuerte */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Z-index alto */
}

.popup-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 700px; /* Ancho máximo para no ser demasiado grande */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow-y: auto;
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

.admin-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}

.input-group label {
  display: block;
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
  background-color: #f5f5f5; /* Color para campos deshabilitados */
  color: #888;
}

.input-select:disabled {
  opacity: 0.7;
}

/* --- 3. CHIPS (PERMISOS) --- */
.separator {
    border: 0;
    height: 1px;
    background-color: #e0e0e0;
    margin: 25px 0;
}

.permissions-section h3 {
    font-size: 1.15rem;
    color: #333;
    margin-bottom: 15px;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Espacio entre los chips */
  padding: 10px;
  border-radius: 8px;
  min-height: 40px;
}

.current-chips {
  border: 1px solid #c8e6c9; /* Borde suave para permisos asignados */
}

.available-chips {
  border: 1px solid #fff9c4; /* Borde suave para permisos disponibles */
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

.chip-success {
  background-color: #e8f5e9; /* Verde claro */
  color: #2e7d32; /* Texto verde oscuro */
  border: 1px solid #a5d6a7;
}

.chip-info {
  background-color: #fffde7; /* Amarillo muy claro */
  color: #f9a825; /* Texto amarillo/naranja */
  border: 1px solid #fff59d;
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
  color: #e57373; /* Rojo suave para eliminar */
}
.btn-chip-remove:hover {
  transform: scale(1.1);
}

.btn-chip-add {
  color: #64b5f6; /* Azul suave para añadir */
}
.btn-chip-add:hover {
  transform: scale(1.1);
}

.no-permissions {
    color: #a0a0a0;
    font-style: italic;
    padding: 6px 10px;
}

/* --- 4. BOTONES DE ACCIÓN (FOOTER) --- */
.popup-actions {
  display: flex;
  justify-content: flex-end; /* Alineación a la derecha */
  gap: 10px;
  padding-top: 15px;
}

/* Estilos de botones unificados */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745; /* Verde para la acción principal de 'Guardar' */
  color: white;
}
.btn-success:hover {
  background-color: #1e7e34;
}

.btn-secondary {
  background-color: #6c757d; /* Gris para acciones secundarias como 'Cancelar' */
  color: white;
}
.btn-secondary:hover {
  background-color: #5a6268;
}
</style>