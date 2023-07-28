import { BiSolidErrorCircle } from 'react-icons/bi';

import './Input.scss';

type Props = {
 label: string;
 htmlFor: string;
 type: string;
 placeholder: string;
 hasError?: boolean;
 errorMsg?: string;
 setState: (value: string) => void;
 value: string;
};

const Input: React.FC<Props> = ({
 label,
 htmlFor,
 type,
 placeholder,
 hasError,
 errorMsg,
 setState,
 value
}) => {
 return (
  <div className='input-wrapper'>
   <label htmlFor={htmlFor} className={hasError ? 'error-label' : 'label'}>
    {label}
   </label>
   <input
    type={type}
    id={htmlFor}
    placeholder={placeholder}
    className={hasError ? 'error-input' : 'input'}
    onChange={(e) => setState(e.target.value)}
    value={value}
   />
   {hasError && (
    <p className='error-message'>
     <BiSolidErrorCircle size={16} />
     {errorMsg}
    </p>
   )}
  </div>
 );
};

export default Input;
