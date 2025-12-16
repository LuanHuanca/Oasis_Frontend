<template>
  <div class="accesos-red-container">
    <h2>🔒 Accesos de Red</h2>
    
    <div class="info-section">
      <div class="info-card">
        <h3>📊 Resumen de Accesos</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">0</div>
            <div class="stat-label">Accesos Totales</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">0</div>
            <div class="stat-label">Accesos Hoy</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">0</div>
            <div class="stat-label">Usuarios Activos</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">0</div>
            <div class="stat-label">Intentos Fallidos</div>
          </div>
        </div>
      </div>
    </div>

    <div class="filters-section">
      <h3>🔍 Filtros de Búsqueda</h3>
      <div class="filters">
        <div class="filter-group">
          <label>Rango de Fechas:</label>
          <input type="date" v-model="filtros.fechaInicio" />
          <span>a</span>
          <input type="date" v-model="filtros.fechaFin" />
        </div>
        <div class="filter-group">
          <label>Tipo de Acceso:</label>
          <select v-model="filtros.tipoAcceso">
            <option value="">Todos</option>
            <option value="exitoso">Exitoso</option>
            <option value="fallido">Fallido</option>
            <option value="bloqueado">Bloqueado</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Usuario:</label>
          <input type="text" v-model="filtros.usuario" placeholder="Buscar por correo o ID" />
        </div>
        <button @click="aplicarFiltros" class="btn btn-primary">🔍 Aplicar Filtros</button>
      </div>
    </div>

    <div class="table-section">
      <h3>📋 Registro de Accesos</h3>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Usuario</th>
              <th>IP</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="6" class="no-data">
                <p>📝 Esta funcionalidad está en desarrollo</p>
                <p>En el futuro, aquí se mostrarán los registros de accesos de red del sistema</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="actions-section">
      <h3>⚙️ Acciones</h3>
      <div class="action-buttons">
        <button class="btn btn-info">📥 Exportar Registros</button>
        <button class="btn btn-warning">🔔 Configurar Alertas</button>
        <button class="btn btn-secondary">🔄 Actualizar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Revisar_Accesos_Red',
  data() {
    return {
      filtros: {
        fechaInicio: '',
        fechaFin: '',
        tipoAcceso: '',
        usuario: ''
      }
    };
  },
  methods: {
    aplicarFiltros() {
      // Funcionalidad estática - en desarrollo
      console.log('Aplicar filtros:', this.filtros);
    }
  }
};
</script>

<style scoped>
.accesos-red-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

h3 {
  color: #555;
  margin-bottom: 20px;
  font-size: 18px;
}

.info-section {
  margin-bottom: 30px;
}

.info-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

.filters-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  min-width: 150px;
  font-weight: bold;
}

.filter-group input,
.filter-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.table-section {
  margin-bottom: 30px;
}

.table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #007bff;
  color: white;
}

.data-table th {
  padding: 15px;
  text-align: left;
  font-weight: bold;
}

.data-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #999;
}

.no-data p {
  margin: 10px 0;
}

.actions-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.action-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #138496;
}

.btn-warning {
  background: #ffc107;
  color: #333;
}

.btn-warning:hover {
  background: #e0a800;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}
</style>
