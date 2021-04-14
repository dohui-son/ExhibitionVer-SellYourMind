import React from "react";
import "./stylesheet/global.scss";
import { Route } from "react-router-dom";
import Home from "./page/Home";
import Auth from "./page/Auth";
import MyPage from "./page/MyPage";
import Market from "./page/Market";
import Sell from "./page/Sell";
import Layout from "./components/Layout";

const App = () => {
  return (
    <div className="global">
      <Layout>
        <Route path="/" component={Home} exact={true} />
        <Route path="/auth" component={Auth} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/market" component={Market} />
        <Route path="/sell" component={Sell} />
      </Layout>
    </div>
  );
};

export default App;
