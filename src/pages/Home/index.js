import { Fragment, useEffect, useState } from "react";
// Material UI
import { Button, Container, Grid, Stack } from "@mui/material";
// React router dom
import { Link } from "react-router-dom";
// Component
import Banner from "../../components/Banner";
import HeadingContent from "../../components/HeadingContent";
import Slogan from "../../components/Slogan";
import Loading from "../../components/Loading";
// Api
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import ProductItem from "../../components/ProductItem";
import blogApi from "../../api/blogApi";
import BlogItem from "../../components/BlogItem";
import Subscribe from "../../components/Subscribe";
import Contact from "../../layouts/components/Contact";
import Footer from "../../layouts/components/Footer";

function Home() {
    const [loadingBlog, setLoadingBlog] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productList, setProductsList] = useState([]);
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await categoryApi.getAll();

                setCategories(res.categories);
            } catch (error) {
                console.log(error);
            }
        };
        const getProducts = async () => {
            try {
                setLoadingProduct(true);
                const res = await productApi.getHome(0);
                setProductsList(res.products);
                setLoadingProduct(false);
            } catch (error) {
                console.log(error);
            }
        };
        const getBlogs = async () => {
            try {
                setLoadingBlog(true);
                const res = await blogApi.getHome("new");
                setBlogList(res.blog);
                setLoadingBlog(false);
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();
        getProducts();
        getBlogs();
    }, []);

    return (
        <Fragment>
            <Slogan />
            <Banner />
            {/* Products */}
            <Container sx={{ mt: 2, mb: 2 }}>
                <Grid container maxWidth={"lg"} spacing={2}>
                    <HeadingContent title={"Sản phẩm"} viewList={categories} />

                    {loadingProduct ? (
                        <Stack width={"100%"} alignItems={"center"} mt={2}>
                            <Loading />
                        </Stack>
                    ) : (
                        <Fragment>
                            {productList.map((product) => (
                                <Grid
                                    item
                                    key={product._id}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={4}
                                >
                                    <ProductItem product={product} />
                                </Grid>
                            ))}
                            <Grid
                                container
                                justifyContent={"center"}
                                mt={4}
                                mb={4}
                            >
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={"/san-pham"}
                                >
                                    Xem thêm
                                </Button>
                            </Grid>
                        </Fragment>
                    )}
                </Grid>
            </Container>
            {/* Blog */}
            <Container sx={{ mt: 2, mb: 2 }}>
                <Grid container maxWidth={"lg"} spacing={2}>
                    <HeadingContent
                        title={"Bài viết mới nhất"}
                        urlViewAll={"bai-viet"}
                    />
                    {loadingBlog ? (
                        <Stack width={"100%"} alignItems={"center"} mt={2}>
                            <Loading />
                        </Stack>
                    ) : (
                        <Fragment>
                            {blogList.map((blog) => (
                                <Grid
                                    item
                                    key={blog._id}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                >
                                    <BlogItem blog={blog} />
                                </Grid>
                            ))}
                            <Grid
                                container
                                justifyContent={"center"}
                                mt={4}
                                mb={4}
                            >
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to={"/bai-viet"}
                                >
                                    Xem thêm
                                </Button>
                            </Grid>
                        </Fragment>
                    )}
                </Grid>
            </Container>
            <Subscribe />
            <Contact />
            <Footer />
        </Fragment>
    );
}

export default Home;
