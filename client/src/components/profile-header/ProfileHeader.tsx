import { User } from 'types/@User';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../ui/avatar/Avatar';
import { BsPersonFillAdd } from 'react-icons/bs'
import { MdCircleNotifications } from 'react-icons/md';

import './ProfileHeader.scss';
import { useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';
import { FaEdit } from 'react-icons/fa';

const ProfileHeader: React.FC = () => {

 const [user, setUser] = useState<User>()
 const { username } = useParams();

 const currentUser = useSelector((state: AppState) => state.user)


 const getUser = async () => {
  const response = await fetch(`http://localhost:3001/users/${username}`, {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  setUser(data);
  // dispatch(setUsers({ posts: data }))
 }

 useEffect(() => {
  getUser();
 }, [])

 return (
  <div className='profile-header'>
   <div className='cover-image'>

   </div>

   <div className='user-info'>
    <div className='user'>
     <Avatar
      src={user?.avatar || '/images/placeholder.png'}
      alt='profile picture'
      username={user?.username}
     />
     <div className='display-name'>
      <strong>{user?.name}</strong>
      <span>@{user?.username}</span>
     </div>

     <div className='location'>
      <img src="/images/usa-flag.png" alt="usa-flag" />
      <p>Scottsdale, United States</p>
     </div>
    </div>

    <div className='bio'>
     <p>{user?.bio}</p>
    </div>
    {/* 
    <div className='socials'>
     <div className="social">
      <FaTwitter size={16} />
      @bucks4dawin
     </div>
    </div> */}

    <div className='specialties'>
     <div className='specialties-label'>
      <strong>Specialties</strong>
      <span>Edit</span>
     </div>

     <ul >
      {user?.specialties.map((league, i) => (
       <li key={i}>{league}</li>
      ))}
     </ul>
    </div>

    <div className='user-stats'>
     <ul>
      <li>Followers 0</li>
      <li>Following 0</li>
      <li>Bets 0</li>
      <li>Wins 0</li>
      <li>Losses 0</li>
     </ul>
    </div>

    <div className='action-buttons'>
     {currentUser?.username !== username ? (
      <>
       <div className='btn'>
        <BsPersonFillAdd color="#3273dc" size={14} />
        <p>Follow</p>
       </div>
       <div className='btn'>
        <MdCircleNotifications color="#3273dc" size={15} />
        <p>Turn on notifications</p>
       </div>
      </>
     ) : (
      <div className='btn'>
       <FaEdit color="#3273dc" size={14} />
       <p>Edit profile</p>
      </div>

     )}
    </div>






   </div>
  </div>
 );
}

export default ProfileHeader;