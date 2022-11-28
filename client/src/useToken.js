export function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
}

export function removeToken() {
    sessionStorage.removeItem('token');
    setToken(null);
}
