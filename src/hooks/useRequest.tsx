import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import { useCallback, useRef, useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  body?: Record<string, any>;
}

interface UseRequestOptions {
  onStart?: () => void;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

interface UseRequestResult<T> {
  request: (endpoint: string, options?: ApiOptions) => Promise<T>;
  response: T | null;
  loading: boolean;
  error: string | null;
  cancel: () => void;
  requestCount: number; // New property for tracking request calls
}

export function useRequest<T>({
  onStart,
  onSuccess,
  onError,
}: UseRequestOptions = {}): UseRequestResult<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState(0);

  const cancelSourceRef = useRef<CancelTokenSource | null>(null);

  const cancel = useCallback(() => {
    if (cancelSourceRef.current) {
      cancelSourceRef.current.cancel("Request canceled by the user");
    }
  }, []);

  const request = useCallback(
    async (endpoint: string, { method = "GET", body }: ApiOptions = {}) => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

      cancelSourceRef.current = axios.CancelToken.source();

      const config: AxiosRequestConfig = {
        url: apiUrl,
        method,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: body,
        cancelToken: cancelSourceRef.current.token,
      };

      setLoading(true);
      setError(null);
      if (onStart) {
        onStart();
      }

      try {
        const response = await axios.request<T>(config);
        console.log(1);
        setData(response?.data);
        setLoading(false);
        setRequestCount((prevCount) => prevCount + 1);
        if (onSuccess) {
          onSuccess(response?.data);
        }
        return response?.data;
      } catch (err: any) {
        setLoading(false);
        setError(err?.message || "Something went wrong");
        if (onError) onError(err?.message || err);
        throw err;
      }
    },
    [onStart, onSuccess, onError]
  );

  return { request, response: data, loading, error, cancel, requestCount }; // Return requestCount
}
