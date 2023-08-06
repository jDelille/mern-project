import Button from '../../ui/button/Button';
import { IoCaretBackOutline } from 'react-icons/io5'
import './Modal.scss';

type Props = {
 isOpen?: boolean;
 onClose: () => void;
 onSubmit: () => void;
 body: React.ReactElement
 title: string;
 actionLabel: string;
 disableActionButton?: boolean;
 isComment?: boolean;
 secondaryActionLabel?: string;
 secondaryAction?: () => void;
}


const Modal: React.FC<Props> = ({ title, body, actionLabel, onSubmit, isOpen, onClose, isComment, secondaryAction, secondaryActionLabel }) => {

 if (!isOpen) {
  return null;
 }


 return (
  <div className='overlay'>
   <div className="modal">
    <div className='header'>
     <IoCaretBackOutline size={18} onClick={onClose} />
     <strong>{title}</strong>
    </div>
    <div className='body'>
     {body}
    </div>
    {isComment ? (
     <div className='comment-action'>
      {secondaryActionLabel && (
       <Button actionLabel={secondaryActionLabel} onClick={secondaryAction} />
      )}
      <Button actionLabel={actionLabel} onClick={onSubmit} />

     </div>
    ) : (
     <div className='action'>
      <Button actionLabel={actionLabel} onClick={onSubmit} />
     </div>
    )}

   </div>
  </div>

 );
}

export default Modal;