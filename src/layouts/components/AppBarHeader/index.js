// Material UI
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// Components
import AppBarHeaderDesktop from "./AppBarHeaderDesktop";
import AppBarHeaderMobile from "./AppBarHeaderMobile";

function AppBarHeader() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    return matches ? <AppBarHeaderMobile /> : <AppBarHeaderDesktop />;
}

export default AppBarHeader;
