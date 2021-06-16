import React from 'react';

import Logo from '../material/logo_eng.jpeg';
import '../stylesheet/header.scss';

const Header = () => {
  return (
    <div>
      <img src={Logo} alt="logo" />
    </div>
  );
};

export default Header;
