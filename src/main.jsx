import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <div
        className="w-full min-h-screen bg-center bg-cover"
        style={{
          backgroundImage: "url('https://wallpapers-clan.com/wp-content/uploads/2023/11/cute-pokemon-pikachu-rain-desktop-wallpaper-preview.jpg')",
        }}
      >
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);
