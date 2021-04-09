import React from "react";
import "../src/stylesheet/global.scss";
import { Route } from "react-router-dom";
import Home from "../page/Home";
import Auth from "../page/Auth";
import MyPage from "../page/MyPage";
import Market from "../page/Market";
import Sell from "../page/Sell";

const App = () => {
  return (
    <div className="global">
      <Route path="/" component={Home} exact={true} />
      <Route path="/auth" component={Auth} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/market" component={Market} />
      <Route path="sell" component={Sell} />
    </div>
  );
};

export default App;
