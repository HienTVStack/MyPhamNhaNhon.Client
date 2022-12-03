import { Box, Paper, Stack, Typography } from "@mui/material";
import { fNumber } from "../../../src/utils/formatNumber";

function InvoiceItem(props) {
    const { invoiceItem } = props;
    const { products, total, discount } = invoiceItem;

    return (
        <Paper elevation={2} sx={{ p: 1, mb: 2 }}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <img src={products[0]?.image} alt={""} width={100} height={100} />
                    <Box>
                        {products?.map((item, index) => (
                            <Stack key={index} direction={"row"} alignItems={"center"}>
                                <Typography variant={"subtitle1"}>{item.name}</Typography>
                                <Typography variant={"body2"}>x{item.quantity}</Typography>
                            </Stack>
                        ))}
                    </Box>
                </Stack>
                <Box>
                    <Typography variant={"body1"}>{discount?.discountValue !== 0 && discount?.discountValue}</Typography>
                    <Typography variant={"body1"}>{`${fNumber(total)} vnđ`}</Typography>
                    <Typography variant={"body1"}>Giao hàng thành công</Typography>
                </Box>
            </Stack>
        </Paper>
    );
}

export default InvoiceItem;
