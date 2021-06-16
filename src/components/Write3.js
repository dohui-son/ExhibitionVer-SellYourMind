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
        <h4>메스꺼움</h4>거북하다. 이사람과는 어쩐지 불편하다, 어디라고 꼭 짚어
        말할 수는 없어도 이 사람과는 어쩐지 잘 맞지 않는다. 그렇게 속으로 느낄
        때 드러나는 표정이다. 혐오와도, 조심스러움과도 다른 본능적인 기피의
        감정이 든다.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
