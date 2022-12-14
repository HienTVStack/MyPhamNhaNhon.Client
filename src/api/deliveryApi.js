import { axiosDelivery } from "./axiosClient";

const DEFAULT_URL = "address";

const deliveryApi = {
  orderFee: (data) =>
    axiosDelivery.post("ghn/order-fee", {
      ...data,
      fromProvince: "Hồ Chí Minh",
      fromDistrict: "Quận 12",
      service: 2,
      weight: 300,
      insurance_fee: 0,
      coupon: "",
    }),
  getProvince: () => axiosDelivery.get(`${DEFAULT_URL}/list-provice`),
  getDistrict: (provinceName) => axiosDelivery.get(`${DEFAULT_URL}/list-district/${provinceName}`),
  getWard: (districtName) => axiosDelivery.get(`${DEFAULT_URL}/list-ward/${districtName}`),
};

export default deliveryApi;
