import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state";
import './Navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)


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
      <ul className="nav-links">
        <li>
          <a href="/explore">Explore</a>
        </li>
        <li>
          <a href="/sportsbook">Sportsbook</a>
        </li>
        <li>
          <a href="/leaderboard">Leaderboard</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        {user ? (
          <>
            <button onClick={() => dispatch(setLogout())}>
              Log Out</button>
          </>
        ) : (
          <>
            <div onClick={handleLogin}>Login</div>
            <div onClick={handleRegister}>Sign up</div>
          </>
        )}
      </ul>
    </nav >
  );
}

export default Navbar;