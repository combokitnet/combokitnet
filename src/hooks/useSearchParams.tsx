import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const useSearchParams = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams()
  );

  useEffect(() => {
    setSearchParams(new URLSearchParams(window?.location?.search));
  }, [router.query]);

  const getSearchParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const setSearchParam = useCallback(
    (key: string, value: string): void => {
      if (value) {
        searchParams.set(key, value);
        updateSearchParams();
      } else {
        deleteSearchParam(key);
      }
    },
    [searchParams]
  );

  const deleteSearchParam = useCallback(
    (key: string): void => {
      searchParams.delete(key);
      updateSearchParams();
    },
    [searchParams]
  );

  const updateSearchParams = useCallback(() => {
    const query = Object.fromEntries(searchParams.entries());
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  }, [router, searchParams]);

  return { getSearchParam, setSearchParam, deleteSearchParam, searchParams };
};

export default useSearchParams;
