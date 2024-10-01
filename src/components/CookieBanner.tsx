import React, { useEffect, useState } from "react";

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent || cookieConsent === "rejected") {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
        <p>
          We use cookies to enhance your experience by personalizing content and
          ads, providing social media features, and analyzing our traffic.{" "}
          <br /> By clicking "Accept", you agree to our use of cookies as
          outlined in our{" "}
          <a className="text-blue-600" href="/tos" target="_blank">
            Terms of Service
          </a>
          . <br />
          {/* You can also choose to "Reject" non-essential cookies. */}
        </p>
        <div className="mt-2">
          <button
            onClick={handleAccept}
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
          >
            Accept
          </button>
          {/* <button
            onClick={handleReject}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Reject
          </button> */}
        </div>
      </div>
    )
  );
};

export default CookieBanner;
