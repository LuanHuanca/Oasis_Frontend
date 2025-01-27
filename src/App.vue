<template>
  <div>
    <NavBar v-if="showNavBar" />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  computed: {
    showNavBar() {
      return this.$route.meta.showNavBar !== false;
    }
  }
};
</script>
