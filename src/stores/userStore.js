import { defineStore } from 'pinia';
import { fetchUser, logoutService } from '@/services/authService';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null // El usuario autenticado
    }),
    actions: {
        async loadUser() {
            try {
                this.user = await fetchUser(); // Intenta cargar los datos del usuario
            } catch (error) {
                this.user = null;
            }
        },
        async logout() {
            await logoutService();
            this.user = null;
        }
    }
});
