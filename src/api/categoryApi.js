import axiosClient from "./axiosClient";

const DEFAULT_URL = "category";

const categoryApi = {
    getAll: () => axiosClient.get(`${DEFAULT_URL}/getAll`),
    getProducts: (params) => axiosClient.get(`/products/category/${params}`),
};

export default categoryApi;
