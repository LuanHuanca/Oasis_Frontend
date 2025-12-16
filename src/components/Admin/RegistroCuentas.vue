<template>
  <div class="registro-cuentas-container">
    <h2>💵 Registrar Cuentas</h2>
    
    <form @submit.prevent="registrarCuenta" class="form-container">
      <div class="form-group">
        <label for="nit">NIT:</label>
        <input 
          id="nit" 
          type="text" 
          v-model="formData.NIT" 
          required
          placeholder="Ingrese el NIT"
        />
      </div>

      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input 
          id="fecha" 
          type="date" 
          v-model="formData.fecha" 
          required
        />
      </div>

      <div class="form-group">
        <label for="clienteId">ID Cliente:</label>
        <input 
          id="clienteId" 
          type="number" 
          v-model.number="formData.clienteidCliente" 
          required
          placeholder="ID del cliente"
        />
        <button type="button" @click="buscarCliente" class="btn btn-sm btn-info">
          🔍 Buscar Cliente
        </button>
        <div v-if="clienteInfo" class="cliente-info">
          <small>Cliente: {{ clienteInfo.correo || 'N/A' }}</small>
        </div>
      </div>

      <div class="form-group">
        <label for="reservaViajeId">ID Reserva de Viaje:</label>
        <input 
          id="reservaViajeId" 
          type="number" 
          v-model.number="formData.reservaViajeidReservaViaja" 
          required
          placeholder="ID de la reserva de viaje"
        />
      </div>

      <div class="form-group">
        <label for="formaPagoId">Forma de Pago:</label>
        <select 
          id="formaPagoId" 
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
        <button type="submit" class="btn btn-success">💾 Registrar Cuenta</button>
        <button type="button" @click="limpiarFormulario" class="btn btn-secondary">🔄 Limpiar</button>
      </div>
    </form>

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
  name: 'RegistroCuentas',
  data() {
    return {
      formData: {
        NIT: '',
        fecha: new Date().toISOString().split('T')[0],
        clienteidCliente: null,
        reservaViajeidReservaViaja: null,
        formaPagoidFormP: null
      },
      formasPago: [],
      clienteInfo: null,
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
    async buscarCliente() {
      if (!this.formData.clienteidCliente) {
        Swal.fire('Error', 'Por favor ingrese un ID de cliente', 'error');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/cliente/${this.formData.clienteidCliente}`);
        this.clienteInfo = response.data.result;
        Swal.fire('Éxito', 'Cliente encontrado', 'success');
      } catch (error) {
        this.clienteInfo = null;
        Swal.fire('Error', 'Cliente no encontrado', 'error');
      }
    },
    async registrarCuenta() {
      this.error = '';
      this.success = '';

      try {
        const response = await axios.post(`${API_URL}/facturacion/create`, this.formData);
        
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Cuenta registrada correctamente',
          showConfirmButton: true
        });

        this.success = 'Cuenta registrada correctamente';
        this.limpiarFormulario();
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al registrar la cuenta';
        Swal.fire('Error', this.error, 'error');
      }
    },
    limpiarFormulario() {
      this.formData = {
        NIT: '',
        fecha: new Date().toISOString().split('T')[0],
        clienteidCliente: null,
        reservaViajeidReservaViaja: null,
        formaPagoidFormP: null
      };
      this.clienteInfo = null;
      this.error = '';
      this.success = '';
    }
  }
};
</script>

<style scoped>
.registro-cuentas-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.form-container {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
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

.form-group button {
  margin-top: 5px;
  align-self: flex-start;
}

.cliente-info {
  margin-top: 5px;
  padding: 8px;
  background: #e7f3ff;
  border-radius: 4px;
}

.cliente-info small {
  color: #0066cc;
  font-weight: bold;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
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

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #138496;
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
