import React, { useState } from "react";
// import Header from "../components/Header";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { apiStart } from "../../api";

const Checkout = ({ cart }) => {
  const { userObj } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "Dhaka",
    insideDhaka: true, 
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvv: "" });

  if (!userObj.isVerified){
    return (
      <div className="max-w-screen-lg mx-auto mt-9 mb-6">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold mb-4">User Not verified</h2>
          <p>Get verified</p>
          <div className="m-4"><Link to="/verify-email" className=" border-2 border-black p-2 rounded-full ">GET VERIFIED</Link></div>
          
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-screen-lg mx-auto mt-9 mb-6">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p>Please add items to your cart before proceeding to checkout.</p>
          <div className="m-4"><Link to="/minimart" className=" border-2 border-black p-2 rounded-full ">GO BACK</Link></div>
          
        </div>
      </div>
    );
  }

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const vat = totalAmount * 0.05;
  const deliveryFee = address.insideDhaka ? 40 : 120;
  const totalWithFees = totalAmount + vat + deliveryFee;

  const paymentOptions = ["Cash on Delivery", "Bkash", "Nagad", "Visa", "Mastercard", "PayPal"];

  const handleSendOtp = () => {
    setOtpSent(true);
    alert("OTP sent! Please enter the 4-digit OTP.");
  };
  const handleConfirmOrder = async () => {
    if (!address.line1) {
      toast.error("Please complete your delivery address.");
      return;
    }
  
    if (!address.insideDhaka && !address.city) {
      toast.error("Please enter the city if outside Dhaka.");
      return;
    }
  
    if (paymentMethod === "Bkash" || paymentMethod === "Nagad") {
      if (!phoneNumber || !pin || !otp) {
        toast.error("Please complete all fields for Bkash/Nagad payment.");
        return;
      }
    } else if (paymentMethod === "Visa" || paymentMethod === "Mastercard") {
      if (!cardInfo.number || !cardInfo.expiry || !cardInfo.cvv) {
        toast.error("Please enter complete card information.");
        return;
      }
    }
  
    try {
      const orderData = {
        user: userObj._id,
        cart: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: totalAmount,
        vat: vat,
        deliveryFee: deliveryFee,
        totalAmount: totalWithFees,
        address: address,
        payment: {
          method: paymentMethod, 
          phoneNumber: paymentMethod === "Bkash" || paymentMethod === "Nagad" ? phoneNumber : undefined,
          otp: paymentMethod === "Bkash" || paymentMethod === "Nagad" ? otp : undefined,
          cardNumber: paymentMethod === "Visa" || paymentMethod === "Mastercard" ? cardInfo.number : undefined,
          cardExpiry: paymentMethod === "Visa" || paymentMethod === "Mastercard" ? cardInfo.expiry : undefined,
          cardCvv: paymentMethod === "Visa" || paymentMethod === "Mastercard" ? cardInfo.cvv : undefined,
        },
        delivery: {
          status: "Pending",
          remarks: "",
        },
      };
  
      const response = await axios.post(
        `${apiStart}/api/minimart/billing`,
        orderData,
        { headers: { Authorization: localStorage.getItem("loginToken") } }
      );
  
      if (response.status === 201) {
        toast.success("Order confirmed!");
        navigate("/minimart");
      } else {
        toast.error("Order could not be processed.");
      }
    } catch (error) {
      toast.error("Error confirming the order. Please try again.");
      console.error("Order error:", error);
    }
  };
  
  

  return (
    <div className="">
      {/* <Header /> */}

      <div className="max-w-screen-lg mx-auto mt-9 mb-6">
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <p>{item.name}</p>
                  <p>
                    Price: Tk. {item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div>
                  <p>Total: Tk. {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Price Details</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal:</p>
            <p>Tk. {totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>VAT (5%):</p>
            <p>Tk. {vat.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Delivery Fee ({address.insideDhaka ? "Inside Dhaka" : "Outside Dhaka"}):</p>
            <p>Tk. {deliveryFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Total Amount:</p>
            <p>Tk. {totalWithFees.toFixed(2)}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <select
            className="w-full p-2 border rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {paymentOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {paymentMethod === "Bkash" || paymentMethod === "Nagad" ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">{paymentMethod} Payment</h2>
            <div className="flex mb-4">
              <span className="p-2 border bg-gray-200 rounded-l">+880</span>
              <input
                type="text"
                className="w-full p-2 border rounded-r"
                placeholder="Enter phone number (10 digits)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <input
              type="password"
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            {!otpSent ? (
              <button
                className="w-full bg-fuchsia-800 text-white py-2 rounded hover:bg-fuchsia-700 transition-all"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Enter OTP (4 digits)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <p className="text-indigo-600">Verified</p>
              </div>
            )}
          </div>
        ) : paymentMethod === "Visa" || paymentMethod === "Mastercard" ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">{paymentMethod} Payment</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Card Number"
              value={cardInfo.number}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, number: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Expiry Date (MM/YY)"
              value={cardInfo.expiry}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, expiry: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="CVV"
              value={cardInfo.cvv}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, cvv: e.target.value })
              }
            />
          </div>
        ) : paymentMethod === "PayPal" ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">PayPal Payment</h2>
            <p>Redirecting to PayPal login...</p>
          </div>
        ) : null}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Address Line 1"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Address Line 2 (optional)"
            value={address.line2}
            onChange={(e) => setAddress({ ...address, line2: e.target.value })}
          />
          {!address.insideDhaka && (
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          )}
          <div className="flex items-center mb-4">
            <label className="mr-2">Inside Dhaka:</label>
            <input
              type="checkbox"
              checked={address.insideDhaka}
              onChange={(e) =>
                setAddress({ ...address, insideDhaka: e.target.checked })
              }
            />
          </div>
        </div>

        <button
          className="w-full bg-fuchsia-600 text-white py-2 rounded hover:bg-fuchsia-700 transition-all"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
