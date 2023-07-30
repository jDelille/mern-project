import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../ui/avatar/Avatar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CurrentUserBox.scss';


const CurrentUserBoxComponent: React.FC = () => {

 const [user, setUser] = useState(null);
 const navigate = useNavigate();
 const token = useSelector((state) => state.token);
 const currentUser = useSelector((state) => state.user);

 if (!currentUser) {
  return null;
 }

 const {
  _id,
  firstName,
  lastName,
  username,
  location,
  viewedProfile,
  followers,
  following,
  impressions,
  picturePath
 } = currentUser

 return (
  !currentUser ? (
   <div className='no-current-user'>
    <p>Login to follow profiles or hashtags, favorite, share and reply to posts. You can also interact from your account on a different server.</p>
   </div>
  ) : (
   <div className='current-user-box'>
    <div className='user'>
     <Avatar
      src={picturePath || '/images/placeholder.png'
      }
      alt='profile-picture'
      userId={_id}
     />
     <div className='display-name'>
      <span>{username}</span>
      <a href={`/profile/${_id}`}>My profile</a>
     </div>
    </div>
   </div >

  )
 );
}

const CurrentUserBox = React.memo(CurrentUserBoxComponent);


export default CurrentUserBox;