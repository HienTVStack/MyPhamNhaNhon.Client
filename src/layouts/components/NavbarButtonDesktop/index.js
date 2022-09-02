import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { NavbarButtonWrapper } from "../../../styles/Navbar";
import Navbar from "../Navbar";

function NavbarButtonDesktop({ ...props }) {
    const theme = useTheme();
    const location = useLocation();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);
    return (
        matches && (
            <Fragment>
                <NavbarButtonWrapper
                    variant="outlined"
                    endIcon={
                        <ChevronRightIcon
                            fontSize="large"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                borderRadius: "5px",
                                width: "30px",
                                height: "30px",
                            }}
                        />
                    }
                    onClick={() => setOpen(true)}
                    {...props}
                >
                    Menu
                </NavbarButtonWrapper>
                <Navbar open={open} onClose={() => setOpen(false)} />
            </Fragment>
        )
    );
}

export default NavbarButtonDesktop;
