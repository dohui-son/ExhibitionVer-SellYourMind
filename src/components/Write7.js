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
        <h4>소유욕 이기심 그사이</h4>‘내것’에 대한 집착이 생각보다 심했다.
        이유는 잘 모르겠다. 타인이 나의 물건에 손을 댈 때 마다 눈에 거슬렸다.
        이기심인 것 같기도 하다. 다른 사람에 비해서 집착이 높다는 건 시간이
        흐르면서 스스로 깨달았다. 자기 보호적인 태도가 갈 수록 튀어나왔고
        자기합리화만 하기 일쑤였다. 집착을 하면 할 수록 공허함만이 올라왔다.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
