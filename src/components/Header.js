import React from 'react';

import Logo from '../material/logo_eng.jpeg';
import '../stylesheet/header.scss';

const Header = ({ isVisible, noheader, onheader }) => {
  if (window.location.pathname !== '/') return null;
  return (
    // <React.Fragment>
    //   {isVisible ? (
    //     <React.Fragment>
    <div className="header">
      <img src={Logo} alt="logo" />
    </div>
    //     </React.Fragment>
    //   ) : null}
    // </React.Fragment>
  );
};

export default Header;
