import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import RegisterPage from './scenes/registerPage';
import Navbar from './components/navbar/Navbar';


function AppRouter() {
  const location = useLocation();
  const hiddenNavbarPaths = ['/login', '/register'];
  const hideNavbar = hiddenNavbarPaths.includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />
      </Routes>
    </>
  );
}


function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;