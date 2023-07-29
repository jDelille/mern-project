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
  <div className='current-user-box'>
   <Avatar
    src={picturePath || '/images/placeholder.png'}
    alt='profile-picture'
    userId={_id}
   />
   <h1>{username}</h1>
  </div>
 );
}

const CurrentUserBox = React.memo(CurrentUserBoxComponent);


export default CurrentUserBox;