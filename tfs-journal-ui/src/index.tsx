import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { googleClientID } from './configs/config';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={googleClientID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>,
);
