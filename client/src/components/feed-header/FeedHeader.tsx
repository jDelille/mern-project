import { IconType } from 'react-icons';
import './FeedHeader.scss';

type Props = {
 label: string;
 icon?: IconType;
}

const FeedHeader: React.FC<Props> = ({ label, icon: Icon }) => {
 return (
  <div className='feed-header-container'>
   <div className="feed-header">
    {Icon && <Icon size={16} />}
    <p>{label}</p>
   </div>
  </div>

 );
}

export default FeedHeader;