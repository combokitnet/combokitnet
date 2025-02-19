import { request } from "@/configs/request";
import { useAppContext } from "@/contexts/AppContext";
import { Inter } from "next/font/google";
import { PropsWithChildren, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { CelebrationConfetti } from "./CelebrationConfetti";
import Footer from "./Footer";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout(props: PropsWithChildren) {
  const { setUser } = useAppContext();
  useEffect(() => {
    request("/api/user", { method: "POST" })
      .then((res: any) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className={`${inter.className} h-full`}>
      <Header />
      <div className="p-[0_12px] sm:p-[0_18px]">{props.children}</div>
      <br />
      <Footer />
      <Toaster position="top-right" containerStyle={{ top: "60px" }} />
      <CelebrationConfetti />
    </main>
  );
}
