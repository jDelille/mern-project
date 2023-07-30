import { useSelector } from 'react-redux';
import PostFeed from '../../components/posts/post-feed/PostFeed';
import './ProfilePage.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import FeedHeader from '../../components/feed-header/FeedHeader';

const ProfilePage: React.FC = () => {
 const token = useSelector((state) => state.token);
 const [user, setUser] = useState(null);
 const { userId } = useParams();

 const getUser = async () => {
  const response = await fetch(`http://localhost:3001/users/${userId}`, {
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
    <PostFeed userId={userId as string} isProfile />

   </div>


  </div>
 );
}

export default ProfilePage;