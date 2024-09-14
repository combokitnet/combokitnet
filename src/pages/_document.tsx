import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* GA4 and GTM Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
              
                var hostname = window.location.hostname;
                // Only initialize GA and GTM if not on localhost

                if (hostname !== 'localhost') {
                  // Google Analytics (GA4)
                  var gtagScript = document.createElement('script');
                  gtagScript.async = true;
                  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-9N1Z6FQVL0';
                  document.head.appendChild(gtagScript);

                  gtagScript.onload = function() {
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-9N1Z6FQVL0');
                  };

                  // Google Tag Manager (GTM)
                  (function(w,d,s,l,i){
                    w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-N6LN3959');
                }
              })();
            `,
          }}
        />

        {/* Conditional Eruda Script for Debugging */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                if (!/debug=true/.test(window.location.search)) return;
                var src = '//cdn.jsdelivr.net/npm/eruda';
                document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
                document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
              })();
            `,
          }}
        />
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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
