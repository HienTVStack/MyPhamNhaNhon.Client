import axiosClient from "./axiosClient";

const DEFAULT_URL = "invoice";

const invoiceApi = {
    getById: (idAuth) => axiosClient.get(`${DEFAULT_URL}/${idAuth}`),
    create: (params) => axiosClient.post(`${DEFAULT_URL}/create`, params),
    paypal: (data) => axiosClient.post(`${DEFAULT_URL}/paypal`, data),
    getListInvoiceAuth: (id) => axiosClient.get(`${DEFAULT_URL}/${id}/listAuth`),
};

export default invoiceApi;
