import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import Image from "../../../components/Image";
import { SearchResultItem } from "../../../styles/Search";
import { fNumber } from "../../../utils/formatNumber";

function SearchItem({ product }) {
    return (
        <SearchResultItem component={Link} to={`/san-pham/${product.slug}/chi-tiet`}>
            <Box width={"60px"} height={"60px"}>
                <Image src={product.image} alt={product.name} />
            </Box>
            <Stack justifyContent={"space-between"} flex={1} ml={1}>
                <Typography variant={"body1"} component="h4" fontSize={"16px"} color={"rgba(22,24,35,.8)"} lineHeight={1.5}>
                    {product.name}
                </Typography>
                <Typography variant="body1" color={"rgba(22, 24, 35, 0.5)"} mt={1}>
                    {`${fNumber(product.price)} đ`}
                </Typography>
            </Stack>
        </SearchResultItem>
    );
}

export default SearchItem;
