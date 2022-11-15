import React, { useState } from 'react';
import { Container, Box, Tab, TextField, Button, FormControl } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import './Login.css';

const style = {
    border:'1px solid blue',
    margin: '0% auto',
    width: '50%',
    height: 'auto',
    backgroundColor:'rgba(255,255,255,0)',
    borderRadius:'1rem'
}

const Login = () => {
    const [user, setUser] = useState({});
    const [tab, setTab] = useState('1');

    const handleTabChange = (event, value) => {
      setTab(value);
    };

    return (
      <Container maxWidth='md'>
        <Box
          backgroundColor='rgb(255, 255, 255,0.85)'
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
                <TextField id='input-field'
                  label='Phone Number'
                  type={'tel'}
                  margin='normal'
                  // placeholder='1234567890'
                />
                <TextField 
                  label='Password'
                  type={'password'}
                  margin='normal'
                  // placeholder='password'
                />
                <Button id='login-btn' variant='contained' color='success' size='lg'>
                  Login
                </Button>
                <br />
                <p className="text-center">Not a member? <a href='/login#register' onClick={handleTabChange}>Sign up today!</a></p>
              </FormControl>
            </TabPanel>
            {/* Login Form done */}
              
            {/* Register Form */}
            <TabPanel value="2">
              Register
            </TabPanel>
            {/* Register Form done */}

          </TabContext>
        </Box>
      </Container>
    )
}
  
export default Login;