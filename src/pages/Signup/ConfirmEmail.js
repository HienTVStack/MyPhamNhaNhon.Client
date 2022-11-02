import { Button, Card, CardContent, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import authApi from "../../api/authApi";

function ConfirmEmail() {
    const theme = useTheme();
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [loading, setLoading] = useState(false);
    const [confirmEmailErr, setConfirmEmailErr] = useState("");

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setConfirmEmailErr("");

        const data = new FormData(e.target);
        const codeConfirmEmail = data.get("codeConfirmEmail");

        if (codeConfirmEmail.length <= 0) {
            setConfirmEmailErr(`Vui lòng nhập mã xác thực`);
            return;
        }

        try {
            const userId = localStorage.getItem("userId");
            const res = await authApi.isActive({ userId, codeConfirmEmail });

            if (res) {
                localStorage.setItem("token", res.token);
                navigate("/");
            }
        } catch (error) {
            const errors = error.data.errors;
            if (errors) {
                errors.forEach((e) => {
                    if (e.param === "codeConfirmEmail") {
                        setConfirmEmailErr(e.msg);
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
                        Xác thực email
                    </Typography>
                    <TextField
                        margin={"normal"}
                        fullWidth
                        placeholder={"Mã xác thực"}
                        label={"Mã xác thực"}
                        name={"codeConfirmEmail"}
                        id={"codeConfirmEmail"}
                        required
                        disabled={loading}
                        error={confirmEmailErr !== ""}
                        helperText={confirmEmailErr}
                    />

                    <LoadingButton type="submit" fullWidth loading={loading} variant="outlined" size="large" sx={{ marginTop: "20px" }}>
                        Xác thực
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

export default ConfirmEmail;
