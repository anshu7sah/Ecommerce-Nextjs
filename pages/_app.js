import "../styles/globals.scss";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
let persistor = persistStore(store);
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  let clientId;
  useEffect(() => {
    const environment = async () => {
      try {
        const { data } = await axios.get("/api/env");
        clientId = data.clientId;
      } catch (error) {}
    };
    environment();
  }, []);

  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta
          name="description"
          content="Shoppay-online shopping service for all of "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PayPalScriptProvider options={{ "client-id": clientId }}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
