import { Comment } from 'types/@Comment';
import Avatar from '../../../../ui/avatar/Avatar';
import { FaGlobeAmericas } from 'react-icons/fa'
import { createdAtFormatter } from '../../../../utils/date';
import { useMemo } from 'react';
import PostCardFooter from '../post-card-footer/PostCardFooter';
import { useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';
import { FaRegComment } from 'react-icons/fa'

import './CommentCard.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
 comment: Comment
 hasSecondComment?: boolean;
 isLastComment?: boolean;
 has3OrMoreReplies?: boolean;
 index?: number
 totalComments?: number;
 isPostPage?: boolean;
 isOnlyComment?: boolean;
}

const Comment: React.FC<Props> = ({ comment, hasSecondComment, isLastComment, has3OrMoreReplies, index, totalComments, isPostPage, isOnlyComment }) => {
 const navigate = useNavigate();

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
  <div className={index === 1 || isOnlyComment ? 'bottom-border-comment-card' : isPostPage ? 'bordered-comment-card' : 'comment-card'}>
   {hasSecondComment && has3OrMoreReplies && (
    <div className='comment-line'></div>
   )}
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

   {has3OrMoreReplies && isLastComment && (
    <div className='view-all-comments'>
     <div className='icon'>
      <FaRegComment size={14} color="#4a4de7" />
     </div>
     <p onClick={() => navigate(`/post/${postId}`)}>View all {totalComments} replies</p>
    </div>
   )}
  </div>
 );
}

export default Comment;