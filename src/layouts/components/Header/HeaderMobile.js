// Material UI
import { AppBar, Toolbar, Stack, IconButton, useTheme } from "@mui/material";
// Material Icons
import MenuIcon from "@mui/icons-material/Menu";
// Component
// Assets
import Logo from "./Logo";
import HeaderAction from "./HeaderAction";
import HiddenScroll from "./HiddenScroll";
import Search from "../Search";
import { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useLocation } from "react-router-dom";

function HeaderMobile({ matches, props }) {
    const theme = useTheme();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <HiddenScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Stack width={"100%"} direction={"row"} alignItems={"center"} justifyContent={"space-between"} pt={1} pb={1}>
                            <IconButton
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                }}
                                size={"large"}
                                children={<MenuIcon />}
                                onClick={handleOpen}
                            />
                            <Logo matches={matches} />
                            <HeaderAction matches={matches} />
                        </Stack>
                    </Toolbar>
                    <Toolbar sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Search matches={matches} />
                    </Toolbar>
                </AppBar>
            </HiddenScroll>
            <Navbar open={open} onClose={handleClose} />
        </Fragment>
    );
}

export default HeaderMobile;
