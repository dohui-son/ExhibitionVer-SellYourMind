import React from "react";
import { Route, Link } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";
import "../stylesheet/layoutContainer.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Menu />
      <div className="layout-contents">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
