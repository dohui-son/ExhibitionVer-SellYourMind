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
        <h4>title</h4>난 보기보다 달리기를 잘 해왔다. 운동성 천식이 있음에도
        뛰는 건 포기 못 해 항상 막힘없이 뛰었다. 수행평가 중 오래달리기는 내가
        가장 좋아하는 종목이었다. 내 체력을 생각해 뛰는 속력을 조절해야 하고
        호흡, 정신도 같이 조절해야 한다. 처음에는 친구들 모두와 출발한다 가볍게
        조깅하듯이. 호흡을 조절하고 조금은 투박하게 그렇지만 연결되도록 자연스레
        뛴다. 느리다고 느껴 질 수 있지만 마음을 다독인다. 나를 믿고 뛰다보면
        어느새 반 친구들은 포기한체 걷고 있다. 포기하지 않는다. 또 숨이 턱
        끝까지 차오르며 다리는 점점 무감각하고 몸이 무거워진다. 버티다 버텨
        마지막 끝 50미터를 질주하여 마치고 나면 그제서야 아침 새들의 지저귐이
        들려온다.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
