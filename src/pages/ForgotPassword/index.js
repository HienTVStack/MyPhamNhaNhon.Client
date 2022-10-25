import { useEffect, useState } from "react";
import {
    Alert,
    Card,
    CardContent,
    Snackbar,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../../api/authApi";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const theme = useTheme();
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [loading, setLoading] = useState(false);
    const [passwordErr, setPasswordErr] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
    const [open, setOpen] = useState(false);

    const query = new URLSearchParams(document.location.search);
    const preDate = new Date(query.get("date"));

    const today = new Date();
    const date =
        today.getMonth() +
        1 +
        "-" +
        today.getDate() +
        "-" +
        today.getFullYear();

    console.log(preDate.getTime() === new Date(date).getTime());

    useEffect(() => {
        if (preDate.getTime() !== new Date(date).getTime()) {
            //Handle show toast message
            setLoading(true);
        }
        setEmail(query.get("email"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData(e.target);
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");

        let err = false;
        if (password.length < 8) {
            err = true;
            setPasswordErr(`Mật khẩu tối thiểu là 8 kí tự`);
        }
        if (password !== confirmPassword) {
            err = true;
            setConfirmPasswordErr(`Mật khẩu nhập lại không khớp`);
        }
        setLoading(false);
        if (err) return;

        try {
            setLoading(true);
            const res = await authApi.updatePassword({ password, email });

            if (res) {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate("/dang-nhap");
                }, 2000);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ marginTop: matches ? "180px" : "200px" }}
            >
                <Card
                    sx={{ width: "400px" }}
                    component={"form"}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <CardContent>
                        <Typography
                            variant="h3"
                            color="primary"
                            textAlign={"center"}
                        >
                            Thay đổi mật khẩu
                        </Typography>
                        <Typography variant="body2" textAlign={"center"}>
                            Xin chào {email}
                        </Typography>

                        <TextField
                            margin={"normal"}
                            fullWidth
                            placeholder={"Nhập mật khẩu"}
                            label={"Nhập mật khẩu"}
                            name={"password"}
                            id={"password"}
                            type="password"
                            required
                            disabled={loading}
                            error={passwordErr !== ""}
                            helperText={passwordErr}
                        />
                        <TextField
                            margin={"normal"}
                            fullWidth
                            placeholder={"Nhập lại mật khẩu"}
                            label={"Nhập lại mật khẩu"}
                            name={"confirmPassword"}
                            id={"confirmPassword"}
                            type="password"
                            required
                            disabled={loading}
                            error={confirmPasswordErr !== ""}
                            helperText={confirmPasswordErr}
                        />

                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={loading}
                            variant="outlined"
                            size="large"
                            sx={{ marginTop: "20px" }}
                        >
                            Xác nhận
                        </LoadingButton>
                    </CardContent>
                </Card>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Bạn thay đổi mật khẩu thành công!
                </Alert>
            </Snackbar>
        </>
    );
}

export default ForgotPassword;
