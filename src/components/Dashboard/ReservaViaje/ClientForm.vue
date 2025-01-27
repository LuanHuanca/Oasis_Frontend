<template>
  <div>
    <h3>Datos del Cliente</h3>
    <form @submit.prevent="submitForm">
      <label>Nombre:
        <input type="text" v-model="client.name" />
      </label>
      <label>Email:
        <input type="email" v-model="client.email" />
      </label>
      <button type="submit">Guardar Cliente</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client: {
        name: '',
        email: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$emit('save-client', this.client);
    }
  }
};
</script>
