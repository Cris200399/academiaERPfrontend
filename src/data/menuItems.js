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
        label: 'Crear Pago',
        icon: 'pi pi-money-bill',
        route: '/create-payment',
    },
];