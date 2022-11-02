import { Container, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productApi from "../../api/productApi";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import ProductItem from "../../components/ProductItem";
function Product() {
    const theme = useTheme();
    const location = useLocation();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(Number);

    const query = new URLSearchParams(location.search);
    const page = query.get("page");

    useEffect(() => {
        const getProductList = async () => {
            setLoading(true);
            const res = await productApi.getHome(page);
            setProductList(res.products);
            setPageCount(res.pageCount);
            setLoading(false);
        };
        getProductList();
    }, [page]);

    return (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
            <Grid container maxWidth={"lg"} spacing={1} justifyContent={"center"}>
                {loading ? (
                    <Loading fullHeight />
                ) : (
                    <Fragment>
                        {productList.map((product) => (
                            <Grid key={product._id} item xs={6} sm={6} md={4} lg={4}>
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
