// app.js
import "./utils/TraducoesYup/TraducoesYup";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routers/router";
import { Provider } from "react-redux";
import GlobalStyles from "./themes/Global";

import Light from "./themes/Ligth";
import store from "./store/reducers/store";
import { Loading, Notify, Alert } from "./components";
import { LocationProvider } from "./context/LocationContext";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Light}>
        <GlobalStyles />
        <Loading />
        <Notify />
        <Alert />
        <BrowserRouter>
          <LocationProvider>
            <AppRoutes />
          </LocationProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
