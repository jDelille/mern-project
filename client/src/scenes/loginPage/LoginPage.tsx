import { useState } from 'react';

import StepIndicator from '../../components/step-indicator/StepIndicator';
import './LoginPage.scss';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';

enum STEPS {
 First,
 Second,
 Third,
 Fourth,
}

const LoginPage: React.FC = () => {
 const [step, setStep] = useState(STEPS[1]);

 const bodyContent = (
  <>
   <h2>Welcome! First things first...</h2>
   <h3>You can always change them later.</h3>
   <Input
    label='Email'
    htmlFor='email'
    type='email'
    placeholder='Email-address'
   />
   <Input
    label='First Name'
    htmlFor='firstName'
    type='text'
    placeholder='Your first name'
   />
   <Input
    label='Last Name'
    htmlFor='lastName'
    type='text'
    placeholder='Your last name'
   />

   <Input
    label='Password'
    htmlFor='password'
    type='password'
    placeholder='••••••••••'
   />
   <Input
    label='Confirm Password'
    htmlFor='confirmPassword'
    type='password'
    placeholder='••••••••••'
   />

   <Button actionLabel='Continue' />

   <div className='redirect-link'>
    <p>Already have an account? <a href="#">Log in</a></p>
   </div>
  </>
 );

 return (
  <section className='login-page'>
   <div className='content'>
    <h1 className='site-name'>Wagerly</h1>
    <StepIndicator totalSteps={4} currentStep={2} />
    <div className='body-content'>{bodyContent}</div>
   </div>
  </section>
 );
};

export default LoginPage;
