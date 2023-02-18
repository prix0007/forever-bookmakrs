import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { filecoinHyperspace } from "wagmi/chains";

import { createHashRouter, RouterProvider } from "react-router-dom";
import Home, { homeLoader } from "./views/home";
import About, { aboutLoader } from "./views/about";
import NoPage from "./views/404";
import Root from "./views/root";

import { Provider } from "react-redux";
import store from "./redux/store";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Index, { indexLoader } from "./views";

const { provider } = configureChains(
  [filecoinHyperspace],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://api.hyperspace.node.glif.io/rpc/v1`,
      }),
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  provider: provider,
});

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NoPage />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader: indexLoader,
      },
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
    <WagmiConfig client={client}>
      <ChakraProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);
