import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    blue_1: "#2A3F6F",
    blue_2: "#455A89",
    blue_3: "#06163A",
    yellow_1: "#A68332",
    yellow_2: "#CCAA5C",
    yellow_3: "#563C00",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

reportWebVitals();
