export const formatDateTo24h = (date) => {
    date = new Date(date);
    return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
}