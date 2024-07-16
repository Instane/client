import "./History.css";
import { useContext, useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Matches = ({ category, gametype, score, createdAt }) => {
  return (
    <div className="bigdatablocks2">
      <div className="bigdatablocks-wrapper">
        <div className="inlinefont">
          <p className="hisfont1">{category}</p>
          <p className="hisfont2 w">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <p className="hisfont3">{gametype}</p>
        <p className="hisfont2">Score: {score}</p>
      </div>
    </div>
  );
};

const History = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchGameByPlayer = async (username) => {
      try {
        const res = await axios.get(`http://192.168.1.4:8080/games/getByPlayer/${username}`);
        setMatches(res.data);
      } catch (err) {
        console.error('Error fetching game data:', err);
      }
    };

    fetchGameByPlayer(user.username);
  }, [user.username]);

  return (
    <div>
      <Navbar />
      <div>
      <span className="inline">
        <img className="logo" src="./src/images/logo.png" alt="Logo" />
        <div>
          <p className="header">HISTORY</p>
        </div>
      </span>
        <div className="matches-container">
          {matches.map((match, index) => (
            <Matches
              key={index}
              category={match.category}
              status={match.status}
              gametype={match.gametype}
              score={match.score}
              createdAt={match.createdAt}
            />
          ))}
          {matches == null ? (
            <h2>No matches found.</h2>
            ) : (
          <ul>
          </ul>
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default History;
