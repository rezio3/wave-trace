import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&display=swap')
    </style>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap')
    </style>
    <App />
  </Provider>
);
