import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

const Gameend = () => {
  const { gametype, setGameType } = useGlobalContext();
  const { gamescore, setGameScore } = useGlobalContext();

  let score = 0,
    oppscore = 0;

  const status = () => {
    if (gametype == "m") {
      if (score === oppscore) {
        return (
          <div>
            <div>
              <h1 className="head1"> Multiplayer</h1>
              <br />
              <h1 className="draw"> DRAW </h1>
              <p className="urscore"> You have a total score of: {gamescore}</p>
              <p className="urscore"> Your opponent scored: {oppscore}</p>
            </div>
            <Link className="nounder" to="/home">
              <button> &lt; Return </button>
            </Link>
          </div>
        );
      }
      if (score > oppscore) {
        return (
          <div>
            <div>
              <h1 className="head1"> Multiplayer</h1>
              <br />
              <h1 className="vic"> YOU WIN! </h1>
              <p className="urscore"> You have a total score of: {gamescore}</p>
              <p className="urscore"> Your opponent scored: {oppscore}</p>
            </div>
            <Link className="nounder" to="/home">
              <button> &lt; Return </button>
            </Link>
          </div>
        );
      }
      if (score < oppscore) {
        return (
          <div>
            <div>
              <h1 className="head1"> Multiplayer</h1>
              <br />
              <h1 className="lost"> YOU LOST! </h1>
              <p className="urscore"> You have a total score of: {score}</p>
              <p className="urscore"> Your opponent scored: {oppscore}</p>
            </div>
            <Link className="nounder" to="/home">
              <button> &lt; Return </button>
            </Link>
          </div>
        );
      }
    }

    if (gametype == "s") {
      return (
        <div>
          <div>
            <br />
            <h1 className="head1">Singleplayer</h1>
            <br />
            <p className="urscore"> You have a total score of: {gamescore}</p>
          </div>
          <Link className="nounder" to="/home">
            <button> &lt; Return </button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <span className="inline">
        <img className="logo" src="./src/images/logo.png" />
        <p className="header">OUTCOME</p>
      </span>
      {status()};
    </div>
  );
};

export default Gameend;
