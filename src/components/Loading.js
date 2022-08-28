import { Box, CircularProgress } from "@mui/material";
import { Fragment } from "react";

function Loading(props) {
    return (
        <Fragment>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                height={props.fullHeight ? "100vh" : "100%"}
            >
                <CircularProgress />
            </Box>
        </Fragment>
    );
}

export default Loading;
