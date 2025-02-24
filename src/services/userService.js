import getApiEndpoints from "@/config/apiEndpoints";
import API from "@/config/axiosConfig";

export const getUsersService = async () => {
    try {
        const response = await API.get(getApiEndpoints.USERS);
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

export const getAdminsService = async () => {
    try {
        const response = await API.get(`${getApiEndpoints.USERS}/admins`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener administradores:', error);
        throw error;
    }
}

export const createUserService = async (userData) => {
    try {
        const response = await API.post(getApiEndpoints.USERS, userData);
        return response.data;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

export const updateUserService = async (id, userData) => {
    try {
        const response = await API.put(`${getApiEndpoints.USERS}/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
};

export const updatePasswordService = async (id, currentPassword, newPassword) => {
    try {
        const response = await API.patch(`${getApiEndpoints.USERS}/${id}/password`, {currentPassword, newPassword});
        return response.data;
    } catch (error) {
        console.error('Error al actualizar contraseña:', error);
        throw error;
    }
}

export const deleteUserService = async (userId) => {
    try {
        const response = await API.delete(`${getApiEndpoints.USERS}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
};