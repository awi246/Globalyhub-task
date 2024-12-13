import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <div
        className="w-full min-h-screen bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://wallpapers-clan.com/wp-content/uploads/2023/11/cute-pokemon-pikachu-rain-desktop-wallpaper-preview.jpg')",
        }}
      >
        <App />
      </div>
    </Provider>{" "}
  </StrictMode>
);
