import axiosClient from "./axiosClient";

const blogApi = {
    search: (params) => axiosClient.get(`/blog/searchBox?q=${params}`),
};

export default blogApi;
