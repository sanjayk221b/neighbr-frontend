import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import ErrorBoundary from "./components/common/error/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  // </React.StrictMode>
);
