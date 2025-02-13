export default class GroupPayment {

    constructor(id, student, amount, paymentMethod, groupClass, startDate, endDate, concept, status, date) {
        this.id = id;
        this.student = student;
        this.amount = amount;
        this.date = date;
        this.paymentMethod = paymentMethod;
        this.groupClass = groupClass;
        this.startDate = startDate;
        this.endDate = endDate;
        this.concept = concept;
    }

    static fromApi(data) {
        return new GroupPayment(
            data._id,
            data.student,
            data.amount,
            data.paymentMethod,
            data.groupClass,
            data.startDate,
            data.endDate,
            data.concept,
            data.status,
            data.date
        );
    }

    static toApi(student, amount, paymentMethod, groupClass, startDate, endDate, concept, status, date = new Date()) {
        return new GroupPayment(
            null,
            student,
            amount,
            paymentMethod,
            groupClass,
            startDate,
            endDate,
            concept,
            status,
            date
        );
    }

    static toUpdateGroupPayment(id, amount, startDate, endDate, paymentMethod, concept) {
        return new GroupPayment(
            id,
            null,
            amount,
            paymentMethod,
            null,
            startDate,
            endDate,
            concept,
            null,
            null
        );
    }
}

