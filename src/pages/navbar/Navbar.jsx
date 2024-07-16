import "./Navbar.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";

const Navbar = () => {
  const { currentpage, setCurrentPage } = useGlobalContext();

  return (
    <div className="navbar">
      <div className="navarea">
        <span className="startbutton">
          <Link to="/selection">
            <img
              className="playbutton"
              src="./src/images/play.png"
              alt="Play"
            />
          </Link>
          <p className="iconname">Start</p>
        </span>
      </div>
      <div className="iconarea">
        <div className="icons">
          <Link
            onClick={() => setCurrentPage(1)}
            className="nounder"
            to="/home"
          >
            <div className="icon-wrapper">
              <img className="icon" src="./src/images/home.png" alt="Home" />
              <p className="iconname">HOMEPAGE</p>
              {currentpage === 1 && <div className="highlight"></div>}
            </div>
          </Link>
          <Link
            onClick={() => setCurrentPage(2)}
            className="nounder"
            to="/history"
          >
            <div className="icon-wrapper">
              <img
                className="icon2"
                src="./src/images/checklist.png"
                alt="History"
              />
              <p className="iconname">HISTORY</p>
              {currentpage === 2 && <div className="highlight"></div>}
            </div>
          </Link>
        </div>
        <div className="icons">
          <Link
            onClick={() => setCurrentPage(3)}
            className="nounder"
            to="/leaderboard"
          >
            <div className="icon-wrapper">
              <img
                className="icon3"
                src="./src/images/chart.png"
                alt="Leaderboard"
              />
              <p className="iconname">LEADERBOARD</p>
              {currentpage === 3 && <div className="highlight"></div>}
            </div>
          </Link>
          <Link
            onClick={() => setCurrentPage(4)}
            className="nounder"
            to="/profile"
          >
            <div className="icon-wrapper">
              <img
                className="icon4"
                src="./src/images/profile.png"
                alt="Profile"
              />
              <p className="iconname">PROFILE</p>
              {currentpage === 4 && <div className="highlight"></div>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
