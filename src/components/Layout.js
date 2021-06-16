import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import Menu from './Menu';
import Footer from './Footer';
import Header from './Header';
import '../stylesheet/layoutContainer.scss';

const Layout = ({ children }) => {
  const [isVisible, setVisible] = useState(true);
  const noheader = () => {
    setVisible(true);
  };
  const onheader = () => {
    setVisible(true);
  };
  if (!isVisible) return null;

  return (
    <div>
      {/* <Link to="/">
        <Header isVisible={isVisible} noheader={noheader} onheader={onheader} />
      </Link> */}
      {/* <Menu /> */}
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
