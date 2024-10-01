import { useEffect } from "react";

export default function Changelog() {
  useEffect(() => {
    if (window && window?.ezstandalone) {
      window?.ezstandalone.cmd.push(function () {
        window?.ezstandalone?.showAds(101);
      });
    }
  }, []);
  return (
    <div>
      changelog
      <div id="ezoic-pub-ad-placeholder-101"></div>
    </div>
  );
}
