import axiosClient from "./axiosClient";

const categoryApi = {
    getAll: () => axiosClient.get("category"),
    getProducts: (params) => axiosClient.get(`/products/category/${params}`),
};

export default categoryApi;
