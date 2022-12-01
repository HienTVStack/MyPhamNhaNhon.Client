// Material UI
import { AppBar, Toolbar, Stack, Container, Grid, Typography, IconButton } from "@mui/material";
// Material icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
// React router dom
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ICONS = [
    { icon: <FacebookIcon />, to: "/facebook" },
    { icon: <InstagramIcon />, to: "/facebook" },
    { icon: <MailIcon />, to: "/facebook" },
];

function AppBarHeaderDesktop() {
    const setting = useSelector((state) => state.data.settings);
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
                                {setting?.shoName || "Mỹ phẩm nhà Nhơn"}
                            </Typography>
                            <Stack direction={"row"} alignItems={"center"}>
                                {setting?.socials && (
                                    <Stack direction={"row"}>
                                        {setting?.socials?.facebook && (
                                            <IconButton href={setting?.socials?.facebook} sx={{ color: "#fff" }} size={"large"}>
                                                <FacebookIcon />
                                            </IconButton>
                                        )}
                                        {setting?.socials?.instagram && (
                                            <IconButton href={setting?.socials?.instagram} sx={{ color: "#fff" }} size={"large"}>
                                                <InstagramIcon />
                                            </IconButton>
                                        )}
                                        {setting?.socials?.email && (
                                            <IconButton href={setting?.socials?.email} sx={{ color: "#fff" }} size={"large"}>
                                                <MailIcon />
                                            </IconButton>
                                        )}
                                    </Stack>
                                )}
                            </Stack>
                        </Stack>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarHeaderDesktop;
