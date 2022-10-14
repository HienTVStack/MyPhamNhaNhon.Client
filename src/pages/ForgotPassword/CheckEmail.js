import {
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";

// image
import authApi from "../../api/authApi";
import { useState } from "react";

function CheckEmail() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState("");
    const [showNotify, setShowNotify] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);
        const email = data.get("email");

        let err = false;
        if (email.length <= 0) {
            err = true;
            setEmailErr(`Không được để trống trường này`);
        }

        if (err) return;

        try {
            const checkEmail = await authApi.forgotPassword({ email });

            if (checkEmail) {
                setShowNotify(true);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            const errors = error.data.errors;

            if (errors) {
                errors.forEach((e) => {
                    if (e.param === "email") {
                        setEmailErr(e.msg);
                    }
                });
            }
        }
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
                    {showNotify && (
                        <Typography
                            variant="h4"
                            color="error"
                            textAlign={"center"}
                        >
                            *Vui lòng kiểm tra e-mail
                        </Typography>
                    )}

                    <TextField
                        margin={"normal"}
                        fullWidth
                        placeholder={"Nhập E-mail của bạn"}
                        label={"Nhập E-mail của bạn"}
                        name={"email"}
                        id={"email"}
                        required
                        disabled={loading}
                        error={emailErr !== ""}
                        helperText={emailErr}
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
    );
}

export default CheckEmail;
