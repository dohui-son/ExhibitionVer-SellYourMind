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
        <h4>섬유유연제</h4>맑은 하늘이 뜨면 먼저 하는 생각은 빨래. 나의 옷에
        보이지 않는 색을 빨아 깨끗이하는 과정은 귀찮지만 빨래향기는 안정감을
        준다. 저절로 나오는 콧노래는 이웃의 귀를 생각해 참아 보지만 그것도 잠시,
        자꾸자꾸 흥얼거림이 터져나와 버린다. 오랜만에 바꾼 섬유유연제 향이
        마음에 들어 기분이 좋다. 보이지 않는 향이 두둥실. 내 바로 앞에
        놓여있다는 걸 안다. 포근하다. 코를 파묻어 마구 부비고 미소 짓는다.
        낮잠에 들것만 같은 나른한 기분. 나른한 건 뽀송한 빨래 때문인가
        햇살때문인가.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
