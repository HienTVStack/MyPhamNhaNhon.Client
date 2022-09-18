import { Grid } from "@mui/material";
import BlogItem from "../Blog/BlogItem";
import Slider from "../../components/SliderMUI";

function BlogHome({ blogs, props }) {
    return (
        <Slider {...props}>
            {blogs.map((blog, index) => (
                <Grid key={index} item xs={12} md={12} sm={12} lg={12}>
                    <BlogItem blog={blog} />
                </Grid>
            ))}
        </Slider>
    );
}

export default BlogHome;
