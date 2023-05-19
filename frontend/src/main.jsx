import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { store } from "./store/store";
import { Provider } from "react-redux";
const options = {
    timeout: 5000,
    positions: positions.BOTTOM_CENTER,
    transitions: transitions.SCALE,
}
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <AlertProvider template={AlertTemplate}{...options}>
            <App />
        </AlertProvider>
    </Provider>
);
