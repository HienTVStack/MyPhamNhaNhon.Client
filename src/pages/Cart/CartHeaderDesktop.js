import { Box, Checkbox, Typography } from "@mui/material";

function CartHeaderDesktop() {
    return (
        <Box display={"flex"} alignItems={"center"}>
            <Checkbox />
            <Typography width={"600px"}>Sản phẩm</Typography>

            <Box
                flex={1}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
            >
                <Typography>Đơn giá</Typography>
                <Typography>Số lượng</Typography>
                <Typography>Số tiền</Typography>
                <Typography>Thao tác</Typography>
            </Box>
        </Box>
    );
}

export default CartHeaderDesktop;
