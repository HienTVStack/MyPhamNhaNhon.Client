import { Button, Divider, Stack, Typography } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function ResultPayment({ id }) {
    return (
        <Stack justifyContent={"center"} alignItems={"center"} spacing={2} p={2}>
            <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"}>
                Thank you for your purchase!
            </Typography>
            <ShoppingCartCheckoutIcon sx={{ width: 180, height: 180 }} color="primary" />
            <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"}>
                Thank you for your purchase!
            </Typography>

            <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"}>
                {id || ""}
            </Typography>
            <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"} textAlign={"center"}>
                We will send you a notification within 5 days when it ships. If you have any question or queries then fell to get in contact us.
            </Typography>
            <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"}>
                All the best,
            </Typography>
            <Divider />
            <Button startIcon={<ChevronLeftIcon />}>Tiếp tục mua hàng</Button>
        </Stack>
    );
}

export default ResultPayment;
