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
                        {setting?.banners &&
                            setting?.banners.map((item, index) => (
                                <a key={index} href={item.href}>
                                    <img src={item.imageUrl} alt="banner" style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }} />
                                </a>
                            ))}
                    </Slider>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Banner;
