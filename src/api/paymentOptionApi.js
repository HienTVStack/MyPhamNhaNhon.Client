import axiosClient from "./axiosClient";

const DEFAULT_URL = "paymentOption";

const paymentOptionApi = {
    getAll: () => axiosClient.get(`${DEFAULT_URL}/getAll`),
    create: (params) => axiosClient.get(`${DEFAULT_URL}/create`, params),
};

export default paymentOptionApi;
