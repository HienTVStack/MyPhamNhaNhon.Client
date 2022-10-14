import axiosClient from "./axiosClient";

const DEFAULT_URL = "auth";

const authApi = {
    register: (params) => axiosClient.post(`${DEFAULT_URL}/register`, params),
    isActive: (params) => axiosClient.post(`${DEFAULT_URL}/isActive`, params),
    login: (params) => axiosClient.post(`${DEFAULT_URL}/login`, params),
    loginGoogle: (params) =>
        axiosClient.post(`${DEFAULT_URL}/login-google`, params),
    loginFacebook: (params) =>
        axiosClient.post(`${DEFAULT_URL}/login-facebook`, params),
    forgotPassword: (params) =>
        axiosClient.post(`${DEFAULT_URL}/forgot-password`, params),
    updatePassword: (params) =>
        axiosClient.post(`${DEFAULT_URL}/update-password`, params),
    verifyToken: () => axiosClient.post(`${DEFAULT_URL}/verify-token`),
};

export default authApi;
