import React from 'react';
import ReactDOM from 'react-dom';

import Loadable from './app/components/LoadableCircle';

// Asynchronous load main web page
const App = Loadable({
    loader: () => import('./app'),
});

// Reset all CSS settings in browsers
import 'stylesheet/normalize.css';

ReactDOM.render(<App />, document.getElementById('app'));
