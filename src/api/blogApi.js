import axiosClient from "./axiosClient";

const blogApi = {
    search: (params) => axiosClient.get(`/blog/searchBox?q=${params}`),
    getHome: (params) => axiosClient.get(`/blog?pageNumber=${params}`),
    getOne: (params) => axiosClient.get(`/blog/${params}`),
};

export default blogApi;
