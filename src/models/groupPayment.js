class GroupPayment{

    constructor(student, amount, paymentMethod, groupClass, startDate, endDate, concept, status, date = new Date()){
        this.student = student;
        this.amount = amount;
        this.date = date;
        this.paymentMethod = paymentMethod;
        this.groupClass = groupClass;
        this.startDate = startDate;
        this.endDate = endDate;
        this.concept = concept;
        this.status = status;
    }
}

export default GroupPayment;