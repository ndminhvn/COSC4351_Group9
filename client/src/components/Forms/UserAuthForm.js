import React, { useState } from 'react';
import { Container, Box, Tab, TextField, Button, Typography } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'yup-phone';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { setToken } from '../../useToken.js';

import './UserAuthForm.css';

const LoginForm = () => {
  const [tab, setTab] = useState('1');
  const navigate = useNavigate();

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const validationLoginForm = Yup.object().shape({
    phoneLogin: Yup.string().phone('US', true, 'Phone number is invalid')
      .required(),
    passwordLogin: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password must not exceed 30 characters'),
  });

  const validationRegisterForm = Yup.object().shape({
    firstName: Yup.string()
      .required('Please, we need your first name')
      .min(1, 'First name must be at least 1 characters')
      .max(20, 'Your first name is that long? Can we have the shorter one?'),
    lastName: Yup.string()
      .required('Also your last name!')
      .min(1, 'First name must be at least 1 characters')
      .max(20, 'Your last name is that long? Can we have the shorter one?'),
    phoneRegister: Yup.string().phone('US', true, 'Phone number is invalid')
      .required(),
    passwordRegister: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password must not exceed 30 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('passwordRegister'), null], 'Confirm Password does not match')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationLoginForm)
  });

  const { 
    register: register1, 
    control: control1, 
    handleSubmit: handleSubmit1, 
    formState: { errors: errors1 } 
  } = useForm({
    resolver: yupResolver(validationRegisterForm)
  })

  const onLogin = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    await axios.post('http://localhost:8000/user/login', data)
      .then(res => {
        setToken(res.data);
        alert('You have successfully logged in!');
        navigate('/');
        window.location.reload(true);
      }).catch(error => {
        console.error(error);
        alert('Something went wrong. Please try again.');
      })
  };

  const onRegister = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    await axios.post('http://localhost:8000/user/register', data)
      .then(res => {
        if (res.status === 200) {
          if (res.data === 'Phone number found, please login.') {
            // console.log('Phone number found, please login.')
            alert('Phone number found, please login.')
            navigate('/login')
            window.location.reload(true);
          }
          else {
            alert('Successfully registered!');
            navigate('/login')
            window.location.reload(true);
            // console.log('Successfully registered');
          }
        }
        else {
          // console.log('Something went wrong. Please try again');
          alert('Something went wrong. Please try again.');
        }
      })
  };

  return (
    <Container maxWidth='md'>
      <Box
        backgroundColor='rgb(255, 255, 255)'
        display='flex'
        fluid='true'
        flexDirection={'column'}
        alignItems='center'
        justifyContent={'center'}
        margin='auto'
        marginTop={5}
        padding={3}
        borderRadius={6}
        boxShadow={'5px 5px 10px #ccc'}
        sx={{ width: '50%',
              borderBottom: 1, 
              borderColor: 'divider',
              ':hover': {
                boxShadow: '10px 10px 20px #ccc'
              }
            }}
      >
        <TabContext value={tab}>
          <TabList
            onChange={handleTabChange}
            textColor='primary'
            indicatorColor='primary'
            aria-label='forms'
          >
            <Tab value='1' label='Login' size='lg' />
            <Tab value='2' label='Register' size='lg' />
          </TabList>

          {/* Login Form */}
          <TabPanel value='1'>
            <form onSubmit={handleSubmit(onLogin)}>
              <Controller 
                name='phoneLogin'
                control={control}
                rules={{ validate: matchIsValidTel }}
                render={({ field }) => (
                  <MuiTelInput
                    fullWidth
                    onlyCountries={['US']}
                    defaultCountry="US"
                    label='Phone Number'
                    margin='normal'
                    {...field}
                    error={errors.phoneLogin ? true : false}
                  />
                )}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.phoneLogin?.message}
              </Typography>

              <TextField
                required
                fullWidth
                name='passwordLogin'
                // control={control}
                label='Password'
                type='password'
                autoComplete='currentPassword'
                margin='normal'
                {...register('passwordLogin')}
                error={errors.passwordLogin ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.passwordLogin?.message}
              </Typography>
              <Button 
                className='login-btn mb-3 mt-3' 
                fullWidth
                type='submit'
                variant='contained' 
                color='success' 
                size='lg'
              >
                Login
              </Button>
              <p className="text-center">Not a member? <a href='#register' onClick={() => setTab('2')}>
                  Sign up today!
                </a>
              </p>
            </form>
          </TabPanel>
          {/* Login Form done */}
            
          {/* Register Form */}
          <TabPanel value="2">
            <form onSubmit={handleSubmit1(onRegister)}>
              <TextField
                required
                fullWidth
                name='firstName'
                label='First Name'
                // type={'text'}
                margin='normal'
                {...register1('firstName')}
                error={errors1.firstName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors1.firstName?.message}
              </Typography>
              <TextField
                required
                fullWidth
                name='lastName'
                label='Last Name'
                // type='text'
                margin='normal'
                {...register1('lastName')}
                error={errors1.lastName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors1.lastName?.message}
              </Typography>
              <Controller 
                control={control1}
                name='phoneRegister'
                rules={{ validate: matchIsValidTel }}
                render={({ field }) => (
                  <MuiTelInput
                    fullWidth
                    onlyCountries={['US']}
                    defaultCountry="US"
                    label='Phone Number'
                    margin='normal'
                    {...field}
                    error={errors1.phoneRegister ? true : false}
                  />
                )}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors1.phoneRegister?.message}
              </Typography>
              <TextField
                required
                fullWidth
                name='passwordRegister'
                // control={control}
                label='Password'
                type='password'
                autoComplete='currentPassword'
                margin='normal'
                {...register1('passwordRegister')}
                error={errors1.passwordRegister ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors1.passwordRegister?.message}
              </Typography>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                autoComplete='currentPassword'
                type="password"
                fullWidth
                margin="dense"
                {...register1('confirmPassword')}
                error={errors1.confirmPassword ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.confirmPassword?.message}
              </Typography>
              <Button 
                className='login-btn mb-3 mt-3'
                fullWidth
                type='submit'
                variant='contained' 
                color='success' 
                size='lg'
                // onClick={handleSubmit1(onSubmit1)}
              >
                Register
              </Button>
              <p className="text-center"><a href='#login' onClick={() => setTab('1')}>Back to Login</a></p>
            </form>
          </TabPanel>
          {/* Register Form done */}

        </TabContext>
      </Box>
    </Container>
  )
}
  
export default LoginForm;