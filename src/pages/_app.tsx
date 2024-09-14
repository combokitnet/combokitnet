import { APP_DESC, APP_DOMAIN, APP_NAME, APP_SOCIAL } from "@/configs/const";
import { AppProvider } from "@/contexts/AppContext";
import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title={`${APP_NAME} | ${APP_DESC}`}
        description={APP_DESC}
        canonical={`https://${APP_DOMAIN}`}
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
