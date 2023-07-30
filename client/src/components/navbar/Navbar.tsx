import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state";
import { FaHashtag, FaFlagCheckered, FaAward, FaInfoCircle } from 'react-icons/fa'
import './Navbar.scss';
import { AppState } from "types/@AppState";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: AppState) => state.user)

  const handleLogin = () => {
    navigate('/login')
  }
  const handleRegister = () => {
    navigate('/register')
  }
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/"> Wagerly </a>
      </div>
      <ul className="primary-links">
        <li>
          <a href="/">
            <FaHashtag />
            Explore
          </a>
        </li>
        <li>
          <a href="/sportsbook">
            <FaFlagCheckered />
            Sportsbook
          </a>
        </li>
        <li>
          <a href="/leaderboard">
            <FaAward />
            Leaderboard
          </a>
        </li>
        <li>
          <a href="/about">
            <FaInfoCircle />
            About
          </a>
        </li>
      </ul>

      <ul className="auth-links">
        {currentUser ? (
          <>
            <button onClick={() => dispatch(setLogout())}>
              Log Out</button>
          </>
        ) : (
          <>
            <div onClick={handleLogin} className="auth-button">Login</div>
            <div onClick={handleRegister} className="secondary-auth-button">Sign up</div>
          </>
        )}
      </ul>


    </nav >
  );
}

export default Navbar;