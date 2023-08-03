import { useDispatch, useSelector } from "react-redux";
import { setActivePost, setPost, setPostId } from "../../../../state";
import { FaRegComment, FaFire, FaRetweet, FaShare } from 'react-icons/fa'
import './PostCardFooter.scss';
import useCommentModal from "../../../../hooks/useCommentModal";
import { Post } from "types/@Post";
import { AppState } from "types/@AppState";

type LikesObject = {
 [userId: string]: boolean;
}

type Props = {
 postId: string;
 currentUserId: string;
 likes: LikesObject;
 comments: string[];
 post?: Post
}



const PostCardFooter: React.FC<Props> = ({ postId, currentUserId, likes, comments, post }) => {


 const dispatch = useDispatch();
 const token = useSelector((state: AppState) => state.token)
 const commentModal = useCommentModal();

 const isLiked = Boolean(likes[currentUserId]);
 const likeCount = Object.keys(likes).length;

 const patchLike = async () => {
  const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
   method: 'PATCH',
   headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
   },
   body: JSON.stringify({ userId: currentUserId })
  })

  const updatedPost = await response.json();
  dispatch(setPost({ post: updatedPost }))
 }

 const handleRetweet = async () => {
  try {
   const response = await fetch(`http://localhost:3001/posts/${postId}/retweet`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, },
    body: JSON.stringify({ userId: currentUserId }),
   })

   const data = await response.json();
   dispatch(setPost({ post: data }))

  } catch (error) {
   console.log(error)
  }
 }

 const openCommentModal = () => {
  dispatch(setPostId({ postId: postId }))
  dispatch(setActivePost({ activePost: post }))

  commentModal.onOpen();
 }



 return (
  <div className="post-card-footer">
   <div className="control">
    <FaRegComment onClick={openCommentModal} color="#606984" size={15} />
    <p>{comments.length}</p>
   </div>
   <div className="control">
    <FaRetweet onClick={handleRetweet} color="#606984" size={18} />
   </div>
   <div className="control">
    <FaFire onClick={patchLike} color={isLiked ? '#e2434b' : "#606984"} size={15} />
    <p>{likeCount}</p>
   </div>
   {/* <div className="control">
    <FaBookmark onClick={patchLike} color="#606984" size={16} />
   </div> */}
   <div className="control">
    <FaShare onClick={patchLike} color="#606984" size={15} />
   </div>
  </div>
 );
}

export default PostCardFooter;