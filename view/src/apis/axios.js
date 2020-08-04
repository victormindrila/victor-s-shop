const { REACT_APP_API_URL, NODE_ENV } = process.env;
const axios = require('axios').create({
	baseURL: NODE_ENV === 'production' && REACT_APP_API_URL
});

const authToken = localStorage.getItem('Authorization');
axios.defaults.headers.common = { Authorization: `${authToken}` };

export default axios;
