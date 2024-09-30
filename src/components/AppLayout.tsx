import { request } from "@/configs/request";
import Cookies from "js-cookie";
import { Inter } from "next/font/google";
import { PropsWithChildren, useEffect } from "react";
import { Toaster } from "react-hot-toast";
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
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <main className={`${inter.className} h-full`}>
      <Header />
      <div className="p-[0_12px] sm:p-[0_18px]">{props.children}</div>
      <br />
      <Footer />
      <Toaster />
    </main>
  );
}
