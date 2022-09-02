import { Box, Button, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SubscribeWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    padding: "200px 0",
    backgroundImage:
        "url(https://lh3.googleusercontent.com/eJKsKGuGbPclm8Q6NctT_WQVHtxyAWK4IwWffD0J45cRFN5hWOmDCtp2323UwbHdBLuodphu-vzILKU7Wt0UrLN5pzSi4vnqcGvBI0K28BybwAZ7lYHJglhvX0Ipc498x14ywwLHuA=w2400)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}));

export const SubscribeChildren = styled(Box)(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "150px",
    padding: "20px 0",
    textAlign: "center",
}));

export const SubscribeInput = styled(InputBase)(({ theme }) => ({
    width: "300px",
    padding: "10px 12px",
    backgroundColor: "#fff",
    fontSize: "14px",
    borderTopLeftRadius: "6px",
    borderBottomLeftRadius: "6px",
    [theme.breakpoints.down("sm")]: {
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px",
    },
}));

export const SubscribeButton = styled(Button)(({ theme }) => ({
    padding: "10px 12px",
    height: "100%",
    borderRadius: 0,
    color: "#fff",
    borderTopRightRadius: "6px",
    borderBottomRightRadius: "6px",
    [theme.breakpoints.down("sm")]: {
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px",
        marginTop: "10px",
    },
}));
