// src/data/menuItems.js
export const menuItems = [
    {
        label: 'Inicio',
        icon: 'pi pi-home',
        route: '/'
    },
    {
        label: 'Alumnos',
        icon: 'pi pi-users',
        subItems: [
            {
                label: 'Lista de Alumnos',
                route: '/students',
                icon: 'pi pi-users',
            },
            {
                label: 'Asistencia',
                route: '/students/assistance',
                icon: 'pi pi-list',
            },
        ]
    },
    {
        label: 'Calendario',
        icon: 'pi pi-calendar',
        route: '/calendar'
    },
    {
        label: 'Grupos',
        icon: 'pi pi-table',
        route: '/groups',
    },
    {
        label: 'Crear pago',
        icon: 'pi pi-money-bill',
        subItems: [
            {
                label: 'Grupal',
                route: '/create-group-payment',
                icon: 'pi pi-users',
            }
        ]
    },
    {
        label: 'Historial de pagos',
        icon: 'pi pi-history',
        subItems: [
            {
                label: 'Grupales',
                route: '/group-payments',
                icon: 'pi pi-list',
            },
            {
                label: 'Particulares',
                route: '/private-payments',
                icon: 'pi pi-list',
            },
        ]
    },
    {
        label: 'Registrar clase particular',
        icon: 'pi pi-address-book',
        route: '/create-private-class'
    }
];