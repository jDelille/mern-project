import { useDispatch, useSelector } from 'react-redux';
import './PostCardMenu.scss';
import { AppState } from 'types/@AppState';
import { deletePost } from '../../../../state';

type Props = {
 postId: string;
}

const PostCardMenu: React.FC<Props> = ({ postId }) => {

 const dispatch = useDispatch();
 const token = useSelector((state: AppState) => state.token);

 const handleDeletePost = async () => {
  try {
   const response = await fetch(`http://localhost:3001/posts/${postId}`, {
    method: 'DELETE',
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });
   if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
   }

   dispatch(deletePost(postId));
  } catch (error) {
   console.error('Error deleting post:', error);

  }
 }

 return (
  <div>
   <p onClick={handleDeletePost}>Delete</p>
  </div>
 );
}

export default PostCardMenu;