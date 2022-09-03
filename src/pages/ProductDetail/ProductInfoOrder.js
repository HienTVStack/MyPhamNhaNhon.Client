import { Divider, MenuItem, Select } from "@mui/material";
import { Fragment, useState } from "react";
import NumberFormat from "react-number-format";
import {
    ProductInfoItem,
    ProductInfoItemTitle,
    ProductInfoWrapper,
} from "../../styles/Product";

function ProductInfoOrder({ price, countInStock }) {
    const [numberBuy, setNumberBuy] = useState(1);
    return (
        <Fragment>
            <ProductInfoWrapper>
                <ProductInfoItem>
                    <ProductInfoItemTitle component="h4">
                        Giá
                    </ProductInfoItemTitle>
                    <ProductInfoItemTitle component="h4">
                        <NumberFormat
                            value={price}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" đ"}
                            renderText={(value, props) => (
                                <div {...props}>{value}</div>
                            )}
                        />
                    </ProductInfoItemTitle>
                </ProductInfoItem>
                <Divider />
                <ProductInfoItem>
                    <ProductInfoItemTitle component="h4">
                        Trạng thái
                    </ProductInfoItemTitle>
                    <ProductInfoItemTitle component="h4">
                        {countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                    </ProductInfoItemTitle>
                </ProductInfoItem>
                <Divider />
                <ProductInfoItem>
                    <ProductInfoItemTitle component="h4">
                        Số lượng
                    </ProductInfoItemTitle>
                    <Select
                        value={numberBuy}
                        displayEmpty
                        onChange={(e) => setNumberBuy(e.target.value)}
                        autoWidth
                        sx={{
                            maxHeight: "100%",
                        }}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </ProductInfoItem>
            </ProductInfoWrapper>
        </Fragment>
    );
}

export default ProductInfoOrder;
