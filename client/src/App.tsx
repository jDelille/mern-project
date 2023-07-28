import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import RegisterPage from './scenes/registerPage';


function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
        <Routes>
          <Route path='/home' element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
