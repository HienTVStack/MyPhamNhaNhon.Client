import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ProductWrapper = styled(Card)(({ theme }) => ({
    border: "2px solid transparent",
    // height: "500px",
    "&:hover": {
        borderColor: theme.palette.primary.main,
    },
}));

export const ProductName = styled(Typography)(({ theme }) => ({
    display: "block",
    fontSize: "16px",
    color: "#252525",
    height: "50px",
    overflow: "hidden",
}));

export const ProductInfoWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    marginTop: "40px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    [theme.breakpoints.up("md")]: {
        width: "70%",
    },
}));

export const ProductInfoItem = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
    height: "50px",
}));

export const ProductInfoItemTitle = styled(Box)(({ theme }) => ({
    fontSize: "18px",
    fontWeight: 600,
    // lineHeight: "18px",
}));

export const ProductNameMain = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "30px",
    lineHeight: "32px",
    textAlign: "center",
    marginBottom: "18px",
}));

export const ProductImageItem = styled(Box)(({ theme }) => ({
    border: "1px solid #ccc",
    padding: "6px",
    height: "80px",
    cursor: "pointer",
    "&:focus": {
        borderColor: "red",
    },
    "&:active": {
        boxShadow: theme.shadows[1],
        // backgroundColor: emphasize(backgroundColor, 0.12),
        border: `3px solid ${theme.palette.primary.main}`,
    },
}));

export const ProductDetailWrapper = styled(Box)(() => ({
    borderBottom: 1,
    borderColor: "divider",
    width: "100%",
    minWidth: "50%",
}));
