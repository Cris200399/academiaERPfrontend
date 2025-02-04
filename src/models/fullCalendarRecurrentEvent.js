class FullCalendarRecurrentEvent {
    constructor(title, daysOfWeek, startTime, endTime) {
        this.title = title;
        this.daysOfWeek = daysOfWeek.map(day => this.daysOfWeekToNumber(day));
        this.startTime = startTime;
        this.endTime = endTime;
    }

    daysOfWeekToNumber(day) {
        switch (day) {
            case 'Lunes':
                return 1;
            case 'Martes':
                return 2;
            case 'Miércoles':
                return 3;
            case 'Jueves':
                return 4;
            case 'Viernes':
                return 5;
            case 'Sábado':
                return 6;
            case 'Domingo':
                return 0;
        }
    }
}


export default FullCalendarRecurrentEvent;