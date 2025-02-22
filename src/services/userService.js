import {api} from "@/config/config";

export const getUsersService = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

export const createUserService = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

export const updateUserService = async (id, userData) => {
    try {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
};

export const updatePasswordService = async (id, currentPassword, newPassword) => {
    try {
        const response = await api.patch(`/users/${id}/password`, {currentPassword, newPassword});
        return response.data;
    } catch (error) {
        console.error('Error al actualizar contraseña:', error);
        throw error;
    }
}

export const deleteUserService = async (userId) => {
    try {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
};