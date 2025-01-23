class Assistance {
    constructor(assistance) {
        if (assistance._id) {
            this.id = assistance._id;
            this.student = assistance.student;
            this.group = assistance.group;
            this.date = new Date(assistance.date);
            this.status = assistance.status;
        } else {
            this.student = assistance.student;
            this.group = assistance.group;
            this.date = assistance.date;
            this.status = assistance.status;
        }
    }

    getAssistanceDate() {
        return new Date(this.date).toLocaleDateString('es-ES', {year: '2-digit', month: '2-digit', day: '2-digit'});
    }

    getDay() {
        return new Date(this.date).getUTCDate();
    }

    getHour() {
        let date = new Date(this.date);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
}

export default Assistance;