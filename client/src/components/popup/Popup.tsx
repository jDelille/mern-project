import './Popup.scss';
import { IoCaretBackOutline } from 'react-icons/io5'

type Props = {
 body: React.ReactElement
 isOpen?: boolean;
 onClose: () => void;
 title: string;
}

const Popup: React.FC<Props> = ({ body, isOpen, onClose, title }) => {

 if (!isOpen) {
  return null;
 }


 return (
  <div className='overlay'>
   <div className='popup'>
    <div className='header'>
     <IoCaretBackOutline size={18} onClick={onClose} />
     <strong>{title}</strong>
    </div>
    {body}
   </div>
  </div>
 );
}

export default Popup;