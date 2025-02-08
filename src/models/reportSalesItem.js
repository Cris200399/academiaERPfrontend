import {orderMonths} from "@/constants/orderMonths";

class ReportSalesItem{
    constructor(data){
        this.month = orderMonths[data._id - 1];
        this.totalPayments = data.totalPayments;
    }
}

export default ReportSalesItem;