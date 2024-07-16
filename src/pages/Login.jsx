import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useGlobalContext } from "../context/globalContext";
import { AuthContext } from "../context/authContext"
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/home")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      alert("Invalid username or password");
    }
  };

  return (
    <div className="blockdisplay">
      <div>
        <img src="./src/images/logo.png" />
        <h1>USER LOGIN</h1>
      </div>
      <div>
        <br />
        <input
          type="text"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleClick}>LOG IN</button>
      </div>
      <div className="signuptext">
        <p>Don't have an account?</p>
        <Link className="link" to="/register">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
