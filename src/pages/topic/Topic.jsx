import "./Topic.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";

const Topic = () => {
  const { topictype, setTopicType } = useGlobalContext();
  
  return (
    <div>
      <div className="header1">
        <Link className="test" to={-1}>
          <img className="logo1" src="./src/images/arrow.png" />
        </Link>
      </div>
      <span className="inline2">
        <img className="logo2" src="./src/images/logo.png" />
        <p className="header">TOPIC SELECTION</p>
      </span>
      <div>
        <span className="inline1">
          <div className="datablocks2">
            <Link onClick={() => setTopicType("m")} className="nounder" to="/gameplay">
              <div className="datablock-wrapper1">
                <img className="topiclogo" src="./src/images/maths.png" />
                <p className="underlogo"> Maths </p>
              </div>
            </Link>
          </div>
          <div className="datablocks2">
            <Link onClick={() => setTopicType("e")} className="nounder" to="/gameplay">
              <div className="datablock-wrapper1">
                <img className="topiclogo2" src="./src/images/english.png" />
                <p className="underlogo"> English </p>
              </div>
            </Link>
          </div>
        </span>
        <div>
          <span className="inline1">
            <div className="datablocks2">
              <Link onClick={() => setTopicType("s")} className="nounder" to="/gameplay">
                <div className="datablock-wrapper1">
                  <img className="topiclogo2" src="./src/images/science.png" />
                  <p className="underlogo"> Science </p>
                </div>
              </Link>
            </div>
            <div className="datablocks2">
              <Link onClick={() => setTopicType("h")} className="nounder" to="/gameplay">
                <div className="datablock-wrapper1">
                  <img className="topiclogo2" src="./src/images/history.png" />
                  <p className="underlogo"> History </p>
                </div>
              </Link>
            </div>
          </span>
        </div>
        <div>
          <span className="inline1">
            <div className="datablocks2">
              <Link onClick={() => setTopicType("g")} className="nounder" to="/gameplay">
                <div className="datablock-wrapper1">
                  <img
                    className="topiclogo2"
                    src="./src/images/geography.png"
                  />
                  <p className="underlogo"> Geography </p>
                </div>
              </Link>
            </div>
            <div className="datablocks2">
              <div className="datablock-wrapper1">
                <p className="underlogo2"> More coming soon... </p>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topic;
