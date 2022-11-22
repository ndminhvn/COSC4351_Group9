import React, { useState } from 'react';
import { Container, Box, Tab, TextField, Button, FormControl } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { MuiTelInput } from 'mui-tel-input';
import './UserAuthForm.css';

const LoginForm = () => {
    const [user, setUser] = useState({});
    const [tab, setTab] = useState('1');
    const [phone,setPhone] = useState('');

    const handleTabChange = (event, value) => {
      setTab(value);
    };

    const handlePhone = (value) => {
        setPhone(value);
        console.log(value);
    }

    return (
      <Container maxWidth='md'>
        <Box
          backgroundColor='rgb(255, 255, 255)'
          display='flex'
          fluid='true'
          flexDirection={'column'}
          // width={100}
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
          <div id='form-background'></div>
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
            <TabPanel value="1">
              <FormControl>
                {/* <TextField id='input-field'
                    // component={MuiTelInput}
                  label='Phone Number'
                  type={'tel'}
                  margin='normal'
                  // placeholder='1234567890'
                /> */}
                <MuiTelInput
                    fullWidth
                    onlyCountries={['US']}
                    defaultCountry="US"
                    value={phone}
                    onChange={handlePhone}
                    label='Phone Number'
                    margin='normal'
                    placeholder='1234567890'
                />
                <TextField 
                  label='Password'
                  type={'password'}
                  margin='normal'
                  // placeholder='password'
                />
                <Button className='login-btn' variant='contained' color='success' size='lg'>
                  Login
                </Button>
                <br />
                <p className="text-center">Not a member? <a href='#register' onClick={() => setTab('2')}>
                    Sign up today!
                  </a>
                </p>
              </FormControl>
            </TabPanel>
            {/* Login Form done */}
              
            {/* Register Form */}
            <TabPanel value="2">
            <FormControl>
                {/* <TextField id='input-field'
                    // component={MuiTelInput}
                  label='Phone Number'
                  type={'tel'}
                  margin='normal'
                  // placeholder='1234567890'
                /> */}
                <TextField 
                  label='First Name'
                  type={'text'}
                  margin='normal'
                  placeholder='Steven'
                />
                <TextField 
                  label='Last Name'
                  type={'text'}
                  margin='normal'
                  placeholder='He'
                />
                <MuiTelInput
                    fullWidth
                    onlyCountries={['US']}
                    defaultCountry="US"
                    value={phone}
                    onChange={handlePhone}
                    label='Phone Number'
                    margin='normal'
                    placeholder='1234567890'
                />
                <TextField 
                  label='Password'
                  type={'password'}
                  margin='normal'
                  // placeholder='password'
                />
                <Button className='login-btn' variant='contained' color='success' size='lg'>
                  Register
                </Button>
                <br />
                <p className="text-center"><a href='#login' onClick={() => setTab('1')}>Back to Login</a></p>
              </FormControl>
            </TabPanel>
            {/* Register Form done */}

          </TabContext>
        </Box>
      </Container>
    )
}
  
export default LoginForm;