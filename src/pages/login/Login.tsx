import React, { useState } from 'react';
import classes from './Login.module.scss';
import Login_image from '/images/Login.webp';
import { Alert, Button, Input, Text, Transition } from '@mantine/core';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        color: '',
        message: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = localStorage.getItem('user');
        if (!userData) {
            setAlert({ ...alert, open: true, color: 'red', message: 'User not found !!' });
            setTimeout(() => {
                setUserDetails({
                    email: '',
                    password: ''
                })
                setAlert({ ...alert, open: false, color: '', message: '' });
            }, 1000);
            return;
        }

        const userStored = JSON.parse(userData);
        if (userStored.email === userDetails.email && userStored.password === userDetails.password) {
            document.cookie = "session=active; path=/;";
            setAlert({ ...alert, open: true, color: 'green', message: 'Login Successful !!' });
            setTimeout(() => {
                navigate('/');
                setAlert({ ...alert, open: false, color: '', message: '' });
            }, 1000);

        }
        else {
            setAlert({ ...alert, open: true, color: 'red', message: 'Invalid Credentials !!' });
            setTimeout(() => {
                setUserDetails({
                    email: '',
                    password: ''
                });
                setAlert({ ...alert, open: false, color: '', message: '' });
            }, 1000);
        }

    }

    return (
        <main className={classes.main}>
            <Transition mounted={alert.open} transition="slide-down" duration={300} timingFunction="ease">
                {(TransitionStyles) => (
                    <div className={classes.alertBox} style={{ ...TransitionStyles }}>
                        <Alert color={alert.color} radius="md">
                            <Text size="md" color={alert.color === 'green' ? '#01d601' : '#ff4d4f'}>{alert.message}</Text>
                        </Alert>
                    </div>
                )}
            </Transition>
            <h1><code>Login</code></h1>
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
                            <div style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />
                                }
                            </div>
                        }
                        value={userDetails.password}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    <Button type="submit">Login</Button>
                    <Text>Create an account? <Link to="/signup" style={{ color: '#228BE6' }}>Sign Up</Link></Text>
                </form>
            </div>
        </main>
    )
}

export default Login;
