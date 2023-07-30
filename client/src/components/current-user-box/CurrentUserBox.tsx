import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../ui/avatar/Avatar';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AppState } from 'types/@AppState';

import './CurrentUserBox.scss';

const CurrentUserBoxComponent: React.FC = () => {

 // const [user, setUser] = useState(null);
 // const navigate = useNavigate();
 // const token = useSelector((state: AppState) => state.token);
 const currentUser = useSelector((state: AppState) => state.user);

 if (!currentUser) {
  return (
   <div className='no-current-user'>
    <p>Login to follow profiles or hashtags, favorite, share and reply to posts. You can also interact from your account on a different server.</p>
   </div>
  );
 }

 const {
  username,
  avatar,
 } = currentUser

 return (
  <div className='current-user-box'>
   <div className='user'>
    <Avatar
     src={avatar || '/images/placeholder.png'
     }
     alt='profile-picture'
     username={username}
    />
    <div className='display-name'>
     <span>{username}</span>
     <a href={`/profile/${username}`}>My profile</a>
    </div>
   </div>
  </div >
 )
}
const CurrentUserBox = React.memo(CurrentUserBoxComponent);


export default CurrentUserBox;