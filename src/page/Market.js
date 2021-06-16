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
        <Link to="/d41">001</Link>
        <Link to="/d40">002</Link>
        {/* <Link to="/sell/d39">000</Link> */}
        <Link to="/d38">003</Link>
        <Link to="/d37">004</Link>
        <Link to="/d36">005</Link>
        <Link to="/d34">007</Link>
        <Link to="/d33">008</Link>
        <Link to="/d32">009</Link>
        <Link to="/d31">010</Link>
        <Link to="/d30">011</Link>
        <Link to="/d29">012</Link>
        <Link to="/d28">013</Link>
        <Link to="/d27">014</Link>
        <Link to="/d26">015</Link>
        <Link to="/d25">016</Link>
        <Link to="/d24">017</Link>
        <Link to="/d23">018</Link>
        <Link to="/d22">020</Link>
        <Link to="/d21">021</Link>
        <Link to="/d20">022</Link>
        <Link to="/d19">023</Link>
        <Link to="/d18">024</Link>
        <Link to="/d17">025</Link>
        <Link to="/d16">026</Link>
        <Link to="/d15">027</Link>
        <Link to="/d14">028</Link>
        <Link to="/d13">029</Link>
        <Link to="/d12">030</Link>
        <Link to="/d11">031</Link>
        <Link to="/d10">032</Link>
        <Link to="/d9">033</Link>
        <Link to="/d8">034</Link>
        <Link to="/d7">035</Link>
        <Link to="/d6">036</Link>
        <Link to="/d5">037</Link>
        <Link to="/d4">038</Link>
        <Link to="/d3">어린왕자</Link>
        <Link to="/d2">가장 슬펐던 날</Link>
        <Link to="/d1">지구의 질감</Link>{' '}
      </div>
    </div>
  );
};

export default Market;
