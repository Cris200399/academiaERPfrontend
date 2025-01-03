import 'primeicons/primeicons.css';
import "./style.css";
import "./flags.css"

import { createApp } from 'vue';

import Noir from './presets/Noir.js';

import App from './App.vue';
import router from './router';

import PrimeVue from "primevue/config";
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';


const app = createApp(App);

app.use(router);


app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: 'p',
            // darkModeSelector: '.p-dark',
            cssLayer: false,
        },
    }
});

// Registrar la directiva StyleClass
app.directive('styleclass', StyleClass);
app.directive('ripple', Ripple);

app.mount('#app');

// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';
// import PrimeVue from 'primevue/config';
// import StyleClass from 'primevue/styleclass';
// import Ripple from 'primevue/ripple';

// import 'primeicons/primeicons.css'; // Iconos de PrimeVue
// import './style.css'; // Importar Tailwind CSS

// const app = createApp(App);

// app.use(router);
// app.use(PrimeVue);

// // Registrar las directivas
// app.directive('styleclass', StyleClass);
// app.directive('ripple', Ripple);

// app.mount('#app');