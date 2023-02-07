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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShareIcon from "@mui/icons-material/Share";
// React router dom
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FacebookShareButton } from "react-share";
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
// import Slider from "react-slick";
// import Slider from "../../components/SliderMUI";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../../api/authApi";
import { setProductPayment } from "../../redux/actions";

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
    const location = useLocation();
    const dispatch = useDispatch();
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
    const [typeProductSelected, setTypeProductSelected] = useState({ nameType: "", salePrice: 0, quantityStock: 0, _id: "" });
    const [isSelected, setIsSelected] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        open: false,
        type: "error",
        message: "ERR_001",
    });

    let { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        const item = productList.filter((item) => item.slug === slug);
        setProductImage(item[0]?.imageList);
        setTypeProduct(item[0]?.type);
        setTypeProductSelected(item[0]?.type[0]);
        setProduct(item[0]);

        setProductIntroduce(productList.slice(0, 6));
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddProductToCart = async (product) => {
        if (Object.entries(user).length === 0) {
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
            price: typeProductSelected.salePrice,
            quantity: quantity,
            slug: product.slug,
            image: product.image,
            nameType: typeProductSelected.nameType,
            idType: typeProductSelected._id,
        };

        try {
            const res = await authApi.addCart(user.id, _product);

            if (res.success) {
                console.log(res);
                setToastMessage({ open: true, type: "success", message: "Thêm thành công" });
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
        setIsSelected(true);
        setTypeProductSelected(typeProduct[index]);
    };

    const handlePayment = (product, typeProduct) => {
        const _product = {
            id: product.id,
            name: product.name,
            image: product.image,
            idType: typeProduct._id,
            nameType: typeProduct.nameType,
            price: typeProduct.salePrice,
            quantity: quantity,
        };
        dispatch(setProductPayment([_product]));
        navigate("/thanh-toan");
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
                            {productImage?.map((img, index) => (
                                <Grid key={index} item xs={3} sm={3} md={3} lg={3}>
                                    <ProductImageItem onClick={() => setIndexImageShow(index)}>
                                        <Image src={img} key={index} alt={product?.name} />
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
                                    {product?.name}
                                </Typography>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Rating disabled value={product?.rating || 5} />
                                    <Divider orientation="vertical" flexItem sx={{ margin: "0 8px" }} />
                                    <Typography variant="body2" mt={"5px"}>
                                        {product?.reviews?.length} đánh giá
                                    </Typography>
                                    <FacebookShareButton
                                        url={`https://myphamnhanhon-ui.vercel.app${location.pathname}`}
                                        hashtag="#nhanhon"
                                        quote="Mỹ phẩm nhà Nhơn uy tín và chất lượng"
                                        style={{ marginLeft: "12px", display: "flex", flexDirection: "column", alignItems: "center" }}
                                    >
                                        <ShareIcon color="primary" />
                                    </FacebookShareButton>
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
                                {typeProduct?.map((item, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        onClick={() => handleSelectTypeProduct(index)}
                                        sx={{
                                            margin: "0 8px",
                                            "&:focus": { backgroundColor: "#229A16" },
                                            "&:active": { backgroundColor: "#229A16" },
                                            "&:hover": { backgroundColor: "#229A16" },
                                        }}
                                    >
                                        {item.nameType}
                                    </Button>
                                ))}
                            </Stack>

                            <ProductInfoOrder
                                price={Number(typeProductSelected?.salePrice)}
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
                                    <Button
                                        variant="contained"
                                        disabled={typeProductSelected.quantityStock <= 0}
                                        size={matches ? "large" : "medium"}
                                        onClick={() => handlePayment(product, typeProductSelected)}
                                    >
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

            <HeadingContent title={"Sản phẩm cùng loại"} urlViewAll={"/san-pham"} />
            {matches ? (
                <Stack spacing={2}>
                    <Slider autoplay={true} dots={true} infinite={true} autoplaySpeed={3000} slidesToShow={4} slidesToScroll={1}>
                        {productIntroduce?.map((product) => (
                            <Box key={product._id}>
                                <ProductItem product={product} />
                            </Box>
                        ))}
                    </Slider>
                </Stack>
            ) : (
                <Stack spacing={2}>
                    <Slider autoplay={true} dots={true} infinite={true} autoplaySpeed={2500} slidesToShow={1} slidesToScroll={1}>
                        {productIntroduce?.map((product) => (
                            <Box key={product._id}>
                                <ProductItem product={product} />
                            </Box>
                        ))}
                    </Slider>
                </Stack>
            )}

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
