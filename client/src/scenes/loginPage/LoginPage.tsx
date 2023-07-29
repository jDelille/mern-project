import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import './LoginPage.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../state';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const disableButton = () => {
  if (!email || !password) {
   return true;
  }
  return false;
 }

 const login = async () => {

  const user = {
   email: email,
   password: password
  }

  const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
   method: 'POST',
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(user)
  })
  const loggedIn = await loggedInResponse.json();

  if (loggedIn) {
   dispatch(
    setCurrentUser({
     user: loggedIn.user,
     token: loggedIn.token,
    })
   );
   navigate("/home");
  }
 };

 const bodyContent = (
  <>
   <h2>Login to your account</h2>

   <Input
    label='Email'
    htmlFor='email'
    type='email'
    setState={setEmail}
    placeholder='Email-address'
    value={email}
   />
   <Input
    label='Password'
    htmlFor='password'
    type='password'
    placeholder='••••••••••'
    setState={setPassword}
    value={password}
   />
   <Button actionLabel='Continue' onClick={login} isDisabled={disableButton()} />
   <div className='redirect-link'>
    <div className='redirect-link'>
     <p>
      New to Wagerly? <a href='/register'>Create an account</a>
     </p>
    </div>
   </div>
  </>
 );

 return (
  <section className='login-page'>
   <div className='content'>
    <h1 className='site-name'>Wagerly</h1>

    <div className='body-content'>{bodyContent}</div>
   </div>
  </section>
 );
};

export default LoginPage;
