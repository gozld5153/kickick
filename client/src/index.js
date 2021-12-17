import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyles from "./commons/styles/GlobalStyles";
import { store } from "./store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorker from "./serviceWorker";
const persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
