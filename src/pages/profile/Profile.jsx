import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {

  const [conpass, setConPass] = useState();
  const [edit, setEdit] = useState(true);
  const { loading, error, dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [credentials, setCredentials] = useState ({
    email: undefined,
    password: undefined
  })
  const [questions, setQuestions] = useState ({
    question: undefined,
    questiontype: undefined,
    category: undefined,
    ans: undefined,
    ans1: undefined,
    ans2: undefined,
    ans3: undefined,
  })
  const [showQuestions, setShowQuestions] = useState(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleQuestion = (e) => {
    setQuestions((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const createQuestion = async () => {
    try {
      const res = await axios.post("http://localhost:8800/questions", questions)
      alert("Question has been created!")
    } catch (err) {
      alert(err)
    }
  }

  const verify = async () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!credentials.password || !conpass) {
        alert("Please enter the required information.");
      } else if (!credentials.email || !re.test(credentials.email)) {
        alert("Please enter a valid email format.");
      } else if (credentials.password !== conpass) {
        alert("Passwords do not match, please try again.");
      } else {
        const token = Cookies.get("access_token");
          try {
          const res = await axios.put(
          `http://localhost:8800/users/${user._id}`,
          credentials,
          {
            headers: {
              Authorization: `Bearer ${token}`,
          },
        }
      );
    alert("You've successfully changed your data!");
    setEdit(true);
  } catch (err) {
    alert(err.message);
    }} 
  }

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGOUT"});
    alert("You are now logged out.");
  };

  const userview = (edit) => {

    if (edit) {
      return (
        <div>
          <div className="profblock">
            <div className="profblock-wrapper">
              <p className="proftext">
                Username: <span className="profdetail">{user.username}</span>
              </p>
              <p className="proftext">
                Email: <span className="profdetail">{user.email}</span>
              </p>
            </div>
          </div>
          <div className="viewbutton">
            <button className="view" onClick={() => setEdit(false)}>
              <img className="logo4" src="./src/images/edit.png" alt="Edit" />
              <p className="logtext">Edit Details</p>
            </button>
            <Link className="nounder" to="/">
              <button className="view" onClick={handleClick}>
                <img className="logo4" src="./src/images/exit.png" alt="Exit" />
                <p className="logtext">Logout</p>
              </button>
            </Link>
          </div>
          <div>
          {user.username === "admin" && (
            <button className="view w" onClick={() => setShowQuestions(!showQuestions)}>Create Questions</button>
          )}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="profblock">
            <div className="profblock-wrapper">
              <p className="proftext">
                Username: <p className="profdetail">{user.username}</p>
              </p>
              <p className="proftext">
                Email:
                <input
                  id="email"
                  type="text"
                  className="edit"
                  placeholder="e.g. John123@example.com"
                  onChange={handleChange}
                />
              </p>
              <p className="proftext">
                Password:
                <input
                  id="password"
                  type="password"
                  className="edit"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </p>
              <p className="proftext">
                Confirm Password:
                <input
                  type="password"
                  className="edit"
                  placeholder="Confirm new password"
                  onChange={(e) => setConPass(e.target.value)}
                />
              </p>
            </div>
          </div>
          <div className="viewbutton">
            <button type="button" className="editbutton" onClick={verify}>
              <p className="logtext">Save</p>
            </button>
            <button
              type="button"
              className="editbutton"
              onClick={() => setEdit(true)}
            >
              <p className="logtext">Cancel</p>
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className={`profile-container ${showQuestions ? 'background-change' : ''}`}>
      <Navbar />
      <div className="inline">
        <img className="logo" src="./src/images/logo.png" alt="Logo" />
        <div>
          <p className="header">ACCOUNT DETAILS</p>
        </div>
      </div>
      <div>
        <img
          className="userlogo"
          src="./src/images/profpic.png"
          alt="Profile"
        />
        <h3 className="userprof">YOUR USER PROFILE</h3>
      </div>
      {userview(edit)}
      </div>
      {showQuestions && (
        <div>
          <div className="model-overlay">
          <h2 className="texttop">Create Question</h2>
          <div className="centerised">
          <p>Game Type:<select id="questiontype" className="selections" onChange={handleQuestion}>=
              <option value="t">True/False</option>
              <option value="o">Multiple Choices</option>
            </select></p>
            <p>Subject:<select id="category" className="selections" onChange={handleQuestion}>=
              <option value="g">Geography</option>
              <option value="s">Science</option>
              <option value="e">English</option>
              <option value="m">Maths</option>
              <option value="h">History</option>
            </select></p>
            <p>Question:<textarea id="question" className="forques" onChange={handleQuestion}></textarea></p>
            <p>Correct Answer:<input id="ans" type="text" className="forques w" onChange={handleQuestion}></input></p>
            <p>Alternative Answers:<input id="ans1" type="text" className="forques w" onChange={handleQuestion}></input></p>
            <p>Alternative Answers:<input id="ans2" type="text" className="forques w" onChange={handleQuestion}></input></p>
            <p>Alternative Answers:<input id="ans3" type="text" className="forques w" onChange={handleQuestion}></input></p>
            <div className="headsup">
            <p>Please enter all in lowercase letters</p>
            </div>
          </div>
          </div>
          <div className="inline w">
            <button className="damnbuttons" onClick={createQuestion}>Create</button>
            <button className="damnbuttons w" onClick={() => setShowQuestions(!showQuestions)}>Cancel</button>
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Profile;
