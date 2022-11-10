import { Box, useMediaQuery, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";

import CartHeaderDesktop from "./CartHeaderDesktop";
import CartFooter from "./CartFooter";
// import CART_PRODUCT from "../../data/carts";
import CartList from "./CartList";
import NoCart from "./NoCart";
import cartApi from "../../api/cartApi";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

function Cart() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));
    const user = useSelector((state) => state.data.user);
    const [loading, setLoading] = useState(false);
    // const []
    const [carts, setCarts] = useState([]);

    const cartLoaded = async () => {
        setLoading(true);
        try {
            if (user) {
                const res = await cartApi.getByIdAuth(user._id);
                if (res.message === "OK") {
                    setCarts(res.cart.products || []);
                }
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        cartLoaded();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const totalAmount = () => {
        let initTotal = 0;
        for (let cart of carts) {
            initTotal += cart.quantity;
        }
        return initTotal;
    };

    const totalPrice = () => {
        let initTotal = 0;
        for (let cart of carts) {
            initTotal += Number(cart.quantity * cart.price);
        }
        return initTotal;
    };

    const handleRemoveCartItem = (id) => {
        // eslint-disable-next-line array-callback-return
        const newCarts = carts.filter((cartItem) => {
            if (cartItem.id !== id) {
                return true;
            }
        });

        setCarts(newCarts);
    };

    const handleIncrement = (cartItem) => {
        const index = carts.findIndex((item) => {
            return item.id === cartItem.id;
        });

        const newCarts = [...carts];
        newCarts[index] = { ...cartItem };
        newCarts[index].quantity++;

        setCarts(newCarts);
    };

    const handleDecrement = (cartItem) => {
        const index = carts.findIndex((item) => {
            return item.id === cartItem.id;
        });

        const newCarts = [...carts];
        newCarts[index] = { ...cartItem };
        newCarts[index].quantity--;

        setCarts(newCarts);
    };

    return (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }} maxWidth={"lg"}>
            {loading ? (
                <Loading />
            ) : carts.length <= 0 ? (
                <NoCart />
            ) : (
                <Fragment>
                    <Typography
                        variant="body2"
                        component={"h1"}
                        textAlign={"center"}
                        fontSize={"24px"}
                        color={theme.palette.primary.main}
                        fontWeight={700}
                        mb={2}
                    >
                        Giỏ hàng của bạn tại Tiệm mỹ phẩm nhà Nhơn
                    </Typography>
                    {matches && <CartHeaderDesktop />}
                    <Box marginBottom={"70px"}>
                        <CartList
                            matches={matches}
                            carts={carts}
                            removeCartItem={handleRemoveCartItem}
                            increment={handleIncrement}
                            decrement={handleDecrement}
                        />
                    </Box>

                    <CartFooter matches={matches} totalPrice={totalPrice()} totalAmount={totalAmount()} />
                </Fragment>
            )}
        </Container>
    );
}

export default Cart;
