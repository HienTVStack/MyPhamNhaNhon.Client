import { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Alert,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    InputBase,
    Modal,
    Paper,
    Radio,
    RadioGroup,
    Snackbar,
    Stack,
    TextField,
    useMediaQuery,
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons, BraintreePayPalButtons } from "@paypal/react-paypal-js";
import CheckCart from "./CheckCart";
import paymentOptionApi from "../../api/paymentOptionApi";
import Loading from "../../components/Loading";
import { fNumber } from "../../utils/formatNumber";
import invoiceApi from "../../api/invoiceApi";
import ResultPayment from "./ResultPayment";
import ProductItem from "../../components/ProductItem";
import authApi from "../../api/authApi";
import discountApi from "../../api/discountApi";

const steps = ["Giỏ hàng", "Thanh toán", "Kết quả"];

const totalInvoice = (list) => {
    let total = 0;
    for (const item of list) {
        total += Number(item.quantity * item.price);
    }
    return total;
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
};

function Payment() {
    const theme = useTheme();
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));
    const user = useSelector((state) => state.data.user);
    const productList = useSelector((state) => state.data.productList || []);
    const productPayment = useSelector((state) => state.data.productPayment);
    const [loading, setLoading] = useState(false);
    const [paymentOptionList, setPaymentOptionList] = useState([]);
    //   const [paymentOptionSelected, setPaymentOptionSelected] = useState("");
    // const [paymentSelectedErr, setPaymentSelectedErr] = useState("");
    const [productListPayment, setProductListPayment] = useState([]);
    const [infoDelivery, setInfoDelivery] = useState({});
    const [discountValue, setDiscountValue] = useState(0);
    const [codeDiscount, setCodeDiscount] = useState("");
    const [discountTotalInvoice, setDiscountTotalInvoice] = useState(0);
    const [activeStep, setActiveStep] = useState(1);
    const [skipped, setSkipped] = useState(new Set());
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    // const [discountTotal, setDiscountTotal] = useState(0);
    const [toastMessage, setToastMessage] = useState({
        open: false,
        type: "error",
        message: "ERR",
    });
    const discountTotal = totalInvoice(productListPayment) - discountValue - discountTotalInvoice;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClosePaymentOption = () => setShowPaymentOptions(false);

    const productPaymentLoaded = async () => {
        setProductListPayment(productPayment);
    };

    const fetch = async () => {
        const fetchPaymentOptionGetAll = paymentOptionApi.getAll();
        const checkTotalInvoiceVerifyDiscount = discountApi.checkTotalInvoiceVerifyDiscount({ totalInvoice: totalInvoice(productPayment) });

        await Promise.all([fetchPaymentOptionGetAll, checkTotalInvoiceVerifyDiscount])
            .then(([paymentOption, checkTotalInvoiceVerifyDiscount]) => {
                if (paymentOption.success) {
                    setPaymentOptionList(paymentOption?.paymentOptions);
                }
                if (checkTotalInvoiceVerifyDiscount.success) {
                    if (checkTotalInvoiceVerifyDiscount?.discount?.invoiceMin <= totalInvoice(productPayment)) {
                        const discountValue = checkTotalInvoiceVerifyDiscount?.discount?.discountValue;
                        const priceDiscount = totalInvoice(productPayment) * (discountValue / 100);
                        const discountValueMax = checkTotalInvoiceVerifyDiscount?.discount?.discountValueMax;

                        setDiscountTotalInvoice(priceDiscount <= discountValueMax ? priceDiscount : discountValueMax);
                    } else {
                        setDiscountTotalInvoice(0);
                    }
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (Object.entries(user).length === 0) {
            navigate("/dang-nhap");
        }
        if (productPayment?.length > 0) {
            fetch();
            productPaymentLoaded();
            setActiveStep(1);
        } else {
            navigate("/");
        }
        setInfoDelivery({ name: user?.fullName, address: user?.address, phone: user?.phone });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //   const isStepOptional = (step) => {
    //     return step === 1;
    //   };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // console.log(activeStep);
        setSkipped(newSkipped);
    };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    // const handleSkip = () => {
    //     if (!isStepOptional(activeStep)) {

    //         throw new Error("You can't skip a step that isn't optional.");
    //     }

    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped((prevSkipped) => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };

    const handleReset = () => {
        setActiveStep(0);
    };

    // const handleSelectedOptionPayment = (value) => {
    //     setPaymentOptionSelected(value);
    //     // SettingsEthernet
    // };

    const handleChangeInfoDelivery = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const fullName = data.get("fullName");
        const address = data.get("address");
        const phone = data.get("phone");
        let isReplaceAddress = false;

        if (data.get("isReplaceAddress")) {
            isReplaceAddress = true;
            try {
                const res = await authApi.updateInfo(user.id, { address, phone });

                if (res.success) {
                    setToastMessage({ open: true, type: "success", message: "Cập nhật thông tin thành công" });
                }
            } catch (error) {
                setToastMessage({ open: true, type: "error", message: "Cập nhật thông tin thất bại" });
            }
        }

        setInfoDelivery({ name: fullName, address, phone, isReplaceAddress });
        setOpen(!open);
    };

    const handleShowPaymentOptions = () => {
        let err = false;

        if (!(user.fullName && user.address && user.phone)) {
            alert(`Vui lòng cung cấp đầy đủ thông tin giao hàng`);
            err = true;
        }

        if (err) return;
        setShowPaymentOptions(true);
    };

    const handlePayment = async (paymentName) => {
        let isPayment = false;
        if (paymentName !== "Thanh toán trực tiếp") {
            isPayment = true;
        }

        setShowPaymentOptions(false);
        setLoading(true);
        const invoice = {
            auth: {
                id: user.id,
                name: user.fullName,
                address: user.address,
                phone: user.phone,
                email: user.email || user.emailGoogle || user.emailFacebook,
            },
            products: productPayment,
            total: totalInvoice(productListPayment) - discountValue - discountTotalInvoice,
            priceDiscount: discountValue + discountTotalInvoice,
            discount: {
                code: codeDiscount,
                discountValue: discountValue,
            },
            priceDelivery: 0,
            paymentOption: paymentName,
            isPayment,
        };
        try {
            const res = await invoiceApi.create(invoice);
            if (res.success) {
                handleNext();
                setToastMessage({ open: true, type: "success", message: "Mua hàng thành công" });
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const createdOrder = async (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: discountTotal,
                        },
                    },
                ],
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderId) => {
                return orderId;
            });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            //   const { payer } = details;
            handlePayment("Thanh toán với paypal");
        });
    };

    const onError = (data, actions) => {
        setToastMessage({ open: true, message: "Hiện tại chưa thể thanh toán với paypal", type: "error" });
    };

    const handleDiscountApply = async () => {
        try {
            const res = await discountApi.checkCodeByCustomer({ code: codeDiscount, idUser: user.id });

            if (res.success && res.isCheck) {
                const voucher = res?.voucher;
                if (voucher?.invoiceMin >= totalInvoice(productListPayment)) {
                    setToastMessage({ open: true, message: "Hóa đơn không đủ điều kiện", type: "warning" });
                    return;
                }
                const reducerPrice = totalInvoice(productListPayment) - totalInvoice(productListPayment) * (Number(voucher?.discountValue) / 100);

                setDiscountValue(reducerPrice <= voucher?.discountValueMax ? reducerPrice : Number(voucher?.discountValueMax));
                setToastMessage({ open: true, message: "Áp dụng voucher thành công", type: "success" });
            } else {
                setToastMessage({ open: true, message: "Không tìm thấy voucher cho bạn", type: "warning" });
                setCodeDiscount("");
                setDiscountValue(0);
            }
        } catch (error) {
            console.log(error);
            setToastMessage({ open: true, message: "Áp dụng voucher thất bại", type: "error" });
        }
    };

    const renderStep = (step) => {
        switch (step) {
            case 0:
                return;
            case 1:
                return (
                    <>
                        <Paper>
                            <CheckCart carts={productListPayment} matches={matches} />
                        </Paper>
                        <Paper elevation={1} sx={{ marginBottom: "20px", padding: 2, mt: 2 }}>
                            <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                                <Typography variant="body2" fontSize={"24px"} lineHeight={"30px"} fontWeight={600}>
                                    Địa chỉ giao hàng
                                </Typography>
                                <Button startIcon={<ModeEditIcon />} onClick={handleOpen}>
                                    Thay đổi
                                </Button>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="body1">
                                    <b>Người nhận</b> {infoDelivery.name}
                                </Typography>
                                <Typography variant="body1">
                                    <b>Địa chỉ</b> {infoDelivery.address}
                                </Typography>
                                <Typography variant="body1">
                                    <b>Số điện thoại</b> {`+ 84 ${fNumber(Number(infoDelivery.phone))}`}
                                </Typography>
                            </Stack>
                        </Paper>
                    </>
                );
            case 2:
                return <ResultPayment />;

            default:
                return <div>Not Found</div>;
        }
    };
    return (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
            <Grid container>
                {/* <Grid item xs={12} sm={12} md={12} lg={8} xl={8}> */}
                {loading ? (
                    <Loading />
                ) : (
                    <Box sx={{ width: "100%" }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map((label, index) => {
                                        const stepProps = {};
                                        const labelProps = {};
                                        // if (isStepOptional(index)) {
                                        //     labelProps.optional = <Typography variant="caption">Địa chỉ giao hàng</Typography>;
                                        // }
                                        if (isStepSkipped(index)) {
                                            stepProps.completed = false;
                                        }
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                            </Grid>
                        </Grid>
                        {activeStep === steps.length ? (
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                    <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                        <Box sx={{ flex: "1 1 auto" }} />
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                    {renderStep(activeStep)}
                                    {/* <Paper elevation={1}>{renderStep(activeStep)}</Paper> */}
                                    {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                            Back
                                        </Button>
                                        <Box sx={{ flex: "1 1 auto" }} />
                                        {isStepOptional(activeStep) && (
                                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                Skip
                                            </Button>
                                        )}

                                        <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
                                    </Box> */}
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                    {activeStep === 2 ? (
                                        <Stack spacing={2}>
                                            <Typography variant="body1" fontSize={20} fontWeight={600} lineHeight={"30px"}>
                                                Có thể bạn cũng thích
                                            </Typography>
                                            <Stack spacing={2}>
                                                {productList?.slice(0, 4).map((product, index) => (
                                                    <ProductItem key={index} product={product} />
                                                ))}
                                            </Stack>
                                        </Stack>
                                    ) : (
                                        <Fragment>
                                            <div>
                                                {/* <Paper elevation={1} sx={{ marginBottom: "20px", padding: 2 }}>
                                                <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                                                    <Typography variant="body2" fontSize={"24px"} lineHeight={"30px"} fontWeight={600}>
                                                        Lựa chọn thanh toán
                                                    </Typography>
                                                </Stack>
                                                <RadioGroup name={"optionPayment"}>
                                                    {paymentOptionList?.map((paymentOption, index) => (
                                                        <Stack
                                                            key={index}
                                                            direction={"row"}
                                                            alignItems={"center"}
                                                            spacing={1}
                                                            sx={{
                                                                border: "1px solid #ccc",
                                                                borderRadius: "20px",
                                                                padding: "6px",
                                                                mb: 1,
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <Radio
                                                                value={paymentOption?.id}
                                                                name="paymentOption"
                                                                id={paymentOption.id}
                                                                onChange={() => handleSelectedOptionPayment(paymentOption?.name)}
                                                            />
                                                            <Box htmlFor={paymentOption.id} component="label" sx={{ flex: 1 }}>
                                                                <Typography variant="body1">{paymentOption?.name}</Typography>
                                                                <Typography variant="body2">{paymentOption.description}</Typography>
                                                            </Box>
                                                            {paymentOption?.image && (
                                                                <img src={paymentOption?.image || ""} alt="" width={18} height={18} />
                                                            )}
                                                        </Stack>
                                                    ))}
                                                    {paymentSelectedErr && !paymentOptionSelected && (
                                                        <Typography variant="body2" color="error">
                                                            {paymentSelectedErr}
                                                        </Typography>
                                                    )}
                                                </RadioGroup>
                                            </Paper> */}
                                            </div>

                                            <Paper elevation={1}>
                                                <Typography
                                                    variant="body2"
                                                    fontSize={"24px"}
                                                    lineHeight={"30px"}
                                                    fontWeight={600}
                                                    sx={{ padding: "24px 16px 0px" }}
                                                >
                                                    Tổng tiền
                                                </Typography>
                                                <Stack spacing={2} p={2}>
                                                    <Stack direction={"row"} justifyContent={"space-between"}>
                                                        <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                            Tổng cộng
                                                        </Typography>
                                                        <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                            {`${fNumber(totalInvoice(productListPayment))} đ`}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack direction={"row"} justifyContent={"space-between"}>
                                                        <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                            Giảm giá
                                                        </Typography>
                                                        <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                            {`${fNumber(discountValue)} đ `}
                                                        </Typography>
                                                    </Stack>
                                                    {discountTotalInvoice > 0 && (
                                                        <Stack direction={"row"} justifyContent={"space-between"}>
                                                            <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                                Giảm giá hóa đơn
                                                            </Typography>
                                                            <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                                {`${fNumber(discountTotalInvoice)} đ `}
                                                            </Typography>
                                                        </Stack>
                                                    )}

                                                    <Stack direction={"row"} justifyContent={"space-between"}>
                                                        <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                            Phí vận chuyển
                                                        </Typography>
                                                        <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                            {`${fNumber(0)} đ`}
                                                        </Typography>
                                                    </Stack>
                                                    <Divider />
                                                    <Stack direction={"row"} justifyContent={"space-between"}>
                                                        <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                            <b>Thanh toán</b>
                                                        </Typography>
                                                        <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                            {`${fNumber(totalInvoice(productListPayment) - discountValue - discountTotalInvoice)} `}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction={"row"}
                                                        sx={{ border: "1px solid #ccc", borderRadius: "8px", padding: "8px 12px" }}
                                                    >
                                                        <InputBase
                                                            value={codeDiscount}
                                                            sx={{ flex: 1 }}
                                                            onChange={(e) => setCodeDiscount(e.target.value)}
                                                            placeholder={"Mã giảm giá"}
                                                        />
                                                        <Button onClick={handleDiscountApply}>Áp dụng</Button>
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                            <Box mt={3} mb={8}>
                                                <PayPalScriptProvider
                                                    options={{
                                                        "client-id":
                                                            "AVtjVD9kRahAkIBXi6UJglT_W4VdLB5vo6-4y2JLL3wzPUQUAvDKgozaBEYI4VIJaocOL-w28R8611Ev",
                                                    }}
                                                >
                                                    <Button variant="contained" size="large" fullWidth onClick={handleShowPaymentOptions}>
                                                        Thanh toán
                                                    </Button>
                                                </PayPalScriptProvider>
                                            </Box>
                                        </Fragment>
                                    )}
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                )}
            </Grid>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableAutoFocus
                disableEscapeKeyDown
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thông tin giao hàng
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Thông tin giao hàng cụ thể, chính xác tiết kiệm được hơn 40% thời gian sản phẩm được giao đến bạn
                    </Typography>
                    <Stack component="form" onSubmit={handleChangeInfoDelivery}>
                        <TextField
                            margin="normal"
                            defaultValue={infoDelivery.name}
                            name="fullName"
                            placeholder="Người nhận"
                            required={true}
                            size="small"
                        />
                        <TextField
                            margin="normal"
                            defaultValue={infoDelivery.address}
                            name="address"
                            placeholder="Địa chỉ giao hàng"
                            required={true}
                            size="small"
                        />

                        <TextField
                            margin="normal"
                            defaultValue={infoDelivery.phone}
                            name="phone"
                            placeholder="Số điện thoại"
                            required={true}
                            size="small"
                        />
                        <FormGroup>
                            <FormControlLabel control={<Checkbox name="isReplaceAddress" />} label="Thay đổi địa chỉ giao hàng mặc định" />
                        </FormGroup>
                        <Button variant="contained" type="submit" size="large" sx={{ mt: 4 }}>
                            Xác nhận
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            {/* Modal payment options */}
            <Modal open={showPaymentOptions} onClose={handleClosePaymentOption} disableAutoFocus disableEscapeKeyDown>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Lựa chọn hình thức thanh toán
                    </Typography>
                    <Stack spacing={2}>
                        {paymentOptionList.map((item, index) => (
                            <Stack key={index} spacing={2}>
                                {item.name === "Thanh toán với Paypal" && (
                                    <PayPalScriptProvider
                                        options={{
                                            "client-id": "AVtjVD9kRahAkIBXi6UJglT_W4VdLB5vo6-4y2JLL3wzPUQUAvDKgozaBEYI4VIJaocOL-w28R8611Ev",
                                        }}
                                    >
                                        <PayPalButtons createOrder={createdOrder} onApprove={onApprove} onError={onError} />
                                    </PayPalScriptProvider>
                                )}
                                {item.name === "Thanh toán trực tiếp" && (
                                    <Button variant="contained" size={"large"} onClick={() => handlePayment(item.name)}>
                                        Thanh toán trực tiếp
                                    </Button>
                                )}
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Modal>
        </Container>
    );
}

export default Payment;
