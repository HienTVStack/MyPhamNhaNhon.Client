import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NavbarButtonWrapper = styled(Button)(({ theme }) => ({
    position: "fixed",
    zIndex: 999,
    backgroundColor: theme.palette.primary.contrastText,
    fontSize: "18px",
    left: "-69px",
    top: "145px",
    transition: "all 0.5s ease-in",
    "&:hover": {
        left: "-5px",
        backgroundColor: theme.palette.primary.contrastText,
    },
}));

export const NavbarTextHeading = styled(Typography)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingTop: 10,
}));
