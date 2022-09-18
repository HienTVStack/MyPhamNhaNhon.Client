import { Fragment, useEffect, useState } from "react";
// Material UI
import { Box, Container, Grid, Stack } from "@mui/material";
// React router dom
// Component
import Banner from "../../layouts/components/Banner";
import HeadingContent from "../../components/HeadingContent";
import Slogan from "../../layouts/components/Slogan";
import Loading from "../../components/Loading";
// Api
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import blogApi from "../../api/blogApi";
import Subscribe from "../../layouts/components/Subscribe";
import Contact from "../../layouts/components/Contact";
import Footer from "../../layouts/components/Footer";
import BlogHome from "./BlogHome";
import ProductHome from "./ProductHome";
import ViewMore from "../../components/ButtonViewMore";

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
                        <>
                            <ProductHome products={productList} />
                            <ViewMore title="Xem thêm" url="/san-pham" />
                        </>
                    )}
                </Grid>
            </Container>
            {/* Blog */}
            <Container sx={{ mt: 4, mb: 6 }}>
                <HeadingContent
                    title={"Bài viết mới nhất"}
                    urlViewAll={"bai-viet"}
                />
                {loadingBlog ? (
                    <Stack width={"100%"} alignItems={"center"} mt={2}>
                        <Loading />
                    </Stack>
                ) : (
                    <Box mt={2}>
                        <BlogHome blogs={blogList} />
                        <ViewMore title="Xem thêm" url="/bai-viet" />
                    </Box>
                )}
            </Container>
            <Subscribe />
            <Contact />
            <Footer />
        </Fragment>
    );
}

export default Home;
