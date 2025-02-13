export const getPaymentStatusSeverity = (paymentStatus) => {
    switch (paymentStatus) {
        case 'al_día':
            return 'success';

        case 'por_vencer':
            return 'warn';

        case 'vencido':
            return 'danger';

        case 'sin_pago':
            return 'info';

        default:
            return 'info';
    }
};

export const getPaymentStatusLabel = (paymentStatus) => {
    switch (paymentStatus) {
        case 'al_día':
            return 'Al día';

        case 'por_vencer':
            return 'Por vencer';

        case 'vencido':
            return 'Vencido';

        case 'sin_pago':
            return 'Sin pago';

        default:
            return 'Sin pago';
    }
}