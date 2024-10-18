import { APP_DESC_LOADING, APP_NAME } from "@/configs/const";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        
         {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "okhyrqoyd1");`,
          }}
        />
        
        <Script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          data-cfasync="false"
        ></Script>
        <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
        <script>
          {`
          try {
            window.ezstandalone = window.ezstandalone || {}; 
            ezstandalone.cmd = ezstandalone.cmd || [];
          } catch (error) {
            console.log(error)
          }
        `}
        </script>
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
              height: "42px",
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
