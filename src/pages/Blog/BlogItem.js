import { CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import {
    BlogItemMedia,
    BlogItemName,
    BlogItemSub,
    BlogItemWrapper,
} from "../../styles/Blog";
import Image from "../../components/Image";

function BlogItem({ blog }) {
    return (
        <BlogItemWrapper component={Link} to={`/bai-viet/${blog.nameNoTones}`}>
            <BlogItemMedia>
                <Image src={blog.thumbnail} alt={blog.name} />
            </BlogItemMedia>
            <CardContent>
                <BlogItemName variant="body2" component={"h1"}>
                    {blog.name}
                </BlogItemName>
                <BlogItemSub variant="body2">{blog.description}</BlogItemSub>
                <BlogItemSub variant="body2">
                    Cập nhật lúc {blog.updatedAt}
                </BlogItemSub>
            </CardContent>
        </BlogItemWrapper>
    );
}

export default BlogItem;
