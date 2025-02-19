export const menuItems = [
    {
        label: 'Inicio',
        icon: 'home', // Casa
        route: '/'
    },
    {
        label: 'Alumnos',
        icon: 'group', // Grupo de personas
        subItems: [
            {
                label: 'Lista de Alumnos',
                route: '/students',
                icon: 'group', // Lista de personas
            },
            {
                label: 'Asistencia',
                route: '/students/assistance',
                icon: 'check_circle', // Check o lista de verificación
            },
        ]
    },
    {
        label: 'Calendario',
        icon: 'calendar_month', // Calendario
        route: '/calendar'
    },
    {
        label: 'Grupos',
        icon: 'table_view', // Tabla o grupo
        route: '/groups',
    },
    {
        label: 'Crear pago',
        icon: 'attach_money', // Dinero
        subItems: [
            {
                label: 'Grupal',
                route: '/create-group-payment',
                icon: 'group_add', // Personas y un signo de más
            }
        ]
    },
    {
        label: 'Historial de pagos',
        icon: 'history', // Historial
        subItems: [
            {
                label: 'Grupales',
                route: '/group-payments',
                icon: 'list', // Lista
            },
            {
                label: 'Particulares',
                route: '/private-payments',
                icon: 'list_alt', // Lista
            },
        ]
    },
    {
        label: 'Clases Particulares',
        icon: 'school', // Persona y libro (educación)
        subItems: [
            {
                label: 'Crear Clase',
                icon: 'add', // Signo de más
                route: '/create-private-class'
            },
            {
                label:'Próximas particulares',
                icon: 'list', // Lista
                route: '/private-classes'
            },
        ]
    }
];