"use client";

import QRCodeStyling, { Options } from "qr-code-styling";
import { useEffect, useRef, useState } from "react";

export const useQRCode = (
  initialOptions: Options = {
    type: "svg",
    margin: 3,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    dotsOptions: {
      color: "#222222",
    },
  }
) => {
  const [qrOptions, setQROptions] = useState<Options>(initialOptions);
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQrCode(new QRCodeStyling(qrOptions));
  }, []);

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (qrCode) {
      console.log("update", new Date());
      qrCode.update(qrOptions);
    }
  }, [qrCode, qrOptions]);

  const updateOptions = (options: Partial<Options>) => {
    setQROptions((prevOptions) => ({ ...prevOptions, ...options }));
  };

  return { ref, update: updateOptions, qrCode };
};
