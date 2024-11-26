import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import ChatBox from "./components/ChatBox";
import UserForm from "./components/UserForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Xbjgt7ZM4to?si=DJqR2a1Vd4pBL4ja"
          title="YouTube video player"
          allow="autoplay; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
          className="fullscreen-video"
        ></iframe>
        <ChatBox></ChatBox>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
