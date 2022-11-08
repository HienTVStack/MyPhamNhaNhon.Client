import axiosClient from "./axiosClient";

const DEFAULT_URL = "product";

const productApi = {
    search: (params) => axiosClient.get(`/products/searchBox?q=${params}`),
    getHome: (params) => axiosClient.get(`/products?pageNumber=${params}`),
    getOne: (params) => axiosClient.get(`/products/${params}`),
    //
    getAll: () => axiosClient.get(`${DEFAULT_URL}/getAll`),
    getById: (params) => axiosClient.get(`${DEFAULT_URL}/${params}/detail`),
    getBySlug: (params) => axiosClient.get(`${DEFAULT_URL}/${params}/detail`),
    addReview: (params) => axiosClient.put(`${DEFAULT_URL}/addReview`, params),
    getProductByCategory: (params) => axiosClient.get(`${DEFAULT_URL}/category/${params}`),
    getProductIntroduce: () => axiosClient.get(`${DEFAULT_URL}/introduce`),
};

export default productApi;
