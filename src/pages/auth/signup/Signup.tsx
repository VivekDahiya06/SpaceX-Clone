import React, { useState } from 'react';
import classes from './Signup.module.scss';
import Login_image from '/images/Login.webp';
import { ActionIcon, Alert, Button, Input, Text, Transition } from '@mantine/core';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  interface UserDetails_Type {
    email: string;
    password: string;
  }

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails_Type>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Sending data to both Local Storage and Cookies
    localStorage.setItem('user', JSON.stringify(userDetails));
    document.cookie = "session=active; path=/;";

    // Alert
    setAlert(true);
    setTimeout(() => {
      navigate('/');
      setAlert(false);
    }, 1000);
  }

  return (
    <main className={classes.main}>
      <Transition mounted={alert} transition="slide-down" duration={300} timingFunction="ease">
        {(TransitionStyles) => (
          <div className={classes.alertBox} style={{ ...TransitionStyles }}>
            <Alert color="green" radius="md">
              <Text size="md" color={'#00d800'}>Signup Successful!</Text>
            </Alert>
          </div>
        )}
      </Transition>
      <h1><code>Signup</code></h1>
      <div className={classes.content}>
        <div className={classes.image}>
          <img src={Login_image} alt="Login" loading="lazy" />
        </div>
        <form action="" onSubmit={handleFormSubmit}>
          <Input
            placeholder="Email"
            type="email"
            name="email"
            required
            value={userDetails.email}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <Input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            rightSection={
              <ActionIcon variant='outlined' size='xl' style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />
                }
              </ActionIcon>
            }
            value={userDetails.password}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <Button type="submit">Sign Up</Button>
          <Text>Already have an account? <Link to="/login" style={{ color: '#228BE6' }}>Login</Link></Text>
        </form>
      </div>
    </main>
  )
}

export default Signup;
