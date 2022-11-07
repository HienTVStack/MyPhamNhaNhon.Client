import { CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { BlogItemMedia, BlogItemName, BlogItemSub, BlogItemWrapper } from "../../styles/Blog";
import Image from "../../components/Image";
import { fDateTimeSuffix } from "../../utils/formatTime";

function BlogItem({ blog }) {
    return (
        <BlogItemWrapper component={Link} to={`/bai-viet/${blog.slug}`}>
            <BlogItemMedia>
                <Image src={blog.image} alt={blog.title} />
            </BlogItemMedia>
            <CardContent>
                <BlogItemName variant="body2" component={"h1"}>
                    {blog.title}
                </BlogItemName>
                <BlogItemSub
                    variant="body2"
                    dangerouslySetInnerHTML={{
                        __html: `${blog.description}`,
                    }}
                ></BlogItemSub>
                <BlogItemSub variant="body2">Cập nhật lúc {fDateTimeSuffix(blog.updatedAt)}</BlogItemSub>
            </CardContent>
        </BlogItemWrapper>
    );
}

export default BlogItem;
