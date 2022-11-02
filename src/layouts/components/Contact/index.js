import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Fragment } from "react";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
// import { Colors } from "../../../styles/theme";

const ContactWrapper = styled(Box)(() => ({
    padding: "70px",
}));

const ContactIconWrapper = styled(Box)(({ theme }) => ({
    height: "70px",
    width: "70px",
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const ContactContentWrapper = styled(Stack)(() => ({
    padding: "40px 0",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 27px 0 #f3f3f3",
}));

function Contact() {
    return (
        <Fragment>
            <ContactWrapper>
                <Container>
                    <Grid container maxWidth={"lg"} spacing={6}>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <ContactContentWrapper justifyContent={"center"} alignItems={"center"}>
                                <ContactIconWrapper>
                                    <CallIcon fontSize="large" color="primary" />
                                </ContactIconWrapper>
                                <Typography variant="h3" fontSize="20px" color={"#000"} fontWeight={"700"} p={1} mt={1}>
                                    Tổng đài hổ trợ
                                </Typography>
                                <Typography variant="body2" fontSize="16px" color="#666666" fontWeight={"400"} p={1}>
                                    Tư vấn 24/7
                                </Typography>
                            </ContactContentWrapper>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <ContactContentWrapper justifyContent={"center"} alignItems={"center"}>
                                <ContactIconWrapper>
                                    <LocationOnIcon fontSize="large" color="primary" />
                                </ContactIconWrapper>
                                <Typography variant="h3" fontSize="20px" color={"#000"} fontWeight={"700"} p={1} mt={1}>
                                    Địa chỉ
                                </Typography>
                                <Typography variant="body2" fontSize="16px" color="#666666" fontWeight={"400"} p={1}>
                                    Núi Thành, QUảng Nam
                                </Typography>
                            </ContactContentWrapper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                            <ContactContentWrapper justifyContent={"center"} alignItems={"center"}>
                                <ContactIconWrapper>
                                    <FacebookOutlinedIcon fontSize="large" color="primary" />
                                </ContactIconWrapper>
                                <Typography variant="h3" fontSize="20px" color={"#000"} fontWeight={"700"} p={1} mt={1}>
                                    Liên hệ Facebook
                                </Typography>
                                <Typography variant="body2" fontSize="16px" color="#666666" fontWeight={"400"} p={1}>
                                    /tiemmyphamtanthoi
                                </Typography>
                            </ContactContentWrapper>
                        </Grid>
                    </Grid>
                </Container>
            </ContactWrapper>
        </Fragment>
    );
}

export default Contact;
