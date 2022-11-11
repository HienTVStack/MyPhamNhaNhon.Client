import { Fragment } from "react";
import CartItem from "./CartItem";

function CartList({ matches, carts, removeCartItem, increment, decrement }) {
    const renderCartItem = () => {
        const render = carts
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((cart) => (
                <CartItem key={cart.id} cart={cart} matches={matches} removeCartItem={removeCartItem} increment={increment} decrement={decrement} />
            ));
        return render;
    };

    return <Fragment>{renderCartItem()}</Fragment>;
}

export default CartList;
