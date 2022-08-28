// React
import { useEffect, useState } from "react";
// React-router-dom
import { Outlet } from "react-router-dom";
// Material UI
import Box from "@mui/material/Box";
// Components
import Loading from "../../components/Loading";
import AppBarHeader from "../components/AppBarHeader";
import Header from "../components/Header";

// -----------------------------------------

function AppLayout() {
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
            <Outlet />
        </Box>
    );
}

export default AppLayout;
