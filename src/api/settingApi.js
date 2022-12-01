import axiosClient from "./axiosClient";

const DEFAULT_URL = "setting";

const settingAPi = {
    get: () => axiosClient.get(`${DEFAULT_URL}/get`),
};

export default settingAPi;
