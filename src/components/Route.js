import React from "react";
import { Route } from "react-router-dom";
import Home from "../page/Home";
import Auth from "../page/Auth";
import MyPage from "../page/MyPage";
import Market from "../page/Market";
import Sell from "../page/Sell";

const Route = () => {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/mypage" component={MyPage} />
    <Route path="/market" component={Market} />
    <Route path="sell" component={Sell}/>
    </div>
  );
};

export default Route;
