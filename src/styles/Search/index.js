import { Box, Button, InputBase, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export const SearchWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    width: "300px",
    height: "35px",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: "7px",
    [theme.breakpoints.up("md")]: {
        width: "400px",
        height: "40px",
    },
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
    flex: 1,
    // fontSize: "16px",
    lineHeight: 1.5,
    padding: "6px 12px",
}));

export const SearchWrapperIconSearch = styled(Button)(({ theme }) => ({
    width: "40px",
    height: "100%",
    backgroundColor: "#f89668",
    border: "none",
    borderRadius: "0",
    color: theme.palette.primary.contrastText,
    "&:hover": {
        backgroundColor: "#f89668",
        opacity: 0.8,
    },
}));

export const SearchTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#fff",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: "400px",
        fontSize: theme.typography.pxToRem(12),
        padding: "12px",
        maxHeight: "450px",
        overflowY: "auto",
    },
}));

export const SearchResultHeadingWrapper = styled(Typography)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
}));
export const SearchResultWrapper = styled(Box)(({ theme }) => ({}));

export const SearchResultItem = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    maxHeight: "90px",
    padding: "6px 0",
    textDecoration: "none",
    overflow: "hidden",
}));

// export const SearchResultItemImg = styled(Box)(({}))
