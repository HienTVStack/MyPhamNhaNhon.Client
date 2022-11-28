import { Container, Grid, Slide } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const BANNER_LIST = [
    // "https://tiemmyphamtanthoi.vn/static/media/ads-1.3119130d1a00088eeb88.png",
    // "https://tiemmyphamtanthoi.vn/static/media/ads-2.5237b5eed600e9023dd7.png",
    // "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/262726417_381148570468174_1195258434079444364_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=J6ttYadnElAAX-Bq_UL&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfB4DOGZvMqdZ-RSUqnU3K108OlBkKSIe1Y3PNsri7YxPQ&oe=63883EC0",
    "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/316245458_643862907530071_9119289550269361983_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0debeb&_nc_ohc=y5aohWjl-MEAX86EbPW&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBX-osWHtsJgOLk1D-h8Ef9GOjccg6SY9Zp1ovfWmGs5g&oe=63877980",
    "https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/315837583_641325584450470_3981499714796919948_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=0debeb&_nc_ohc=nhkVREUB1nIAX9iPxky&_nc_ht=scontent.fsgn2-1.fna&oh=00_AfCd5N5DP59PbQGTKOMhYzLzo2gA2pFN4JAX4go_-p32rg&oe=63885C04",
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
