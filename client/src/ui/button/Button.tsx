import './Button.scss';

type Props = {
 actionLabel: string;
}

const Button: React.FC<Props> = ({ actionLabel }) => {
 return (
  <button className='button'>{actionLabel}</button>
 );
}

export default Button;