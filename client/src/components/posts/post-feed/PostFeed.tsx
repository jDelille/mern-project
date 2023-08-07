import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPosts } from '../../../state';
import PostCard from '../post-card/PostCard';
import { Post } from '../../../types/@Post';
import { AppState } from 'types/@AppState';
import './PostFeed.scss';
import { User } from 'types/@User';
import RecommendedToFollow from '../../../components/recommeded-to-follow/RecommendedToFollow';

type Props = {
 username?: string;
 isProfile?: boolean;
}

const PostFeed: React.FC<Props> = ({ username, isProfile = false }) => {
 const dispatch = useDispatch();
 const posts = useSelector((state: AppState) => state.posts);
 const currentUser = useSelector((state: AppState) => state.user)

 // const token = useSelector((state) => state.token);
 const [recommendedUsers, setRecommendedUsers] = useState<User[]>([]);


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
  dispatch(setPosts({ posts: data }));
 };

 useEffect(() => {
  if (isProfile) {
   getUserPosts();
  } else {
   getPosts();
  }
 }, []); // eslint-disable-line react-hooks/exhaustive-deps

 useEffect(() => {
  const fetchRecommendedUsers = async () => {
   const recommendedUsersResponse = await fetch(`http://localhost:3001/users/${currentUser?._id}/recommendedUsers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
   });
   const recommendedUsersData = await recommendedUsersResponse.json();
   setRecommendedUsers(recommendedUsersData);

  }

  fetchRecommendedUsers();
 }, [])

 const getRecommendedUser = (index: number) => {
  if (recommendedUsers.length > 0) {
   return recommendedUsers[index % recommendedUsers.length];
  }
  return null;
 };


 return (
  <div className='post-feed'>
   {posts.map((post: Post, index) => {
    return (
     <>
      <PostCard
       key={post._id}
       post={post}
      />
      {
       index > 0 && (index + 1) % 5 === 0 && (
        <RecommendedToFollow key={`recommended_${index}`} user={getRecommendedUser(index)} />
       )}
     </>
    )
   })}

   {/* {posts.length > 0 && posts.map((post, index) => (index + 1) % 3 === 0 && (
    <RecommendedToFollow key={`recommended_${index}`} user={recommendedUser} />
   ))} */}
  </div>
 );
}

export default PostFeed;