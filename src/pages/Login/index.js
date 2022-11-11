import { Button, Card, CardContent, Divider, Icon, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// image
import images from "../../assets/images";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useSelector } from "react-redux";
import authApi from "../../api/authApi";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

function Login() {
    console.log(process.env.REACT_APP_API);

    const user = useSelector((state) => state.data.user);
    const theme = useTheme();
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [loading, setLoading] = useState(false);

    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const handleSubmit = async (e) => {
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

        if (err) return;

        try {
            setLoading(true);
            const res = await authApi.login({ username, password });
            localStorage.setItem("token", res.token);
            setLoading(false);
            navigate("/");
        } catch (error) {
            setLoading(false);
            const errors = error.data.errors;

            errors.forEach((e) => {
                if (e.param === "username") {
                    setUsernameErr(e.msg);
                }
                if (e.param === "password") {
                    setPasswordErr(e.msg);
                }
            });
        }
    };

    //Handle login with google
    const handleLoginWidthGoogle = useGoogleLogin({
        onSuccess: async (res) => {
            setLoading(true);
            try {
                const data = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
                    headers: {
                        Authorization: `Bearer ${res.access_token}`,
                    },
                });
                console.log(data.data);
                try {
                    const res = await authApi.loginGoogle(data.data);
                    localStorage.setItem("token", res.token);
                    setLoading(false);
                    navigate("/");
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    //Handle login facebook
    const handleLoginWithFacebook = async (response) => {
        try {
            setLoading(true);

            const res = await authApi.loginFacebook(response);
            if (res) {
                localStorage.setItem("token", res.token);
                setLoading(false);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Stack alignItems={"center"} justifyContent={"center"} sx={{ marginTop: matches ? "180px" : "200px" }}>
            <Card sx={{ width: "400px" }} component={"form"} noValidate onSubmit={handleSubmit}>
                <CardContent>
                    <img src={images.logo} alt="" style={{ objectFit: "contain", height: "100%", width: "100%" }} />

                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            onClick={handleLoginWidthGoogle}
                            sx={{ color: "#DF3E30", width: "50%" }}
                        ></Button>
                        <FacebookLogin
                            appId="430008532603669"
                            onSuccess={(response) => {
                                console.log("Login Success!", response);
                            }}
                            onFail={(error) => {
                                console.log("Login Failed!", error);
                            }}
                            onProfileSuccess={(response) => {
                                handleLoginWithFacebook(response);
                            }}
                            style={{
                                width: "50%",
                                height: "40px",
                                borderRadius: "5px",
                                border: "1px solid #1C9CEA",
                                backgroundColor: "transparent",
                                color: "#1C9CEA",
                            }}
                            children={<FacebookOutlinedIcon />}
                        />
                    </Stack>
                    <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            OR
                        </Typography>
                    </Divider>
                    {/* <Divider /> */}
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
                    <LoadingButton type="submit" fullWidth loading={loading} variant="outlined" size="large" sx={{ marginTop: "20px" }}>
                        Đăng nhập
                    </LoadingButton>
                </CardContent>
                <Button fullWidth size="large" component={Link} to={"/dang-ky"}>
                    Tạo tài khoản mới
                </Button>
                <Button fullWidth size="large" component={Link} to={"/quen-mat-khau"} sx={{ mb: "16px" }}>
                    Quên mật khẩu?
                </Button>
            </Card>
        </Stack>
    );
}

export default Login;
