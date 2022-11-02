import { Button, Card, CardContent, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//Api
import authApi from "../../api/authApi";
// Utils
import authUtil from "../../utils/authUtil";
import ReCAPTCHA from "react-google-recaptcha";

function Signup() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [usernameErr, setUsernameErr] = useState("");
    const [fullNameErr, setFullNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPPasswordErr] = useState("");
    // const [showMsgNotify, setShowMsgNotify] = useState(false);
    const [checkReCaptcha, setCheckReCaptcha] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await authUtil.isAuthenticated();
            if (isAuth) {
                navigate("/");
            }
        };
        checkAuth();
    }, [navigate]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setUsernameErr("");
        setFullNameErr("");
        setEmailErr("");
        setPasswordErr("");
        setConfirmPPasswordErr("");

        const data = new FormData(e.target);
        const username = data.get("username");
        const password = data.get("password");
        const fullName = data.get("fullName");
        const email = data.get("email");
        const confirmPassword = data.get("confirmPassword");

        let err = false;

        if (username === "") {
            err = true;
            setUsernameErr(`Tên đăng nhập không được để trống`);
        }
        if (Number(username.length) < 8) {
            setUsernameErr(`Tên đăng nhập ít nhất là 8 kí tự`);
            err = true;
        }
        if (fullName.length === 0) {
            err = true;
            setFullNameErr(`Tên người dùng không được để trống`);
        }
        if (email.length === 0) {
            err = true;
            setEmailErr(`Email không được để trống`);
        }

        if (password === "") {
            err = true;
            setPasswordErr(`Mật khẩu không được để trống`);
        }
        if (Number(password.length) < 8) {
            setPasswordErr(`Mật khẩu ít nhất là 8 kí tự`);
            err = true;
        }
        if (confirmPassword !== password) {
            err = true;
            setConfirmPPasswordErr(`Nhập lại mật khẩu không chính xác`);
        }

        if (!checkReCaptcha) {
            err = true;
        }

        setLoading(false);
        if (err) return;

        //Random code confirm
        const codeConfirm = Math.floor(Math.random() * (999999 - 100000)) + 100000;

        try {
            const res = await authApi.register({
                username,
                fullName,
                email,
                password,
                confirmPassword,
                codeConfirm,
            });
            if (res) {
                localStorage.setItem("userId", res.user.id);
                navigate("/xac-nhan-email");
            }
        } catch (error) {
            setLoading(false);
            const errors = error.data.errors;
            if (errors) {
                errors.forEach((e) => {
                    if (e.param === "username") {
                        setUsernameErr(e.msg);
                    }
                    if (e.param === "password") {
                        setPasswordErr(e.msg);
                    }
                    if (e.param === "email") {
                        setEmailErr(e.msg);
                    }
                });
            }
        }
    };

    return (
        <Stack alignItems={"center"} justifyContent={"center"} sx={{ marginTop: matches ? "180px" : "200px" }}>
            <Card sx={{ width: "400px" }} component={"form"} noValidate onSubmit={handleSubmit}>
                <CardContent>
                    <Typography variant="h3" color="primary" textAlign={"center"}>
                        Đăng ký
                    </Typography>
                    {/* {showMsgNotify && (
                        <Typography
                            variant="h4"
                            color="error"
                            textAlign={"center"}
                        >
                            *Vui lòng kiểm tra email xác thực
                        </Typography>
                    )} */}
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
                        placeholder={"Tên người dùng"}
                        label={"Tên người dùng"}
                        name={"fullName"}
                        id={"fullName"}
                        required
                        disabled={loading}
                        error={fullNameErr !== ""}
                        helperText={fullNameErr}
                    />
                    <TextField
                        margin={"normal"}
                        fullWidth
                        placeholder={"Email"}
                        label={"Email"}
                        name={"email"}
                        id={"email"}
                        type={"email"}
                        required
                        disabled={loading}
                        error={emailErr !== ""}
                        helperText={emailErr}
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
                    <ReCAPTCHA
                        sitekey="6LfNj3AiAAAAAG0HoIcbz4VjzVgBa6lkRLKpCuF9"
                        hl="vi"
                        render="explicit"
                        size="normal"
                        onChange={() => setCheckReCaptcha(true)}
                    />
                    <LoadingButton type="submit" fullWidth loading={loading} variant="outlined" size="large" sx={{ marginTop: "20px" }}>
                        Đăng ký
                    </LoadingButton>
                </CardContent>
                <Button fullWidth size="small" component={Link} to={"/dang-nhap"} sx={{ mb: "16px" }}>
                    Bạn đã có tài khoản? Đăng nhập
                </Button>
            </Card>
        </Stack>
    );
}

export default Signup;
