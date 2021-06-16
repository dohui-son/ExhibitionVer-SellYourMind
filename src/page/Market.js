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
            나의 포인트
            <div className="bolded">
              <Link to="/d32">009</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              {' '}
              <Link to="/d19">023</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            누적수령 마스크
            <div className="bolded">
              <Link to="/d7">035</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            재활용한 마스크
            <div className="bolded">
              <Link to="/d42">222</Link>
            </div>
          </div>
          <div className="line" />

          <div className="contents">
            재활용level
            <div className="bolded">
              <Link to="/d36">005</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d43">001</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d21">021</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/sell/d39">000</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d38">003</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d31">010</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d37">004</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              {' '}
              <Link to="/d4">038</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d34">007</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d20">022</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d30">011</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d29">012</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d28">013</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d27">014</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d41">000</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d26">015</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d25">016</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d24">017</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d23">018</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d22">020</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d18">024</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d17">025</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d9">033</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d33">008</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d16">026</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d15">027</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d14">028</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d13">029</Link>
            </div>
          </div>

          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d12">030</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d11">031</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d40">002</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d10">032</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d8">034</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d6">036</Link>
            </div>
          </div>

          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d5">037</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d3">어린왕자</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d2">가장 슬펐던 날</Link>
            </div>
          </div>
          <div className="line" />
          <div className="contents">
            부족 포인트
            <div className="bolded">
              <Link to="/d1">지구의 질감</Link>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>whole project by ARTIST DOHUI SON .</p>
          <h4>Copyright &copy; 2021 손도희 DOHUI SON All rights reserved . </h4>
        </div>
      </div>
    </div>
  );
};

export default Market;
