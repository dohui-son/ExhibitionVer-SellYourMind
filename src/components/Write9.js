import React from 'react';
import LogoK from '../material/logo_k.jpeg';
import Back from '../material/back.jpeg';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import '../stylesheet/writing.scss';

const Write1 = () => {
  return (
    <div className="w-layout">
      <Link className="back" to="/sell_your_mind_research">
        <img src={LogoK} alt="logo" />
      </Link>
      <div className="text">
        <h4>무대공포증</h4> 객석이 조용해졌다. 개막 전에는 늘 긴장된다. 장내가
        어두워지고 순간의 침묵과 정적. 무대가 시작될 때의 설렘. 저 작은 공간에
        과거도 미래도, 하루하루의 생활도, 국가도, 머나먼 세상과 끝없는 우주도
        창조해낼 수 있는 세계가 기다리고 있다.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
