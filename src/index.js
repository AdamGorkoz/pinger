import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
// import configureStore from './store/store.js'
// import {checkToken} from './actions/loginActions';

// const store = configureStore();

// let token = localStorage.getItem('token');
// if (token !== null) {
//     store.dispatch(checkToken(token));
// }

ReactDOM.render(<App />, document.getElementById('app'));