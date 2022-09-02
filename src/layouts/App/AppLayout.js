// React
import { useEffect, useState } from "react";
// React-router-dom
import { Outlet } from "react-router-dom";
// Material UI
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
// Components
import Loading from "../../components/Loading";
import AppBarHeader from "../components/AppBarHeader";
import Header from "../components/Header";
import NavbarButtonDesktop from "../components/NavbarButtonDesktop";

// -----------------------------------------

function AppLayout() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    return loading ? (
        <Loading fullHeight />
    ) : (
        <Box>
            <AppBarHeader />
            <Header />
            <NavbarButtonDesktop />
            <Box mt={matches ? "120px" : "184px"}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default AppLayout;
