import { Container, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import blogApi from "../../api/blogApi";
import Loading from "../../components/Loading";
import BlogItem from "./BlogItem";
import Pagination from "../../components/Pagination";

function Blog() {
    const theme = useTheme();

    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [pageCount, setPageCount] = useState(Number);

    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page"));

    useEffect(() => {
        const getBlogs = async () => {
            setLoading(true);
            const res = await blogApi.getHome(page);

            setBlogs(res.blog);
            setPageCount(res.pageCount);
            setLoading(false);
        };
        getBlogs();
    }, [page]);
    return (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
            {loading ? (
                <Loading fullHeight />
            ) : (
                <Fragment>
                    <Grid container maxWidth={"lg"}>
                        {blogs.map((blog) => (
                            <Grid key={blog._id} item xs={12} sm={12} md={12} lg={12}>
                                <BlogItem blog={blog} />
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container alignItems={"center"} justifyContent={"center"} mt={3} mb={3}>
                        <Pagination pageCount={parseInt(pageCount)} url={"bai-viet"} />
                    </Grid>
                </Fragment>
            )}
        </Container>
    );
}

export default Blog;
