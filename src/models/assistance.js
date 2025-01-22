class Assistance {
    constructor(assistance) {
        if (assistance._id) {
            this.id = assistance._id;
            this.student = assistance.student;
            this.group = assistance.group;
            this.date = assistance.date;
            this.status = assistance.status;
        } else {
            this.student = assistance.student;
            this.group = assistance.group;
            this.date = assistance.date;
            this.status = assistance.status;
        }
    }
}

export default Assistance;