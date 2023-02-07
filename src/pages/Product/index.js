import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import StopIcon from "@mui/icons-material/Stop";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { Clear } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
// import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import ProductItem from "../../components/ProductItem";
import Slogan from "../../layouts/components/Slogan";
import Subscribe from "../../layouts/components/Subscribe";
import Contact from "../../layouts/components/Contact";
// Hook
// import useDebounce from "../../../src/hooks/useDebounce";

function Product() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const productList = useSelector((state) => state.data.productList || []);
  const categoryList = useSelector((state) => state.data.categories || []);
  //   const [loading, setLoading] = useState(false);
  const [productShow, setProductShow] = useState([]);

  const query = new URLSearchParams(location.search);
  const page = query.get("page");
  // const name = query.get("name") || undefined;
  const categorySearch = query.get("category");

  useEffect(() => {
    let newProductList = [];
    if (categorySearch) {
      let newArr = [];
      for (const productItem of productList) {
        for (const categoryItem of productItem.category) {
          if (categoryItem.slug === categorySearch) {
            newArr.push(productItem);
          }
        }
      }
      newProductList = newArr;
    } else {
      newProductList = productList;
    }
    setProductShow(newProductList?.slice(0 + 10 * (page - 1 < 0 ? page : page - 1), 9 + 10 * (page - 1 < 0 ? page : page - 1)));
    // eslint-disable-next-line
  }, [page, categorySearch]);

  const handleChangeSearchInput = (e) => {
    const value = e.target.value;
    if (categorySearch) {
      let newArr = [];
      for (const productItem of productList) {
        for (const categoryItem of productItem.category) {
          if (categoryItem.slug === categorySearch) {
            newArr.push(productItem);
          }
        }
      }
      const resultSearchProduct = newArr.filter((item) => {
        return item.name.toUpperCase().includes(value.toUpperCase());
      });
      setProductShow(resultSearchProduct);
    } else {
      const resultSearchProduct = productList.filter((item) => {
        return item.name.toUpperCase().includes(value.toUpperCase());
      });
      setProductShow(resultSearchProduct);
    }
  };

  return (
    <>
      <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Slogan />
          </Grid>
        </Grid>
        <Box sx={{ marginBottom: "40px" }}>
          <Typography
            variant={"subtitle1"}
            fontSize={30}
            lineHeight={"48.45px"}
            color={"primary"}
            sx={{ width: "inherit", borderBottom: "2px solid #ccc" }}
          >
            Sản phẩm
          </Typography>
        </Box>
        <Grid container maxWidth={"lg"} spacing={1}>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box display={"flex"} alignItems={"center"}>
                <Icon style={{ width: "30px" }}>
                  <FormatListBulletedIcon />
                </Icon>
                <Typography variant="subtitle1" textAlign={"center"} flex={1} fontSize={18} lineHeight={"29.07px"}>
                  Danh mục sản phẩm
                </Typography>
              </Box>
              <List>
                <ListItem component={Link} to={"/san-pham"} sx={{ color: "#F0BD71" }}>
                  <ListItemIcon sx={{ color: "#F0BD71" }}>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Sản phẩm"} />
                </ListItem>
                {categoryList.map((item) => (
                  <ListItemButton key={item._id} component={Link} to={`/san-pham?category=${item.slug}`}>
                    <ListItemIcon>
                      <StopIcon sx={{ width: "10px", height: "10px" }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box>
                    {categorySearch && (
                      <Box sx={{ display: "flex", alignItems: "center" }} mb={2}>
                        <Typography variant={"body1"} sx={{ marginRight: "12px" }}>
                          Kết quả tìm kiếm cho
                        </Typography>
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          sx={{ padding: "4px 16px", backgroundColor: "#ccc", borderRadius: "6px", marginRight: "12px" }}
                        >
                          <Typography variant={"body1"}>{categorySearch}</Typography>
                          <IconButton size="small" sx={{ marginLeft: "20px" }} component={Link} to={"/san-pham"}>
                            <Clear />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}
                  </Box>

                  <Box display={"flex"} mb={2}>
                    <OutlinedInput
                      startAdornment={
                        <Icon>
                          <SearchIcon />
                        </Icon>
                      }
                      id="outlined-size-small"
                      size="small"
                      placeholder="Search..."
                      onChange={handleChangeSearchInput}
                      sx={{ width: "350px", maxWidth: "100%" }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {productShow?.length > 0 ? (
                productShow.map((product) => (
                  <Grid key={product._id} item xs={12} sm={12} md={6} lg={4}>
                    <ProductItem product={product} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant={"body2"}>Không có sản phẩm bạn tìm</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid container alignItems={"center"} justifyContent={"center"} mt={3} mb={3}>
          <Pagination pageCount={parseInt(productList?.length / 10)} url={"san-pham"} />
        </Grid>
      </Container>
      <Subscribe />
      <Contact />
    </>
  );
}

export default Product;
