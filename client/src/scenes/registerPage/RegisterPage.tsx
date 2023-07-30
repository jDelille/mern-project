import { useEffect, useState } from 'react';

import StepIndicator from '../../components/step-indicator/StepIndicator';
import './RegisterPage.scss';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import Specialties from '../../components/specialties/Specialties';
import ImageUpload from '../../components/image-upload/ImageUpload';

enum STEPS {
 First,
 Second,
 Third,
 Fourth,
}

const RegisterPage: React.FC = () => {
 const [step, setStep] = useState(STEPS.First);
 const [error, setError] = useState("");
 const [email, setEmail] = useState('');
 const [name, setName] = useState('');
 const [password, setPassword] = useState('');
 const [passwordConfirm, setPasswordConfirm] = useState('');
 const [username, setUsername] = useState('');
 const [avatar, setAvatar] = useState('');

 const [isEmailValid, setIsEmailValid] = useState(true)
 const [isUsernameValid, setIsUsernameValid] = useState(true)
 const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);


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
   setError("Error validating email")
  }
 }

 useEffect(() => {
  validateEmail();
  validateUsername();
 }, [email, username])

 const validatePasswordConfirm = () => {
  if (passwordConfirm && password !== passwordConfirm) {
   return false;
  }
  return true;
 }

 const validateUsername = async () => {
  try {
   const response = await fetch(`http://localhost:3001/auth/validate-username`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
   })
   const data = await response.json();
   setIsUsernameValid(!data.exists);
  } catch (error) {
   console.log("error validating username: " + error)
  }
 }

 const disableButton = () => {

  if (step === STEPS.First) {
   if (!email || !isEmailValid || !validatePasswordConfirm() || !password || !passwordConfirm || !name) {
    return true;
   }
  }

  if (step === STEPS.Second) {
   if (!username || !isUsernameValid) {
    return true;
   }
  }

  return false;
 }



 const register = async () => {

  const newUser = {
   name: name,
   email: email,
   password: password,
   username: username,
   avatar: avatar,
   location: 'Scottsdale, AZ',
   specialties: selectedLeagues,
   followers: [],
   following: [],
   bio: "Testing bio",
  }
  const savedUserResponse = await fetch('http://localhost:3001/auth/register', {
   method: "POST",
   headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify(newUser)
  })

  const savedUser = await savedUserResponse.json();

  // if (savedUser) {
  // }
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
    value={email}
   />
   <Input
    label='Name'
    htmlFor='name'
    type='text'
    value={name}
    placeholder='Your name'
    setState={setName}
   />
   <Input
    label='Password'
    htmlFor='password'
    type='password'
    placeholder='••••••••••'
    setState={setPassword}
    value={password}
   />
   <Input
    label='Confirm Password'
    htmlFor='confirmPassword'
    type='password'
    placeholder='••••••••••'
    setState={setPasswordConfirm}
    hasError={!validatePasswordConfirm()}
    errorMsg='Passwords do not match'
    value={passwordConfirm}
   />

   <Button
    actionLabel='Continue'
    onClick={handleNextStep}
    isDisabled={disableButton()}
   />

   <div className='redirect-link'>
    <p>Already have an account? <a href="/login">Log in</a></p>
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
     setState={setUsername}
     hasError={!isUsernameValid}
     errorMsg='Username already taken'
     value={username}
    />
    <ImageUpload
     onChange={setAvatar}
     value={avatar}
    />
    <Button
     actionLabel='Continue'
     onClick={handleNextStep}
     isDisabled={disableButton()}
    />
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
    <Specialties selectedLeagues={selectedLeagues} setSelectedLeagues={setSelectedLeagues} />
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
  <section className='register-page'>
   <div className='content'>
    <h1 className='site-name'>Wagerly</h1>
    <StepIndicator totalSteps={3} currentStep={step + 1} />
    <div className='body-content'>{bodyContent}</div>
   </div>
  </section>
 );
};

export default RegisterPage;
