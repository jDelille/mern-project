import { useDispatch, useSelector } from 'react-redux';
import './PostFeed.scss';
import { useEffect } from 'react';
import { setPosts } from '../../../state';
import PostCard from '../post-card/PostCard';
import { Post } from '../../../types/@Post';
import { AppState } from 'types/@AppState';

type Props = {
 username?: string;
 isProfile?: boolean;
}

const PostFeed: React.FC<Props> = ({ username, isProfile = false }) => {
 const dispatch = useDispatch();
 const posts = useSelector((state: AppState) => state.posts);
 // const token = useSelector((state) => state.token);

 const getPosts = async () => {
  const response = await fetch("http://localhost:3001/posts", {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  data.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  dispatch(setPosts({ posts: data }));
 };

 const getUserPosts = async () => {
  const response = await fetch(
   `http://localhost:3001/posts/${username}/posts`,
   {
    method: "GET",
    headers: { "Content-Type": "application/json" },
   }
  );
  const data = await response.json();
  data.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
     body={post.body}
     name={post.name}
     username={post.username}
     avatar={post.avatar}
     createdAt={post.createdAt}
     likes={post.likes}
     postId={post._id}
     picturePath={post.picturePath}
     comments={post.comments}
     post={post}
    />
   ))}
  </div>
 );
}

export default PostFeed;