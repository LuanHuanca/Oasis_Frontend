<template>
  <div ref="carouselDom" class="carousel">
    <div ref="listItemDom" class="list">
      <div class="item" v-for="(fotografia, index) in filteredImages" :key="index">
        <img :src="fotografia.imagenes" :alt="fotografia.hotel" />
        <div class="content">
          <div class="author">TU GUIA</div>
          <div class="title">{{ fotografia.hotel }}</div>
          <div class="city">{{ cityMap[fotografia.idCiudad] }}</div>
          <div class="descripcion">{{ fotografia.descripcion }}</div>
          <div class="buttons"></div>
        </div>
      </div>
    </div>
    <div ref="thumbnailDom" class="thumbnail">
      <div class="item" v-for="(fotografia, index) in filteredImages" :key="index">
        <img :src="fotografia.imagenes" :alt="fotografia.hotel" />
        <div class="content">
          <div class="title">{{ fotografia.hotel }}</div>
          <div class="descripcion">{{ fotografia.descripcion }}</div>
        </div>
      </div>
    </div>

    <div class="arrows">
      <button ref="prevDom" @click="showSlider('prev')">&lt;</button>
      <button ref="nextDom" @click="showSlider('next')">&gt;</button>
    </div>
    <time class="time"></time>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useStore } from 'vuex';
import axios from "axios";

const store = useStore();

const selectedCity = computed<string>(() => store.getters.selectedCity);

// Define el tipo de los datos de las imágenes y los thumbnails
interface Imagen {
  imagenes: string;
  alt: string;
  hotel: string; // Suponiendo que 'hotel' es una propiedad válida en tus datos
  idCiudad: number; // Suponiendo que 'idCiudad' es una propiedad válida en tus datos
  descripcion: string; // Suponiendo que 'descripcion' es una propiedad válida en tus datos
}

// Define el mapeo de ID de ciudad a sus nombres
const cityMap: Record<number, string> = {
  1: 'La Paz',
  2: 'Santa Cruz de la Sierra',
  3: 'Cochabamba',
  4: 'Sucre',
  5: 'Oruro',
  6: 'Potosí',
  7: 'Tarija',
  8: 'Beni',
  9: 'Pando',
};

// Luego, utiliza estos tipos para definir la variable images
const images = ref<Imagen[]>([]);

const nextDom = ref<HTMLButtonElement | null>(null);
const prevDom = ref<HTMLButtonElement | null>(null);
const carouselDom = ref<HTMLDivElement | null>(null);
const listItemDom = ref<HTMLDivElement | null>(null);
const thumbnailDom = ref<HTMLDivElement | null>(null);

const timeRunning = 3000;
const timeAutoNext = 9000;
let runTimeOut: ReturnType<typeof setTimeout>;
let runAutoRun: ReturnType<typeof setTimeout>;

const fetchHotelData = () => {
  axios.get('${API_URL}/hotel')
  .then((response) => {
    const data = response.data.result;
    const filteredData = data.map((item: { imagenes: any; hotel: any; idCiudad: any; descripcion: any; }) => ({
      imagenes: item.imagenes, // Cambia 'src' por el nombre correcto de la propiedad que contiene la URL de la imagen
      hotel: item.hotel,
      idCiudad: item.idCiudad,
      descripcion: item.descripcion
    }));
    images.value = filteredData; // Asigna el nuevo array a la variable images
    console.log(filteredData); // Aquí tendrás el nuevo array con los datos filtrados
  })
  .catch((error) => {
    console.error('Hubo un error al obtener los datos del hotel:', error);
  });
};

const showSlider = (type: "next" | "prev") => {
  if (!listItemDom.value || !thumbnailDom.value || !carouselDom.value) return;

  const itemSlider = listItemDom.value.querySelectorAll(".item");
  const itemThumbnail = thumbnailDom.value.querySelectorAll(".item");

  if (type === "next") {
    const firstItem = itemSlider[0];
    if (firstItem instanceof HTMLElement) {
        listItemDom.value.appendChild(firstItem);
    }
    const firstThumbnail = itemThumbnail[0];
    if (firstThumbnail instanceof HTMLElement) {
        thumbnailDom.value.appendChild(firstThumbnail);
    }
    carouselDom.value.classList.add("next");
} else {
    const positionLastItem = itemSlider.length - 1;
    const lastItem = itemSlider[positionLastItem];
    if (lastItem instanceof HTMLElement) {
        listItemDom.value.prepend(lastItem);
    }
    const lastThumbnail = itemThumbnail[positionLastItem];
    if (lastThumbnail instanceof HTMLElement) {
        thumbnailDom.value.prepend(lastThumbnail);
    }
    carouselDom.value.classList.add("prev");
}

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    if (carouselDom.value) {
      carouselDom.value.classList.remove("next", "prev");
    }
  }, timeRunning);

  clearTimeout(runAutoRun);
  runAutoRun = setTimeout(() => {
    nextDom.value?.click();
  }, timeAutoNext);
};


const filteredImages = computed(() => {
  if (selectedCity.value === "all") {
    return images.value;
  } else {
    return images.value.filter(image => cityMap[image.idCiudad] === selectedCity.value);
  }
});

onMounted(() => {
  fetchHotelData();
  runAutoRun = setTimeout(() => {
    nextDom.value?.click();
  }, timeAutoNext);
});

onBeforeUnmount(() => {
  clearTimeout(runAutoRun);
  clearTimeout(runTimeOut);
});
</script>

<style scoped>
.carousel {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.carousel .list .item {
  position: absolute;
  inset: 0 0 0 0;
}

.carousel .list .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel .list .item .content {
  position: absolute;
  top: 20%;
  width: 1140px;
  max-width: 80%;
  left: 50%;
  transform: translateX(-50%);
  padding-right: 30%;
  box-sizing: border-box;
  color: white;
  text-shadow: 0 5px 10px #0004;
}

.carousel .list .item .content .author {
  font-weight: bold;
  letter-spacing: 10px;
  margin-left: -100px;
}

.carousel .list .item .content .title,
.carousel .list .item .content .city {
  font-weight: bold;
  font-size: 5em;
  line-height: 1.3em;
  margin-left: -100px;
}

.carousel .list .item .content .city {
  color: orange;
}

.carousel .list .item .content .descripcion {
  color: #eee;
  margin-left: -100px;
}

.carousel .list .item .content .buttons {
  display: grid;
  grid-template-columns: repeat(2, 180px);
  grid-template-rows: 40px;
  gap: 7px;
  margin-top: 30px;
  margin-left: -100px;
}

.thumbnail {
  position: absolute;
  bottom: 50px;
  left: 50%;
  width: max-content;
  z-index: 100;
  display: flex;
  gap: 20px;
}

.thumbnail .item {
  width: 150px;
  height: 220px;
  flex-shrink: 0;
  position: relative;
}

.thumbnail .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.thumbnail .item .content {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.thumbnail .item .content .title {
  font-weight: bold;
  color: white;
}
.thumbnail .item .content .descripcion {
  color: white;
}

.arrows {
  position: absolute;
  top: 80%;
  right: 52%;
  width: 300px;
  max-width: 30%;
  display: flex;
  gap: 10px;
  align-items: center;
}

.arrows button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee4;
  border: none;
  font-family: monospace;
  color: #fff;
  font-weight: bold;
  font-size: large;
  transition: 0.5s;
  z-index: 100;
}

.arrows button:hover {
  background-color: #eee;
  color: #555;
}

.carousel .list .item:nth-child(1) {
  z-index: 1;
}

.carousel .list .item:nth-child(1) .author,
.carousel .list .item:nth-child(1) .title,
.carousel .list .item:nth-child(1) .city,
.carousel .list .item:nth-child(1) .descripcion,
.carousel .list .item:nth-child(1) .buttons {
  transform: translateY(50px);
  filter: blur(20px);
  opacity: 0;
  animation: showContent 0.5s 1s linear forwards;
}

@keyframes showContent {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

.carousel .list .item:nth-child(1) .title {
  animation-delay: 1.2s;
}

.carousel .list .item:nth-child(1) .city {
  animation-delay: 1.4s;
}

.carousel .list .item:nth-child(1) .descripcion {
  animation-delay: 1.6s;
}

.carousel .list .item:nth-child(1) .buttons {
  animation-delay: 1.8s;
}

.carousel.next .list .item:nth-child(1) img {
  width: 150px;
  height: 220px;
  position: absolute;
  left: 50%;
  bottom: 50px;
  border-radius: 20px;
  animation: showImage 0.5s linear 1 forwards;
}

@keyframes showImage {
  to {
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    border-radius: 0;
  }
}

.carousel.next .thumbnail .item:nth-child(1) {
  width: 0;
  overflow: hidden;
  animation: showThumbnail 0.5s linear 1 forwards;
}

@keyframes showThumbnail {
  to {
    width: 150px;
  }
}

.carousel.next .thumbnail {
  transform: translateX(150px);
  animation: transformThumbnail 0.5s linear 1 forwards;
}

@keyframes transformThumbnail {
  to {
    transform: translateX(0);
  }
}

/* efecto al hacer prevv*/

.carousel.prev .list .item:nth-child(2) {
  z-index: 2;
}

.carousel.prev .list .item:nth-child(2) img {
  position: absolute;
  bottom: 0;
  left: 0;
  animation: outImage 0.5s linear 1 forwards;
}
@keyframes outImage {
  to {
    width: 150px;
    height: 220px;
    border-radius: 20px;
    left: 50%;
    bottom: 50px;
  }
}

.carousel.prev .thumbnail .item:nth-child(1) {
  width: 0;
  overflow: hidden;
  opacity: 0;
  animation: showThumbnail 0.5s linear 1 forwards;
}

.carousel.prev .list .item:nth-child(2) .author,
.carousel.prev .list .item:nth-child(2) .title,
.carousel.prev .list .item:nth-child(2) .city,
.carousel.prev .list .item:nth-child(2) .descripcion,
.carousel.prev .list .item:nth-child(2) .buttons {
  animation: contentOut 1.5s linear 1 forwards;
}

@keyframes contentOut {
  to {
    transform: translateY(-150px);
    filter: blur(20px);
    opacity: 0;
  }
}

.carousel.next .arrows button,
.carousel.prev .arrows button {
  pointer-events: none;
}

/*para el tiempo de transicion de imagenes con las letras*/

.time {
  width: 0%; /*oara mostral la barra e tiempo arriba del navbar*/
  height: 3px;
  background-color: #676360;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}

.carousel.next .time,
.carousel.prev .time {
  width: 100%;
  animation: timeRunning 2s linear 1 forwards; /*oara mostral la barra e tiempo arriba del navbar*/
}

@keyframes timeRunning {
  to {
    width: 0;
  }
}

@media screen and (max-width: 670px) {
  .carousel .list .item .content {
    padding-right: 0;
  }
  .carousel .list .item .content .title {
    font-size: 30px;
  }
}

.buttons .nav-link {
  border: none;
  background-color: white;
  letter-spacing: 3px;
  font-family: Poppins;
  font-weight: 500;
  color: black;
}
</style>
