import React from "react";
import { Route, Link } from "react-router-dom";
import menu from "../stylesheet/menu.scss";

const Menu = () => {
  return (
    <div className="menu-overlay">
      <div className="menus">
      <Link to="/">Home</Link>
      <Link to="/auth">LogIn</Link>
      <Link to="/mypage">MyPage</Link>
      <Link to="/market">Market</Link>
      <Link to="/sell">Sell Your Mind</Link>
      <span>메뉴</span>
      </div>
    </div>
  );
};

export default Menu;
