(() => {
  let startAt = new Date();
  console.log(new Date(), "page load");

  // loading screen
  const minLoadTime = 1250; // x seconds in milliseconds
  window.addEventListener("load", function () {
    const loader = document.getElementById("globalLoader");
    const loadAt = new Date();
    console.log(loadAt, "load");

    if (loader) {
      const elapsed = loadAt.getTime() - startAt.getTime();
      if (elapsed < minLoadTime) {
        setTimeout(() => {
          loader.style.display = "none";
          console.log(new Date(), "off loading");
        }, minLoadTime - elapsed);
      } else {
        loader.style.display = "none";
      }
    }
  });

  // eruda debug
  if (/debug=true/.test(window.location.search)) {
    var script = document.createElement("script");
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    script.onload = function () {
      eruda.init();
    };
    document.body.appendChild(script);
  }

  var hostname = window.location.hostname;
  if (hostname !== "localhost") {
    // Google Analytics (GA4)
    var gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-9N1Z6FQVL0";
    document.head.appendChild(gtagScript);

    gtagScript.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-9N1Z6FQVL0");
    };

    // Google Tag Manager (GTM)
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-N6LN3959");
  } else {
    console.log("On localhost GA and GTM will be not load.");
  }

  const originalOnError = window.onerror;

  // Error handler
  window.onerror = function (message, source, lineno, colno, error) {
    console.log("Error Handler: ", {
      message,
      source,
      lineno,
      colno,
      error,
    });

    // Send error details to the server, log, or handle as needed
    // sendErrorToServer({ message, source, lineno, colno, error });

    // call original onerror
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };
})();
