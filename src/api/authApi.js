import axiosClient from "./axiosClient";

const DEFAULT_URL = "auth";

const authApi = {
    register: (params) => axiosClient.post(`${DEFAULT_URL}/register`, params),
    login: (params) => axiosClient.post(`${DEFAULT_URL}/login`, params),
    loginGoogle: (params) =>
        axiosClient.post(`${DEFAULT_URL}/login-google`, params),
    loginFacebook: (params) =>
        axiosClient.post(`${DEFAULT_URL}/login-facebook`, params),
    verifyToken: () => axiosClient.post(`${DEFAULT_URL}/verify-token`),
};

export default authApi;
