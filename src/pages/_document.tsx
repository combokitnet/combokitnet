import { APP_DESC_LOADING, APP_NAME } from "@/configs/const";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9445342853950859"
          crossOrigin="anonymous"
        ></script>
      </Head>

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
            padding: "12px",
          }}
        >
          <img
            src="/favicon.ico"
            alt="App Logo"
            style={{
              height: "24px",
              marginRight: "12px",
            }}
          />
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "800",
              whiteSpace: "nowrap",
              color: "black",
              textAlign: "center",
            }}
          >
            {APP_NAME}
          </p>
          <p
            style={{
              fontSize: "1rem",
              textAlign: "center",
              fontWeight: "600",
              whiteSpace: "nowrap",
              color: "black",
            }}
          >
            {APP_DESC_LOADING}
          </p>
        </div>

        <Main />
        <Script
          src={`/js/my_main.js?v=${Date.now()}`}
          strategy="beforeInteractive"
        />
        <NextScript />
      </body>
    </Html>
  );
}
