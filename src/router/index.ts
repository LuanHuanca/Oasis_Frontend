import { createRouter as createVueRouter, createWebHistory, Router } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import { App } from 'vue';
import RegistroPersona from "../components/RegistroPersona.vue";
import RegistroAdmin from "../components/RegistroAdmin.vue";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Hotel from "../views/Hotel.vue";
import Verificacion from "../views/Verificacion.vue";
import TokenOlvido from "../views/TokenOlvido.vue";
import RestablecerContrasenia from "../views/RestablecerContrasenia.vue";
import HotelSeleccionado from "../components/Hoteles/HotelSeleccionado.vue";
import Autos from "../views/Autos.vue";
import Vuelos from "../views/Vuelos.vue";
import HotelSeleccionado1 from "../components/Hoteles/HotelSeleccionado1.vue";


export function createRouter(app: App): Router {
  return createVueRouter({
    routes: [
      {
        path: "/",
        name: "home",
        component: Home,
        meta: { showNavBar: true }
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: { showNavBar: true }
      },
      {
        path: "/RegistroPersona",
        name: "registroPersona",
        component: RegistroPersona,
        meta: { showNavBar: false }
      },
      {
        path: "/RegistroAdmin",
        name: "registroAdmin",
        component: RegistroAdmin,
        meta: { showNavBar: false }
      },
      { 
        path: "/Login",
        name: "Login",
        component: Login,
        meta: { showNavBar: false }
      },
      {
        path: "/Dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { showNavBar: true }
      },
      {
        path: "/Hotel",
        name: "hotel",
        component: Hotel,
        meta: { showNavBar: true }
      },
      {
        path: "/Verificacion",
        name: "verificacion",
        component: Verificacion,
        meta: { showNavBar: false }

      },
      {
        path: "/TokenOlvido",
        name: "tokenOlvido",
        component: TokenOlvido,
        meta: { showNavBar: false }
      },
      {
        path: "/RestablecerContrasenia",
        name: "restablecerContrasenia",
        component: RestablecerContrasenia,
        meta: { showNavBar: false }
      },

      {
        path: "/Autos",
        name: "Autos",
        component: Autos,
        meta: { showNavBar: true }
      },
            {
        path: '/hotel/:id', // Utilizamos un parámetro dinámico para el ID del hotel
        name: 'HotelSeleccionado',
        component: HotelSeleccionado,
        meta: { showNavBar: true }
    },
      {
        path: "/Vuelos",
        name: "Vuelos",
        component:Vuelos,
        meta: { showNavBar: true }
      },

    ],
    history: createWebHistory()
  })
}
