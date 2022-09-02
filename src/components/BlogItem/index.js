import { CardContent } from "@mui/material";
import {
    BlogItemMedia,
    BlogItemName,
    BlogItemSub,
    BlogItemWrapper,
} from "../../styles/Blog";
import Image from "../Image";

function BlogItem({ blog }) {
    return (
        <BlogItemWrapper>
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
