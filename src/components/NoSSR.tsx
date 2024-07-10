import React, { ReactNode, useEffect, useState } from "react";

interface NoSSRProps {
  fallback?: ReactNode;
  children?: ReactNode;
}

const NoSSR: React.FC<NoSSRProps> = ({ fallback = "...", children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default NoSSR;
