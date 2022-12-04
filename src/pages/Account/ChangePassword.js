import { Button, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../../../src/api/authApi";
import { setUser } from "../../../src/redux/actions";

function ChangePassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.data.user);
    const [oldPasswordErr, setOldPasswordErr] = useState("");
    const [newPasswordErr, setNewPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

    const handleSubmit = async (e) => {
        console.log("submit");
        e.preventDefault();
        const data = new FormData(e.target);

        const oldPassword = data.get("oldPassword");
        const newPassword = data.get("newPassword");
        const confirmPassword = data.get("confirmPassword");

        let err = false;

        // if (oldPassword !== user.password) {
        //     err = true;
        //     setOldPasswordErr("Mật khẩu không chính xác");
        // }
        if (newPassword.length < 8) {
            err = true;
            setNewPasswordErr("Mật khẩu tối thiểu là 8 kí tự");
        }
        if (newPassword !== confirmPassword) {
            err = true;
            setConfirmPasswordErr("Mật khẩu không khớp");
        }
        if (err) return;

        try {
            const res = await authApi.changePassword(user._id, { oldPassword, newPassword });

            if (res.success) {
                localStorage.removeItem("token");
                dispatch(setUser({}));
                navigate("/dang-nhap");
            }
        } catch (error) {
            console.log(error.data);
            setOldPasswordErr(error.data.description);
        }
    };
    return (
        <Paper elevation={2} sx={{ padding: 2 }}>
            <Stack spacing={2} component={"form"} onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    required
                    type={"password"}
                    margin="normal"
                    name="oldPassword"
                    id={"oldPassword"}
                    placeholder={"Mật khẩu hiện tại"}
                    label={"Mật khẩu hiện tại"}
                    error={oldPasswordErr !== ""}
                    helperText={oldPasswordErr}
                />
                <TextField
                    fullWidth
                    required
                    type={"password"}
                    margin="normal"
                    name="newPassword"
                    id={"newPassword"}
                    helperText={"Mật khẩu ít nhất 8+ kí tự"}
                    error={newPasswordErr !== ""}
                    placeholder={"Mật khẩu mới"}
                    label={"Mật khẩu mới"}
                />
                <TextField
                    fullWidth
                    required
                    type={"password"}
                    margin="normal"
                    name="confirmPassword"
                    id={"confirmPassword"}
                    placeholder={"Xác nhận mật khẩu"}
                    label={"Xác nhận mật khẩu"}
                    helperText={confirmPasswordErr}
                    error={confirmPasswordErr !== ""}
                />
                <Button variant="contained" type={"submit"} size="large" sx={{ maxWidth: 200 }}>
                    Lưu thay đổi
                </Button>
            </Stack>
        </Paper>
    );
}

export default ChangePassword;
