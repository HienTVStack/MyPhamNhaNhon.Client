// Material UI
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

function Header() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    return matches ? (
        <HeaderMobile matches={matches} />
    ) : (
        <HeaderDesktop matches={matches} />
    );
}

export default Header;
