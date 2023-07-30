import extractMentions from '../../../utils/extractMentions';
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

 const mentionedUsernames = extractMentions(body);

 const renderPostBodyWithLinks = (postBody: string, mentionedUsernames: any) => {
  const parts = postBody?.split(/(@\w+)/g);

  return parts?.map((part, index) => {
   if (mentionedUsernames.includes(part.slice(1))) {
    return (
     <a href={`/user/${part.slice(1)}`} key={index} className='tagged-username'>
      {part}
     </a>
    );
   } else {
    return <span key={index}>{part}</span>;
   }
  });
 };

 const renderedPostBody = renderPostBodyWithLinks(body, mentionedUsernames);


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
   <p className='body'>{renderedPostBody}</p>
  </div>
 );
}

export default PostCard;