export const getUserRole = (role) => {
    switch (role) {
        case 'admin':
            return 'Administrador';
        case 'superuser':
            return 'Superusuario';
        case 'user':
            return 'Usuario';
        default:
            return 'Desconocido';
    }
};