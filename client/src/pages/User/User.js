import React, { useState } from 'react';
import Login from '../Login/Login';

const User = () => {
    const [token, setToken] = useState();

    if (!token) {
      return <Login setToken={setToken} />;
    }
    return (
        <div>User</div>
    )
}

export default User;