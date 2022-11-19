import { useState, Fragment, useEffect } from "react";
import { Container, Divider, Grid, InputBase, Paper, Radio, RadioGroup, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckCart from "./CheckCart";
import { useSelector } from "react-redux";
import paymentOptionApi from "../../api/paymentOptionApi";
import Loading from "../../components/Loading";
import { fNumber } from "../../utils/formatNumber";

const steps = ["Giỏ hàng", "Building & address", "Thanh toán"];

const totalInvoice = (list) => {
    let total = 0;
    for (const item of list) {
        total += Number(item.quantity * item.price);
    }
    return total;
};

function Payment() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));
    const user = useSelector((state) => state.data.user);
    const productPayment = useSelector((state) => state.data.productPayment);
    const [paymentOptionList, setPaymentOptionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productListPayment, setProductListPayment] = useState([]);
    const [paymentOptionSelected, setPaymentOptionSelected] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const paymentOptionLoaded = async () => {
        setLoading(true);
        try {
            const res = await paymentOptionApi.getAll();
            if (res.success) {
                setPaymentOptionList(res.paymentOptions);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const productPaymentLoaded = async () => {
        setProductListPayment(productPayment);
    };

    useEffect(() => {
        if (productPayment?.length > 0) {
            productPaymentLoaded();
        }
        paymentOptionLoaded();
    }, []);

    const isStepOptional = (step) => {
        return step === 1;
    };

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
        console.log(activeStep);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSelectedOptionPayment = (value) => {
        setPaymentOptionSelected(value);
    };

    const renderStep = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <CheckCart carts={productListPayment} />
                        <Paper elevation={1} sx={{ marginBottom: "20px", padding: 2, mt: 10 }}>
                            <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                                <Typography variant="body2" fontSize={"24px"} lineHeight={"30px"} fontWeight={600}>
                                    Địa chỉ giao hàng
                                </Typography>
                                <Button startIcon={<ModeEditIcon />}>Thay đổi</Button>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="body1">
                                    <b>Người nhận</b> Trần Văn Hiền
                                </Typography>
                                <Typography variant="body1">
                                    <b>Địa chỉ</b> 102 Phan Văn Hớn, phường Tân Thới Nhất, quận 12
                                </Typography>
                                <Typography variant="body1">
                                    <b>Số điện thoại</b> 0337122712
                                </Typography>
                            </Stack>
                        </Paper>
                    </>
                );
            case 1:
                return <h1>STEP 2</h1>;
            case 2:
                return <h1>STEP 3</h1>;

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
                            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                        const stepProps = {};
                                        const labelProps = {};
                                        if (isStepOptional(index)) {
                                            labelProps.optional = <Typography variant="caption">Địa chỉ giao hàng</Typography>;
                                        }
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
                                    <Paper elevation={1}>{renderStep(activeStep)}</Paper>
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
                                    <Paper elevation={1} sx={{ marginBottom: "20px", padding: 2 }}>
                                        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
                                            <Typography variant="body2" fontSize={"24px"} lineHeight={"30px"} fontWeight={600}>
                                                Lựa chọn thanh toán
                                            </Typography>
                                            {/* <Button startIcon={<ModeEditIcon />}>Thay đổi</Button> */}
                                        </Stack>
                                        {/* <FormControl> */}
                                        <RadioGroup name={"optionPayment"}>
                                            {paymentOptionList?.map((paymentOption, index) => (
                                                <Stack
                                                    key={index}
                                                    direction={"row"}
                                                    alignItems={"center"}
                                                    spacing={1}
                                                    sx={{ border: "1px solid #ccc", borderRadius: "20px", padding: "6px", mb: 1, cursor: "pointer" }}
                                                >
                                                    <Radio
                                                        value={paymentOption?.id}
                                                        name="paymentOption"
                                                        id={paymentOption.id}
                                                        onChange={() => handleSelectedOptionPayment(paymentOption?.id)}
                                                    />
                                                    <Box htmlFor={paymentOption.id} component="label" sx={{ flex: 1 }}>
                                                        <Typography variant="body1">{paymentOption?.name}</Typography>
                                                        <Typography variant="body2">{paymentOption.description}</Typography>
                                                    </Box>
                                                    {paymentOption?.image && <img src={paymentOption?.image || ""} alt="" width={18} height={18} />}
                                                </Stack>
                                            ))}
                                        </RadioGroup>
                                        {/* </FormControl> */}
                                    </Paper>
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
                                                    100.000 VNĐ
                                                </Typography>
                                            </Stack>
                                            <Stack direction={"row"} justifyContent={"space-between"}>
                                                <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                    Phí vận chuyển
                                                </Typography>
                                                <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                    100.000 VNĐ
                                                </Typography>
                                            </Stack>
                                            <Divider />
                                            <Stack direction={"row"} justifyContent={"space-between"}>
                                                <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                    Thanh toán
                                                </Typography>
                                                <Typography variant={"body2"} fontSize={"18px"} lineHeight={"30px"}>
                                                    100.000 VNĐ
                                                </Typography>
                                            </Stack>
                                            <Stack direction={"row"} sx={{ border: "1px solid #ccc", borderRadius: "8px", padding: "8px 12px" }}>
                                                <InputBase sx={{ flex: 1 }} placeholder={"Mã giảm giá"} />
                                                <Button>Áp dụng</Button>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                    <Box mt={3}>
                                        <Button variant="contained" size="large" fullWidth onClick={handleNext}>
                                            Tiếp tục
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                )}
            </Grid>
        </Container>
    );
}

export default Payment;
