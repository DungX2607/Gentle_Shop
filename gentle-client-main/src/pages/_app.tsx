import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Router } from "next/router";
import React from "react";
import { Provider } from "react-redux";
import "../assets/css/main/reset.css";
import "../assets/css/components/pagination.css";
import "../assets/css/main/base.css";
import "../assets/css/main/grid.css";

import CheckAuth from "../components/CheckAuth";
import MySpinner from "../components/MySpinner";
import { store } from "../store";
import theme from "../theme";
import { client } from "../utils/lib/ApolloClient";
import { EXCEPTED_ROUTES } from "../utils/other/constants";




function MyApp({ Component, pageProps }: AppProps) {
  
  const [loading, setLoading] = React.useState(false);

 
  React.useEffect(() => {
    const start = (url: string) => {
      const isURLMatched = EXCEPTED_ROUTES.some((exceptedRoute) =>
        url.startsWith(exceptedRoute)
      );
      if (isURLMatched) {
        setLoading(true);
      }
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      {loading ? <MySpinner/> : (
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ChakraProvider resetCSS theme={theme}>
              <CheckAuth>
                <Component {...pageProps} />
              </CheckAuth>
            </ChakraProvider>
          </Provider>
        </ApolloProvider>
      )}
    </>
  );
}

export default MyApp;
