import { request } from "@/configs/request";
import Cookies from "js-cookie";
import { Inter } from "next/font/google";
import { PropsWithChildren, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout(props: PropsWithChildren) {
  useEffect(() => {
    const tokenType = Cookies.get("tokenType");
    if (tokenType === "login") {
      //TODO: auth with user info
    } else {
      request("/guest", { method: "POST" })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <main className={`${inter.className} h-full`}>
      {/* <Head>
        <title>{`${APP_NAME} - ${APP_DESC}`}</title>
        <meta name="description" content={APP_DESC} />
        <meta name="author" content={`Team ${APP_NAME}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
      <Header />
      <>{props.children}</>
      <br />
      <Footer />
    </main>
  );
}
