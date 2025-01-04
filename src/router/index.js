import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Clases from '../views/Clases.vue';
import AlumnosView from '../views/AlumnosView.vue';
import Promociones from '../views/Groups.vue';

const routes = [
    {path: '/', name: 'Home', component: Home, icon: 'pi pi-home'},
    {path: '/class', name: 'Class', component: Clases, icon: 'pi pi-th-large'},
    {path: '/students', name: 'students', component: AlumnosView, icon: 'pi pi-users'},
    {path: '/groups', name: 'groups', component: Promociones, icon: 'pi pi-gift'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
