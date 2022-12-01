import { Grid } from "@mui/material";
import BlogItem from "../Blog/BlogItem";
// import Slider from "../../components/SliderMUI";
import Slider from "react-slick";

var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};

function BlogHome({ blogs, props }) {
    return (
        <Slider {...settings}>
            {blogs.map((blog, index) => (
                <BlogItem key={index} blog={blog} />
            ))}
        </Slider>
    );
}

export default BlogHome;
