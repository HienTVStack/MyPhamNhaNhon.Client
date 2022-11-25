import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function ResultPayment({ id }) {
    return (
        <Paper>
            <Stack justifyContent={"center"} alignItems={"center"} spacing={2} p={2}>
                <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"}>
                    Cảm ơn vì bạn đã mua hàng!
                </Typography>
                <ShoppingCartCheckoutIcon sx={{ width: 180, height: 180 }} color="primary" />
                <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"}>
                    Cảm ơn vì bạn đã mua hàng!
                </Typography>

                <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"}>
                    {id || ""}
                </Typography>
                <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"} textAlign={"center"}>
                    Chúng tôi sẽ gửi thông báo cho bạn trong vòng 5 ngày khi hàng được giao. Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào thì hãy liên
                    hệ với chúng tôi.
                </Typography>
                <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"}>
                    Tất cả những điều tốt nhất,
                </Typography>
                <Divider />
                <Button startIcon={<ChevronLeftIcon />}>Tiếp tục mua hàng</Button>
            </Stack>
        </Paper>
    );
}

export default ResultPayment;
