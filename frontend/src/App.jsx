import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/Loginpage";
import CreateAccount from "./pages/CreateAccount";
import AdminPage from "./pages/AdminPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProtectedPage from "./pages/ProtectedPage";
import Userprofilepage from "./pages/Userprofilepage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import Minimart from "./pages/MinimartPage";
import Cart from "./pages/Cart";
import CreateRecipe from "./pages/CreateRecipe";
import CategoryPage from "./pages/CategoryPage";
import Search from "./pages/Search";
import Checkout from "./pages/CheckoutPage";

import FryingpanSpinner from "./components/FryingpanSpinner";
import { useState } from "react";
import ViewOthersProfile from "./pages/ViewOthersProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";



function App() {
  const [cart, setCart] = useState([]);

  function addCart(newItems) {
    setCart(function (prevcart) {
      const item = prevcart.find((previtem) => previtem.name === newItems.name);
      return item ? prevcart : [...prevcart, newItems];
    });
  }

  function deleteItem(index) {
    console.log(index);
    setCart(function (prevcart) {
      const items = prevcart.filter((_, idx) => index !== idx);
      console.log(items);
      return items;
    });
  }

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <BrowserRouter>
      <Header items={cart.length}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loader" element={<FryingpanSpinner />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route
            path="/minimart"
            element={<Minimart cart={cart} setCart={setCart} addCart={addCart} deleteitem={deleteItem} />}
          />
          <Route
            path="/minimart/cart"
            element={
              <Cart cart={cart} setCart={setCart} deleteItem={deleteItem} />
            }
          />
          <Route
            path="/minimart/checkout"
            element={
              <Checkout cart={cart}/>
            }
          />
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forget-password" element={<ForgotPasswordPage />} />
          <Route path="/userprofile" element={<ProtectedPage />}>
            <Route path="/userprofile" element={<Userprofilepage />} />
            <Route
              path="/userprofile/createrecipe"
              element={<CreateRecipe />}
            />
            <Route
              path="/userprofile/editprofile"
              element={<EditProfilePage />}
            />
          </Route>
          <Route path="/viewprofilepage/:id" element={<ViewOthersProfile />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
