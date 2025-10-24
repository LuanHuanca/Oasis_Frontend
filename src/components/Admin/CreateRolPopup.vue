<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <div class="popup-header">
        <h2>Crear nuevo rol</h2>
        <button @click="closePopup" class="btn-close">&times;</button>
      </div>

      <form @submit.prevent="saveRole">
        <div class="form-group">
          <label for="rolName">Nombre del rol:</label>
          <input 
            id="rolName" 
            v-model="newRole.nombre" 
            required 
            class="form-control"
            placeholder="Ingrese el nombre del rol"
          />
        </div>

        <div class="form-group">
          <h3>Permisos predeterminados</h3>
          <div class="permisos-container">
            <div v-if="loading" class="loading">Cargando permisos...</div>
            <template v-else>
              <div class="selected-permisos">
                <h4>Permisos seleccionados:</h4>
                <div class="chips-container">
                  <span 
                    v-for="permiso in selectedPermisos" 
                    :key="permiso.idPermiso" 
                    class="chip chip-success"
                  >
                    {{ permiso.permiso }}
                    <button 
                      type="button"
                      @click="removePermiso(permiso)" 
                      class="btn-chip-remove"
                    >
                      &times;
                    </button>
                  </span>
                  <span v-if="selectedPermisos.length === 0" class="no-permisos">
                    (Ningún permiso seleccionado)
                  </span>
                </div>
              </div>

              <div class="available-permisos">
                <h4>Permisos disponibles:</h4>
                <div class="chips-container">
                  <span 
                    v-for="permiso in availablePermisos" 
                    :key="permiso.idPermiso" 
                    class="chip chip-info"
                  >
                    {{ permiso.permiso }}
                    <button 
                      type="button"
                      @click="addPermiso(permiso)" 
                      class="btn-chip-add"
                    >
                      +
                    </button>
                  </span>
                  <span v-if="availablePermisos.length === 0" class="no-permisos">
                    (No hay permisos disponibles)
                  </span>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="popup-actions">
          <button type="button" @click="closePopup" class="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">
            Crear rol
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'CreateRolPopup',
  props: {
    show: Boolean
  },
  data() {
    return {
      newRole: {
        nombre: ''
      },
      allPermisos: [],
      selectedPermisos: [],
      loading: true
    };
  },
  computed: {
    availablePermisos() {
      return this.allPermisos.filter(permiso => 
        !this.selectedPermisos.some(selected => selected.idPermiso === permiso.idPermiso)
      );
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchPermisos();
      }
    }
  },
  methods: {
    async fetchPermisos() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost:9999/api/v1/permiso');
        this.allPermisos = response.data.result;
      } catch (error) {
        console.error('Error al obtener permisos:', error);
        Swal.fire('Error', 'No se pudieron cargar los permisos', 'error');
      } finally {
        this.loading = false;
      }
    },
    addPermiso(permiso) {
      this.selectedPermisos.push(permiso);
    },
    removePermiso(permiso) {
      this.selectedPermisos = this.selectedPermisos.filter(p => p.idPermiso !== permiso.idPermiso);
    },
    async saveRole() {
      try {
        // Crear el rol
        const roleResponse = await axios.post('http://localhost:9999/api/v1/rol/create', {
          rol: this.newRole.nombre
        });

        const rolId = roleResponse.data.result.idRol;

        // Asignar permisos al rol
        for (const permiso of this.selectedPermisos) {
          await axios.post('http://localhost:9999/api/v1/rolpermiso/create', {
            rol: { idRol: rolId },
            permiso: { idPermiso: permiso.idPermiso }
          });
        }

        Swal.fire('Éxito', 'Rol creado exitosamente', 'success');
        this.$emit('created');
        this.closePopup();
      } catch (error) {
        console.error('Error al crear el rol:', error);
        Swal.fire('Error', 'No se pudo crear el rol', 'error');
      }
    },
    closePopup() {
      this.newRole.nombre = '';
      this.selectedPermisos = [];
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
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
}

.popup-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.permisos-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.9em;
}

.chip-success {
  background-color: #d4edda;
  color: #155724;
}

.chip-info {
  background-color: #cce5ff;
  color: #004085;
}

.btn-chip-remove, 
.btn-chip-add {
  background: none;
  border: none;
  margin-left: 6px;
  cursor: pointer;
  font-size: 1.1em;
  padding: 0 4px;
}

.btn-chip-remove {
  color: #721c24;
}

.btn-chip-add {
  color: #004085;
}

.popup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.no-permisos {
  color: #666;
  font-style: italic;
}

.selected-permisos,
.available-permisos {
  margin-bottom: 15px;
}

h4 {
  margin-bottom: 8px;
  color: #333;
}
</style>