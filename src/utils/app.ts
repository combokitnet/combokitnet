function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to the bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export const copyToClipboard = async (text: string) => {
  if (typeof navigator.clipboard === "undefined") {
    console.warn(
      "Clipboard API not available. Falling back to textarea method."
    );
    fallbackCopyTextToClipboard(text);
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
    console.warn("Falling back to textarea method.");
    fallbackCopyTextToClipboard(text);
  }
};
