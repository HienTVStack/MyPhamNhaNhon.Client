// Material UI
import { AppBar, Toolbar, IconButton, Stack } from "@mui/material";
// Material Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";

function AppBarHeaderMobile() {
    const setting = useSelector((state) => state.data.settings);

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
            </Toolbar>
        </AppBar>
    );
}

export default AppBarHeaderMobile;
