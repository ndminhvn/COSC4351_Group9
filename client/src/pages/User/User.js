import React, { useState } from 'react';
import Login from '../Login/Login';
import { setToken, getToken, removeToken } from '../../useToken.js';

const User = () => {
    const token = getToken();

    if (!token) {
      return <Login />;
    }
    return (
        <div>User</div>
    )
}

export default User;