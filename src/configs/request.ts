import axios, { AxiosRequestConfig } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  body?: Record<string, any>;
}

export async function request<T>(
  endpoint: string,
  { method = "GET", body }: ApiOptions = {}
): Promise<T> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  const config: AxiosRequestConfig = {
    url: apiUrl,
    method,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: body,
  };

  try {
    const response = await axios?.request<T>(config);
    return response?.data;
  } catch (error: any) {
    console.error("Error calling API:", error?.message || error);
    throw error;
  }
}
