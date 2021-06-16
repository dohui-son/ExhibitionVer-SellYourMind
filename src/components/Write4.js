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
        <h4>게으름</h4>꽃잎처럼 부푼 반면 자그마하지만 힘이 있고 세심하게 나오는
        면이 있다. 세심하게 나있으면서도 갑작스레 나온 수정들과 달리 부푼면은
        성길지 않고 화려하기만 하다. 세심한 부분의 면을 숨기기위해서 부푼걸까
        아니면 그부분으로부터 자라난걸까. 성가시게 생겼다. 신기하고 이상하지만
        마냥 싫지만은 않도록 성가시다. 난 귀찮아하는 것이 많다. 그에 비해 걱정도
        많고 생각도 많지만 귀찮게 느껴지면 그마저도 한 번씩 손을 놔버린다.
        생각하는 것에 비해 행동은 단순하게 나가며 후회로 돌아와 생각거리를
        보충하여 굴러간다.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
