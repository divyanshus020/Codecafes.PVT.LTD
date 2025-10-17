export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim();
// If API_BASE_URL is empty, same-origin requests will be used (e.g. "/api/...").
// Expected endpoints:
// - POST   /api/admin/login
// - GET    /api/blogs
// - POST   /api/blogs
// - PUT    /api/blogs/:id
// - DELETE /api/blogs/:id

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiFetch<T = unknown>(
  path: string,
  options: {
    method?: HttpMethod;
    token?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {},
): Promise<T> {
  const base = API_BASE_URL;
  const url = base
    ? `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`
    : path.startsWith("/")
      ? path
      : `/${path}`;
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
  return (
    ct.includes("application/json")
      ? await res.json()
      : ((await res.text()) as any)
  ) as T;
}
