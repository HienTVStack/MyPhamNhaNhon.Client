import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SubscribeButton, SubscribeChildren, SubscribeInput, SubscribeWrapper } from "../../../styles/Subscribe";

function Subscribe() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <SubscribeWrapper>
            <SubscribeChildren>
                <Typography variant="h2" fontSize={"30px"} color={"#fff"} fontWeight={"700"}>
                    BẠN CẦN TƯ VẤN
                </Typography>
                <Typography variant="body2" fontSize={matches ? "16px" : "12px"} color={"#fff"} fontWeight={"400"} textAlign={"center"}>
                    Mình có đồ skincare để chị em phụ nữ chúng mình sẽ cùng nhau đẹp lên mỗi ngày. Nếu có gì muốn tư vấn về skincare, make up hay làm
                    đẹp hãy cứ inbox/để lại email nhé !
                </Typography>
                <Box component="form" noValidate mt={3} sx={{ height: "50px" }} onSubmit={handleSubmit}>
                    <SubscribeInput placeholder="Địa chỉ email của bạn" name="email" id="email" />
                    <SubscribeButton variant="contained" type="submit">
                        Đăng ký ngay
                    </SubscribeButton>
                </Box>
            </SubscribeChildren>
        </SubscribeWrapper>
    );
}

export default Subscribe;
