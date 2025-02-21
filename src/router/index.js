import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { fetchUser } from '@/services/authService';
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

const routes = [
    {
        path: '/login',
        component: AuthLayout,
        children: [{ path: '', component: LoginView }]
    },
    {
        path: '/',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '/', name: 'Home', component: Home },
            { path: '/calendar', name: 'Class', component: CalendarView },
            { path: '/students', name: 'Students', component: AlumnosView },
            { path: '/groups', name: 'Groups', component: GroupsView },
            { path: '/students/assistance', name: 'Assistance', component: AssistanceView },
            { path: '/create-group-payment', name: 'CreateGroupPayment', component: CreateGroupPaymentView },
            { path: '/group-payments', name: 'GroupPayments', component: GroupPaymentsView },
            { path: '/create-private-class', name: 'CreatePrivateClass', component: CreatePrivateClassView },
            { path: '/private-classes', name: 'PrivateClasses', component: PrivateClassesView },
            { path: '/mark-assistance', name: 'MarkAssistance', component: MarkAssistanceView },
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
                const user = await fetchUser(); // Consulta al backend
                userStore.user = user; // Guarda el usuario en Pinia
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
