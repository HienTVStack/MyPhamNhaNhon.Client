import Slider from "react-slick";
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";

var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};

function Banner() {
    const setting = useSelector((state) => state.data.settings);

    return (
        <Container sx={{ overflow: "hidden" }}>
            <Grid container maxWidth={"lg"}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Slider {...settings}>
                        {setting?.banners ?
                            setting?.banners.map((item, index) => (
                                <a key={index} href={item.href} style={{display: 'block'}}>
                                    <img src={item.imageUrl} alt="banner" style={{ width: "100%", maxHeight: "500px",height: '100%', objectFit: "cover" }} />
                                </a>
                            )) : <img src={'https://tiemmyphamtanthoi.vn/static/media/ads-1.3119130d1a00088eeb88.png'} alt="banner" style={{ width: "100%", maxHeight: "500px",height: '100%', objectFit: "cover" }} />}
                    </Slider>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Banner;
