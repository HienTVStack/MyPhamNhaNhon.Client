import { Typography, Box, Stack, Button, InputBase } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProductReview({ reviews }) {
    const user = useSelector((state) => state.data.user);
    const [reviewErr, setReviewErr] = useState("");

    useEffect(() => {
        if (!user) {
            setReviewErr(`Vui lòng đăng nhập để bình luận`);
        }
    }, []);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const reviewText = data.get("reviewText");
        if (reviewText === "") {
            setReviewErr("Comment is required");
            return;
        }
    };
    return (
        <Fragment>
            <Box component="form" sx={{ width: "100%" }} noValidate onSubmit={handleSubmitReview}>
                <Typography variant="h3">Bình luận</Typography>

                <InputBase
                    multiline
                    required
                    error={reviewErr !== ""}
                    disabled={!user}
                    id={"reviewText"}
                    name={"reviewText"}
                    placeholder="Viết đánh giá của bạn"
                    style={{
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        lineHeight: "1.4375em",
                        fontSize: "1em",
                        fontWeight: "400",
                        color: "rgb(33, 43, 54)",
                        boxSizing: "border-box",
                        cursor: "text",
                        alignItems: "center",
                        padding: "16.5px 14px",
                        margin: "20px 0px 15px 0px",
                    }}
                />
                {reviewErr && (
                    <Typography variant="body2" color="error">
                        {reviewErr}
                    </Typography>
                )}
                <Stack justifyContent={"end"} flexDirection={"row"}>
                    <Button size="large" type="submit" variant="contained">
                        Đăng bình luận
                    </Button>
                </Stack>
            </Box>
            {!reviews ? (
                <Typography>Chưa có bình luận nào</Typography>
            ) : (
                reviews.map((r) => (
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h3">{r.fullName}</Typography>
                        <Typography variant="body2">{r.createdAt}</Typography>
                        <Typography variant="body2">{r.reviewText}</Typography>
                    </Box>
                ))
            )}
        </Fragment>
    );
}

export default ProductReview;
