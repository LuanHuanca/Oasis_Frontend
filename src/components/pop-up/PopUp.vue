<template>
  <div v-if="loading" class="loading-panel">
    <p>Cargando...</p>
  </div>
  <div v-else class="pop-up">
    <div class="pop-up-inner">
      <div class="pop-up-close" @click="close">&times;</div>
      <h1>Explora tu destino! {{ imagenTitle }}</h1>
      <a-scene embedded style="width: 100%; height: 400px;">
        <a-sky :src="panoramaImage" rotation="0 -90 0"></a-sky>
      </a-scene>
      <div class="pop-up-button">
        <button @click="close">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'aframe';

export default {
  props: {
    imagenTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      panoramaImage: '',
      loading: true,
    };
  },
  mounted() {
    this.loadImage();
  },
  methods: {
    loadImage() {
      if (this.imagenTitle) {
        const img = new Image();
        img.src = `src/assets/img_360/${this.imagenTitle}.jpg`;
        img.onload = () => {
          this.panoramaImage = img.src;
          this.loading = false;
        };
        img.onerror = () => {
          console.error(`Failed to load image: src/assets/img_360/${this.imagenTitle}.jpg`);
          this.loading = false;
        };
      } else {
        console.error('imagenTitle is not defined');
        this.loading = false;
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style>
.loading-panel {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
}

.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 32px 16px 120px;
  height: 100vh;
  width: 100%;
  background-color: rgba(144, 216, 214, 0.5);
  display: grid;
  place-items: center;
}
.pop-up h1{
  display: flex;
  justify-content: center;
}
.pop-up button{
  background-color: rgb(164, 227, 200);
  color: #000;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px 20px;
  margin: 19px 0px 0px 0px;
}
.pop-up-button{
  display: flex;
  align-items: center;
  justify-content: center;
}
.pop-up-close {
  position: absolute;
  height: 52px;
  width: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  font-size: 3rem;
  color: black;
  cursor: pointer;
}
.pop-up-inner {
  background-color: #fff;
  color: #000;
  position: relative;
  width: 70%;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  transition: all 250ms ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 250ms ease-in-out;
}
.fade-leave-active {
  transition-delay: 250ms;
}
</style>
