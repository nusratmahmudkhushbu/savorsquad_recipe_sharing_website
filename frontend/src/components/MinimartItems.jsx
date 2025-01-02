import React, { useState, useEffect } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlinePlusCircle, HiCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";

const ItemCard = ({
  id,
  imageUrl,
  Name,
  Description,
  Price,
  unit,
  cart,
  setCart,
  addCart,
  deleteitem,
  key // Index or unique identifier for delete
}) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  // Check if the item is already in the cart when the component mounts
  useEffect(() => {
    const isItemInCart = cart.some((item) => item.id === id);
    setAdded(isItemInCart);
  }, [id, cart]);

  const handleToggleCart = () => {
    if (added) {
      // Remove item from cart
      const itemIndex = cart.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        deleteitem(itemIndex);
      }
      setAdded(false);
      toast.error(`Removed item`);
    } else {
      // Add item to cart
      const cartItem = { id, name: Name, price: Price, imageUrl, quantity: 1 };
      addCart(cartItem);
      setAdded(true);
      
      toast.success(`Added ${cartItem.name}`);
    }
  };

  return (
    <div
      className="block rounded-lg p-2 shadow-sm shadow-indigo-100"
      style={{ width: "300px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full" style={{ paddingTop: "100%" }}>
        <img
          alt={Name}
          src={imageUrl}
          className="absolute top-0 left-0 h-full w-full object-cover rounded-md"
          style={{ borderRadius: "15px" }}
        />
      </div>

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only"></dt>
            <dd className="text-m font-bold">{Name}</dd>
          </div>
          <div>
            <dt className="sr-only"></dt>
            <dd className="text-sm text-gray-500">{Description}</dd>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <dt className="sr-only"></dt>
              <dd className="font-medium">
                Tk.{Price}/{unit}
              </dd>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleToggleCart}
                className="focus:outline-none"
              >
                {added ? (
                  <HiCheckCircle className="h-6 w-6 text-purple-500" />
                ) : hovered ? (
                  <HiOutlinePlusCircle className="h-6 w-6" />
                ) : (
                  <HiOutlineShoppingCart className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ItemCard;
