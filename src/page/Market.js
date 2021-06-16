import React from 'react';
import { Route, Link } from 'react-router-dom';
import '../stylesheet/market.scss';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Logo from '../material/logo_eng.jpeg';

const Market = ({ isVisible, noheader, onheader }) => {
  // if (isVisible === false) {
  //   onheader();
  // }
  return (
    <div>
      <div className="header">
        <Link to="/sell_your_mind_research">
          <img src={Logo} alt="logo" />
        </Link>
      </div>

      <div className="market-layout">
        <h4>판매 중인 관념입니다.</h4>
        <Link to="/d41">000</Link>
        <Link to="/d40">000</Link>
        {/* <Link to="/sell/d39">000</Link> */}
        <Link to="/d38">000</Link>
        <Link to="/d37">000</Link>
        <Link to="/d36">000</Link>
        <Link to="/d35">000</Link>
        <Link to="/d34">000</Link>
        <Link to="/d33">000</Link>
        <Link to="/d32">000</Link>
        <Link to="/d31">000</Link>
        <Link to="/d30">000</Link>
        <Link to="/d29">000</Link>
        <Link to="/d28">000</Link>
        <Link to="/d27">000</Link>
        <Link to="/d26">000</Link>
        <Link to="/d25">000</Link>
        <Link to="/d24">000</Link>
        <Link to="/d23">000</Link>
        <Link to="/d22">000</Link>
        <Link to="/d21">000</Link>
        <Link to="/d20">000</Link>
        <Link to="/d19">000</Link>
        <Link to="/d18">000</Link>
        <Link to="/d17">000</Link>
        <Link to="/d16">000</Link>
        <Link to="/d15">000</Link>
        <Link to="/d14">000</Link>
        <Link to="/d13">000</Link>
        <Link to="/d12">000</Link>
        <Link to="/d11">000</Link>
        <Link to="/d10">000</Link>
        <Link to="/d9">000</Link>
        <Link to="/d8">000</Link>
        <Link to="/d7">000</Link>
        <Link to="/d6">000</Link>
        <Link to="/d5">000</Link>
        <Link to="/d4">000</Link>
        <Link to="/d3">어린왕자</Link>
        <Link to="/d2">가장 슬펐던 날</Link>
        <Link to="/d1">지구의 질감</Link>
      </div>
    </div>
  );
};

export default Market;
