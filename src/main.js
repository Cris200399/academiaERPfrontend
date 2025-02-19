import 'primeicons/primeicons.css';
import "./style.css";
import "./flags.css"
import 'vue-tel-input/vue-tel-input.css';

import {createApp} from 'vue';

import Noir from './presets/Noir.js';

import App from './App.vue';
import router from './router';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice';

import VueTelInput from 'vue-tel-input';


import PrimeVue from "primevue/config";
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import {spanishLocale} from "@/language/spanishLocale";


const app = createApp(App);

app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.use(VueTelInput);


app.use(PrimeVue,
    {
        theme: {
            preset: Noir,
            options: {
                prefix: 'p',
                darkModeSelector: '.p-dark',
                cssLayer: false,
            },
        },
        locale: spanishLocale
    }
);

// Registrar la directiva StyleClass
app.directive('styleclass', StyleClass);
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);


app.mount('#app');
