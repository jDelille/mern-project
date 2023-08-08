import { User } from 'types/@User';
import Avatar from '../../ui/avatar/Avatar';
import Button from '../../ui/button/Button';
import { useSelector } from 'react-redux';
import { AppState } from 'types/@AppState';
import useFollow from '../../hooks/useFollow';
import './RecommendedToFollow.scss';

type Props = {
 user: User | null
}

const RecommendedToFollow: React.FC<Props> = ({ user }) => {
 const currentUser = useSelector((state: AppState) => state.user)

 const { followUser } = useFollow();

 const handleFollow = async () => {
  const successfulFollow = await followUser(currentUser?._id as string, user?._id as string);
  if (successfulFollow) {
   console.log(true)
  }
 };

 const isFollowing = currentUser?.following.includes(user?._id as string)


 if (!user) {
  return null
 }


 return (
  <div className='follow-card'>
   <div className="header">
    <Avatar
     src={user?.avatar || '/images/placeholder.png'}
     username={user?.username}
     alt='Profile Picture'
    />
    <div className="display-name">
     <span className='recommended-label'>Recommended to follow</span>

     <strong>{user?.name}</strong>
     <span>{user?.username} - 4.3K Followers</span>
     <span>{user?.bio}</span>
    </div>
   </div>
   <div className='follow-btn'>
    <Button actionLabel={isFollowing ? 'Unfollow' : 'Follow'} onClick={handleFollow} />
   </div>

  </div>
 );
}

export default RecommendedToFollow;