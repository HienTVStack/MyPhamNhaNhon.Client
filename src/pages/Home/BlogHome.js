import Slider from "react-slick";
import BlogItem from "../Blog/BlogItem";

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
