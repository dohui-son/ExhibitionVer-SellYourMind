import React from "react";
import Rout from "./Rout";
import { Route, Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/auth">LogIn</Link>
      <Link to="/mypage">MyPage</Link>
      <Link to="/market">Market</Link>
      <Link to="/sell">Sell Your Mind</Link>
      <Rout></Rout>
    </div>
  );
};

export default Menu;
