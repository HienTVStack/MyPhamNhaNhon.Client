import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeadingContentWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    height: "50px",
    width: "100%",
    padding: "8px",
    mb: 1,
}));

export const HeadingContentTitle = styled(Typography)(({ theme }) => ({
    fontSize: "25px",
    // fontFamily: "iCielBCDDCHardwareRough-Compressed",
    fontStyle: "italic",
    fontWeight: 700,
    lineHeight: "25px",
    textTransform: "uppercase",
    color: "#34496D",
    mt: 1,
    [theme.breakpoints.down("md")]: {
        fontSize: "20px",
    },
}));

export const HeadingContentViewAll = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase",
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    "&:hover": {
        color: "red",
        textDecoration: "underline",
    },
}));

export const HeadingContentActionWrapper = styled(Button)(({ theme }) => ({
    // backgroundColor: "#fff",
}));
