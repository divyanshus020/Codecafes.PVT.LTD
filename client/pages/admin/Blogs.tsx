import { FormEvent, useEffect, useMemo, useState } from "react";
import { Blog, BlogStore } from "@/lib/datastore";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { uploadImage } from "@/lib/upload";

function UploadField({ onUploaded }: { onUploaded: (url: string) => void }) {
  const { token } = useAuth();
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="flex items-center gap-2">
      <input type="file" accept="image/*" onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file || !token) return;
        setPending(true);
        setErr(null);
        try {
          const { url } = await uploadImage(file, token);
          onUploaded(url);
        } catch (e: any) {
          setErr(e.message || "Upload failed");
        } finally {
          setPending(false);
        }
      }} />
      {pending && <span className="text-xs text-muted-foreground">Uploading…</span>}
      {err && <span className="text-xs text-destructive">{err}</span>}
    </div>
  );
}

export default function AdminBlogs() {
  const { token, devMode } = useAuth();
  const [items, setItems] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const empty: Omit<Blog, "id"> = useMemo(() => ({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    status: "draft",
    published_at: null,
  }), []);

  const [form, setForm] = useState<Omit<Blog, "id">>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await BlogStore.list(token || undefined);
      setItems(data);
    } catch (e: any) {
      setError(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        const updated = await BlogStore.update(editingId, form, token || undefined);
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      } else {
        const created = await BlogStore.create(form, token || undefined);
        setItems((prev) => [created, ...prev]);
      }
      setForm(empty);
      setEditingId(null);
    } catch (e: any) {
      setError(e.message || "Save failed");
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    try {
      await BlogStore.remove(id, token || undefined);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      setError(e.message || "Delete failed");
    }
  }

  function onEdit(item: Blog) {
    setEditingId(item.id);
    const { id, ...rest } = item;
    setForm(rest);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Blogs</h1>
            <p className="mt-1 text-sm text-muted-foreground">{devMode ? "Local storage (dev)" : "Server (remote)"}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-6 shadow-sm grid gap-3">
            <h2 className="font-semibold">{editingId ? "Edit post" : "New post"}</h2>
            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>
            )}
            <label className="text-sm font-medium">Title</label>
            <input className="rounded-md border bg-background px-3 py-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />

            <label className="text-sm font-medium">Slug</label>
            <input className="rounded-md border bg-background px-3 py-2" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />

            <label className="text-sm font-medium">Excerpt</label>
            <textarea className="rounded-md border bg-background px-3 py-2" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} />

            <label className="text-sm font-medium">Content (Markdown or HTML)</label>
            <textarea className="rounded-md border bg-background px-3 py-2" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} required />

            <label className="text-sm font-medium">Cover Image</label>
            <div className="grid gap-2">
              <input
                type="url"
                placeholder="https://..."
                className="rounded-md border bg-background px-3 py-2"
                value={form.cover_image || ""}
                onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
              />
              <UploadField onUploaded={(url) => setForm({ ...form, cover_image: url })} />
              {form.cover_image ? (
                <img src={form.cover_image} alt="cover" className="mt-2 h-28 w-full rounded-md object-cover" />
              ) : null}
            </div>

            <label className="text-sm font-medium">Status</label>
            <select className="rounded-md border bg-background px-3 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <div className="mt-2 flex items-center gap-2">
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm(empty); }}>Cancel</Button>
              )}
            </div>
          </form>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="font-semibold">All posts</h2>
            {loading ? (
              <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
            ) : items.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No posts yet.</p>
            ) : (
              <ul className="mt-3 divide-y">
                {items.map((item) => (
                  <li key={item.id} className="py-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">/{item.slug} · {item.status}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => onEdit(item)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>Delete</Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
