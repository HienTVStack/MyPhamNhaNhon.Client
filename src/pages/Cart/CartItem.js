import {
    Box,
    Checkbox,
    IconButton,
    InputBase,
    Stack,
    Typography,
} from "@mui/material";
import {
    CartActionsQuantity,
    CartItemImageWrapper,
    CartItemWrapper,
} from "../../styles/Cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "../../components/Image";

function CartItem({ itemCart }) {
    return (
        <CartItemWrapper>
            <Checkbox />
            <Box display={"flex"} flex={1}>
                <Stack justifyContent={"center"}>
                    <CartItemImageWrapper>
                        <Image
                            src="https://cf.shopee.vn/file/368df29b0aebe308a95c26509bd4248c_tn"
                            alt="product"
                        />
                    </CartItemImageWrapper>
                </Stack>

                <Box ml={1} flex={1}>
                    <Typography
                        variant="body2"
                        component="h2"
                        fontSize={"13px"}
                    >
                        Name
                    </Typography>
                    <Box p={1} backgroundColor={"#ccc"}>
                        <Typography variant="body2" fontSize={"12px"}>
                            Category
                        </Typography>
                    </Box>
                    <Typography variant={"body2"} fontSize={"14px"}>
                        PRICE
                    </Typography>
                    <CartActionsQuantity>
                        <IconButton children={<RemoveIcon />} />
                        <InputBase
                            value={1}
                            sx={{
                                width: "30px",
                                padding: "0 13px",
                            }}
                            disabled
                        />
                        <IconButton children={<AddIcon />} />
                    </CartActionsQuantity>
                </Box>
            </Box>
        </CartItemWrapper>
    );
}

export default CartItem;
