import extractMentions from '../../../utils/extractMentions';
import Avatar from '../../../ui/avatar/Avatar';
import { FaGlobeAmericas } from 'react-icons/fa'
import { useMemo } from 'react';
import './PostCard.scss';
import { createdAtFormatter } from '../../../utils/date';
import { useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';
import PostCardFooter from './post-card-footer/PostCardFooter';

type LikesObject = {
 [userId: string]: boolean;
}

type Props = {
 body: string;
 username: string;
 name: string;
 avatar: string;
 createdAt: string;
 likes: LikesObject;
 postId: string;
 picturePath?: string;
}

const PostCard: React.FC<Props> = ({ body, username, avatar, name, createdAt, likes, postId, picturePath }) => {
 const currentUser = useSelector((state: AppState) => state.user)
 const token = useSelector((state: AppState) => state.token)

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
     <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p className='username'>{name}</p>
      <span>@{username}</span>
     </div>

    </div>

    <div className='post-info'>
     <FaGlobeAmericas color="#606984" size
      ={14} />
     <span>{postCreationDate}</span>
    </div>
   </div>
   <div className='body'>
    <p>{renderedPostBody}</p>
   </div>

   {picturePath && (
    <div className='image'>
     <img src={picturePath} alt="" />
    </div>
   )}



   <PostCardFooter
    postId={postId}
    token={token as string}
    currentUserId={currentUser?._id as string}
    likes={likes}
   />

  </div>
 );
}

export default PostCard;