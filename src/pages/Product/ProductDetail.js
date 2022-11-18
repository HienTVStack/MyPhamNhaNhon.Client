// React
import { useEffect, useState } from "react";
// Material UI
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Rating,
    Snackbar,
    Stack,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// React slick
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// React router dom
import { useNavigate, useParams } from "react-router-dom";
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
import { useSelector } from "react-redux";
import cartApi from "../../api/cartApi";
import authApi from "../../api/authApi";

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
    const navigate = useNavigate();
    const productList = useSelector((state) => state.data.productList || []);
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const user = useSelector((state) => state.data.user);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [productIntroduce, setProductIntroduce] = useState([]);
    const [productImage, setProductImage] = useState([]);
    const [indexImageShow, setIndexImageShow] = useState(0);
    const [value, setValue] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [typeProduct, setTypeProduct] = useState([]);
    const [typeProductSelected, setTypeProductSelected] = useState({ nameType: "", price: 0, quantityStock: 0 });
    const [isSelected, setIsSelected] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        open: false,
        type: "error",
        message: "ERR_001",
    });

    let { slug } = useParams();

    // const productItemLoaded = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await productApi.getBySlug(slug);

    //         setProductImage(res.product.imageList);
    //         setTypeProduct(res.product.type);
    //         setTypeProductSelected(res.product.type[0]);
    //         setProduct(res.product);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setLoading(false);
    // };

    // const productIntroduceLoader = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await productApi.getProductIntroduce();
    //         if (res.message === "OK") {
    //             setProductIntroduce(res.products);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setLoading(false);
    // };

    useEffect(() => {
        // productItemLoaded();
        // productIntroduceLoader();
        const item = productList.filter((item) => item.slug === slug);
        setProductImage(item[0].imageList);
        setTypeProduct(item[0].type);
        setTypeProductSelected(item[0].type[0]);
        setProduct(item[0]);

        setProductIntroduce(productList.slice(0, 6));
        // console.log(item);
        // if (item && item[0]) {

        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddProductToCart = async (product) => {
        if (!user) {
            setToastMessage({ open: true, type: "warning", message: "Vui lòng đăng nhập để tiếp tục" });
            return;
        }
        if (!isSelected) {
            setToastMessage({ open: true, type: "warning", message: "Chọn loại sản phẩm" });
            return;
        }
        if (typeProductSelected.quantityStock <= 0) {
            setToastMessage({ open: true, type: "warning", message: "Sản phẩm đã hết hàng" });
            return;
        }
        const _product = {
            id: product.id,
            name: product.name,
            price: typeProductSelected.price,
            quantity: quantity,
            slug: product.slug,
            image: product.image,
            type: typeProductSelected.nameType,
        };

        console.log(_product);
        try {
            const res = await authApi.addCart(user.id, _product);

            if (res.success) {
                setToastMessage({ open: true, type: "success", message: "Thêm thành công" });
                console.log(res);
            }
        } catch (error) {
            console.log(error);
            setToastMessage({ open: true, type: "error", message: "Có lỗi khi thêm sản phẩm vào giỏ hàng" });
        }
    };

    const handleSetQuantityBuy = (value) => {
        setQuantity(value);
    };

    const handleSelectTypeProduct = (index) => {
        // setPrice(typeProduct[index].price);
        setIsSelected(true);
        setTypeProductSelected(typeProduct[index]);
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

                            <Box overflow={"hidden"} mt={3}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: `${product.descriptionContent}`,
                                    }}
                                ></span>
                            </Box>
                            <Stack direction={"row"} alignItems="center">
                                <Typography variant="body1" color="gray">
                                    Loại hàng:
                                </Typography>
                                {typeProduct.map((item, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        onClick={() => handleSelectTypeProduct(index)}
                                        sx={{ margin: "0 8px", "&:focus": { backgroundColor: "#229A16" } }}
                                    >
                                        {item.nameType}
                                    </Button>
                                ))}
                            </Stack>

                            <ProductInfoOrder
                                price={Number(typeProductSelected.price)}
                                countInStock={typeProductSelected.quantityStock}
                                setQuantityBuy={handleSetQuantityBuy}
                            />
                            <ProductInfoWrapper sx={{ border: "none" }}>
                                <ProductInfoItem>
                                    <Button
                                        variant="outlined"
                                        disabled={typeProductSelected.quantityStock <= 0}
                                        onClick={() => handleAddProductToCart(product)}
                                        size={matches ? "large" : "medium"}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button variant="contained" disabled={typeProductSelected.quantityStock <= 0} size={matches ? "large" : "medium"}>
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
            <Slider dots={true} infinite={true} autoplaySpeed={1000} slidesToShow={3} slidesToScroll={3}>
                {productIntroduce.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </Slider>
            <Snackbar
                open={toastMessage.open}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                autoHideDuration={3000}
                onClose={() => setToastMessage({ open: false })}
            >
                <Alert variant="filled" hidden={3000} severity={toastMessage.type} x={{ minWidth: "200px" }}>
                    {toastMessage.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default ProductDetail;
