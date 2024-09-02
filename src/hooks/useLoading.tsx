import { useCallback, useState } from "react";

export function useLoading() {
  const [loading, setLoading] = useState<boolean>(false);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const toggleLoading = useCallback(() => {
    setLoading((prev) => !prev);
  }, []);

  return { loading, startLoading, stopLoading, toggleLoading };
}
