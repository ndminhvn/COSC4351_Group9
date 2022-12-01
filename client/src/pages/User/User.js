import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, Grid, TextField, Checkbox, Typography } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getToken } from '../../useToken.js';
import Login from '../Login/Login';
import bgImage from '../../assets/loginbg.jpg';

import './User.css';

const User = () => {
  const [input, setInput] = useState({});
  const [userData, setUserData] = useState({});
  const [userCard, setUserCard] = useState({});
  const [phoneNumber, setPhoneNumber] = useState();         // phone number from input
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();

  const token = getToken();

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput(values => ({...values, [name]: value}))
  };

  const getUserData = useCallback(async () => {
    await axios.get(`http://localhost:8000/user/details/${token}`)
    .then(res => {
      // console.log(res.data);
      setUserData(res.data);
      setUserCard(res.data.creditCard);
      // console.log(userData);
    }).catch(error => {
      console.error(error);
      alert('Something went wrong. Please try again.');
    })   
  },[token]);

  useEffect(() => {
    getUserData();
  },[getUserData])

  const handleSubmit = async (event, data) => {
    event.preventDefault();
    data = Object.assign(input);
    // console.log(JSON.stringify(data, null, 2));
    await axios.put(`http://localhost:8000/user/details/${token}`, data)
    .then(res => {
      alert(`${res.data}`);
      // navigate('/');
      window.location.reload(true);
    })
    .catch(error => {
      console.error(error);
      alert('Something went wrong. Please try again.');
    });
  }

  if (token) {
    return (
      <>
        <img src={bgImage} alt='bgImage' id='loginBg' />
        <div id='user-page'>
          <h1 className='text-center title'><i>User Profile</i></h1>
          <Box sx={{ flexGrow: 1, padding: '30px 50px',width:'60%', margin:'auto 20%' }}>
            <form onSubmit={handleSubmit}>
              <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={6}>
                  <TextField
                    // className='mb-3'
                    fullWidth
                    required
                    label='First Name'
                    name='firstName'
                    value={userData.firstName || ''}
                    onChange={handleFormChange}
                    helperText='This field can not be changed.'
                    // margin='normal'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    // className='mb-3'
                    fullWidth
                    required
                    label='Last Name'
                    name='lastName'
                    value={userData.lastName || ''}
                    onChange={handleFormChange}
                    helperText='This field can not be changed.'
                    // margin='normal'
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiTelInput 
                    fullWidth
                    // className='mt-3'
                    label='Phone Number'
                    onlyCountries={['US']}
                    defaultCountry='US'
                    helperText='This field can not be changed.'
                    value={userData.phoneNumber || phoneNumber}
                    onChange={(newValue) => {
                        matchIsValidTel(newValue);
                        setPhoneNumber(newValue);
                    }}
                    // margin='normal'
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    // className='mb-3'
                    fullWidth
                    // required
                    type='number'
                    label='Prefer Diner'
                    name='preferDiner'
                    value={input.preferDiner || ((userData.preferDiner) ? userData.preferDiner : '')}
                    onChange={handleFormChange}
                    // helperText='This field can not be changed.'
                    // margin='normal'
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    // className='mb-3'
                    fullWidth
                    disabled
                    // required
                    type='number'
                    label='Earned Points: 0'
                    name='earnedPoints'
                    // value={(userData.earnedPoints) ? userData.earnedPoints : ''}
                    value={userData.earnedPoints || ''}
                    onChange={handleFormChange}
                    // helperText='This field can not be changed.'
                    // margin='normal'
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    // className='mb-3'
                    fullWidth
                    required
                    label='Mailing Address'
                    name='mailingAddress'
                    value={(input.mailingAddress || '') || ((userData.mailingAddress) ? userData.mailingAddress : '')}
                    onChange={handleFormChange}
                    // margin='normal'
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography>
                    Billing address is the same
                  <Checkbox
                    checked={checked}
                    onChange={handleChecked}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    // className='mb-3'
                    fullWidth
                    required
                    label='Billing Address'
                    name='billingAddress'
                    value={((checked) ? (input.mailingAddress) : (input.billingAddress || '')) || ''}
                    onChange={handleFormChange}
                    // margin='normal'
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography className='text-center mt-3'>Credit Card Details</Typography>
                </Grid>
                <Grid item xs={8} container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      // className='mb-3'
                      fullWidth
                      // required
                      label='Card Number'
                      name='cardNumber'
                      value={input.cardNumber || ''}
                      // value={((userCard.cardNumber) ? userCard.cardNumber : input.cardNumber) || (input.cardNumber || '')}
                      onChange={handleFormChange}
                      // margin='normal'
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      // className='mb-3'
                      fullWidth
                      type='number'
                      // required
                      label='Expired Date'
                      name='expDate'
                      value={input.expDate || ''}
                      // value={input.expDate || (userCard.expDate) ? userCard.expDate : ''}
                      onChange={handleFormChange}
                      helperText='MMYY Format'
                      // margin='normal'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    {/* <TextField
                      // className='mb-3'
                      fullWidth
                      // required
                      type='number'
                      label='CVV'
                      name='cvv'
                      value={input.cvv || ''}
                      // value={input.cvv || (userCard.cvv) ? userCard.cvv : ''}                      onChange={handleFormChange}
                      // margin='normal'
                    /> */}
                    <TextField
                      // className='mb-3'
                      fullWidth
                      type='number'
                      // required
                      label='CVV'
                      name='cvv'
                      value={input.cvv || ''}
                      // value={input.expDate || (userCard.expDate) ? userCard.expDate : ''}
                      onChange={handleFormChange}
                      // margin='normal'
                    />
                  </Grid>
                </Grid>
              </Grid>
              <div className='mt-3 d-flex justify-content-around'>
                <Button 
                  fullWidth
                  variant='contained'
                  type='submit'
                >
                  Edit Profile
                </Button>
              </div>
            </form>
          </Box>
        </div>
      </>
    )
  }
  return <Login />;
}

export default User;