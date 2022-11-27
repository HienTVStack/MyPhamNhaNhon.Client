import { Fragment } from "react";
import { Avatar, Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";

import { fNumber } from "../../utils/formatNumber";

function CheckCart({ carts, matches }) {
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
            {matches ? (
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
            ) : (
                carts?.map((item, index) => (
                    <Stack
                        key={index}
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                        p={1}
                        m={2}
                        sx={{ border: "1px solid #ccc", borderRadius: "12px" }}
                    >
                        <img src={item.image} alt={item.name} width={80} height={80} sx={{ objectFit: "cover" }} />
                        <Stack flex={1}>
                            <Typography variant="body1" fontSize={"20px"} fontWeight={600} lineHeight={"30px"}>
                                {item.name}
                            </Typography>
                            <Stack direction={"row"} spacing={2}>
                                <b>Phân loại</b>
                                <Typography variant="body1">{item.nameType}</Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={2}>
                                <b>Số lượng</b>
                                <Typography variant="body1">{item.quantity}</Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={2}>
                                <b>Giá</b>
                                <Typography variant="body1">{`${fNumber(item.price)} đ`}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                ))
            )}
        </Fragment>
    );
}

export default CheckCart;
