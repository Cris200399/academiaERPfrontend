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
            }
        ]
    },
    {
        label: 'Asistencia',
        icon: 'check', // Check
        subItems: [
            {
                label: 'Clase en curso',
                route: '/students/assistance',
                icon: 'school', // Persona y libro (educación)
            },
            {
                label: 'Marcar asistencia',
                route: '/mark-assistance',
                icon: 'pending_actions', // Check
            }
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
        subItems: [
            {
                label: 'Administrar Grupos',
                route: '/groups',
                icon: 'group', // Grupo de personas
            },
            {
                label: 'Crear Pago',
                route: '/create-group-payment',
                icon: 'attach_money', // Dinero
            },
            {
                label: 'Historial de Pagos',
                route: '/group-payments',
                icon: 'history', // Historial
            }
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
                label: 'Próximas particulares',
                icon: 'list', // Lista
                route: '/private-classes'
            },
        ]
    }
];