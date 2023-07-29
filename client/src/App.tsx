import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import RegisterPage from './scenes/registerPage';
import Navbar from './components/navbar/Navbar';
import CurrentUserBox from './components/current-user-box/CurrentUserBox';
import LinkFooter from './components/link-footer/LinkFooter';
import './scss/global.scss';


function AppRouter() {
  const location = useLocation();
  const hiddenSidebarPaths = ['/login', '/register'];
  const hideSidebar = hiddenSidebarPaths.includes(location.pathname);

  return (
    <div className='App'>
      {!hideSidebar &&
        <div className='left-sidebar'>
          <CurrentUserBox />

          <div className='link-footer-container'>
            <LinkFooter />
          </div>
        </div>
      }
      <div className='main-content'>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
      </div>

      {!hideSidebar &&
        <div className='right-sidebar'>
          <Navbar />
        </div>
      }
    </div>
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