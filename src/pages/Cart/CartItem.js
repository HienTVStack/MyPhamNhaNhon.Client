// Material UI
import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
// Material icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "react-router-dom";
// Styled
import {
    CartActionsQuantity,
    CartItemActionRemoveCart,
    CartItemButtonAction,
    CartItemCategoryWrapper,
    CartItemContentWrapper,
    CartItemImageWrapper,
    CartItemName,
    CartItemPrevPrice,
    CartItemQuantity,
    CartItemWrapper,
} from "../../styles/Cart";
// Components
import Image from "../../components/Image";
import FormatNumber from "../../components/FormatNumber";

function CartItem({ matches, cart, removeCartItem, increment, decrement, productSelected }) {
    const handleRemoveCartItem = (id) => {
        removeCartItem(id);
    };

    const handleIncrement = (cart) => {
        increment(cart);
    };

    const handleDecrement = (cart) => {
        if (cart.quantity < 2) {
            removeCartItem(cart.id);
            return;
        }
        decrement(cart);
    };

    const handleSelected = (isChecked, product) => {
        productSelected(isChecked, product);
    };
    return (
        <CartItemWrapper>
            <Checkbox
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    handleSelected(isChecked, cart);
                }}
            />
            <Box display={"flex"} flex={1}>
                <Stack justifyContent={"center"}>
                    <CartItemImageWrapper>
                        <Image src={cart.image} alt={cart.name} />
                    </CartItemImageWrapper>
                </Stack>

                <CartItemContentWrapper>
                    <CartItemName variant="body2" component="h2">
                        {cart.name}
                    </CartItemName>
                    <CartItemCategoryWrapper>
                        <Typography variant="body2" fontSize={"12px"}>
                            Phân loại hàng: {cart.type}
                        </Typography>
                    </CartItemCategoryWrapper>
                    <CartActionsQuantity display={"flex"} alignItems={"center"}>
                        {cart.prev_price && (
                            <CartItemPrevPrice variant="body2" component="span">
                                <FormatNumber number={cart.prev_price} />
                            </CartItemPrevPrice>
                        )}
                        <Typography variant={"body2"} component="span">
                            <FormatNumber number={cart.price} />
                        </Typography>
                    </CartActionsQuantity>

                    <CartActionsQuantity>
                        <CartItemButtonAction onClick={() => handleDecrement(cart)}>
                            <RemoveIcon />
                        </CartItemButtonAction>
                        <CartItemQuantity value={cart.quantity} disabled />
                        <CartItemButtonAction onClick={() => handleIncrement(cart)}>
                            <AddIcon />
                        </CartItemButtonAction>
                    </CartActionsQuantity>

                    {matches && (
                        <Typography variant="body2" component={"span"}>
                            <FormatNumber number={cart.quantity * cart.price} />
                        </Typography>
                    )}
                    {matches && (
                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            <Button variant="text" onClick={() => handleRemoveCartItem(cart._id)}>
                                Xóa
                            </Button>
                            <Box display={"block"} width={"120px"} textAlign={"center"} component={Link} to={`/san-pham/${cart.category}`}>
                                Tìm sản phẩm tương tự
                            </Box>
                        </Box>
                    )}
                </CartItemContentWrapper>
            </Box>
            {!matches && <CartItemActionRemoveCart size="small" children={<HighlightOffIcon />}></CartItemActionRemoveCart>}
        </CartItemWrapper>
    );
}

export default CartItem;
