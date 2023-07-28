import './Button.scss';

type Props = {
 actionLabel: string;
 onClick: () => void;
}

const Button: React.FC<Props> = ({ actionLabel, onClick }) => {
 return (
  <button className='button' onClick={onClick}>{actionLabel}</button>
 );
}

export default Button;