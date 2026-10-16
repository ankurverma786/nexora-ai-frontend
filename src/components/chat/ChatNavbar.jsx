
import { useNavigate } from "react-router-dom";

function ChatNavbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <span>
        Nexora Ai <i className="fa-solid fa-chevron-down"></i>
      </span>

      <div className="authButtons">
        {isLoggedIn ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>
              Login
            </button>
            <button onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatNavbar;
