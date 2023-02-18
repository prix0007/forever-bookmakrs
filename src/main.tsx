import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { homeLoader } from "./views/home";
import About, { aboutLoader } from "./views/about";
import NoPage from "./views/404";
import Root from "./views/root";

import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NoPage />,
    children: [
      {
        path: "home",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "about",
        element: <About />,
        loader: aboutLoader,
      },
    ],
  },
]);

// TODO: Find a way to push div with id root in body.
const rootElement =
  document.getElementById("root") || document.createElement("div");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
