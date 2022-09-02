import axiosClient from "./axiosClient";

const productApi = {
    search: (params) => axiosClient.get(`/products/searchBox?q=${params}`),
    getHome: (params) => axiosClient.get(`/products?pageNumber=${params}`),
    getOne: (params) => axiosClient.get(`/products/${params}`),
};

export default productApi;
