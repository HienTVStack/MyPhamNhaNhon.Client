import axiosClient from "./axiosClient";

const productApi = {
    search: (params) => axiosClient.get(`/products/searchBox?q=${params}`),
};

export default productApi;
