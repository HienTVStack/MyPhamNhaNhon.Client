import { Grid } from "@mui/material";
import { Fragment } from "react";
import ProductItem from "../../components/ProductItem";

function ProductHome({ products }) {
    return (
        <Fragment>
            {products.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={4}>
                    <ProductItem product={product} />
                </Grid>
            ))}
        </Fragment>
    );
}

export default ProductHome;
