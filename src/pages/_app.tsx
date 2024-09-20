import { APP_DESC, APP_DOMAIN, APP_NAME, APP_SOCIAL } from "@/configs/const";
import { AppProvider } from "@/contexts/AppContext";
import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";

import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteStart = () => NProgress.start();
  //   const handleRouteDone = () => NProgress.done();

  //   Router.events.on("routeChangeStart", handleRouteStart);
  //   Router.events.on("routeChangeComplete", handleRouteDone);
  //   Router.events.on("routeChangeError", handleRouteDone);

  //   return () => {
  //     Router.events.off("routeChangeStart", handleRouteStart);
  //     Router.events.off("routeChangeComplete", handleRouteDone);
  //     Router.events.off("routeChangeError", handleRouteDone);
  //   };
  // }, []);

  return (
    <>
      <DefaultSeo
        title={`${APP_NAME} | ${APP_DESC}`}
        description={APP_DESC}
        canonical={`https://${APP_DOMAIN}${router.asPath}`}
        twitter={{
          handle: APP_SOCIAL?.twitter,
          site: APP_SOCIAL?.twitter,
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "dc:creator",
            content: APP_NAME,
          },
          {
            name: "application-name",
            content: APP_NAME,
          },
        ]}
      />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
