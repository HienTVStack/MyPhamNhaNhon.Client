import { Container, Grid, Slide } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const BANNER_LIST = [
    "https://tiemmyphamtanthoi.vn/static/media/ads-1.3119130d1a00088eeb88.png",
    "https://tiemmyphamtanthoi.vn/static/media/ads-2.5237b5eed600e9023dd7.png",
];

function Banner() {
    const containerRef = useRef();
    const [show, setShow] = useState(true);
    const [showIndex, setShowIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeout(() => {
                setShow(false);
            }, 3500);
            setShowIndex((i) => (i + 1) % BANNER_LIST.length);
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3500);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <Container sx={{ overflow: "hidden" }}>
            <Grid container maxWidth={"lg"}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Slide ref={containerRef} in={show} direction={show ? "left" : "right"} timeout={{ enter: 500, exit: 100 }}>
                        <img src={BANNER_LIST[showIndex]} alt="banner" style={{ width: "100%", maxHeight: "500px" }} />
                    </Slide>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Banner;
