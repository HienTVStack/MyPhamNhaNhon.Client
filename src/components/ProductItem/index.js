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
            <CardMedia component={Link} to={`/san-pham/${product.slug}/chi-tiet`} sx={{ height: "220px" }}>
                <Image src={product.image} alt={product.name} />
            </CardMedia>
            <CardContent
                component={Link}
                to={`/san-pham/${product.slug}/chi-tiet` || "#"}
                sx={{
                    padding: "16px",
                    display: "block",
                    textDecoration: "none",
                }}
            >
                <ProductName variant={"body2"}>{product.name}</ProductName>

                <Stack direction={"row"} alignItems={"center"} mt={2}>
                    <Box>
                        <Rating name="read-only" value={product.rating} readOnly />
                    </Box>
                    <Typography variant={"body2"} fontSize={"16px"} color={"#666"} ml={2}>
                        {product.numberViews} đánh giá
                    </Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems="center" mt={2}>
                    <Stack direction={"row"} alignItems="center">
                        {product.type.length - 1 !== 0 && (
                            <>
                                <Typography variant={"body2"} component={"h2"} fontSize={"14px"} color={"#252525"} fontWeight={700}>
                                    <FormatNumber number={product.type[0].price} />
                                </Typography>
                                <Typography sx={{ margin: "0 12px" }}> - </Typography>
                            </>
                        )}
                        <Typography variant={"body2"} component={"h2"} fontSize={"14px"} color={"#252525"} fontWeight={700}>
                            <FormatNumber number={product.type[product.type.length - 1].price} />
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color="gray">
                        Đã bán {product.numSold || 0}
                    </Typography>
                </Stack>
            </CardContent>
        </ProductWrapper>
    );
}

export default ProductItem;
