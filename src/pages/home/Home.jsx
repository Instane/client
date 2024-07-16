import "./Home.css";
import Navbar from "../navbar/Navbar.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import axios from "axios";
import { useGlobalContext } from "../../context/globalContext.jsx";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { IPCONFIG } = useGlobalContext();
  
  const { data: gamesData } = useFetch(`${IPCONFIG}/games/getAmount/${user.username}`);
  const { data: highestScoreData } = useFetch(`${IPCONFIG}/games/getHighestScore/${user.username}`);
  const { data: mostPlayedData } = useFetch(`${IPCONFIG}/games/getMostPlayed/${user.username}`);

  const [updateRank, setUpdateRank] = useState();
  const [totalGames, setTotalGames] = useState();
  const [highestScore, setHighestScore] = useState();
  const [mostPlayedCategory, setMostPlayedCategory] = useState();

  useEffect(() => {
    if (gamesData) {
      setTotalGames(gamesData.gameCount);
    }
  }, [gamesData]);

  useEffect(() => {
    if (highestScoreData) {
      setHighestScore(highestScoreData.highestScore);
    }
  }, [highestScoreData]);

  useEffect(() => {
    if (mostPlayedData) {
      setMostPlayedCategory(mostPlayedData.mostPlayedCategory);
    }
  }, [mostPlayedData]);

  useEffect(() => {
    if (totalGames > 19) {
      setUpdateRank("s")
    } else if (totalGames > 39) {
      setUpdateRank("g")
    } else {
      setUpdateRank("b")
    }
  const updatedRank = async (username, rank) => {
    try {
      const res = await axios.put(`${IPCONFIG}/users/updaterank/${username}`, { rank });
      console.log(res.data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (user && user.username) {
    updatedRank(user.username, updateRank);
  }
}, [user, updateRank]);

  const ranks = () => {
    if (user.rank || updateRank === 'b') {
      return (
        <div>
          <img className="ranklogo" src="./src/images/bronze.png" alt="Bronze Rank" />
        </div>
      );
    } else if (user.rank || updateRank === 's') {
      return (
        <div>
          <img className="ranklogo" src="./src/images/silver.png" alt="Silver Rank" />
        </div>
      );
    } else if (user.rank || updateRank === 'g') {
      return (
        <div>
          <img className="ranklogo" src="./src/images/gold.png" alt="Gold Rank" />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Navbar />
      <span className="inline">
        <img className="logo" src="./src/images/logo.png" alt="Logo" />
        <div>
          <p className="header">HOMEPAGE</p>
          <p className="subhead">
            Welcome {user.username}
          </p>
        </div>
      </span>
      <div>
        <span className="inline">
          <div className="datablocks">
            <p className="blockheader">GAME DETAILS</p>
            <li>Total Games: {totalGames !== null ? totalGames : (gamesLoading ? "Loading..." : "No data")}</li>
            <li>Your Highest Score: {highestScore !== null ? highestScore : (highestScoreLoading ? "Loading..." : "No data")}</li>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div className="datablocks">
            <div className="rank-wrapper">
              <p className="blockheaders1">CURRENT LEAGUE</p>
              {ranks(user.rank)}
            </div>
          </div>
        </span>
        <div className="bigdatablocks">
          <span>
            <p className="blockheader w">YOUR MOST PLAYED CATEGORY</p>
            <h2 className="header w">{mostPlayedCategory !== null ? mostPlayedCategory : (mostPlayedLoading ? "Loading..." : "No data")}</h2>
          </span>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
