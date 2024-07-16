import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import Selection from "./pages/selection/Selection";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Profile from "./pages/profile/Profile";
import History from "./pages/history/History";
import Topic from "./pages/topic/Topic";
import Gameplay from "./pages/game/Gameplay";
import Gameend from "./pages/Gameend";
import ProtectedRoutes from "./util/ProtectedRoutes";
import PublicRoute from "./util/PublicRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoutes/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/gameplay" element={<Gameplay />} />
          <Route path="/gameend" element={<Gameend />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
