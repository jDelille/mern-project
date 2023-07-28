import { useEffect, useState } from 'react';

import StepIndicator from '../../components/step-indicator/StepIndicator';
import './LoginPage.scss';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import Specialties from '../../components/specialties/Specialties';

enum STEPS {
 First,
 Second,
 Third,
 Fourth,
}

const LoginPage: React.FC = () => {
 const [step, setStep] = useState(STEPS.First);
 const [error, setError] = useState("");
 const [email, setEmail] = useState('');
 const [fistName, setFistName] = useState('');
 const [lastName, setLastName] = useState('');
 const [password, setPassword] = useState('');
 const [passwordConfirm, setPasswordConfirm] = useState('');

 const [isEmailValid, setIsEmailValid] = useState(true)

 const validateEmail = async () => {
  try {
   const response = await fetch(`http://localhost:3001/auth/validate-email`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
   })
   const data = await response.json();
   setIsEmailValid(!data.exists);
  } catch (error) {
   console.log("error validating email: " + error)
  }
 }

 useEffect(() => {
  validateEmail();
 }, [email])

 const validatePasswordConfirm = () => {
  if (passwordConfirm && password !== passwordConfirm) {
   return false;
  }
  return true;
 }



 const register = async () => {

  const newUser = {
   firstName: "Master",
   lastName: "Bweem",
   email: 'bweem@gmail.com',
   password: 'Password',
   username: "Bweemster",
   picturePath: "",
   location: 'Scottsdale, AZ',
   specialties: ['NFL', 'NBA', 'MLB'],
   followers: [],
   following: [],
   bio: "Bio",
  }
  const savedUserResponse = await fetch('http://localhost:3001/auth/register', {
   method: "POST",
   headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify(newUser)
  })

  const savedUser = await savedUserResponse.json();

  if (savedUser) {
   console.log(savedUser)
  }
 }

 const handleNextStep = () => {
  if (step < STEPS.Fourth) {
   setStep(step + 1);
  } else {
   register();
  }
 };


 let bodyContent = (
  <>
   <h2>Welcome! First things first...</h2>
   <h3>You can always change them later.</h3>

   <Input
    label='Email'
    htmlFor='email'
    type='email'
    setState={setEmail}
    placeholder='Email-address'
    hasError={!isEmailValid}
    errorMsg='Email already in use'
   />

   <Input
    label='First Name'
    htmlFor='firstName'
    type='text'
    placeholder='Your first name'
    setState={setFistName}
   />
   <Input
    label='Last Name'
    htmlFor='lastName'
    type='text'
    placeholder='Your last name'
    setState={setLastName}
   />

   <Input
    label='Password'
    htmlFor='password'
    type='password'
    placeholder='••••••••••'
    setState={setPassword}
   />
   <Input
    label='Confirm Password'
    htmlFor='confirmPassword'
    type='password'
    placeholder='••••••••••'
    setState={setPasswordConfirm}
    hasError={!validatePasswordConfirm()}
    errorMsg='Passwords do not match'
   />

   <Button actionLabel='Continue' onClick={validateEmail} />

   <div className='redirect-link'>
    <p>Already have an account? <a href="#">Log in</a></p>
   </div>
  </>
 );

 if (step === STEPS.Second) {
  bodyContent = (
   <>
    <h2>Customize how people see you</h2>
    <h3>Usernames must be unique.</h3>
    <Input
     label='Username'
     htmlFor='username'
     type='text'
     placeholder='Your username'
    />
    <Button actionLabel='Continue' onClick={handleNextStep} />
    <div className='redirect-link'>
     <p onClick={() => setStep(STEPS.First)} className='backTo'>Go back to step 1</p>
    </div>
   </>
  )
 }

 if (step === STEPS.Third) {
  bodyContent = (
   <>
    <h2>Choose your specialties</h2>
    <h3>What sports do you bet on?</h3>
    <Specialties />
    <Button actionLabel='Continue' onClick={handleNextStep} />
    <div className='redirect-link'>
     <p onClick={() => setStep(STEPS.Second)} className='backTo'>Go back to step 2</p>
    </div>
   </>
  )
 }

 if (step === STEPS.Fourth) {
  bodyContent = (
   <>
    {error && <p>{error}</p>}
    <div className='check-mark'>
     <img src="/images/check-mark.png" alt="check mark" />
    </div>
    <h2>Congratulations, Justin!</h2>
    <h3>You have completed onboarding!</h3>

    <Button actionLabel='Launch Wagerly' onClick={handleNextStep} />
    <div className='redirect-link'>
     <p onClick={() => setStep(STEPS.Third)} className='backTo'>Go back to step 3</p>
    </div>
   </>
  )
 }


 return (
  <section className='login-page'>
   <div className='content'>
    <h1 className='site-name'>Wagerly</h1>
    <StepIndicator totalSteps={3} currentStep={step + 1} />
    <div className='body-content'>{bodyContent}</div>
   </div>
  </section>
 );
};

export default LoginPage;
