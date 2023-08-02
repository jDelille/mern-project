import { useNavigate } from "react-router-dom";
import './Avatar.scss';

type Props = {
 src: string;
 alt: string;
 username?: string;
}

const Avatar: React.FC<Props> = ({ src, alt, username }) => {
 const navigate = useNavigate();

 return (
  <>
   <img src={src} alt={alt} onClick={() => {
    navigate(`/profile/${username}`);
    navigate(0);
   }}
    className="avatar" />
  </>
 );
}

export default Avatar;