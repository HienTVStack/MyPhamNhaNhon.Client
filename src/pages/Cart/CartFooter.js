import { useTheme } from "@mui/material/styles";
import { Box, Button, Checkbox, Container, FormControlLabel } from "@mui/material";
import FormatNumber from "../../components/FormatNumber";
import { CartBottomWrapper, CartFooterWrapper } from "../../styles/Cart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProductPayment } from "../../redux/actions";

function CartFooter({ matches, totalPrice, totalAmount, listProductPayment }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onPayment = () => {
    dispatch(setProductPayment(listProductPayment));
    navigate("/thanh-toan");
  };

  return (
    <CartFooterWrapper>
      <Container>
        <CartBottomWrapper>
          <FormControlLabel
            sx={{
              "> span": { fontSize: matches ? "14px" : "12px" },
            }}
            control={<Checkbox />}
            label={`Chọn tất cả (${totalAmount})`}
          />
          <Box display={"flex"} alignItems={"center"}>
            <Box mr={2}>
              <Box display={"flex"} alignItems={"center"} sx={{ fontSize: matches ? "16px" : "14px" }}>
                <Box>Tổng số tiền:</Box>
                <Box color={theme.palette.primary.main} ml={1}>
                  <FormatNumber number={totalPrice} />
                </Box>
              </Box>

              {/* <Box display={"flex"} alignItems={"center"} sx={{ fontSize: matches ? "16px" : "14px" }}>
                <Box>Tiết kiệm:</Box>
                <Box color={theme.palette.primary.main} ml={1}>
                  <FormatNumber number={0} />
                </Box>
              </Box> */}
            </Box>
            <Button variant="contained" onClick={onPayment}>
              Thanh toán
            </Button>
          </Box>
        </CartBottomWrapper>
      </Container>
    </CartFooterWrapper>
  );
}

export default CartFooter;
