import axiosClient from "./axiosClient";

const DEFAULT_URL = "discount";

const discountApi = {
    checkCodeByCustomer: (data) => axiosClient.post(`${DEFAULT_URL}/checkCodeByCustomer`, data),
    checkTotalInvoiceVerifyDiscount: (totalInvoice) => axiosClient.post(`${DEFAULT_URL}/checkTotalInvoiceVerifyDiscount`, totalInvoice),
};

export default discountApi;
