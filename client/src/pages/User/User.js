import React, { useEffect, useState, useCallback } from 'react';
import { getToken } from '../../useToken.js';
import { Box, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import Login from '../Login/Login';
import bgImage from '../../assets/loginbg.jpg';

import './User.css';

const User = () => {
  const [userData, setUserData] = useState({});
  const [userCard, setUserCard] = useState({});
  const token = getToken();

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


  if (token) {
    return (
      <>
        <img src={bgImage} alt='bgImage' id='loginBg' />
        <div id='user-page'>
          <h1 className='text-center'>User Profile</h1>
          <Box sx={{ flexGrow: 1, padding: '30px 50px' }}>
            <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
              <Grid item xs={6}>
                <Paper>First Name: {userData.firstName}</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>LastName: {userData.lastName}</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>Phone Number: {userData.phoneNumber}</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>Password</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>Prefer Diner: {userData.preferDiner}</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>Earned Points: {userData.earnedPoints}</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>Prefer Payment Method: {userData.preferPayment}</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>Mailing Address: {userData.mailingAddress}</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>Billing Address: {userData.billingAddress}</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>Credit Card Details</Paper>
              </Grid>
              <Grid item xs={8} container spacing={1}>
                <Grid item xs={10}>
                  <Paper>Card Number: {userCard.cardNumber}</Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper>Expired Date: {userCard.expDate}</Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper>CVV: {userCard.cvv}</Paper>
                </Grid>
              </Grid>
            </Grid>
            <Button variant='contained'>Edit Profile</Button>
          </Box>
        </div>
      </>
    )
  }
  return <Login />;
}

export default User;