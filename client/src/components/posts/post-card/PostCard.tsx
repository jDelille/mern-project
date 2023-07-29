import Avatar from '../../../ui/avatar/Avatar';

import './PostCard.scss';

type Props = {
 body: string;
 username: string;
 picturePath: string;
 userId: string;
}

const PostCard: React.FC<Props> = ({ body, username, picturePath, userId }) => {

 // const dispatch = useDispatch();
 // const token = useSelector((state) => state.token);

 // const patchFriend = async () => {
 //  const response = await fetch(
 //   `http://localhost:3001/users/${_id}/${friendId}`,
 //   {
 //    method: "PATCH",
 //    headers: {
 //     Authorization: `Bearer ${token}`,
 //     "Content-Type": "application/json",
 //    },
 //   }
 //  );
 //  const data = await response.json();
 //  dispatch(setFriends({ friends: data }));
 // };

 return (
  <div className='post-card'>
   <div className='post-card-header'>
    <Avatar
     src={`http://localhost:3001/assets/${picturePath}`}
     alt='profile-image'
     userId={userId}
    />
    <div className='display-name'>
     <p className='username'>{username}</p>
     <span>@username</span>
    </div>
   </div>
   <p className='body'>{body}</p>
  </div>
 );
}

export default PostCard;