import { Card, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BlogItemWrapper = styled(Card)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    // height: "150px",
    flexDirection: "column",
    textDecoration: "none",
    margin: "20px 0",
    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        height: "180px",
    },
}));

export const BlogItemMedia = styled(CardMedia)(({ theme }) => ({
    height: "150px",
    minWidth: "200px",
    width: "100%",
    [theme.breakpoints.up("md")]: {
        width: "200px",
    },
}));

export const BlogItemName = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "20px",
    overflow: "hidden",
    color: "#666666",
}));

export const BlogItemSub = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    marginTop: "20px",
    overflow: "hidden",
    height: "50px",
    // whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
}));

export const BlogDetailName = styled(Typography)(({ theme }) => ({
    fontSize: "25px",
    lineHeight: "30px",
    fontWeight: 700,
    margin: "16px 0",
    padding: "16px 0",
}));
