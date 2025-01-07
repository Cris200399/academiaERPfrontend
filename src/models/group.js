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
}

export default Group;