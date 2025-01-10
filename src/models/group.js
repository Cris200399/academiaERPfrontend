class Group {
    members;
    maxMembers;
    constructor({
                    id = null,
                    name,
                    description,
                    members = [],
                    daysOfWeek,
                    maxMembers,
                    schedule
                }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.members = members;
        this.daysOfWeek = daysOfWeek;
        this.maxMembers = maxMembers;
        this.schedule = schedule; // e.g. "19:00 - 20:00" 24-hour format
    }

    getScheduleIn12Format() {
        const [start, end] = this.schedule.split(' - ');
        return `${this.convertTo12HourFormat(start)} - ${this.convertTo12HourFormat(end)}`;
    }

    convertTo12HourFormat(hour) {
        const [hours, minutes] = hour.split(':');
        const amPm = hours >= 12 ? 'pm' : 'am';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${amPm}`;
    }
}

export default Group;