export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
// Set VITE_API_BASE_URL to your PHP backend base URL, e.g. "https://api.codecafe.dev".
// Expected endpoints:
// - POST   /api/admin/login            { username, password } -> { token, user }
// - GET    /api/blogs                  -> Blog[]
// - POST   /api/blogs                  { ...BlogFields } -> Blog
// - PUT    /api/blogs/:id              { ...BlogFields } -> Blog
// - DELETE /api/blogs/:id              -> 204

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiFetch<T = unknown>(
  path: string,
  options: { method?: HttpMethod; token?: string; body?: any; headers?: Record<string, string> } = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not set. Configure VITE_API_BASE_URL to point to your PHP backend.");
  }
  const url = `${API_BASE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  const { method = "GET", token, body, headers = {} } = options;
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body != null ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  const ct = res.headers.get("content-type") || "";
  return (ct.includes("application/json") ? await res.json() : (await res.text() as any)) as T;
}
