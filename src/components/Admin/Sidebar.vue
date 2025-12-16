<template> 
  <div>
    <div class="sidebar-container" :class="{ 'collapsed': isCollapsed }">
      <button class="toggle-sidebar-button" @click="toggleCollapse">
        <span v-if="isCollapsed">☰</span>
        <span v-else>☰</span>
      </button>
      <nav class="sidebar" :style="{ width: isCollapsed ? '60px' : '280px' }">
        <ul class="nav flex-column">
          <!-- Renderizar elementos dinámicos basados en permisos de la BD -->
          <template v-for="item in dynamicItems" :key="item.key">
            <li class="nav-item" v-if="hasPermission(item.permiso)">
              <!-- Item sin submenú -->
              <div v-if="!item.submenu" class="nav-link" @click="selectOption(item.key)">
                <span v-if="isCollapsed" v-text="item.icon"></span>
                <span v-else v-text="item.label"></span>
              </div>
              
              <!-- Item con submenú (Gestión de Viajes) -->
              <div v-else>
                <div class="nav-link nav-link-parent" @click="toggleSubMenu">
                  <span v-if="isCollapsed" v-text="item.icon"></span>
                  <span v-else>
                    <span v-text="item.label"></span>
                    <span class="submenu-arrow">{{ showViajesMenu ? '▼' : '▶' }}</span>
                  </span>
                </div>
                <!-- Submenú de Viajes -->
                <ul v-if="showViajesMenu && !isCollapsed" class="submenu">
                  <li @click="selectOption('hotels')" class="submenu-item">
                    <span>🏨 Reservas Hoteles</span>
                  </li>
                  <li @click="selectOption('flights')" class="submenu-item">
                    <span>✈️ Reservas Vuelos</span>
                  </li>
                  <li @click="selectOption('cars')" class="submenu-item">
                    <span>🚗 Alquiler Autos</span>
                  </li>
                  <li @click="selectOption('register_flight')" class="submenu-item">
                    <span>🧳 Crear Viaje</span>
                  </li>
                  <li @click="selectOption('registers_flights')" class="submenu-item">
                    <span>🌍 Reservas Viajes</span>
                  </li>
                  <li @click="selectOption('coments')" class="submenu-item">
                    <span>💌 Comentarios</span>
                  </li>
                </ul>
              </div>
            </li>
          </template>
        </ul>
      </nav>
    </div>  
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: "Sidebar",
  props: {
    permisos: {
      type: Array,
      required: true
    }
  },
  emits: ['optionSelected'],
  setup(props, { emit }) {
    const isCollapsed = ref(false);
    const showViajesMenu = ref(false);
    
    // Crear versión computed de permisos para asegurar reactividad
    const permisosReactivos = computed(() => {
      return props.permisos || [];
    });

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const toggleSubMenu = () => {
      showViajesMenu.value = !showViajesMenu.value;
    };

    const selectOption = (option) => {
      emit('optionSelected', option);
    };

    const hasPermission = (permiso) => {
      return permisosReactivos.value.includes(permiso);
    };

    // ===== SISTEMA DE PERMISOS - 14 PERMISOS =====
    // Mapeo de permisos de BD a vistas del Dashboard
    const dynamicItems = [
      // ===== PERMISO 14 - DASHBOARD (NUEVO) =====
      // Muestra el dashboard principal con auditoría
      { 
        permiso: 'Dashboard', 
        key: 'Dashboard', 
        label: '📊 Dashboard',
        icon: '📊'
      },
      
      // ===== PERMISOS DE GESTIÓN DE USUARIOS (1-5) =====
      // ID 1 - Editar usuario
      { 
        permiso: 'Editar usuario', 
        key: 'Editar_Usuario', 
        label: '✏️ Editar Usuario',
        icon: '✏️'
      },
      // ID 2 - Desactivar usuario
      { 
        permiso: 'Desactivar usuario', 
        key: 'Desactivar_Usuario', 
        label: '🚫 Desactivar Usuario',
        icon: '🚫'
      },
      // ID 3 - Ver lista de usuarios
      { 
        permiso: 'Ver lista de usuarios', 
        key: 'Ver_Lista_Usuarios', 
        label: '👥 Ver Lista de Usuarios',
        icon: '👥'
      },
      // ID 4 - Asignar roles (gestión completa de admins)
      { 
        permiso: 'Asignar roles', 
        key: 'admin', 
        label: '🎛️ Gestión de Admins',
        icon: '🎛️'
      },
      // ID 5 - Revisar accesos de red
      { 
        permiso: 'Revisar accesos de red', 
        key: 'Revisar_Accesos_Red', 
        label: '🔒 Accesos de Red',
        icon: '🔒'
      },
      
      // ===== PERMISOS DE DOCUMENTOS (6-8) =====
      // ID 6 - Subir documentos internos
      { 
        permiso: 'Subir documentos internos', 
        key: 'Subir_Documentos_Internos', 
        label: '📤 Subir Documentos',
        icon: '📤'
      },
      // ID 7 - Editar documentos internos
      { 
        permiso: 'Editar documentos internos', 
        key: 'Editar_Documentos_Internos', 
        label: '📝 Editar Documentos',
        icon: '📝'
      },
      // ID 8 - Ver documentos internos
      { 
        permiso: 'Ver documentos internos', 
        key: 'Ver_Documentos_Internos', 
        label: '📂 Ver Documentos',
        icon: '📂'
      },
      
      // ===== PERMISOS CONTABLES (9-12) =====
      // ID 9 - Registrar cuentas
      { 
        permiso: 'Registrar cuentas', 
        key: 'Registrar_Cuentas', 
        label: '💵 Registrar Cuentas',
        icon: '💵'
      },
      // ID 10 - Editar cuentas
      { 
        permiso: 'Editar cuentas', 
        key: 'Editar_Cuentas', 
        label: '💰 Editar Cuentas',
        icon: '💰'
      },
      // ID 11 - Eliminar comprobantes
      { 
        permiso: 'Eliminar comprobantes', 
        key: 'Eliminar_Comprobante', 
        label: '🗑️ Eliminar Comprobantes',
        icon: '🗑️'
      },
      // ID 12 - Ver reportes contables
      { 
        permiso: 'Ver reportes contables', 
        key: 'Ver_Reportes_Contables', 
        label: '📈 Reportes Contables',
        icon: '📈'
      },
      
      // ===== PERMISO DE VIAJES (13) =====
      // ID 13 - Crear solicitud de viaje
      // Este permiso agrupa TODAS las funcionalidades de agente de viajes:
      // - Gestión de vuelos, hoteles, autos
      // - Reservas de viajes
      // - Comentarios
      { 
        permiso: 'Crear solicitud de viaje', 
        key: 'menu_viajes', 
        label: '✈️ Gestión de Viajes',
        icon: '✈️',
        submenu: true  // Indica que tiene submenú
      }
    ];

    return {
      isCollapsed,
      showViajesMenu,
      toggleCollapse,
      toggleSubMenu,
      selectOption,
      hasPermission,
      dynamicItems,
      permisosReactivos
    };
  }
});
</script>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: black;
  z-index: 1000;
  transition: all 0.3s ease;
}

.sidebar-container.collapsed .sidebar {
  width: 60px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 15px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease;
}

.nav {
  width: 100%;
}

.nav-item {
  width: 100%;
}

.nav-link {
  color: #fff;
  padding: 12px 10px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.95rem;
}

.nav-link:hover {
  color: #939292;
}

.nav-link-parent {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submenu-arrow {
  margin-left: 5px;
  font-size: 0.8rem;
}

.submenu {
  list-style: none;
  padding-left: 20px;
  margin: 5px 0;
  background-color: rgba(255, 255, 255, 0.05);
  border-left: 2px solid #007bff;
}

.submenu-item {
  padding: 8px 12px;
  cursor: pointer;
  color: #ccc;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.submenu-item:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  padding-left: 16px;
}

.toggle-sidebar-button {
  background-color: rgb(84, 84, 239);
  border: 1px solid black;
  margin: 10px 20px;
  cursor: pointer;
}

.toggle-sidebar-button:hover {
  background-color: rgb(50, 50, 150);
}

.toggle-sidebar-button span {
  color: white;
}
</style>
