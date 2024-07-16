import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

const Register = () => {
  const [conpass, setConPass] = useState();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
    rank: "b",
    total_game: 0,
    total_wins: 0,
    total_lose: 0
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const verify = async (e) => {
    e.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!credentials.username || !credentials.password || !credentials.email || !conpass) {
      alert("Please enter the required information.")
    } else if (!re.test(credentials.email)) {
      alert("Please enter a valid email format.")
    } else if (conpass != credentials.password) {
      alert("You have entered two different password.")
    } else {
      try {
        const res = await axios.post("http://192.168.1.4:8080/auth/register", credentials);
        alert("You are now registered.")
        navigate("/")
    } catch (err) {
        alert(err)
    }
    }
    
  }

  return (
    <div className="blockdisplay">
      <img src="./src/images/logo.png" />
      <h1> User Registration </h1>
      <div>
        <br />
        <input
          id="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          id="email"
          placeholder="Email Address"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          value={conpass}
          onChange={(e) => setConPass(e.target.value)}
        />
        <button className="register" onClick={verify}>
          REGISTER
        </button>
        <div className="signuptext">
          <p>Already have an existing account?</p>
          <Link className="link" to="/">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
