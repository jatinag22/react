import ReactDOM from 'react-dom';
import React from 'react';
import App from './App'
import axios from 'axios';
require('dotenv').config();

const URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = URL;

ReactDOM.render(<App />, document.getElementById('root'));