import { Box, CircularProgress } from "@mui/material";

function Loading(props) {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={props.fullHeight ? "100vh" : "100%"}>
        <CircularProgress />
      </Box>
    </>
  );
}

export default Loading;
