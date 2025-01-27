import { createApp } from "vue";
import { createRouter } from "./router";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github.css";
import vue3GoogleLogin from "vue3-google-login";
import store from "./functions/store";
import VueSweetalert2 from 'vue-sweetalert2'; // Correct import statement
import 'sweetalert2/dist/sweetalert2.min.css';

// Registering the JSON language with highlight.js
hljs.registerLanguage('json', json);

// Creating the Vue app instance
const app = createApp(App);

// Adding FontAwesome icons to the library
library.add(faLink, faUser, faPowerOff);

// Using the necessary plugins and components
app
    .use(hljsVuePlugin)
    .use(VueSweetalert2)
    .use(createRouter(app))
    .use(store)
    .use(vue3GoogleLogin, {
        clientId: '373256834880-m25tqbs62fuguij99hlhc4rv6qbv3ne9.apps.googleusercontent.com'
    })
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");