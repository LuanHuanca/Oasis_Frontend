<template>
  <div class="eliminar-comprobante-container">
    <h2>🗑️ Eliminar Comprobantes</h2>
    
    <div class="search-section">
      <div class="search-box">
        <label for="facturaId">ID de Factura:</label>
        <input 
          id="facturaId" 
          type="number" 
          v-model="facturaId" 
          placeholder="Ingrese el ID de la factura"
          @keyup.enter="buscarFactura"
        />
        <button @click="buscarFactura" class="btn btn-primary">🔍 Buscar</button>
      </div>
    </div>

    <div v-if="facturaEncontrada" class="factura-info-section">
      <div class="factura-card">
        <h3>Información de la Factura</h3>
        <div class="factura-details">
          <div class="detail-item">
            <strong>ID Factura:</strong> 
            <span>{{ facturaEncontrada.idFactura }}</span>
          </div>
          <div class="detail-item">
            <strong>NIT:</strong> 
            <span>{{ facturaEncontrada.NIT || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <strong>Fecha:</strong> 
            <span>{{ formatDate(facturaEncontrada.fecha) }}</span>
          </div>
          <div class="detail-item">
            <strong>ID Cliente:</strong> 
            <span>{{ facturaEncontrada.clienteidCliente }}</span>
          </div>
          <div class="detail-item">
            <strong>ID Reserva de Viaje:</strong> 
            <span>{{ facturaEncontrada.reservaViajeidReservaViaja }}</span>
          </div>
          <div class="detail-item">
            <strong>ID Forma de Pago:</strong> 
            <span>{{ facturaEncontrada.formaPagoidFormP }}</span>
          </div>
        </div>

        <div class="warning-box">
          <p>⚠️ <strong>Advertencia:</strong> Esta acción no se puede deshacer. ¿Está seguro de que desea eliminar esta factura?</p>
        </div>

        <div class="action-buttons">
          <button @click="eliminarFactura" class="btn btn-danger">
            🗑️ Eliminar Factura
          </button>
          <button @click="resetForm" class="btn btn-secondary">
            🔄 Cancelar
          </button>
        </div>
      </div>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success">
      {{ success }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/api';
import Swal from 'sweetalert2';

export default {
  name: 'Eliminar_Comprobante',
  data() {
    return {
      facturaId: '',
      facturaEncontrada: null,
      error: '',
      success: ''
    };
  },
  methods: {
    async buscarFactura() {
      if (!this.facturaId) {
        Swal.fire('Error', 'Por favor ingrese un ID de factura', 'error');
        return;
      }

      this.error = '';
      this.success = '';
      this.facturaEncontrada = null;

      try {
        const response = await axios.get(`${API_URL}/facturacion/${this.facturaId}`);
        this.facturaEncontrada = response.data.result;
      } catch (error) {
        this.error = error.response?.data?.message || 'Factura no encontrada';
        Swal.fire('Error', this.error, 'error');
      }
    },
    async eliminarFactura() {
      if (!this.facturaEncontrada) {
        Swal.fire('Error', 'Debe buscar una factura primero', 'error');
        return;
      }

      const result = await Swal.fire({
        title: '¿Está completamente seguro?',
        html: `
          <p>Está a punto de eliminar la factura:</p>
          <p><strong>ID:</strong> ${this.facturaEncontrada.idFactura}</p>
          <p><strong>NIT:</strong> ${this.facturaEncontrada.NIT || 'N/A'}</p>
          <p><strong>Fecha:</strong> ${this.formatDate(this.facturaEncontrada.fecha)}</p>
          <p style="color: red; font-weight: bold;">⚠️ Esta acción NO se puede deshacer</p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/facturacion/delete/${this.facturaEncontrada.idFactura}`);
          
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Factura eliminada correctamente',
            showConfirmButton: true
          });

          this.success = 'Factura eliminada correctamente';
          this.resetForm();
        } catch (error) {
          this.error = error.response?.data?.message || 'Error al eliminar la factura';
          Swal.fire('Error', this.error, 'error');
        }
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES');
    },
    resetForm() {
      this.facturaEncontrada = null;
      this.facturaId = '';
      this.error = '';
      this.success = '';
    }
  }
};
</script>

<style scoped>
.eliminar-comprobante-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.search-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box label {
  min-width: 150px;
  font-weight: bold;
}

.search-box input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.factura-info-section {
  margin-top: 20px;
}

.factura-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.factura-card h3 {
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #dc3545;
  padding-bottom: 10px;
}

.factura-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.detail-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.detail-item strong {
  min-width: 180px;
  color: #555;
}

.warning-box {
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 25px;
}

.warning-box p {
  margin: 0;
  color: #856404;
}

.action-buttons {
  display: flex;
  gap: 10px;
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

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.alert {
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
</style>
