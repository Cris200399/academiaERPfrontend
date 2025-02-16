class PrivateClassPayment {
    constructor(id = '', student, privateClass, date, amount, paymentMethod) {
        this.id = id;
        this.student = student;
        this.privateClass = privateClass;
        this.date = date;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }

}

export default PrivateClassPayment;