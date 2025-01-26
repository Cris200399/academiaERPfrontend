class GroupPayment{

    constructor(student, amount, date = new Date(), paymentMethod, groupClass, startDate, endDate, description, status){
        this.student = student;
        this.amount = amount;
        this.date = date;
        this.paymentMethod = paymentMethod;
        this.groupClass = groupClass;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.status = status;
    }
}