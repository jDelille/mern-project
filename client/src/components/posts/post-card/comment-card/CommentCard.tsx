import { Comment } from 'types/@Comment';
import Avatar from '../../../../ui/avatar/Avatar';
import { FaGlobeAmericas } from 'react-icons/fa'
import './CommentCard.scss';
import { createdAtFormatter } from '../../../../utils/date';
import { useMemo } from 'react';
import PostCardFooter from '../post-card-footer/PostCardFooter';
import { useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';

type Props = {
 comment: Comment
}

const Comment: React.FC<Props> = ({ comment }) => {

 const currentUser = useSelector((state: AppState) => state.user)
 const token = useSelector((state: AppState) => state.token)

 const {
  name,
  username,
  avatar,
  createdAt,
  body,
  likes,
  comments,

  postId,

 } = comment;

 const commentCreationDate = useMemo(() => {
  return createdAtFormatter(createdAt);
 }, [createdAt]);

 return (
  <div className='comment-card'>
   <div className='comment-header'>
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
     <span>{commentCreationDate}</span>
    </div>
   </div>
   <div className='comment-body'>
    <p>{body}</p>
   </div>
   <PostCardFooter
    postId={postId}
    token={token as string}
    currentUserId={currentUser?._id as string}
    likes={likes}
    comments={comments}
   />
  </div>
 );
}

export default Comment;