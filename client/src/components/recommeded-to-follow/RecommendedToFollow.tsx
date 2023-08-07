import { User } from 'types/@User';
import './RecommendedToFollow.scss';
import Avatar from '../../ui/avatar/Avatar';
import Button from '../../ui/button/Button';

type Props = {
 user: User | null
}

const RecommendedToFollow: React.FC<Props> = ({ user }) => {
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
    <Button actionLabel='Follow' onClick={() => { }} />
   </div>

  </div>
 );
}

export default RecommendedToFollow;