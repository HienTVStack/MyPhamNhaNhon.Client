import axios from "axios";
import queryString from "query-string";

// const baseUrl = "https://myphamnhanhon-server.vercel.app/api/";
const baseUrl = "http://localhost:3001/api/";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

export const axiosDelivery = axios.create({
  baseURL: "http://103.98.160.166:4900/",
  paramsSerializer: (params) => queryString.stringify({ params }),
  headers: {
    shop_id: "121064",
    token: "2e0af70d-7b85-11ed-a2ce-1e68bf6263c5",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return console.warn(err);
    }
    throw err.response;
  }
);

export default axiosClient;
