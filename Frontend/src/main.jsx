// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App.jsx'
// import './index.css'
// import { Provider } from 'react-redux';
// import Store from './redux/store.js'

// ReactDOM.render(
//   <Provider store={Store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')

// );



// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.jsx';
// import './index.css';
// import { Provider } from 'react-redux';
// import Store from './redux/store.js';

// ReactDOM.render(
//   <React.StrictMode> {/* Wrap your App component with StrictMode */}
//     <Provider store={Store}>
//       <App />
//     </Provider>
//    </React.StrictMode>,
//   document.getElementById('root')
// );



import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import Store from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

root.render(
  // <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  // </React.StrictMode>
);
