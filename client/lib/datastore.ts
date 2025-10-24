import { apiFetch } from "@/lib/api";

export type ID = string;
export interface Blog {
  id: ID;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  author_name?: string;
  author_image?: string;
  status: "draft" | "published";
  published_at?: string | null;
}

const LS_KEY = "DCodeCafe_blogs";

interface BlogStore {
  list(token?: string): Promise<Blog[]>;
  create(input: Omit<Blog, "id">, token?: string): Promise<Blog>;
  update(
    id: ID,
    input: Partial<Omit<Blog, "id">>,
    token?: string,
  ): Promise<Blog>;
  remove(id: ID, token?: string): Promise<void>;
}

class LocalBlogStore implements BlogStore {
  private read(): Blog[] {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Blog[]) : [];
  }
  private write(items: Blog[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }
  async list(): Promise<Blog[]> {
    return this.read();
  }
  async create(input: Omit<Blog, "id">): Promise<Blog> {
    const items = this.read();
    const id = crypto.randomUUID();
    const b: Blog = { id, ...input };
    items.unshift(b);
    this.write(items);
    return b;
  }
  async update(id: ID, input: Partial<Omit<Blog, "id">>): Promise<Blog> {
    const items = this.read();
    const i = items.findIndex((x) => x.id === id);
    if (i === -1) throw new Error("Not found");
    items[i] = { ...items[i], ...input };
    this.write(items);
    return items[i];
  }
  async remove(id: ID): Promise<void> {
    const items = this.read();
    this.write(items.filter((x) => x.id !== id));
  }
}

class RemoteBlogStore implements BlogStore {
  async list(token?: string): Promise<Blog[]> {
    return apiFetch<Blog[]>("/api/blogs", { token });
  }
  async create(input: Omit<Blog, "id">, token?: string): Promise<Blog> {
    return apiFetch<Blog>("/api/blogs", { method: "POST", body: input, token });
  }
  async update(
    id: ID,
    input: Partial<Omit<Blog, "id">>,
    token?: string,
  ): Promise<Blog> {
    return apiFetch<Blog>(`/api/blogs/${id}`, {
      method: "PUT",
      body: input,
      token,
    });
  }
  async remove(id: ID, token?: string): Promise<void> {
    await apiFetch(`/api/blogs/${id}`, { method: "DELETE", token });
  }
}

const USE_LOCAL = Boolean(import.meta.env.VITE_AUTH_FAKE);
export const BlogStore: BlogStore = USE_LOCAL
  ? new LocalBlogStore()
  : new RemoteBlogStore();
