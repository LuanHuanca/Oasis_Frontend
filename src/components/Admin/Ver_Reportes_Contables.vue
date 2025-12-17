<template>
  <div class="reportes-contables-container">
    <h2>📈 Tabla de auditoria</h2>
    
    <div class="report-section">
      <h3>📋 Registro de Actividades</h3>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Usuario</th>
              <th>Actividad</th>
              <th>Tipo</th>
              <th>Tabla</th>
              <th>ID Registro</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="actividades.length === 0">
              <td colspan="6" class="no-data">No hay actividades registradas</td>
            </tr>
            <tr v-for="actividad in actividadesFiltradas" :key="actividad.idAuditoria">
              <td>{{ formatDateTime(actividad.fechaHora) }}</td>
              <td>{{ actividad.correoAdmin || 'N/A' }}</td>
              <td>{{ actividad.actividad || 'N/A' }}</td>
              <td>
                <span :class="['badge', getBadgeClass(actividad.tipoActividad)]">
                  {{ actividad.tipoActividad || 'N/A' }}
                </span>
              </td>
              <td>{{ actividad.tablaAfectada || 'N/A' }}</td>
              <td>{{ actividad.idRegistroAfectado || 'N/A' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="chart-section">
      <h3>📊 Gráficos</h3>
      <div class="charts-grid">
        <div class="chart-card">
          <h4>Actividades por Tipo</h4>
          <div class="chart-placeholder">
            <p>📊 Gráfico de actividades por tipo</p>
            <p class="chart-note">La visualización de gráficos está en desarrollo</p>
          </div>
        </div>
        <div class="chart-card">
          <h4>Actividades por Usuario</h4>
          <div class="chart-placeholder">
            <p>📊 Gráfico de actividades por usuario</p>
            <p class="chart-note">La visualización de gráficos está en desarrollo</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/api';
import Swal from 'sweetalert2';

export default {
  name: 'Ver_Reportes_Contables',
  data() {
    return {
      filtros: {
        fechaInicio: '',
        fechaFin: '',
        tipoActividad: '',
        usuario: ''
      },
      actividades: [],
      facturas: [],
      cargando: false,
      totalFacturas: 0,
      totalActividades: 0,
      usuariosActivos: 0,
      porcentajeCrecimiento: 0
    };
  },
  computed: {
    actividadesFiltradas() {
      let acts = [...this.actividades];
      
      if (this.filtros.tipoActividad) {
        acts = acts.filter(a => a.tipoActividad === this.filtros.tipoActividad);
      }
      
      if (this.filtros.usuario) {
        const usuario = this.filtros.usuario.toLowerCase();
        acts = acts.filter(a => 
          (a.correoAdmin && a.correoAdmin.toLowerCase().includes(usuario)) ||
          String(a.idAdmin).includes(usuario)
        );
      }
      
      return acts;
    }
  },
  mounted() {
    this.cargarDatos();
  },
  methods: {
    async cargarDatos() {
      this.cargando = true;
      try {
        // Cargar actividades de auditoría
        const auditoriaRes = await axios.get(`${API_URL}/auditoria`);
        this.actividades = auditoriaRes.data.result || [];
        this.totalActividades = this.actividades.length;
        
        // Cargar facturas
        const facturasRes = await axios.get(`${API_URL}/facturacion`);
        this.facturas = facturasRes.data.result || [];
        this.totalFacturas = this.facturas.length;
        
        // Calcular usuarios activos (únicos)
        const usuariosUnicos = new Set(
          this.actividades.map(a => a.idAdmin).filter(id => id)
        );
        this.usuariosActivos = usuariosUnicos.size;
        
        // Calcular porcentaje de crecimiento (simulado)
        this.porcentajeCrecimiento = Math.round((this.totalActividades / 100) * 10);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        Swal.fire('Error', 'Error al cargar los datos del reporte', 'error');
      } finally {
        this.cargando = false;
      }
    },
    async generarReporte() {
      this.cargarDatos();
      Swal.fire('Éxito', 'Reporte generado correctamente', 'success');
    },
    exportarReporte() {
      Swal.fire({
        icon: 'info',
        title: 'Funcionalidad en Desarrollo',
        text: 'La exportación de reportes estará disponible cuando la funcionalidad esté completamente implementada.',
        showConfirmButton: true
      });
    },
    formatDateTime(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleString('es-ES');
    },
    getBadgeClass(tipo) {
      const tipos = {
        'CREATE': 'badge-success',
        'UPDATE': 'badge-info',
        'DELETE': 'badge-danger',
        'LOGIN': 'badge-warning'
      };
      return tipos[tipo] || 'badge-secondary';
    }
  }
};
</script>

<style scoped>
.reportes-contables-container {
  padding: 20px;
  max-width: 1400px;
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

.filters-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: bold;
  color: #555;
  min-width: 120px;
}

.filter-group input,
.filter-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.stats-section {
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 8px;
  text-align: center;
}

.stat-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

.report-section {
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

.data-table tbody tr:hover {
  background: #f8f9fa;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #999;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.badge-success {
  background: #28a745;
  color: white;
}

.badge-info {
  background: #17a2b8;
  color: white;
}

.badge-danger {
  background: #dc3545;
  color: white;
}

.badge-warning {
  background: #ffc107;
  color: #333;
}

.badge-secondary {
  background: #6c757d;
  color: white;
}

.chart-section {
  margin-bottom: 30px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.chart-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-card h4 {
  margin-bottom: 20px;
  color: #333;
}

.chart-placeholder {
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 4px;
  color: #999;
}

.chart-note {
  font-size: 12px;
  font-style: italic;
  margin-top: 10px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.btn {
  padding: 10px 20px;
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

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
}
</style>
