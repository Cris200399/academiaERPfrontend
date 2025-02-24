import { defineStore } from 'pinia';
import { fetchUser } from '@/services/authService';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null, // El usuario autenticado
        token: localStorage.getItem('authToken') || null
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
            this.clearToken();
            this.user = null;
        },
        setToken(token) {
            this.token = token;
            localStorage.setItem('authToken', token); // Guardar en LocalStorage para persistencia
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem('authToken');
        }
    }
});
