import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App.jsx';
// import Routing from '../components/Routing.jsx';

// uncomment so that webpack can bundle styles
// import styles from './stylesheets/styles.scss';

render(
//   <BrowserRouter>
//     {/* <Routing /> */}
//   </BrowserRouter>, document.getElementById('root')
<App /> , document.getElementById('root')
);

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from '../components/App.jsx';
// const container = document.getElementById('root');
// const root = createRoot(container);



// root.render(
//   <App />
// );