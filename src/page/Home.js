import React from "react";
import home_img from "../material/home_img.jpeg";
import "../stylesheet/home.scss";

const Home = () => {
  return (
    <div className="home-layout">
      <span>홈 안녕하세요</span>
      <span>dkdkdkdk</span>
      <img src={home_img} alt="background_img" />
      <span>dkdkdkdk</span>
      <span>dkdkdkdk</span>
      <span>dkdkdkdk</span>
    </div>
  );
};

export default Home;
