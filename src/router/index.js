import {createRouter, createWebHashHistory} from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { fetchUser } from '@/services/authService';

// Lazy loading de vistas para mejorar el rendimiento
const LoginView = () => import('@/views/public/LoginView.vue');
const AuthLayout = () => import('@/layouts/AuthLayout.vue');
const DashboardLayout = () => import('@/layouts/DashboardLayout.vue');

const Home = () => import('@/views/protected/HomeView.vue');
const CalendarView = () => import('@/views/protected/CalendarView.vue');
const StudentsView = () => import('@/views/protected/StudentsView.vue');
const GroupsView = () => import('@/views/protected/GroupsView.vue');
const AssistanceView = () => import('@/views/protected/AssistanceView.vue');
const CreateGroupPaymentView = () => import('@/views/protected/CreateGroupPaymentView.vue');
const GroupPaymentsView = () => import('@/views/protected/GroupPaymentsView.vue');
const CreatePrivateClassView = () => import('@/views/protected/CreatePrivateClassView.vue');
const PrivateClassesView = () => import('@/views/protected/PrivateClassesView.vue');
const MarkAssistanceView = () => import('@/views/protected/MarkAssistanceView.vue');
const SettingsView = () => import('@/views/protected/SettingsView.vue');

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
            {path: '/students', component: StudentsView},
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
    history: createWebHashHistory(),
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
