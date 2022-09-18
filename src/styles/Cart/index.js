import { Box, IconButton, InputBase, Typography } from "@mui/material";
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

export const CartBottomWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

export const CartItemWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    marginBottom: "16px",
}));

export const CartItemContentWrapper = styled(Box)(({ theme }) => ({
    marginLeft: "16px",
    flex: 1,
    [theme.breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
}));

export const CartItemImageWrapper = styled(Box)(({ theme }) => ({
    width: "80px",
    height: "80px",
}));

export const CartActionsQuantity = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
}));

export const CartItemName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    fontWeight: "400",
    color: "#000000",
    [theme.breakpoints.down("md")]: {
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    [theme.breakpoints.up("md")]: {
        width: "205px",
    },
}));

export const CartItemCategoryWrapper = styled(Box)(({ theme }) => ({
    maxHeight: "50px",
    backgroundColor: "#f2f2f2",
    overflow: "hidden",
    padding: ".3125rem .5625rem .3125rem .375rem",
    [theme.breakpoints.down("md")]: {
        // whiteSpace: "nowrap",
        overflow: "hidden",
    },
    [theme.breakpoints.up("md")]: {
        width: "245px",
    },
}));

export const CartItemPrevPrice = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: theme.palette.primary.main,
    marginRight: "16px",
    textDecoration: "line-through",
}));

export const CartItemButtonAction = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    height: "24px",
    width: "24px",
    padding: "16px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    cursor: "pointer",
}));

export const CartItemQuantity = styled(InputBase)(({ theme }) => ({
    display: "inline-block",
    width: "50px",
    borderBottom: "1px solid #ccc",
    borderTop: "1px solid #ccc",
    color: "#000000",
    backgroundColor: "#fff",
    cursor: "text",
    fontSize: "16px",
    fontWeight: 400,
    "& > .MuiInputBase-input": {
        textAlign: "center",
    },
}));

export const CartFooterWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    height: "70px",
    backgroundColor: "#fff",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
}));

export const CartItemActionRemoveCart = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: "-17px",
    marginTop: "-17px",
    color: theme.palette.primary.main,
}));
