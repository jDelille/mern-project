import './Input.scss';

type Props = {
 label: string;
 htmlFor: string;
 type: string;
 placeholder: string;
}

const Input: React.FC<Props> = ({ label, htmlFor, type, placeholder }) => {
 return (
  <div className="input-wrapper">
   <label htmlFor={htmlFor}>{label}</label>
   <input type={type} id={htmlFor} placeholder={placeholder} />
  </div>
 );
}

export default Input;