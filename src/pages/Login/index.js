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

function Login() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [loading, setLoading] = useState(false);
    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsernameErr("");
        setPasswordErr("");

        const data = new FormData(e.target);
        const username = data.get("username");
        const password = data.get("password");

        let err = false;
        if (username === "") {
            err = true;
            setUsernameErr(`Tên đăng nhập không được để trống`);
        }
        if (password === "") {
            err = true;
            setPasswordErr(`Mật khẩu không được để trống`);
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
                        Đăng nhập
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
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={loading}
                        variant="outlined"
                        size="large"
                        sx={{ marginTop: "20px" }}
                    >
                        Đăng nhập
                    </LoadingButton>
                </CardContent>
                <Button fullWidth size="large" component={Link} to={"/dang-ky"}>
                    Tạo tài khoản mới
                </Button>
                <Button fullWidth size="large" sx={{ mb: "16px" }}>
                    Quên mật khẩu?
                </Button>
            </Card>
        </Stack>
    );
}

export default Login;
