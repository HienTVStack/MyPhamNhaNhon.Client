// Material UI
import { AppBar, Toolbar, IconButton } from "@mui/material";
// Material Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";

const ICONS = [
    { icon: <FacebookIcon />, to: "/facebook" },
    { icon: <InstagramIcon />, to: "/facebook" },
    { icon: <MailIcon />, to: "/facebook" },
];

function AppBarHeaderMobile() {
    return (
        <AppBar enableColorOnDark={true}>
            <Toolbar
                variant="dense"
                sx={{
                    backgroundColor: "#382F2B",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {ICONS.map((icon, index) => (
                    <IconButton key={index} href={icon.to} children={icon.icon} sx={{ color: "#fff" }} size={"large"} />
                ))}
            </Toolbar>
        </AppBar>
    );
}

export default AppBarHeaderMobile;
