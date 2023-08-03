import extractMentions from '../../../utils/extractMentions';
import Avatar from '../../../ui/avatar/Avatar';
import { FaGlobeAmericas } from 'react-icons/fa'
import { useEffect, useMemo, useState } from 'react';
import { createdAtFormatter } from '../../../utils/date';
import { useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';
import { Comment } from 'types/@Comment';
import PostCardFooter from './post-card-footer/PostCardFooter';
import CommentCard from './comment-card/CommentCard';
import { Post } from 'types/@Post';

import './PostCard.scss';


type Props = {
 post: Post
 isPostPage?: boolean;
}

const PostCard: React.FC<Props> = ({ post, isPostPage }) => {

 const currentUser = useSelector((state: AppState) => state.user)
 const token = useSelector((state: AppState) => state.token)

 const [postComments, setPostComments] = useState<Comment[]>([])


 const { body, username, avatar, name, createdAt, likes, _id, picturePath, comments, } = post

 const getPostComments = async () => {
  try {
   const response = await fetch(`http://localhost:3001/comments/${comments}`);

   if (response.ok) {
    const commentsData = await response.json();
    setPostComments(commentsData)
   }
  } catch (error) {
   console.log(error)
  }
 }

 useEffect(() => {
  getPostComments();
 }, [])

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
  <>
   <div className={isPostPage || comments.length < 1 ? 'bordered-post-card' : 'post-card'} >
    {comments.length >= 1 && !isPostPage && (
     <div className='comment-line'></div>
    )}
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
     postId={_id}
     token={token as string}
     currentUserId={currentUser?._id as string}
     likes={likes}
     comments={comments}
     post={post}
    />
   </div >
   <div className='comments'>
    {!isPostPage ? (
     postComments.map((comment, i) => {
      if (i <= 1) {
       return <CommentCard key={comment._id} comment={comment} hasSecondComment={comments.length > 1} isLastComment={i === 1} has3OrMoreReplies={comments.length >= 3} index={i} totalComments={comments.length} isOnlyComment={comments.length === 1} />
      }
     })
    ) : (
     postComments.map((comment) => (
      <CommentCard key={comment._id} comment={comment} totalComments={comments.length} isPostPage />
     ))
    )}

   </div>
  </>

 );
}

export default PostCard;