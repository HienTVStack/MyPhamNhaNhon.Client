import { Container, Box, AppBar, Toolbar, Stack } from "@mui/material";
import Search from "../Search";
import HeaderAction from "./HeaderAction";
import HiddenScroll from "./HiddenScroll";
import Logo from "./Logo";
function HeaderDesktop({ matches, props }) {
    // const user = useSelector(state => state.user.user);
    return (
        <Box>
            <HiddenScroll {...props}>
                <AppBar enableColorOnDark={true}>
                    <Toolbar sx={{ padding: "10px" }}>
                        <Container>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                            >
                                <Logo matches={matches} />
                                <Search matches={matches} />
                                <HeaderAction matches={matches} />
                            </Stack>
                        </Container>
                    </Toolbar>
                </AppBar>
            </HiddenScroll>
        </Box>
    );
}

export default HeaderDesktop;
