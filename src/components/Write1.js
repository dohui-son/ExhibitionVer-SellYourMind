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
        <h4>서울</h4>외로움은 항상 몇 발자국 떨어져 함께 있다. 사람들과 함께
        있더라도 그것이 나에게 다가오는 일은 별난 일이 아니다. 수시로 나를 또
        찾아오고 나는 또 힘들어한다. 동떨어져 길을 걷는 느낌이 들고 나만 이런
        걸까 하는 조바심. 뭐 외로웠다가도 금새 일상으로 돌아가는게 연속이지
        않겠어하는 생각과 함께 치부해버리고는 커피 한 모금. 스탠드불에 커피만이
        날 지탱해준 밤은 길고 긴데 빛 바랜 소설책은 바스락거릴 뿐이다.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
