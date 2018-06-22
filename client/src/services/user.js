
const USERNAMES = ['messi', 'rojo', 'aguero', 'pipa', 'pavon', 'romero', 'armani'];
var username = null;

function _getUsername() {
    const userIndex = Math.floor(Math.random() * USERNAMES.length);
    return USERNAMES[userIndex];
}

function getUsername() {
    if (!username) {
        username = _getUsername();
    }
    return username;
};

const getToken = () => {
    return localStorage.getItem('token') ||  false;
}

const setToken = (token) => {
    if (token){
        localStorage.setItem('token', token);
    }
}

export { getUsername, getToken, setToken }