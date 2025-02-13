export const formatCurrency = (value) => {
    return value.toLocaleString('es-PE', {style: 'currency', currency: 'PEN'});
}