import { Box, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material";
// Format number
import FormatNumber from "../FormatNumber";
// React-router-dom
import { Link } from "react-router-dom";
import { ProductName, ProductWrapper } from "../../styles/Product";
import Image from "../Image";

function ProductItem({ product, ...other }) {
    return (
        <ProductWrapper {...other}>
            <CardMedia component={Link} to={`/san-pham/${product.slug}/detail`} sx={{ height: "320px" }}>
                <Image src={product.image} alt={product.name} />
            </CardMedia>
            <CardContent
                component={Link}
                to={`/san-pham/${product.slug}/detail`}
                sx={{
                    padding: "16px",
                    display: "block",
                    textDecoration: "none",
                }}
            >
                <ProductName variant={"body2"}>{product.name}</ProductName>
                <Stack direction={"row"} alignItems={"center"} mt={4}>
                    <Box>
                        <Rating name="read-only" value={product.rating} readOnly />
                    </Box>
                    <Typography variant={"body2"} fontSize={"16px"} color={"#666"} ml={2}>
                        {product.numberViews} đánh giá
                    </Typography>
                </Stack>
                <Typography variant={"body2"} component={"h2"} fontSize={"18px"} color={"#252525"} fontWeight={700} mt={2}>
                    <FormatNumber number={product.price} />
                </Typography>
            </CardContent>
        </ProductWrapper>
    );
}

export default ProductItem;
