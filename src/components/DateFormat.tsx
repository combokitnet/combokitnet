import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

interface DateComponentProps {
  date: Date;
}

const DateFormat: React.FC<DateComponentProps> = ({ date }) => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const localeCookie = Cookies.get("NEXT_LOCALE") || "en";
    const formatted = date.toLocaleDateString(localeCookie);
    setFormattedDate(formatted);
  }, [date, Cookies.get("NEXT_LOCALE")]);

  return <>{formattedDate}</>;
};

export default DateFormat;
