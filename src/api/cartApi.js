import axiosClient from "./axiosClient";

const DEFAULT_URL = "cart";

const cartApi = {
    getByIdAuth: (params) => axiosClient.get(`${DEFAULT_URL}/auth/${params}`),
    addProductToCart: (params) => axiosClient.put(`${DEFAULT_URL}/addProduct`, params),
};

export default cartApi;
