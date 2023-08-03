
import PostCard from "../../components/posts/post-card/PostCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "types/@Post";
import './PostPage.scss';

const PostPage: React.FC = () => {
 const { postId } = useParams();

 const [post, setPost] = useState<Post>()

 console.log(postId)

 const getPost = async () => {
  const response = await fetch(`http://localhost:3001/posts/${postId}`, {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  setPost(data)
 };


 useEffect(() => {
  getPost();
 }, [])

 if (!post) {
  return null;
 }

 return (
  <div className="post-page-content">
   <PostCard post={post as Post} isPostPage />
  </div>
 );
}

export default PostPage;