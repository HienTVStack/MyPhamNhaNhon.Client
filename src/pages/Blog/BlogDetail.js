import { Avatar, Box, Container, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import blogApi from "../../api/blogApi";
import Loading from "../../components/Loading";
import Image from "../../components/Image";
import { BlogDetailName } from "../../styles/Blog";
import { useSelector } from "react-redux";
import { fDateTime } from "../../utils/formatTime";

function BlogDetail() {
    const theme = useTheme();
    const blogList = useSelector((state) => state.data.blogList || []);
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const { slug } = useParams();

    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const blogSlug = blogList.filter((item) => item.slug === slug);
        setBlog(blogSlug[0]);
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
            {loading ? (
                <Loading fullHeight />
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={9} lg={9} height={"500px"}>
                        <Image src={blog.image} alt={blog.name} />
                        <BlogDetailName variant="body2" component="h1">
                            {blog.name}
                        </BlogDetailName>
                        <Box display={"flex"} alignItems={"center"}>
                            <Avatar src={blog.image} sx={{ height: "40px", width: "40px" }} alt={blog.name} />
                            <Stack justifyContent={"space-between"} ml={2}>
                                <Typography variant="body2">
                                    {blog?.author ? `${blog?.author?.name || "Nhà Nhơn <3"}` : "Bài viết được đăng bởi Admin"}
                                </Typography>
                                <Typography variant="body2" mt={1}>
                                    {fDateTime(blog?.updatedAt || new Date())}
                                </Typography>
                            </Stack>
                        </Box>

                        <Box>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: `${blog.content}`,
                                }}
                            ></span>
                        </Box>
                    </Grid>
                    {matches && (
                        <Grid item xs={12} sm={12} md={3} lg={3} spacing={2}>
                            <Typography variant="body2" fontSize={"20px"}>
                                Bài viết đề xuất
                            </Typography>
                            <Stack spacing={2}>
                                {blogList?.slice(0, 6).map((blog, index) => (
                                    <Typography key={index} variant="body1" color={"primary"} component={Link} to={`/bai-viet/${blog.slug}`}>
                                        {blog.title.toUpperCase()}
                                    </Typography>
                                ))}
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            )}
        </Container>
    );
}

export default BlogDetail;
