import React from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import { Provider } from "react-redux";
import store from "./app/store";

import "./index.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </Provider>
);
