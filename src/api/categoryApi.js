import axiosClient from "./axiosClient";

const categoryApi = {
    getAll: () => axiosClient.get("category"),
};

export default categoryApi;
