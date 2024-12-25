import { LOCAL_STORAGE } from "@/configs/const";
import { DAY } from "@/utils/time";
import { useEffect, useState } from "react";

const WarnNotStorePassword: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  // get lastest time close the warning in local storage key PASSWORD_WARN_NOT_STORE_PASSWORD and check if it is more than 7 day then show the warning

  useEffect(() => {
    const lastClosedTime = localStorage.getItem(
      LOCAL_STORAGE.PASSWORD_WARN_NOT_STORE_PASSWORD
    );
    const now = new Date().getTime();

    if (lastClosedTime) {
      const timeDifference = now - parseInt(lastClosedTime, 10);
      if (timeDifference > 7 * DAY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleCloseWarning = () => {
    localStorage.setItem(
      LOCAL_STORAGE.PASSWORD_WARN_NOT_STORE_PASSWORD,
      new Date().getTime().toString()
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-3 rounded-md flex justify-between items-start">
      <p className="text-sm font-medium">
        Rest assured, we do not store your passwords. Everything is generated
        and processed securely on your device. <br /> You can review the source
        code on our{" "}
        <a
          href="https://github.com/combokitnet/combokitnet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub repository
        </a>
        .
      </p>
      <button
        onClick={handleCloseWarning}
        className="text-yellow-700 hover:text-yellow-900 ml-4 focus:outline-none"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};

export default WarnNotStorePassword;
