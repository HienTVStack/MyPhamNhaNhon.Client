import axiosClient from "./axiosClient";

const DEFAULT_URL = "tag";

const tagApi = {
  getAll: () => axiosClient.get(`${DEFAULT_URL}/getAll`),
};

export default tagApi;
