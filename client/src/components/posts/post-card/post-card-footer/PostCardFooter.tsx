import { useDispatch } from "react-redux";
import { setPost } from "../../../../state";
import { AiFillStar } from 'react-icons/ai';

import './PostCardFooter.scss';

type LikesObject = {
 [userId: string]: boolean;
}

type Props = {
 postId: string;
 token: string;
 currentUserId: string;
 likes: LikesObject;
}



const PostCardFooter: React.FC<Props> = ({ postId, token, currentUserId, likes }) => {

 const dispatch = useDispatch();
 const likeCount = Object.keys(likes).length;
 const isLiked = Boolean(likes[currentUserId])


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


 return (
  <div className="post-card-footer">
   <div className="like">
    <AiFillStar onClick={patchLike} color={isLiked ? '#4a4de7' : "#606984"} size={18} />
    <p>{likeCount}</p>
   </div>

  </div>
 );
}

export default PostCardFooter;