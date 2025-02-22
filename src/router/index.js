import {createRouter, createWebHistory} from 'vue-router';
import {useUserStore} from '@/stores/userStore';
import {fetchUser} from '@/services/authService';
import Home from '../views/protected/HomeView.vue';
import CalendarView from '../views/protected/CalendarView.vue';
import AlumnosView from '../views/protected/StudentsView.vue';
import GroupsView from '../views/protected/GroupsView.vue';
import AssistanceView from "@/views/protected/AssistanceView.vue";
import CreateGroupPaymentView from "@/views/protected/CreateGroupPaymentView.vue";
import GroupPaymentsView from "@/views/protected/GroupPaymentsView.vue";
import CreatePrivateClassView from "@/views/protected/CreatePrivateClassView.vue";
import PrivateClassesView from "@/views/protected/PrivateClassesView.vue";
import MarkAssistanceView from "@/views/protected/MarkAssistanceView.vue";
import LoginView from "@/views/public/LoginView.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import SettingsView from "@/views/protected/SettingsView.vue";

const routes = [
    {
        path: '/login',
        component: AuthLayout,
        children: [{path: '', component: LoginView}]
    },
    {
        path: '/',
        component: DashboardLayout,
        meta: {requiresAuth: true},
        children: [
            {path: '/', component: Home},
            {path: '/calendar', component: CalendarView},
            {path: '/students', component: AlumnosView},
            {path: '/groups', component: GroupsView},
            {path: '/students/assistance', component: AssistanceView},
            {path: '/create-group-payment', component: CreateGroupPaymentView},
            {path: '/group-payments', component: GroupPaymentsView},
            {path: '/create-private-class', component: CreatePrivateClassView},
            {path: '/private-classes', component: PrivateClassesView},
            {path: '/mark-assistance', component: MarkAssistanceView},
            {path: '/config', component: SettingsView},
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!userStore.user) {
            try {
                userStore.user = await fetchUser(); // Guarda el usuario en Pinia
                next();
            } catch (error) {
                console.error('No autenticado:', error);
                next('/login'); // Si no está autenticado, redirige al login
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
