import {
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [loading, setLoading] = useState(false);
    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPPasswordErr] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsernameErr("");
        setPasswordErr("");
        setConfirmPPasswordErr("");

        const data = new FormData(e.target);
        const username = data.get("username");
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");

        let err = false;
        if (username === "") {
            err = true;
            setUsernameErr(`Tên đăng nhập không được để trống`);
        }
        if (password === "") {
            err = true;
            setPasswordErr(`Mật khẩu không được để trống`);
        }

        if (confirmPassword !== password) {
            err = true;
            setConfirmPPasswordErr(`Nhập lại mật khẩu không chính xác`);
        }

        console.log(username, password);

        if (err) return;
    };

    return (
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
                        Đăng ký
                    </Typography>
                    <TextField
                        margin={"normal"}
                        fullWidth
                        placeholder={"Tên đăng nhâp"}
                        label={"Tên đăng nhập"}
                        name={"username"}
                        id={"username"}
                        required
                        disabled={loading}
                        error={usernameErr !== ""}
                        helperText={usernameErr}
                    />
                    <TextField
                        margin={"normal"}
                        fullWidth
                        placeholder={"Mật khẩu"}
                        label={"Mật khẩu"}
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
                        Đăng ký
                    </LoadingButton>
                </CardContent>
                <Button
                    fullWidth
                    size="small"
                    component={Link}
                    to={"/dang-nhap"}
                    sx={{ mb: "16px" }}
                >
                    Bạn đã có tài khoản? Đăng nhập
                </Button>
            </Card>
        </Stack>
    );
}

export default Signup;
