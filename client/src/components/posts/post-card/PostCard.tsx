import extractMentions from '../../../utils/extractMentions';
import Avatar from '../../../ui/avatar/Avatar';
import { FaGlobeAmericas } from 'react-icons/fa'
import { useMemo } from 'react';
import './PostCard.scss';
import { createdAtFormatter } from '../../../utils/date';

type Props = {
 body: string;
 username: string;
 name: string;
 avatar: string;
 createdAt: string;
}

const PostCard: React.FC<Props> = ({ body, username, avatar, name, createdAt }) => {

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

 const renderPostBodyWithLinks = (postBody: string, mentionedUsernames: string[]) => {
  const parts = postBody?.split(/(@\w+)/g);

  return parts?.map((part, index) => {
   if (mentionedUsernames.includes(part.slice(1))) {
    return (
     <a href={`/profile/${part.slice(1)}`} key={index} className='tagged-username'>
      {part}
     </a>
    );
   } else {
    return <span key={index}>{part}</span>;
   }
  });
 };

 const renderedPostBody = renderPostBodyWithLinks(body, mentionedUsernames);

 const postCreationDate = useMemo(() => {
  return createdAtFormatter(createdAt);
 }, [createdAt]);


 return (
  <div className='post-card'>
   <div className='post-card-header'>
    <Avatar
     src={avatar}
     alt='profile-image'
     username={username}
    />
    <div className='display-name'>
     <p className='username'>{name}</p>
     <span>@{username}</span>
    </div>

    <div className='post-info'>
     <FaGlobeAmericas color="#606984" size
      ={14} />
     <span>{postCreationDate}</span>
    </div>
   </div>
   <p className='body'>{renderedPostBody}</p>
  </div>
 );
}

export default PostCard;