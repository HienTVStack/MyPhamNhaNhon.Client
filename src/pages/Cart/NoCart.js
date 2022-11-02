import { Typography, Button } from "@mui/material";
import { CartNoCartWrapper } from "../../styles/Cart";
import { Link } from "react-router-dom";

function NoCart({ matches }) {
    return (
        <CartNoCartWrapper>
            <Typography variant="body2" fontSize={"18px"}>
                Giỏ hàng của bạn đang trống
            </Typography>
            <Button size="large" variant="contained" fullWidth sx={{ mt: 2 }} component={Link} to={"/"}>
                Mua sắm ngay
            </Button>
        </CartNoCartWrapper>
    );
}

export default NoCart;
