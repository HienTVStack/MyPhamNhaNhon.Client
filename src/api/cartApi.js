import axiosClient from "./axiosClient";

const DEFAULT_URL = "cart";

const authApi = {
    getByIdAuth: (params) => axiosClient.get(`${DEFAULT_URL}/auth/${params}`),
    addProductToCart: (params) => axiosClient.put(`${DEFAULT_URL}/addProduct`, params),
};

export default authApi;
