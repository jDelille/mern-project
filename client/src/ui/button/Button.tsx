import './Button.scss';

type Props = {
 actionLabel: string;
 onClick: () => void;
 isDisabled?: boolean;
}

const Button: React.FC<Props> = ({ actionLabel, onClick, isDisabled }) => {
 return (
  <button className='button' onClick={onClick} disabled={isDisabled}>{actionLabel}</button>
 );
}

export default Button;