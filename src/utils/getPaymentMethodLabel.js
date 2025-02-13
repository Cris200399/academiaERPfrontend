export const getPaymentMethodLabel = (paymentMethod) => {
    switch (paymentMethod) {
        case 'efectivo':
            return 'Efectivo';
        case 'tarjeta_de_crédito':
            return 'Tarjeta de crédito';
        case 'transferencia_bancaria':
            return 'Transferencia bancaria';
        case 'yape':
            return 'Yape';
        case 'plin':
            return 'Plin';
        case 'otro':
            return 'Otro';
        default:
            return '';
    }
}