import extractMentions from '../../../utils/extractMentions';
import Avatar from '../../../ui/avatar/Avatar';
import { useEffect, useMemo, useState } from 'react';
import { createdAtFormatter } from '../../../utils/date';
import { useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';
import { Comment } from 'types/@Comment';
import PostCardFooter from './post-card-footer/PostCardFooter';
import CommentCard from './comment-card/CommentCard';
import { Post } from 'types/@Post';
import { BiDotsVertical } from 'react-icons/bi'
import renderPostBodyWithLinks from '../../../utils/renderPostBodyWithLinks';

import './PostCard.scss';
import PostCardMenu from './post-card-menu/PostCardMenu';
import { User } from 'types/@User';
import { useNavigate } from 'react-router-dom';



type Props = {
 post: Post
 isPostPage?: boolean;
}

const PostCard: React.FC<Props> = ({ post, isPostPage }) => {
 const [postComments, setPostComments] = useState<Comment[]>([])
 const [user, setUser] = useState<User>();

 const navigate = useNavigate();

 const currentUser = useSelector((state: AppState) => state.user)

 const { body, username, avatar, name, createdAt, likes, _id, picturePath, comments, quoteBody, retweeter } = post

 console.log(post)

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
 }, [post])

 const getUser = async () => {
  const response = await fetch(`http://localhost:3001/users/${retweeter}`, {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  setUser(data);
  // dispatch(setUsers({ posts: data }))
 }

 useEffect(() => {
  if (post) {
   getUser();
  }
 }, [])

 const mentionedUsernames = extractMentions(body);

 const renderedPostBody = renderPostBodyWithLinks(body, mentionedUsernames)

 const mentionedQuoteUsernames = extractMentions(quoteBody);

 const renderedQuoteBody = renderPostBodyWithLinks(quoteBody, mentionedQuoteUsernames)

 const postCreationDate = useMemo(() => {
  return createdAtFormatter(createdAt);
 }, [createdAt]);

 const isRetweetedPost = post.isRetweet || post.isQuoteRetweet

 let postContent = (
  <div className={isPostPage || comments.length < 1 ? 'bordered-post-card' : 'post-card'}  >
   {comments.length >= 1 && !isPostPage && (
    <div className='comment-line'></div>
   )}
   <div className='post-card-header'>
    {isRetweetedPost ? (
     <Avatar
      src={user?.avatar || '/images/placeholder.png'}
      alt='profile-image'
      username={user?.username}
     />
    ) : (
     <Avatar
      src={avatar || '/images/placeholder.png'}
      alt='profile-image'
      username={username}
     />
    )}

    <div className='display-name'>
     <p className='username'>{isRetweetedPost ? user?.name : name}</p>
     <span>@{isRetweetedPost ? user?.username : username}</span>
     <span>• {postCreationDate}</span>
    </div>
    <div className='post-info'>
     <BiDotsVertical color="#606984" size
      ={20} />
     <PostCardMenu postId={post?._id} />
    </div>
   </div>
   <div className='body'>
    {post.isQuoteRetweet && (
     <p>{renderedQuoteBody}</p>
    )}

    {!post.isRetweet && !post.isQuoteRetweet && (
     <p>{renderedPostBody}</p>
    )}
   </div>
   {post.isQuoteRetweet && (
    <div className='retweeted-post' onClick={() => navigate(`/post/${post.originalPost}`)}>
     <div className='retweeted-post-header'>
      <Avatar
       src={avatar || '/images/placeholder.png'}
       alt='profile-image'
       username={username}
      />
      <div className='display-name'>
       <p className='username'>{name}</p>
       <span>@{username}</span>
       <span>• {postCreationDate}</span>
      </div>
     </div>
     <div className='retweeted-post-body'>
      <p>{post.body}</p>
      {picturePath && (
       <div className='retweeted-image'>
        <img src={picturePath} alt="" />
       </div>
      )}
     </div>

    </div>
   )}
   {post.isRetweet && (
    <div className='retweeted-post'>
     <div className='retweeted-post-header'>
      <Avatar
       src={avatar || '/images/placeholder.png'}
       alt='profile-image'
       username={username}
      />
      <div className='display-name'>
       <p className='username'>{name}</p>
       <span>@{username}</span>
       <span>• {postCreationDate}</span>
      </div>
     </div>
     <div className='retweeted-post-body'>
      <p>{post.body}</p>
      {picturePath && (
       <div className='retweeted-image'>
        <img src={picturePath} alt="" />
       </div>
      )}
     </div>

    </div>
   )}
   {picturePath && !post.isRetweet && (
    <div className='image'>
     <img src={picturePath} alt="" />
    </div>
   )}
   <PostCardFooter
    postId={_id}
    currentUserId={currentUser?._id as string}
    likes={likes}
    comments={comments}
    post={post}
   />
  </div >
 )

 if (isPostPage) {
  postContent = (
   <div className={isPostPage || comments.length < 1 ? 'bordered-post-card' : 'post-card'} >
    <div className='post-card-header'>
     {isRetweetedPost ? (
      <Avatar
       src={user?.avatar || '/images/placeholder.png'}
       alt='profile-image'
       username={user?.username}
      />
     ) : (
      <Avatar
       src={avatar || '/images/placeholder.png'}
       alt='profile-image'
       username={username}
      />
     )}
     <div className='display-name'>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
       <p className='username'>{isRetweetedPost ? user?.name : name}</p>
       <span>@{isRetweetedPost ? user?.username : username}</span>
      </div>
     </div>
     <div className='post-info'>

     </div>
    </div>
    <div className='post-page-body'>
     {post.isQuoteRetweet && (
      <p>{renderedQuoteBody}</p>
     )}

     {!post.isRetweet && !post.isQuoteRetweet && (
      <p>{renderedPostBody}</p>
     )}
    </div>
    {picturePath && (
     <div className='image'>
      <img src={picturePath} alt="" />
     </div>
    )}

    {post.isQuoteRetweet && (
     <div className='post-page-retweeted-post'>
      <div className='retweeted-post-header'>
       <Avatar
        src={avatar || '/images/placeholder.png'}
        alt='profile-image'
        username={username}
       />
       <div className='display-name'>
        <p className='username'>{name}</p>
        <span>@{username}</span>
        <span>• {postCreationDate}</span>
       </div>
      </div>
      <div className='retweeted-post-body'>
       <p>{post.body}</p>
       {picturePath && (
        <div className='retweeted-image'>
         <img src={picturePath} alt="" />
        </div>
       )}
      </div>

     </div>
    )}

    <div className='timestamp'>
     12:36PM - 8/2/23
    </div>

    <div className='post-stats'>
     <div> <strong>3</strong> Rewteets</div>
     <div><strong>26</strong> Reactions </div>
    </div>

    <PostCardFooter
     postId={_id}
     currentUserId={currentUser?._id as string}
     likes={likes}
     comments={comments}
     post={post}
    />
   </div>
  )
 }


 return (
  <>
   {postContent}
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