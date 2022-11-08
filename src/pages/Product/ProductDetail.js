// React
import { useEffect, useState } from "react";
// Material UI
import { Box, Button, Card, CardContent, Container, Divider, Grid, Rating, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// React slick
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// React router dom
import { useParams } from "react-router-dom";
// API
import productApi from "../../api/productApi";
// Components
import Image from "../../components/Image";
import Loading from "../../components/Loading";
import HeadingContent from "../../components/HeadingContent";
// import ProductItem from "../../components/ProductItem";
// Styles
import { ProductDetailWrapper, ProductImageItem, ProductInfoItem, ProductInfoWrapper, ProductNameMain } from "../../styles/Product";
// Component children
import ProductInfoOrder from "./ProductInfoOrder";
import ProductContent from "./ProductContent";
import ProductReview from "./ProductReview";
import ProductItem from "../../components/ProductItem";
import Slider from "react-slick";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function ProductDetail() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [productIntroduce, setProductIntroduce] = useState([]);
    const [productImage, setProductImage] = useState([]);
    const [indexImageShow, setIndexImageShow] = useState(0);

    let { slug } = useParams();

    const productItemLoaded = async () => {
        setLoading(true);
        try {
            const res = await productApi.getBySlug(slug);

            setProductImage(res.product.imageList);
            setProduct(res.product);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const productIntroduceLoader = async () => {
        setLoading(true);
        try {
            const res = await productApi.getProductIntroduce();
            console.log(res);
            if (res.message === "OK") {
                setProductIntroduce(res.products);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        productItemLoaded();
        productIntroduceLoader();

        // productByCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return loading ? (
        <Loading fullHeight />
    ) : (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Card sx={{ height: matches ? "600px" : "auto" }}>
                        {!matches && (
                            <CardContent>
                                <ProductNameMain variant="body2" component="h1">
                                    {product.name}
                                </ProductNameMain>
                            </CardContent>
                        )}
                        <Box height={"500px"} p={2} mb={0}>
                            <Image src={productImage[indexImageShow]} alt={product.name} />
                        </Box>
                        <Grid container spacing={2} sx={{ overflowX: "auto" }} padding={"0 16px"}>
                            {productImage.map((img, index) => (
                                <Grid key={index} item xs={3} sm={3} md={3} lg={3}>
                                    <ProductImageItem onClick={() => setIndexImageShow(index)}>
                                        <Image src={img} key={index} alt={`${product.name} ${index}`} />
                                    </ProductImageItem>
                                </Grid>
                            ))}
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Card sx={{ height: matches ? "600px" : "auto" }}>
                        <CardContent>
                            <Box>
                                <Typography variant="body2" component="h1" fontWeight={700} fontSize={"20px"} lineHeight={"20px"}>
                                    {product.name}
                                </Typography>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Rating disabled value={product.rating} />
                                    <Divider orientation="vertical" flexItem sx={{ margin: "0 8px" }} />
                                    <Typography variant="body2" mt={"5px"}>
                                        {product.numReviews} đánh giá
                                    </Typography>
                                </Box>
                            </Box>

                            <Box height={"200px"} overflow={"hidden"} mt={3}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: `${product.descriptionContent}`,
                                    }}
                                ></span>
                            </Box>

                            <ProductInfoOrder price={product.price} countInStock={product.quantityStock} />

                            <ProductInfoWrapper sx={{ border: "none" }}>
                                <ProductInfoItem>
                                    <Button variant="outlined" size={matches ? "large" : "medium"}>
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button variant="contained" size={matches ? "large" : "medium"}>
                                        Mua ngay
                                    </Button>
                                </ProductInfoItem>
                            </ProductInfoWrapper>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container maxWidth={"lg"} mt={3} mb={3}>
                <ProductDetailWrapper>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ width: "100%" }}>
                        <Tab label="Mô tả" sx={{ width: "50%", minWidth: "50%" }} {...a11yProps(0)} />
                        <Tab label="Đánh giá" sx={{ width: "50%", minWidth: "50%" }} {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <ProductContent detail={product.detailContent} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ProductReview id={product.id} reviews={product.reviews || []} />
                    </TabPanel>
                </ProductDetailWrapper>
            </Grid>

            <HeadingContent title={"Sản phẩm cùng loại"} urlViewAll />
            <Slider dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={1}>
                {productIntroduce.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </Slider>
        </Container>
    );
}

export default ProductDetail;
