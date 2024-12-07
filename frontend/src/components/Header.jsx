import React, { useState } from "react";
import Nav from "./Nav";
import logo from "/logo.svg";
import { useAuth } from "../contexts/AuthContext";
import { apiStart } from "../../api";
import MobileNav from "./MobileNav";

const Header = ({items}) => {
  const [hideLeft, setHideLeft] = useState("-left-[1000px]");
  const { isAuthenticated, userObj, checkTokenValidity } = useAuth();
  const menuItems = ["recipes", "minimart", "about", "contact"];

  const onOpen = () => {
    setHideLeft("left-0");
  };
  const onClose = () => {
    setHideLeft("-left-[1000px]");
  };

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    checkTokenValidity();
  };

  return (
    <>
      <div className="max-[900px]:hidden">
        <Nav
          menuItems={menuItems}
          Logo={logo}
          userProfile={userObj}
          onLogout={handleLogout}
          items={items}
        />
      </div>
      <div className="min-[900px]:hidden">
        <MobileNav
          menuItems={menuItems}
          Logo={logo}
          userProfile={userObj}
          onLogout={handleLogout}
          items={items}
        />
      </div>
    </>
  );
};

export default Header;
