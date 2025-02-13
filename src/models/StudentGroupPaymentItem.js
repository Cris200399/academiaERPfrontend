import {getPaymentMethodLabel} from "@/utils/getPaymentMethodLabel";

class StudentGroupPaymentItem {
    constructor({_id, name, lastName, paymentStatus, group, groupPayments}) {
        this.id = _id;
        this.name = name;
        this.lastName = lastName;
        this.paymentStatus = paymentStatus;
        this.group = group;
        this.groupPayments = groupPayments;
    }

    static getPaymentsMethods(groupPayment){
        const paymentMethods = groupPayment.map((paymentMethod) => getPaymentMethodLabel(paymentMethod));
        return paymentMethods.join(', ');
    }
}

export default StudentGroupPaymentItem;