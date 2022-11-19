import { Fragment } from "react";
import { Avatar, Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { fNumber } from "../../utils/formatNumber";

function CheckCart({ carts }) {
    return (
        <Fragment>
            <Typography
                variant="body2"
                fontSize={"24px"}
                lineHeight={"30px"}
                fontWeight={600}
                sx={{ padding: "24px 24px 0px", marginBottom: "24px" }}
            >
                Sản phẩm
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: "#F4F6F8" }}>
                        <TableRow>
                            <TableCell align="left" rowSpan={2}>
                                Sản phẩm
                            </TableCell>
                            <TableCell />
                            <TableCell align="center">Giá</TableCell>
                            <TableCell align="center">Số lượng</TableCell>
                            <TableCell align="center">Tổng cộng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {carts?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                        <Avatar sx={{ height: "64px", width: "64px" }} src={item.image} alt="" />
                                        <Box>
                                            <Typography variant="body1">{item.name}</Typography>
                                            <Stack direction={"row"} spacing={2}>
                                                <Typography>
                                                    <b>Loại:</b>
                                                </Typography>
                                                <Box sx={{ backgroundColor: "#F4F6F8" }}>
                                                    <Typography variant="body1">{item.type}</Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell />
                                <TableCell align="center">{`${fNumber(item.price)} đ`}</TableCell>
                                <TableCell align="center">{`${fNumber(item.quantity)}`}</TableCell>
                                <TableCell align="center">{`${fNumber(item.price * item.quantity)} đ`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default CheckCart;
