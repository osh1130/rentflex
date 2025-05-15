import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
=======

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
>>>>>>> 28f00b8c764713a3f85a902a43d072ace3078ce0
