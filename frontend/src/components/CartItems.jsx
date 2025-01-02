import React, { useState } from "react";
import { HiOutlineMinus, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi2";
import { Link } from "react-router-dom";

const CartItems = ({ cart, setCart, deleteItem }) => {
  const cartItems = cart;
  const handleIncreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCart(newCartItems);
  };

  const handleDecreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCart(newCartItems);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-2">Your Cart</h2>
      <div className="grid grid-cols-[350px_2fr_2fr_2.5fr] justify-items-center mb-2 mt-6 text-sm text-black-500 font-semibold">
        <div></div>
        <div>Price/unit</div>
        <div>Quantity</div>
        <div>Item Price</div>
      </div>
      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_auto] gap-4 items-center"
          >
            <div className="grid grid-cols-[auto_6fr_2fr_3fr_2fr] justify-items-center items-center p-4 bg-white shadow-md rounded-lg">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              
              <div className="ml-4 justify-self-start">
                <h3 className="font-semibold text-lg">{item.name}</h3>
              </div>
              <p className="mr-2 text-lg font-semibold">Tk.{item.price}</p>
              <div className="flex items-center gap-2">
                <button
                  className="px-1 py-1 rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 transition-all"
                  onClick={() => handleDecreaseQuantity(index)}
                >
                  <HiOutlineMinus color="white" />
                </button>
                <p className="mx-2 text-lg font-semibold">{item.quantity}</p>
                <button
                  className="px-1 py-1 rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 transition-all"
                  onClick={() => handleIncreaseQuantity(index)}
                >
                  <HiOutlinePlus color="white" />
                </button>
              </div>
              <div className="text-right ml-6">
                <p className="text-lg font-semibold">
                  Tk.{item.price * item.quantity}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => deleteItem(index)}
                className="px-1 py-1 rounded-sm bg-fuchsia-600 hover:bg-fuchsia-700 transition-all"
              >
                <HiOutlineTrash color="white" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-6 justify-end gap-28 mr-4">
        <h3 className="text-xl font-semibold">Total Amount:</h3>
        <h3 className="text-xl font-semibold">Tk. {totalPrice.toFixed(2)}</h3>
      </div>
      <div className="mt-4 text-right">
        <Link to='/minimart/checkout'>
        <button className="px-4 py-2 bg-fuchsia-600 text-white rounded-md hover:bg-fuchsia-700">
          Proceed to Checkout
        </button>
        </Link>
      </div>
    </div>
  );
};

export default CartItems;
