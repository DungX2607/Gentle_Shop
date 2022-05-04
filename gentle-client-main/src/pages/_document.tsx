import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
       
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
      <link href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap" rel="stylesheet"/>
      <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500&family=Roboto:wght@100;300;400;500&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}

          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
