import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/HomeView.vue';
import CalendarView from '../views/CalendarView.vue';
import AlumnosView from '../views/StudentsView.vue';
import GroupsView from '../views/GroupsView.vue';
import AssistanceView from "@/views/AssistanceView.vue";
import CreateGroupPaymentView from "@/views/CreateGroupPaymentView.vue";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/calendar', name: 'Class', component: CalendarView},
    {path: '/students', name: 'Students', component: AlumnosView},
    {path: '/groups', name: 'Groups', component: GroupsView},
    {path: '/students/assistance', name: 'Assistance', component: AssistanceView},
    {path: '/create-payment', name: 'CreatePayment', component: CreateGroupPaymentView},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
