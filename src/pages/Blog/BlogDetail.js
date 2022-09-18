import {
    Avatar,
    Box,
    Container,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogApi from "../../api/blogApi";
import Loading from "../../components/Loading";
import Image from "../../components/Image";
import { BlogDetailName } from "../../styles/Blog";

function BlogDetail() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const { slug } = useParams();

    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const res = await blogApi.getOne(slug);

                setBlog(res);
                console.log(blog);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(true);
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
            {loading ? (
                <Loading fullHeight />
            ) : (
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            height={"500px"}
                        >
                            <Image src={blog.thumbnail} alt={blog.name} />
                            <BlogDetailName variant="body2" component="h1">
                                {blog.name}
                            </BlogDetailName>
                            <Box display={"flex"} alignItems={"center"}>
                                <Avatar
                                    src={blog.thumbnail}
                                    sx={{ height: "40px", width: "40px" }}
                                    alt={blog.name}
                                />
                                <Stack justifyContent={"space-between"} ml={2}>
                                    <Typography variant="body2">
                                        {blog.author
                                            ? `${blog.author}`
                                            : "Bài viết được đăng bởi Admin"}
                                    </Typography>
                                    <Typography variant="body2" mt={1}>
                                        {blog.updatedAt}
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
                        {/* <Grid item xs={12} sm={12} md={3} lg={3}>
                            <Typography variant="body2" fontSize={"20px"}>
                                Bài viết đề xuất
                            </Typography>
                        </Grid> */}
                    </Grid>
                </Fragment>
            )}
        </Container>
    );
}

export default BlogDetail;
