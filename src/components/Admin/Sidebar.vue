<template>
  <div>
    <div class="sidebar-container" :class="{ 'collapsed': isCollapsed }">
      <button class="toggle-sidebar-button" @click="toggleCollapse">
        <span v-if="isCollapsed">☰</span>
        <span v-else>☰</span>
      </button>
      <nav class="sidebar" :style="{ width: isCollapsed ? '5%' : '20%' }">
        <ul class="nav flex-column">
          <li class="nav-item" v-if="hasPermission('Administracion usuarios')">
            <div class="nav-link" @click="selectOption('admin')">
              <span v-if="isCollapsed">👤</span>
              <span v-else>📊 Lista de Administradores</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Dashboard')">
            <div class="nav-link" @click="selectOption('dashboard')">
              <span v-if="isCollapsed">👤</span>
              <span v-else>📊 Dashboard</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Agente de viajes')">
            <div class="nav-link" @click="selectOption('hotels')">
              <span v-if="isCollapsed">🏨</span>
              <span v-else>🏨 Reservas Hoteles</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Agente de viajes')">
            <div class="nav-link" @click="selectOption('flights')">
              <span v-if="isCollapsed">✈️</span>
              <span v-else>✈️️ Reservas Vuelos</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Agente de viajes')">
            <div class="nav-link" @click="selectOption('cars')">
              <span v-if="isCollapsed">🚗</span>
              <span v-else>🚗 Alquiler Autos</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Agente de viajes')">
            <div class="nav-link" @click="selectOption('register_flight')">
              <span v-if="isCollapsed">🌍</span>
              <span v-else>🧳 Crear Viaje</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Agente de viajes')">
            <div class="nav-link" @click="selectOption('registers_flights')">
              <span v-if="isCollapsed">🌍</span>
              <span v-else>🌍 Reservas Viajes</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Agente de viajes')">
            <div class="nav-link" @click="selectOption('coments')">
              <span v-if="isCollapsed">⚙️</span>
              <span v-else>💌 Comentarios</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Registro cuentas')">
            <div class="nav-link" @click="selectOption('registro_cuentas')">
              <span v-if="isCollapsed">📝</span>
              <span v-else>📝 Registro de cuentas</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Documentos internos')">
            <div class="nav-link" @click="selectOption('documentos_internos')">
              <span v-if="isCollapsed">📄</span>
              <span v-else>📄 Documentos internos</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Correo')">
            <div class="nav-link" @click="selectOption('correo')">
              <span v-if="isCollapsed">📧</span>
              <span v-else>📧 Correo</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Consultas')">
            <div class="nav-link" @click="selectOption('consultas')">
              <span v-if="isCollapsed">🔍</span>
              <span v-else>🔍 Consultas</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Modificaciones')">
            <div class="nav-link" @click="selectOption('modificaciones')">
              <span v-if="isCollapsed">✏️</span>
              <span v-else>✏️ Modificaciones</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('ABM Usuarios')">
            <div class="nav-link" @click="selectOption('abm_usuarios')">
              <span v-if="isCollapsed">👥</span>
              <span v-else>👥 ABM usuarios</span>
            </div>
          </li>
          <li class="nav-item" v-if="hasPermission('Baja de comprobantes')">
            <div class="nav-link" @click="selectOption('baja_comprobantes')">
              <span v-if="isCollapsed">📉</span>
              <span v-else>📉 Baja de comprobantes</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

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

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const selectOption = (option) => {
      emit('optionSelected', option);
    };

    const hasPermission = (permiso) => {
      return props.permisos.includes(permiso);
    };

    return {
      isCollapsed,
      toggleCollapse,
      selectOption,
      hasPermission
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
  transition: width 0.3s ease;
}

.sidebar-container.collapsed .sidebar {
  width: 60px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.nav {
  width: 100%;
}

.nav-item {
  width: 100%;
}

.nav-link {
  color: #fff;
  padding: 10px 15px;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.nav-link:hover {
  color: #939292;
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
