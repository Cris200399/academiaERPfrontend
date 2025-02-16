class PrivateClass {
    constructor(data) {
        if (data._id) {
            // Constructor for receiving JSON from backend
            this.id = data._id;
            this.title = data.title;
            this.students = data.students;
            this.date = new Date(data.date);
            this.startTime = data.startTime;
            this.endTime = data.endTime;
        } else {
            // Constructor for sending student to an endpoint
            this.title = data.title;
            this.students = data.students;
            this.date = data.date;
            this.startTime = data.startTime;
            this.endTime = data.endTime;
        }
    }

}

export default PrivateClass;