import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state";

const Navbar = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const user = useSelector((state: any) => state.user)

 const handleLogin = () => {
  navigate('/login')
 }
 const handleRegister = () => {
  navigate('/register')
 }
 return (
  <nav>
   {user ? (
    <>
     <div>{user.username}</div>
     <button onClick={() => dispatch(setLogout())}>
      Log Out</button>
    </>
   ) : (
    <>
     <div onClick={handleLogin}>Login</div>
     <div onClick={handleRegister}>Sign up</div>
    </>


   )}

  </nav >
 );
}

export default Navbar;