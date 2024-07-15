
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions {
    method?: HttpMethod;
    body?: Record<string, any>;
}

export async function request<T>(
    endpoint: string,
    { method = 'GET', body }: ApiOptions = {}
): Promise<T> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options: RequestInit = {
        method,
        headers,
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
    };

    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json() as T;
    } catch (error: any) {
        console.error('Error calling API:', error?.message || error);
        throw error;
    }
}
