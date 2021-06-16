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
        <h4>나이는 항상 7살</h4>운동회, 하고 싶은거 다하는 삶을 살거야. 뚱땅뚱땅
        어설픈 발걸음은 당차다. 뒷모습에서 초등학교 운동회에서의 활기가 잠깐
        보였다. 허공에 휘두르는 팔에 주먹을 꽉 진 손이 인상적이다. 여러 사람,
        여러 목표가 보인다. 다채로운 사람들. 모두 저마다의 활기를 갖고 숲을
        이룬다. 나도 다시 시작해볼까 기지개를 피어본다. 마냥 어리게 보겠지.
        하지만 돌아,돌아 나이를 먹어도, 치매가 찾아와도, 가슴속에 동요는 흐르고.
        점점 어려지는 우리 할머니도 그렇겠지.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
