import { useDispatch, useSelector } from 'react-redux';
import './PostFeed.scss';
import { useEffect } from 'react';
import { setPosts } from '../../../state';
import PostCard from '../post-card/PostCard';
import { Post } from '../../../types/@Post';

type Props = {
 userId?: string;
 isProfile?: boolean;
}

const PostFeed: React.FC<Props> = ({ userId, isProfile = false }) => {
 const dispatch = useDispatch();
 const posts = useSelector((state) => state.posts);
 const token = useSelector((state) => state.token);

 console.log(posts)

 const getPosts = async () => {
  const response = await fetch("http://localhost:3001/posts", {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  dispatch(setPosts({ posts: data }));
 };

 const getUserPosts = async () => {
  const response = await fetch(
   `http://localhost:3001/posts/${userId}/posts`,
   {
    method: "GET",
    headers: { "Content-Type": "application/json" },
   }
  );
  const data = await response.json();
  dispatch(setPosts({ posts: data }));
 };

 useEffect(() => {
  if (isProfile) {
   getUserPosts();
  } else {
   getPosts();
  }
 }, []); // eslint-disable-line react-hooks/exhaustive-deps

 return (
  <div className='post-feed'>
   {posts.map((post: Post) => (
    <PostCard
     key={post._id}
     body={post.description}
     username={post.firstName}
     picturePath={post.picturePath}
     userId={post.userId}
    />
   ))}
  </div>
 );
}

export default PostFeed;