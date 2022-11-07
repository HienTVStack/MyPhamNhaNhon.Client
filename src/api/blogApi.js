import axiosClient from "./axiosClient";

const DEFAULT_URL = "blog";

const blogApi = {
    getAll: () => axiosClient.get(`${DEFAULT_URL}/getAll`),
    // create: (params) => axiosClient.post(`${DEFAULT_URL}/create`, params),
};

export default blogApi;
