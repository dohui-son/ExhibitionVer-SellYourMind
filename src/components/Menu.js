import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import menu from "../stylesheet/menu.scss";
import MobileMenuList from "./MobileMenuList";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => {
    setIsOpen(false);
  };
  return (
    <div className="menu-overlay">
      <div className="menus">
        <Link to="/">Home</Link>
        <Link to="/auth">LogIn</Link>
        <Link to="/mypage">MyPage</Link>
        <Link to="/market">Market</Link>
        <Link to="/sell">Sell Your Mind</Link>
      </div>
      <div className="menu-button" onClick={setIsOpen}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
      <MobileMenuList isOpen={isOpen} close={close} />
    </div>
  );
};

export default Menu;
