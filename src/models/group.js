import { orderDays } from '@/constants/orderDays';

class Group {
    constructor(groupData) {
        if (groupData._id) {
            // Constructor for receiving JSON from backend
            this.id = groupData._id;
            this.name = groupData.name;
            this.description = groupData.description;
            this.members = groupData.members;
            this.daysOfWeek = groupData.daysOfWeek;
            this.maxMembers = groupData.maxMembers;
            this.schedule = groupData.schedule;
        } else {
            // Constructor for sending group to an endpoint
            this.name = groupData.name;
            this.description = groupData.description;
            this.daysOfWeek = this.sortDays(groupData.daysOfWeek);
            this.schedule = `${groupData.startTime} - ${groupData.endTime}`;
            this.maxMembers = groupData.maxMembers;
        }
    }

    sortDays(days) {
        console.log('Days:', days);
        return days.map((day) => day.toString()).sort((a, b) => orderDays.indexOf(a) - orderDays.indexOf(b));
    }

    getStartTime() {
        return (this.schedule.split(' - ')[0]);
    }

    getEndTime() {
        return (this.schedule.split(' - ')[1]);
    }

    convertTo12HourFormat(hour) {
        const [hours, minutes] = hour.split(':');
        const amPm = hours >= 12 ? 'pm' : 'am';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${amPm}`;
    }
}

export default Group;
