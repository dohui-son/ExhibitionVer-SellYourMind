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
        <h4>남사친 버킷리스트</h4> 1, 영어 마스터하기 2, 한 팔로 턱걸이 하기 3,
        복근 만들기 4, 연애하기 5, 10억 모으기 6, 개인 블로그 운영하기 7, 혼자서
        해외여행하기 8, 책 100권 읽기 9, 피부 관리받기 10, 피아노 배우기 11,
        봉사활동하기 12, 해외로 가족여행가기 13, 나만의 요리 만들기 14, 규칙적인
        생활하기 15, 화분 기르기 16, 직접 기른 과실 먹기 17, 외국인 친구 사귀기
        18, 금연하기 19, 외국어 마스터하기
      </div>
      <Footer />
    </div>
  );
};

export default Write1;
