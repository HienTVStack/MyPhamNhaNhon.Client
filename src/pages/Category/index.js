import { Container, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import } from "../../api/productApi"
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import ProductItem from "../../components/ProductItem";

function Category() {
  const theme = useTheme();
  const location = useLocation();
  const { slug } = useParams();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const productList = useSelector((state) => state.data.productList);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(Number);

  const query = new URLSearchParams(location.search);
  const page = query.get("page");

  useEffect(() => {
    const newArr = [];
    for (const productItem of productList) {
      for (const categoryItem of productItem.category) {
        if (categoryItem.slug === slug) {
          newArr.push(productItem);
        }
      }
    }
    setCategories(newArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
      <Grid container maxWidth={"lg"} spacing={1}>
        {loading ? (
          <Loading fullHeight />
        ) : (
          <>
            {categories?.map((product) => (
              <Grid key={product._id} item xs={6} sm={6} md={4} lg={4}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </>
        )}
      </Grid>

      <Grid container alignItems={"center"} justifyContent={"center"} mt={3} mb={3}>
        <Pagination pageCount={parseInt(pageCount)} url={"san-pham"} />
      </Grid>
    </Container>
  );
}

export default Category;
