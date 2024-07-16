import "./Gameplay.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useGlobalContext } from "../../context/globalContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Gameplay = () => {

  const { topictype } = useGlobalContext();
  const { data, loading, error } = useFetch(`http://192.168.1.4:8080/questions/getCategoryType?category=${topictype}`);

  const [question, setQuestion] = useState(1);
  const [givenQuestion, setGivenQuestion] = useState("");
  const [typeno, setTypeno] = useState("");
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ans4, setAns4] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [seconds, setSeconds] = useState(60);
  const [score, setScore] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const { gametype, setGameScore } = useGlobalContext();
  const [multiplier,setMultiplier] = useState(1);
  const [index, setIndex] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);
  const [prevans, setPrevAns] = useState("");
  const { user } = useContext(AuthContext);
  const [gameItems, setGameItems] = useState({
    gametype: undefined,
    category: undefined,
    player: undefined,
    opplayer: undefined,
    status: undefined,
    score: undefined,
    oppscore: undefined,
  });

  const navigate = useNavigate();

  const topicname = (name) => {
    switch (topictype) {
      case "g":
        return "Geography";
      case "e":
        return "English";
      case "m":
        return "Maths";
      case "h":
        return "History";
      case "s":
        return "Science";
    }
    return name
  };

  const gameType = (name) => {
    switch (gametype) {
      case "s":
        return "Singleplayer";
      case "m":
        return "Multiplayer";
    }
    return name
  };

  useEffect(() => {
    if (question > 10) {
      setGameItems((prevItems) => ({
        ...prevItems,
        gametype: gameType(),
        score: score,
        player: user.username,
        category: topicname()
      }));
      setGameScore(score)
    } else if (data && !loading && !error) {
      fetchQuestion();
    }
  }, [question, data, loading, error]);

  useEffect(() => {
    if (gameItems.player) {
      handleData();
    }
  }, [gameItems]);

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      next();
    }
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleData = async () => {
    try {
      await axios.post("http://192.168.1.4:8080/games/createGame", gameItems);
      navigate("/gameend");
    } catch (err) {
      alert("Something went wrong.");
      navigate("/home");
    }
  };

  const fetchQuestion = async () => {
    if (data && !loading && !error) {
      const questionData = data[randomIndex];
      setGivenQuestion(questionData.question);
      setTypeno(questionData.questiontype);
      const shuffledAnswers = shuffleAnswers(questionData.ans, questionData.ans1, questionData.ans2, questionData.ans3);
      setAns1(shuffledAnswers[0]);
      setAns2(shuffledAnswers[1]);
      setAns3(shuffledAnswers[2]);
      setAns4(shuffledAnswers[3]);
    }
  };

  const shuffleAnswers = (ans1, ans2, ans3, ans4) => {
    const answers = [ans1, ans2, ans3, ans4];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === data[randomIndex].ans) {
        setIndex(i);
      }
    }
    return answers;
  };

  const next = () => {
    if (typeno === "t") {
      if (selectedButton === "ans1" && data[randomIndex].ans === "true") {
        setScore((prevscore) => Math.floor((prevscore + 1) * multiplier));
        setMultiplier((prevmult) => prevmult + 0.1)
      } else if (selectedButton === "ans2" && data[randomIndex].ans === "false") {
        setScore((prevscore) => Math.floor((prevscore + 1) * multiplier));
        setMultiplier((prevmult) => prevmult + 0.1)
      }
    } else {
      if (index === 0 && selectedButton === "ans1") {
        setScore((prevscore) => Math.floor((prevscore + 1) * multiplier));
        setMultiplier((prevmult) => prevmult + 0.1)
        setPrevAns("");
      } else if (index === 1 && selectedButton === "ans2") {
        setScore((prevscore) => Math.floor((prevscore + 1) * multiplier));
        setMultiplier((prevmult) => prevmult + 0.1)
        setPrevAns("");
      } else if (index === 2 && selectedButton === "ans3") {
        setScore((prevscore) => Math.floor((prevscore + 1) * multiplier));
        setMultiplier((prevmult) => prevmult + 0.1)
        setPrevAns("");
      } else if (index === 3 && selectedButton === "ans4") {
        setScore((prevscore) => Math.floor((prevscore + 1) * multiplier));
        setMultiplier((prevmult) => prevmult + 0.1)
        setPrevAns("");
      } else {
        setPrevAns(data[randomIndex].ans);
        setMultiplier(1)
      }
    }
    setRandomIndex((prevIndex) => prevIndex + 1);
    setQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedButton(null);
    setIsSelected(false);
    setSeconds(60);
  };

  const handleAnswerClick = (answer) => {
    setSelectedButton(answer);
    setIsSelected(true);
  };

  const questiontype = (typeno) => {
    if (typeno === "t") {
      return (
        <div>
          <div className="topheading">
            <button
              id="ans1"
              className={`datablocks4 ${selectedButton === "ans1" ? "selected" : ""}`}
              onClick={() => handleAnswerClick("ans1")}
            >
              <p className="wrapper">True</p>
            </button>
            <button
              id="ans2"
              className={`datablocks4 ${selectedButton === "ans2" ? "selected" : ""}`}
              onClick={() => handleAnswerClick("ans2")}
            >
              <p className="wrapper">False</p>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="topheading">
            <button
              id="ans1"
              className={`datablocks4 ${selectedButton === "ans1" ? "selected" : ""}`}
              onClick={() => handleAnswerClick("ans1")}
            >
              <p className="wrapper">{ans1}</p>
            </button>
            <button
              id="ans2"
              className={`datablocks4 ${selectedButton === "ans2" ? "selected" : ""}`}
              onClick={() => handleAnswerClick("ans2")}
            >
              <p className="wrapper">{ans2}</p>
            </button>
          </div>
          <div className="topheading">
            <button
              id="ans3"
              className={`datablocks4 ${selectedButton === "ans3" ? "selected" : ""}`}
              onClick={() => handleAnswerClick("ans3")}
            >
              <p className="wrapper">{ans3}</p>
            </button>
            <button
              id="ans4"
              className={`datablocks4 ${selectedButton === "ans4" ? "selected" : ""}`}
              onClick={() => handleAnswerClick("ans4")}
            >
              <p className="wrapper">{ans4}</p>
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div>
        <img src="./src/images/logo.png" alt="logo" />
        <p className="item">{topicname()}</p>
      </div>
      <div>
        <p className="question">Time Left: {seconds} seconds left</p>
        <p className="question">QUESTION {question}:</p>
        <div className="givenques">
          <p>{givenQuestion}</p>
        </div>
        {questiontype(typeno)}
      </div>
      <div className="botheading">
        <p className="question">Your current score: {score}
        <p>The previous answer was: {prevans}</p>
        </p>
        <div>
          {isSelected ? (
            <button onClick={next}>Next &gt;</button>
          ) : (
            <button className="done">Next &gt;</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
