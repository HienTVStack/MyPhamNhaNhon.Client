import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const RootStyle = styled("div")(({ theme }) => ({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
}));

function Dashboard() {
    return (
        <RootStyle>
            <Box>NAVBAR</Box>
            <Box>
                <Outlet />
            </Box>
        </RootStyle>
    );
}

export default Dashboard;
