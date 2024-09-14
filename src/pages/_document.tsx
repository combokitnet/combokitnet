import { APP_DESC, APP_NAME } from "@/configs/const";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head></Head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6LN3959"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Static Loading Spinner */}
        <div
          id="globalLoader"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.99)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999999,
            width: "100vw",
            height: "100vh",
            color: "black",
            flexDirection: "column",
            padding: "32px",
          }}
        >
          <img
            src="/favicon.ico"
            className="h-6 mr-3 sm:h-9"
            alt={`${APP_NAME} Logo`}
          />
          <p className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            {APP_NAME}
          </p>
          <p>{APP_DESC}</p>
        </div>

        <Main />
        <Script src="/js/my_main.js" strategy="beforeInteractive" />
        <NextScript />
      </body>
    </Html>
  );
}
