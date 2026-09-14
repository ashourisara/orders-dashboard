import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import dayjs from "dayjs";
import jalaliday from "jalali-plugin-dayjs";

import App from "./App";

import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";

dayjs.extend(jalaliday);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light">
      <App />
    </MantineProvider>
  </React.StrictMode>
);
