import React from "react";
import { Route, Link } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Menu />
      <Footer />
    </div>
  );
};
//structure
export default Layout;
