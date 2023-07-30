import { useSelector } from 'react-redux';
import PostFeed from '../../components/posts/post-feed/PostFeed';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import { AppState } from 'types/@AppState';
import './ProfilePage.scss';


const ProfilePage: React.FC = () => {
 const token = useSelector((state: AppState) => state.token);
 const [user, setUser] = useState(null);
 const { username } = useParams();
 console.log(username)

 const getUser = async () => {
  const response = await fetch(`http://localhost:3001/users/${username}`, {
   method: "GET",
   headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  setUser(data);
 };


 useEffect(() => {
  getUser();
 }, []); // eslint-disable-line react-hooks/exhaustive-deps

 if (!user) return null;

 return (
  <div className='profile-page'>
   {/* <Navbar /> */}

   <div className='content'>
    <ProfileHeader />
    <PostFeed username={username} isProfile />

   </div>


  </div>
 );
}

export default ProfilePage;