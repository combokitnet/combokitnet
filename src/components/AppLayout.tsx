import { APP_DESC, APP_NAME } from "@/configs/const";
import { Inter } from "next/font/google";
import Head from "next/head";
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout(props: PropsWithChildren) {
  return (
    <main className={`${inter.className} h-full`}>
      <Head>
        <title>{`${APP_NAME} - ${APP_DESC}`}</title>
        <meta name="description" content={APP_DESC} />
        <meta name="author" content={`Team ${APP_NAME}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <>{props.children}</>
      <br />
      <Footer />
    </main>
  );
}
