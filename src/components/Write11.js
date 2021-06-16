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
        <h4>sns</h4>실제로 어떤 일이 있었는지를 안다는 건 결코 있을 수 없는
        일이구나, 그렇게 생각했습니다. 그렇게 보면 신문 기사나 교과서에 실린
        연ㄱ사는 극히 대략적인, 최대공약수의 정보구나 하고요. / 장소와 상대방에
        따라서 자기를 내보이는 방식이 달라져요. 정도의 차이만 있을 뿐, 누구든
        그런 부분이 있거든요. / 나쁜 짓을 한 사람을 비난할 수 있는 건 피해를
        당한 당사자뿐이죠. 어째서 무관한 사람들 까지 '그럼 나도 돌을 던져도
        상관없겠지'생각하는 거죠? 도무지 이해가 안 돼요.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
