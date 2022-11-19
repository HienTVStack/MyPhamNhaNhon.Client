import { Box, useMediaQuery, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartHeaderDesktop from "./CartHeaderDesktop";
import CartFooter from "./CartFooter";
import CartList from "./CartList";
import NoCart from "./NoCart";
import Loading from "../../components/Loading";
import authApi from "../../api/authApi";
import authUtil from "../../utils/authUtil";
import { setUser } from "../../redux/actions";

function Cart() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));
    const user = useSelector((state) => state.data.user);
    const [loading, setLoading] = useState(false);
    const [carts, setCarts] = useState([]);
    const [productListChecked, setProductListChecked] = useState([]);

    // const userReLoaded = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await authApi.verifyToken();
    //         setCarts(res.user.carts);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        if (Object.entries(user).length !== 0) {
            // setCarts(user?.carts);
            const checkAuth = async () => {
                setLoading(true);
                const user = await authUtil.isAuthenticated();
                if (user) {
                    dispatch(setUser(user));
                    setCarts(user?.carts);
                }
                setLoading(false);
            };
            checkAuth();
        } else {
            navigate("/dang-nhap");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

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

    const handleRemoveCartItem = async (id) => {
        // eslint-disable-next-line array-callback-return

        try {
            const res = await authApi.removedCart(user._id, { id });
            if (res?.success) {
                const newCarts = carts.filter((cartItem) => {
                    if (cartItem._id !== id) {
                        return true;
                    }
                });
                setCarts(newCarts);
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
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

    const handleSelectedProduct = (isChecked, product) => {
        if (isChecked) {
            setProductListChecked([...productListChecked, product]);
        } else {
            setProductListChecked(productListChecked.filter((item) => item._id !== product._id));
        }
    };

    return (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }} maxWidth={"lg"}>
            {loading ? (
                <Loading />
            ) : carts?.length <= 0 ? (
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
                            carts={carts || []}
                            removeCartItem={handleRemoveCartItem}
                            increment={handleIncrement}
                            decrement={handleDecrement}
                            productSelected={handleSelectedProduct}
                        />
                    </Box>

                    <CartFooter matches={matches} totalPrice={totalPrice()} totalAmount={totalAmount()} listProductPayment={productListChecked} />
                </Fragment>
            )}
        </Container>
    );
}

export default Cart;
