// Material UI
import { AppBar, Toolbar, Stack, Container, Grid, Typography, IconButton } from "@mui/material";
// Material icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
// React router dom
import { Link } from "react-router-dom";

const ICONS = [
    { icon: <FacebookIcon />, to: "/facebook" },
    { icon: <InstagramIcon />, to: "/facebook" },
    { icon: <MailIcon />, to: "/facebook" },
];

function AppBarHeaderDesktop() {
    return (
        <AppBar enableColorOnDark={true}>
            <Toolbar variant="dense" sx={{ backgroundColor: "#382F2B" }}>
                <Container>
                    <Grid container maxWidth={"lg"}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                            <Typography
                                component={Link}
                                to={"/"}
                                variant="body1"
                                fontWeight={"700"}
                                color={"#fff"}
                                fontSize="15px"
                                sx={{ textDecoration: "none" }}
                            >
                                Tiệm mỹ phẩm nhà Nhơn
                            </Typography>
                            <Stack direction={"row"} alignItems={"center"}>
                                {ICONS.map((icon, index) => (
                                    <IconButton key={index} href={icon.to} children={icon.icon} sx={{ color: "#fff" }} size={"large"} />
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarHeaderDesktop;
