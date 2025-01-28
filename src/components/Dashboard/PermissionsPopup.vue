<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <h2>Permisos del Usuario</h2>
      <button @click="closePopup">Cerrar</button>
      <table>
        <thead>
          <tr>
            <th>Permiso</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="permiso in permisos" :key="permiso.idPermiso">
            <td>{{ permiso.permiso }}</td>
            <td><input type="checkbox" :checked="permiso.estado" disabled></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    permisos: Array
  },
  methods: {
    closePopup() {
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>