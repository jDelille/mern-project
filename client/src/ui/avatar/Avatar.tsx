import { useNavigate } from "react-router-dom";

type Props = {
 src: string;
 alt: string;
 userId: string;
}

const Avatar: React.FC<Props> = ({ src, alt, userId }) => {
 const navigate = useNavigate();

 return (
  <>
   <img src={src} alt={alt} onClick={() => {
    navigate(`/profile/${userId}`);
    navigate(0);
   }} />
  </>
 );
}

export default Avatar;