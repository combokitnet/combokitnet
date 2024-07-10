import en from "@/messages/en.json";

type Messages = typeof en;

declare global {
  // for useTranslate
  interface IntlMessages extends Messages {}
}
