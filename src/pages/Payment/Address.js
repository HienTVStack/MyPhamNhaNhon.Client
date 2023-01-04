import { useEffect, useState } from "react";
import { Typography, Stack, TextField, FormGroup, FormControlLabel, Button, Checkbox, Autocomplete } from "@mui/material";
import deliveryApi from "../../api/deliveryApi";

function Address(props) {
  const { user, onSubmit, changeAddressDefault } = props;
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const fetchProvinces = async () => {
    try {
      const res = await deliveryApi.getProvince();

      setProvinces(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleChangeProvince = async (value) => {
    try {
      const res = await deliveryApi.getDistrict(value?.provinceName);

      setDistricts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeDistrict = async (value) => {
    try {
      const res = await deliveryApi.getWard(value?.districtName);

      setWards(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const fullName = data.get("fullName").trim();
    const phone = data.get("phone").trim();
    const province = data.get("province").trim();
    const district = data.get("district").trim();
    const ward = data.get("ward").trim();
    const addressDetail = data.get("addressDetail").trim();

    const isReplaceAddress = data.get("isReplaceAddress");
    if (isReplaceAddress) {
      changeAddressDefault({ province, district, ward, addressDetail });
    }

    onSubmit({ province, district, ward, addressDetail, fullName, phone });
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Thông tin giao hàng
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Thông tin giao hàng cụ thể, chính xác tiết kiệm được hơn 40% thời gian sản phẩm được giao đến bạn
      </Typography>
      <Stack component="form" onSubmit={handleSubmit}>
        <TextField
          defaultValue={user.fullName}
          fullWidth
          margin="normal"
          name="fullName"
          placeholder="Người nhận"
          label="Người nhận"
          required={true}
          size="small"
        />
        <TextField
          fullWidth
          defaultValue={user.phone}
          margin="normal"
          name="phone"
          placeholder="Số điện thoại"
          label="Số điện thoại"
          required={true}
          size="small"
        />

        <Autocomplete
          autoComplete
          fullWidth
          disableClearable
          options={provinces || []}
          getOptionLabel={(option) => option?.provinceName || ""}
          isOptionEqualToValue={(option, value) => option?.provinceName === value?.provinceName}
          onChange={(e, value) => handleChangeProvince(value)}
          size="small"
          renderInput={(params) => (
            <TextField
              fullWidth
              margin="normal"
              name="province"
              id="province"
              required
              placeholder="Thành phố/ tỉnh"
              label="Thành phố/ tỉnh"
              size="small"
              {...params}
            />
          )}
        />
        <Autocomplete
          autoComplete
          fullWidth
          disableClearable
          options={districts || []}
          getOptionLabel={(option) => option.districtName || ""}
          isOptionEqualToValue={(option, value) => option?.districtName === value?.districtName}
          size="small"
          onChange={(e, value) => handleChangeDistrict(value)}
          renderInput={(params) => (
            <TextField
              fullWidth
              margin="normal"
              name="district"
              id="district"
              required
              placeholder="Quận / huyện"
              label="Quận / huyện"
              size="small"
              {...params}
            />
          )}
        />
        <Autocomplete
          autoComplete
          fullWidth
          disableClearable
          options={wards || []}
          getOptionLabel={(option) => option?.wardName || ""}
          isOptionEqualToValue={(option, value) => option?.wardName === value?.wardName}
          size="small"
          renderInput={(params) => (
            <TextField
              defaultValue={user.addressWard}
              fullWidth
              margin="normal"
              name="ward"
              id="ward"
              required
              placeholder="Phường / xã"
              label="Phường / xã"
              size="small"
              {...params}
            />
          )}
        />
        <TextField
          fullWidth
          margin="normal"
          name="addressDetail"
          id="addressDetail"
          placeholder="Số nhà, ngõ, ngách, hẻm, tòa nhà..."
          label="Số nhà, ngõ, ngách, hẻm, tòa nhà..."
          size="small"
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox name="isReplaceAddress" />} label="Thay đổi địa chỉ giao hàng mặc định" />
        </FormGroup>
        <Button variant="contained" type="submit" size="large" sx={{ mt: 4 }}>
          Xác nhận
        </Button>
      </Stack>
    </>
  );
}

export default Address;
