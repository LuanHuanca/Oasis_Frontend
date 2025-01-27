<template>
  <div ref="carouselDom" class="carousel">
    <div ref="listItemDom" class="list">
      <div class="item" v-for="(image, index) in images" :key="index">
        <img :src="image.src" :alt="image.alt" />
        <div class="content">
          <div class="author">{{ image.author }}</div>
          <div class="title">{{ image.title }}</div>
          <div class="topic">{{ image.topic }}</div>
          <div class="des">{{ image.des }}</div>
          <div class="buttons"></div>
        </div>
      </div>
    </div>

    <div ref="thumbnailDom" class="thumbnail">
      <div class="item" v-for="(thumbnail, index) in thumbnails" :key="index">
        <img :src="thumbnail.src" :alt="thumbnail.alt" />
        <div class="content">
          <div class="title">{{ thumbnail.title }}</div>
          <div class="des">{{ thumbnail.des }}</div>
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
import { ref, onMounted, onBeforeUnmount } from "vue";

const images = [
  {
    src: "https://www.sirchandler.com.ar/wp-content/uploads/2023/05/boliviana-aviacion-330-49.jpg",
    alt: "Boliviana de aviación",
    author: "OASIS",
    title: "Boliviana de aviación (BOA)",
    topic: "BOLIVIA",
    des: "Ciudades de: La Paz, Cochabamba, Cobija, Oruro, Potosi, Santa Cruz, Sucre, Tarija, Trinidad ",
  },
  {
    src: "https://www.noticiasfides.com/images/news/2023/09/c-un-avion-de-la-empresa-amaszonas_1695955526.jpg",
    alt: "Amaszonas",
    author: "OASIS",
    title: "Amaszonas linea Aerea",
    topic: "BOLIVIA",
    des: "Destinos nacionales e internacionales",
  },
  {
    src: "https://web.senado.gob.bo/sites/default/files/styles/img-standard__800x600_/public/ecojet12.jpg?itok=yKsZPFh1",
    alt: "Ecojet",
    author: "OASIS",
    title: "Ecojet Vuelos",
    topic: "BOLIVIA",
    des: "Viajes a nivel Nacional",
  },
  {
    src: "https://aerolatinnews.com/wp-content/uploads/2020/06/afkl-image-bank.jpg",
    alt: "AIRFRANCE KLM",
    author: "OASIS",
    title: "AIRFRANCE KLM",
    topic: "INTERNACIONAL",
    des: "Viajes internacionales e nacionales",
  },
];

const thumbnails = [
  {
    src: "https://www.sirchandler.com.ar/wp-content/uploads/2023/05/boliviana-aviacion-330-49.jpg",
    alt: "Thumb1",
    title: "Boliviana de Aviacion",
    des: "Nivel Nacional y mas",
  },
  {
    src: "https://www.noticiasfides.com/images/news/2023/09/c-un-avion-de-la-empresa-amaszonas_1695955526.jpg",
    alt: "Thumb2",
    title: "Amaszonas linea Aerea",
    des: "Vuelos internacionales",
  },
  {
    src: "https://web.senado.gob.bo/sites/default/files/styles/img-standard__800x600_/public/ecojet12.jpg?itok=yKsZPFh1",
    alt: "Thumb3",
    title: "Ecojet Vuelos",
    des: "Viajes a nivel nacional",
  },
  {
    src: "https://aerolatinnews.com/wp-content/uploads/2020/06/afkl-image-bank.jpg",
    alt: "Thumb4",
    title: "AIR FRANCE KLM",
    des: "Vuelos a nivel internacional",
  },
];

const nextDom = ref<HTMLButtonElement | null>(null);
const prevDom = ref<HTMLButtonElement | null>(null);
const carouselDom = ref<HTMLDivElement | null>(null);
const listItemDom = ref<HTMLDivElement | null>(null);
const thumbnailDom = ref<HTMLDivElement | null>(null);

const timeRunning = 3000;
const timeAutoNext = 9000;
let runTimeOut: ReturnType<typeof setTimeout>;
let runAutoRun: ReturnType<typeof setTimeout>;

const showSlider = (type: "next" | "prev") => {
  if (!listItemDom.value || !thumbnailDom.value || !carouselDom.value) return;

  const itemSlider = listItemDom.value.querySelectorAll(".item");
  const itemThumbnail = thumbnailDom.value.querySelectorAll(".item");

  if (type === "next") {
    listItemDom.value.appendChild(itemSlider[0]);
    thumbnailDom.value.appendChild(itemThumbnail[0]);
    carouselDom.value.classList.add("next");
  } else {
    const positionLastItem = itemSlider.length - 1;
    listItemDom.value.prepend(itemSlider[positionLastItem]);
    thumbnailDom.value.prepend(itemThumbnail[positionLastItem]);
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

onMounted(() => {
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: 1; /* Asegura que el carrusel esté detrás de la barra de navegación */
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
.carousel .list .item .content .topic {
  font-weight: bold;
  font-size: 5em;
  line-height: 1.3em;
  margin-left: -100px;
}

.carousel .list .item .content .topic {
  color: orange;
}

.carousel .list .item .content .des {
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
.thumbnail .item .content .des {
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
.carousel .list .item:nth-child(1) .topic,
.carousel .list .item:nth-child(1) .des,
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

.carousel .list .item:nth-child(1) .topic {
  animation-delay: 1.4s;
}

.carousel .list .item:nth-child(1) .des {
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
.carousel.prev .list .item:nth-child(2) .topic,
.carousel.prev .list .item:nth-child(2) .des,
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
