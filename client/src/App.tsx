import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import RegisterPage from './scenes/registerPage';
import Navbar from './components/navbar/Navbar';
import CurrentUserBox from './components/current-user-box/CurrentUserBox';
import LinkFooter from './components/link-footer/LinkFooter';
import SearchBar from './components/search-bar/SearchBar';
import FeedHeader from './components/feed-header/FeedHeader';
import { FaHashtag } from 'react-icons/fa'
import './scss/global.scss';

import { useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';
import Gamebar from './components/gamebar/Gamebar';
import SportsBookPage from './scenes/sportsbookPage/SportsbookPage';
import MatchPage from './scenes/matchPage/MatchPage';
import CommentModal from './components/modal/comment-modal/CommentModal';
import CreatePost from './components/create-post/CreatePost';
import PostPage from './scenes/postPage/PostPage';
import RetweetPopup from './components/popup/retweet-popup/RetweetPopup';
import QuoteRetweetModal from './components/modal/quote-retweet-modal/QuoteRetweetModal';


function AppRouter() {
  const location = useLocation();
  const hiddenSidebarPaths = ['/login', '/register'];
  const profilePathRegex = /^\/profile\/\w+$/;
  const postPathRegex = /^\/post\/\w+$/;
  const matchPathRegex = ['/sportsbook']

  const hideSidebar = hiddenSidebarPaths.includes(location.pathname);
  const currentUser = useSelector((state: AppState) => state.user)
  const hideGamebar = matchPathRegex.includes(location.pathname)
  const isProfilePage = profilePathRegex.test(location.pathname)
  const isPostPage = postPathRegex.test(location.pathname)
  const headerLabel = isProfilePage ? 'Profile' : 'Explore'

  return (
    <div className='App'>
      {!hideSidebar &&
        <div className='left-sidebar'>
          <SearchBar />
          <CurrentUserBox />

          {currentUser && (
            <>
              <CreatePost />
            </>
          )}

          <div className='link-footer-container'>
            <LinkFooter />
          </div>
        </div>
      }
      <div className='main-content'>
        <CommentModal />
        <RetweetPopup />
        <QuoteRetweetModal />
        {!hideSidebar && (
          <>
            <FeedHeader label={headerLabel} icon={FaHashtag} />
            {!isProfilePage && !hideGamebar && !isPostPage && (
              <Gamebar />
            )}
          </>
        )}

        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/profile/:username' element={<ProfilePage />} />
          <Route path='/post/:postId' element={<PostPage />} />
          <Route path='/sportsbook' element={<SportsBookPage />} />
          <Route path='/sportsbook/:matchId' element={<MatchPage />} />

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