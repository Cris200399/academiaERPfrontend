class PrivateClassAndPayment {
    constructor(data) {
        this.id = data._id;
        this.title = data.title;
        this.students = data.students;
        this.date = data.date;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.payments = data.payments;
    }
}

export default PrivateClassAndPayment