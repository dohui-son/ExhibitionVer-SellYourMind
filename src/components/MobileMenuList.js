import React from "react";
import { Link } from "react-router-dom";

import "../stylesheet/menu.scss";

const MobileMenuList = ({ isOpen, close }) => {
  return (
    <React.Fragment>
      {isOpen ? (
        <React.Fragment>
          {/* <div className="menuOverlay" onClick={close} /> */}
          <div className="menu">
            <div className="content">
              <Link to="/">Home</Link>
              <Link to="/auth">LogIn</Link>
              <Link to="/mypage">MyPage</Link>
              <Link to="/market">Market</Link>
              <Link to="/sell">Sell Your Mind</Link>
            </div>
            
            <div className="buttonWrap">
              <button onClick={close}>close</button>
            </div>
            <div className="menuOverlay" onClick={close} />
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};
export default MobileMenuList;
