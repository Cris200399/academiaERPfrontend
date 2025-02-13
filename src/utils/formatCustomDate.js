export const formatCustomDate = (date) => {
    date = new Date(date);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}