import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CartNoCartWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.secondary.main,
    padding: "16px",
    [theme.breakpoints.up("md")]: {
        flexDirection: "column",
    },
}));

export const CartItemWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    marginBottom: "8px",
}));

export const CartItemImageWrapper = styled(Box)(({ theme }) => ({
    width: "80px",
    height: "80px",
}));

export const CartActionsQuantity = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
}));
