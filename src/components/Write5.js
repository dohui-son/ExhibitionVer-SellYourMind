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
        <h4>nostalgic</h4>어린 나는 우리집 뒷 공원에서 시작한 여름의 녹음을
        사랑했다. 학교를 마친 후 아이스바를 물고 있는 나는 더위에도 즐거워한다.
        잎사귀 사이로 비친 잠깐의 눈부신 햇빛과 귀가 따가운 매미소리, 피부를
        스치는 바람들을 느끼고 집으로 돌아갈 때면 아버지께서 딸내미 왔냐며
        웃으신다. 저녁으로 어머니와 함께 준비한 된장찌개를 가족들과 식사하던 그
        시절 그 기억이 있다.
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
