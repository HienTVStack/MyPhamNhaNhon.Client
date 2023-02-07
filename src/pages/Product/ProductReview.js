import { Typography, Box, Stack, Button, TextField, Avatar } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import productApi from "../../api/productApi";
import { fDateTimeSuffix } from "../../utils/formatTime";

function ProductReview({ id, reviews }) {
    const user = useSelector((state) => state.data.user);
    const [reviewErr, setReviewErr] = useState("");
    const [reviewList, setReviewList] = useState([]);
    const [reviewText, setReviewText] = useState("");

    useEffect(() => {
        if (Object.keys(user).length <= 0) {
            setReviewErr(`Vui lòng đăng nhập để bình luận`);
        }
        setReviewList(reviews);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (reviewText === "") {
            setReviewErr("Comment is required");
            return;
        }

        const _reviews = {
            author: user.fullName,
            content: reviewText,
            createdAt: new Date(),
        };

        try {
            const res = await productApi.addReview({ id: id, user, reviews: _reviews });
            if (res.message === "OK") {
                setReviewList([...reviewList, _reviews]);
                setReviewText("");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Box sx={{ width: "100%" }} noValidate py={2}>
                <Typography variant="body2" sx={{ fontSize: "24px", lineHeight: "37px", fontWeight: "700" }}>
                    Bình luận
                </Typography>

                {Object.keys(user).length <= 0 ? <Typography variant="subtitle1" color={'error'}>Vui lòng đăng nhập để bình luận*</Typography> : (
                    <>
                        <TextField
                    fullWidth
                    required
                    error={reviewErr !== ""}
                    disabled={!user}
                    margin="normal"
                    id={"reviewText"}
                    name={"reviewText"}
                    placeholder="Viết đánh giá của bạn"
                    size="large"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    style={{
                        borderRadius: "8px",
                        lineHeight: "1.4375em",
                        fontSize: "1em",
                        fontWeight: "400",
                        color: "rgb(33, 43, 54)",
                        boxSizing: "border-box",
                        cursor: "text",
                    }}
                />
                {reviewErr && (
                    <Typography variant="body2" color="error">
                        {reviewErr}
                    </Typography>
                )}
                <Stack justifyContent={"end"} flexDirection={"row"}>
                    <Button size="large" type="submit" variant="contained" onClick={handleSubmitReview}>
                        Đăng bình luận
                    </Button>
                </Stack>
                    </>
                )}

                
            </Box>
            {!reviews ? (
                <Typography variant="body2">Chưa có bình luận nào</Typography>
            ) : (
                reviewList
                    .slice()
                    .reverse()
                    .map((r, index) => (
                        <Box key={index} display={"flex"} alignItems={"center"} py={2} sx={{ borderBottom: "1px solid #ccc" }}>
                            <Avatar src={r.authorAvt} alt={r.author} style={{ height: "48px", width: "48px", marginRight: "20px" }} />
                            <Box flex={1}>
                                <Typography variant="body2">{r.author}</Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "rgb(145, 158, 171)", lineHight: "1.5", fontSize: "0.75rem", fontWeight: "400" }}
                                >
                                    {fDateTimeSuffix(r?.createdAt)}
                                </Typography>
                                <Typography variant="body2">{r.content}</Typography>
                            </Box>
                        </Box>
                    ))
            )}
        </>
    );
}

export default ProductReview;
