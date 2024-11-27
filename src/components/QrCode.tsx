"use client";
import QRCodeStyling, { Options } from "qr-code-styling";
import { useEffect, useRef, useState } from "react";

// using with no need download

export default function QrCode(props: {
  options?: Options;
  data: string;
  className?: string | undefined;
}) {
  const [qrOptions, setQROptions] = useState<Options>({
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
  });

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
    if (!qrCode) return;
    qrCode?.update(qrOptions);
  }, [qrCode, qrOptions]);

  useEffect(() => {
    setQROptions((m) => ({ ...m, ...props?.options, data: props?.data }));
  }, [props]);

  return <div className={props?.className} ref={ref}></div>;
}
