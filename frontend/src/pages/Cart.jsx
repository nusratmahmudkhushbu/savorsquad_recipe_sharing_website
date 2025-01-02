import React, { useState } from "react";
import CartItems from "../components/CartItems";
// import Header from "../components/Header";

const Cart = ({ cart, setCart, deleteItem }) => {
  return (
    <div>
      {/* <Header /> */}
      <CartItems cart={cart} setCart={setCart} deleteItem={deleteItem} />
    </div>
  );
};

export default Cart;
