import { Fragment } from "react";
import CartItem from "./CartItem";

function CartList({ matches, carts, removeCartItem, increment, decrement, productSelected }) {
    const renderCartItem = () => {
        const render = carts
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((cart, index) => (
                <CartItem
                    key={index}
                    cart={cart}
                    matches={matches}
                    removeCartItem={removeCartItem}
                    increment={increment}
                    decrement={decrement}
                    productSelected={productSelected}
                />
            ));
        return render;
    };

    return <Fragment>{renderCartItem()}</Fragment>;
}

export default CartList;
