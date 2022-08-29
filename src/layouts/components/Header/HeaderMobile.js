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

function HeaderMobile({ matches, props }) {
    const theme = useTheme();

    return (
        <HiddenScroll {...props}>
            <AppBar>
                <Toolbar>
                    <Stack
                        width={"100%"}
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        pt={1}
                        pb={1}
                    >
                        <IconButton
                            sx={{ color: theme.palette.primary.contrastText }}
                            size={"large"}
                            children={<MenuIcon />}
                        />
                        <Logo matches={matches} />
                        <HeaderAction matches={matches} />
                    </Stack>
                </Toolbar>
                <Toolbar
                    sx={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Search matches={matches} />
                </Toolbar>
            </AppBar>
        </HiddenScroll>
    );
}

export default HeaderMobile;
