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
        <h4>낙하하는 저녁</h4>돌아갈 장소가 없었어.​ 담담하게, 슬쩍 웃으면서
        그렇게 얘기한 하나코의 말이 얼마나 쓸쓸하게 울렸을지, 나는 추운 밤
        산사의 종소리만큼이나 분명하게 알 수 있었다. '어서 와' 만 해도 그렇게
        청명하게 울린다. 하나코의 말에는 군더더기가 하나도 없다. "돌아갈장소가
        없다고, 지금도 그런 생각하고 있을까요." ......바로 옆에 있는데도, 그
        사실을 의식하게 하지 않는 사람이었다. 살아 있음의 거추장스러움이 없는
        사람, 생기가 없다는 뜻에 아주 가깝다. 그러면서도 음침한 느낌은 없고,
        오히려 건조하고 밝다. 예를 들어, 같이 텔레비전을 보면서도 난 곁에 그녀가
        있다는 느낌이 들지 않는다. 옆에 새 구두가 한 켤레 놓여있는, 그런 느낌.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
