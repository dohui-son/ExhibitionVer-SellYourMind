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
    <div onheader className="market-layout">
      <div className="header">
        <img src={Logo} alt="logo" />
      </div>
      <h4>판매 중인 관념입니다.</h4>
      <Link to="/sell/d41">000</Link>
      <Link to="/sell/d40">000</Link>
      {/* <Link to="/sell/d39">000</Link> */}
      <Link to="/sell/d38">000</Link>
      <Link to="/sell/d37">000</Link>
      <Link to="/sell/d36">000</Link>
      <Link to="/sell/d35">000</Link>
      <Link to="/sell/d34">000</Link>
      <Link to="/sell/d33">000</Link>
      <Link to="/sell/d32">000</Link>
      <Link to="/sell/d31">000</Link>
      <Link to="/sell/d30">000</Link>
      <Link to="/sell/d29">000</Link>
      <Link to="/sell/d28">000</Link>
      <Link to="/sell/d27">000</Link>
      <Link to="/sell/d26">000</Link>
      <Link to="/sell/d25">000</Link>
      <Link to="/sell/d24">000</Link>
      <Link to="/sell/d23">000</Link>
      <Link to="/sell/d22">000</Link>
      <Link to="/sell/d21">000</Link>
      <Link to="/sell/d20">000</Link>
      <Link to="/sell/d19">000</Link>
      <Link to="/sell/d18">000</Link>
      <Link to="/sell/d17">000</Link>
      <Link to="/sell/d16">000</Link>
      <Link to="/sell/d15">000</Link>
      <Link to="/sell/d14">000</Link>
      <Link to="/sell/d13">000</Link>
      <Link to="/sell/d12">000</Link>
      <Link to="/sell/d11">000</Link>
      <Link to="/sell/d10">000</Link>
      <Link to="/sell/d9">000</Link>
      <Link to="/sell/d8">000</Link>
      <Link to="/sell/d7">000</Link>
      <Link to="/sell/d6">000</Link>
      <Link to="/sell/d5">000</Link>
      <Link to="/sell/d4">000</Link>
      <Link to="/sell/d3">어린왕자</Link>
      <Link to="/sell/d2">가장 슬펐던 날</Link>
      <Link to="/sell/d1">지구의 질감</Link>
    </div>
  );
};

export default Market;
