import { Container, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import ProductItem from "../../components/ProductItem";
function Product() {
    const theme = useTheme();
    const location = useLocation();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const productList = useSelector((state) => state.data.productList || []);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(Number);

    const query = new URLSearchParams(location.search);
    const page = query.get("page");

    return (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
            <Grid container maxWidth={"lg"} spacing={1}>
                {loading ? (
                    <Loading fullHeight />
                ) : (
                    <Fragment>
                        {productList.map((product) => (
                            <Grid key={product._id} item xs={12} sm={12} md={4} lg={3}>
                                <ProductItem product={product} />
                            </Grid>
                        ))}
                    </Fragment>
                )}
            </Grid>

            <Grid container alignItems={"center"} justifyContent={"center"} mt={3} mb={3}>
                <Pagination pageCount={parseInt(pageCount)} url={"san-pham"} />
            </Grid>
        </Container>
    );
}

export default Product;
