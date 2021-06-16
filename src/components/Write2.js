import React from 'react';
import LogoK from '../material/logo_k.jpeg';
import Back from '../material/back.jpeg';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import '../stylesheet/writing.scss';

const Write2 = () => {
  return (
    <div className="w-layout">
      <Link className="back" to="/sell_your_mind_research">
        <img src={LogoK} alt="logo" />
      </Link>
      <div className="text">
        <h4>모닝콜</h4>자취생의 아침 아침 알람이 울렸다. 반사적으로 일어나
        반짝이는 휴대폰에 손을 뻗었다. 부스스한 머리가 눈 앞을 가려 더듬거리며
        알람을 껐다. 커튼 틈새로 뵈는 밖이 어렴풋이 밝다. 건물 뒤로 보이는
        회색빛 두꺼운 구름이 하늘을 가득 메우고 있다. 벽에 붙은 옛날 영화
        포스터, 기다란 프랑스식 창문은 내가 이집에서 가장 좋아하는 부분이다.
      </div>
      <Footer />
    </div>
  );
};

export default Write2;
