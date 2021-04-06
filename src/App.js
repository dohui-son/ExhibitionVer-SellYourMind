import logo from "./logo.svg";
// import back from '../src/img/pensil2.png';
import "../src/stylesheet/global.scss";
import Routing from "./component/Route";
import Format from "./components/Format";

const App = () => {
  return (
    <div className="fundamental">
      <Routing>
        <Format>
          <div className="drawing">
            <div className="draw">
              {/* <img src={back}className="background-img" />
        <img src={logo} className="App-logo" alt="logo" /> */}
            </div>
          </div>
          <div className="word">
            <div className="handwriting" />
          </div>
        </Format>
      </Routing>
    </div>
  );
};

export default App;
