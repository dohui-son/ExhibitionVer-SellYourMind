import React from 'react';
import { Route, Link } from 'react-router-dom';
import '../stylesheet/market.scss';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Logo from '../material/logo_eng.jpeg';

const Market = ({ isVisible, noheader, onheader }) => {
  // if (isVisible === false) {
  //   onheader();
  // }
  return (
    <div>
      <div className="header">
        <Link to="/sell_your_mind_research">
          <img src={Logo} alt="logo" />
        </Link>
      </div>

      <div className="market-layout">
        <h4>사고思考, 사고.</h4>

        <div className="title">
          살 수 있다면,{' '}
          <div className="gray">누군가의 관념·감정·한숨·비밀·꿈도...</div>
        </div>
        <div className="table">
          <div className="contents">
            Written<div className="bolded">Painted</div>
          </div>
          <div className="line" />

          <div className="line" />
          <div className="contents">
            <Link to="/w1">서울</Link>
            <div className="bolded">
              <Link to="/d32">009</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w0">낙하하는 저녁</Link>
            <div className="bolded">
              <Link to="/d38">003</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w2">모닝콜</Link>
            <div className="bolded">
              {' '}
              <Link to="/d19">023</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w3">메스꺼움</Link>
            <div className="bolded">
              <Link to="/d7">035</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w4">게으름</Link>
            <div className="bolded">
              <Link to="/d42">222</Link>
            </div>
          </div>
          <div className="line" />

          <div className="contents">
            <Link to="/w5">nostalgic</Link>
            <div className="bolded">
              <Link to="/d36">005</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w6">gone with the wind</Link>
            <div className="bolded">
              <Link to="/d43">001</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w7">소유욕 이기심 그 사이</Link>
            <div className="bolded">
              <Link to="/d21">021</Link>
            </div>
          </div>
          {/* <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/sell/d39">000</Link>
            </div>
          </div> */}

          <div className="line" />
          <div className="contents">
            <Link to="/w8">나이</Link>
            <div className="bolded">
              <Link to="/d31">010</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w9">무대공포증</Link>
            <div className="bolded">
              <Link to="/d4">004</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w10">섬유유연제</Link>
            <div className="bolded">
              <Link to="/d22">020</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w11">sns</Link>
            <div className="bolded">
              {' '}
              <Link to="/d37">038</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            <Link to="/w11">남사친 버킷리스트</Link>
            <div className="bolded">
              <Link to="/d34">007</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            사랑의 질감
            <div className="bolded">
              <Link to="/d11">031</Link>
            </div>
          </div>

          <div className="line" />
          <div className="contents">
            ADHD
            <div className="bolded">
              <Link to="/d20">022</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            코엘료, 연금술사
            <div className="bolded">
              <Link to="/d30">011</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            버지니아 울프
            <div className="bolded">
              <Link to="/d29">012</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            편두통
            <div className="bolded">
              <Link to="/d28">013</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            인상주의에서 픽셀까지
            <div className="bolded">
              <Link to="/d27">014</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            밀키스
            <div className="bolded">
              <Link to="/d41">000</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            인천에서 솜사탕 그리고 빨간 등대
            <div className="bolded">
              <Link to="/d26">015</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            불안과 적중
            <div className="bolded">
              <Link to="/d25">016</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            단색화
            <div className="bolded">
              <Link to="/d24">017</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            이른 저녁식사
            <div className="bolded">
              <Link to="/d23">018</Link>
            </div>
          </div>

          <div className="line" />
          <div className="contents">
            새벽 산보
            <div className="bolded">
              <Link to="/d18">024</Link>
            </div>
          </div>

          <div className="line" />
          <div className="contents">
            벌Bee
            <div className="bolded">
              <Link to="/d9">033</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            외사랑
            <div className="bolded">
              <Link to="/d33">008</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            어른의 맛
            <div className="bolded">
              <Link to="/d16">026</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            봄
            <div className="bolded">
              <Link to="/d15">027</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            과일식감
            <div className="bolded">
              <Link to="/d17">025</Link>
            </div>
          </div>

          <div className="line" />
          <div className="contents">
            얄팍함
            <div className="bolded">
              <Link to="/d13">029</Link>
            </div>
          </div>

          <div className="line" />
          <div className="contents">
            공부
            <div className="bolded">
              <Link to="/d12">030</Link>
            </div>
          </div>

          <div className="line" />
          <div className="contents">
            hide and seek
            <div className="bolded">
              <Link to="/d40">002</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            폴스미스
            <div className="bolded">
              <Link to="/d10">032</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            종합사탕
            <div className="bolded">
              <Link to="/d8">034</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            가장 슬픈 날
            <div className="bolded">
              <Link to="/d6">036</Link>
            </div>
          </div>

          <div className="line" />
          <div className="contents">
            겨울
            <div className="bolded">
              <Link to="/d5">037</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            어린왕자
            <div className="bolded">
              <Link to="/d3">0d3</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            동시
            <div className="bolded">
              <Link to="/d2">0d3</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            헌옷수거함
            <div className="bolded">
              <Link to="/d14">028</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            지구의 질감
            <div className="bolded">
              <Link to="/d1">0d1</Link>
            </div>
          </div>
        </div>

        {/* <div className="footer">
          <p>whole project by ARTIST DOHUI SON .</p>
          <h4>Copyright &copy; 2021 손도희 DOHUI SON All rights reserved . </h4>
        </div> */}
        <Footer />
      </div>
    </div>
  );
};

export default Market;
