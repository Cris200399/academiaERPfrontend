import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/HomeView.vue';
import Clases from '../views/ClassesView.vue';
import AlumnosView from '../views/StudentsView.vue';
import GroupsView from '../views/GroupsView.vue';
import AssistanceView from "@/views/AssistanceView.vue";
import CreateGroupPaymentView from "@/views/CreateGroupPaymentView.vue";

const routes = [
    {path: '/', name: 'Home', component: Home, icon: 'pi pi-home'},
    {path: '/class', name: 'Class', component: Clases, icon: 'pi pi-th-large'},
    {path: '/students', name: 'Students', component: AlumnosView, icon: 'pi pi-users'},
    {path: '/groups', name: 'Groups', component: GroupsView, icon: 'pi pi-gift'},
    {path: '/assistance', name: 'Assistance', component: AssistanceView, icon: 'pi pi-check'},
    {path: '/create-payment', name: 'CreatePayment', component: CreateGroupPaymentView, icon: 'pi pi-money-bill'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
