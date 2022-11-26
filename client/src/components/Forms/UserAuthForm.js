import React, { useState } from 'react';
import { Container, Box, Tab, TextField, Button, Typography } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'yup-phone';

import './UserAuthForm.css';

const LoginForm = () => {
  const [tab, setTab] = useState('1');

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const validationLoginForm = Yup.object().shape({
    phone: Yup.string().phone('US', true, 'Phone number is invalid')
      .required(),
    password: Yup.string()
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

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
  };

  const onSubmit1 = data => {
    console.log(JSON.stringify(data, null, 2));
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller 
                name='phone'
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
                    error={errors.phone ? true : false}
                  />
                )}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.phone?.message}
              </Typography>

              <TextField
                required
                fullWidth
                name='password'
                // control={control}
                label='Password'
                type='password'
                autoComplete='currentPassword'
                margin='normal'
                {...register('password')}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
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
            <form onSubmit={handleSubmit1(onSubmit1)}>
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