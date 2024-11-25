import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Clases from '../views/Clases.vue';
import AlumnosView from '../views/Alumnos.vue';
import Promociones from '../views/Promociones.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/clases', name: 'Clases', component: Clases },
  { path: '/alumnos', name: 'AlumnosView', component: AlumnosView },
  { path: '/promociones', name: 'Promociones', component: Promociones },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
