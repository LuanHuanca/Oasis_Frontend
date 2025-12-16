<template>
  <div class="editar-cuentas-container">
    <h2>💰 Editar Cuentas</h2>
    
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

    <div v-if="facturaEncontrada" class="form-section">
      <form @submit.prevent="guardarCambios" class="edit-form">
        <div class="form-group">
          <label>ID Factura:</label>
          <input type="text" :value="facturaEncontrada.idFactura" disabled />
        </div>

        <div class="form-group">
          <label>NIT:</label>
          <input 
            type="text" 
            v-model="formData.NIT" 
            required
            placeholder="Ingrese el NIT"
          />
        </div>

        <div class="form-group">
          <label>Fecha:</label>
          <input 
            type="date" 
            v-model="formData.fecha" 
            required
          />
        </div>

        <div class="form-group">
          <label>ID Cliente:</label>
          <input 
            type="number" 
            v-model.number="formData.clienteidCliente" 
            required
          />
        </div>

        <div class="form-group">
          <label>ID Reserva de Viaje:</label>
          <input 
            type="number" 
            v-model.number="formData.reservaViajeidReservaViaja" 
            required
          />
        </div>

        <div class="form-group">
          <label>Forma de Pago:</label>
          <select 
            v-model.number="formData.formaPagoidFormP" 
            required
          >
            <option value="">Seleccione una forma de pago</option>
            <option v-for="fp in formasPago" :key="fp.idFormP" :value="fp.idFormP">
              {{ fp.formaPago }}
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-success">💾 Guardar Cambios</button>
          <button type="button" @click="resetForm" class="btn btn-secondary">🔄 Cancelar</button>
        </div>
      </form>
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
  name: 'Editar_Cuentas',
  data() {
    return {
      facturaId: '',
      facturaEncontrada: null,
      formasPago: [],
      formData: {
        NIT: '',
        fecha: '',
        clienteidCliente: null,
        reservaViajeidReservaViaja: null,
        formaPagoidFormP: null
      },
      error: '',
      success: ''
    };
  },
  mounted() {
    this.cargarFormasPago();
  },
  methods: {
    async cargarFormasPago() {
      try {
        const response = await axios.get(`${API_URL}/formapago`);
        this.formasPago = response.data.result || [];
      } catch (error) {
        console.error('Error al cargar formas de pago:', error);
      }
    },
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
        
        // Formatear fecha para el input date
        const fecha = new Date(this.facturaEncontrada.fecha);
        this.formData = {
          NIT: this.facturaEncontrada.NIT || '',
          fecha: fecha.toISOString().split('T')[0],
          clienteidCliente: this.facturaEncontrada.clienteidCliente,
          reservaViajeidReservaViaja: this.facturaEncontrada.reservaViajeidReservaViaja,
          formaPagoidFormP: this.facturaEncontrada.formaPagoidFormP
        };
      } catch (error) {
        this.error = error.response?.data?.message || 'Factura no encontrada';
        Swal.fire('Error', this.error, 'error');
      }
    },
    async guardarCambios() {
      if (!this.facturaEncontrada) {
        Swal.fire('Error', 'Debe buscar una factura primero', 'error');
        return;
      }

      try {
        await axios.put(`${API_URL}/facturacion/update/${this.facturaEncontrada.idFactura}`, this.formData);
        
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Cuenta actualizada correctamente',
          showConfirmButton: true
        });

        this.success = 'Cuenta actualizada correctamente';
        this.resetForm();
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al actualizar la cuenta';
        Swal.fire('Error', this.error, 'error');
      }
    },
    resetForm() {
      this.facturaEncontrada = null;
      this.facturaId = '';
      this.formData = {
        NIT: '',
        fecha: '',
        clienteidCliente: null,
        reservaViajeidReservaViaja: null,
        formaPagoidFormP: null
      };
      this.error = '';
      this.success = '';
    }
  }
};
</script>

<style scoped>
.editar-cuentas-container {
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

.form-section {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
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

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
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
