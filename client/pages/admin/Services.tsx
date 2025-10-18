import { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number | null;
}

export default function AdminServices() {
  const { token } = useAuth();
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const empty: Omit<Service, "id"> = useMemo(
    () => ({
      title: "",
      slug: "",
      description: "",
      price: null,
    }),
    []
  );

  const [form, setForm] = useState<Omit<Service, "id">>(empty);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
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
        const res = await fetch(`/api/services/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Create failed");
        const created = await res.json();
        setItems((prev) => [created, ...prev]);
      }
      setForm(empty);
      setEditingId(null);
    } catch (e: any) {
      const errorMsg = e.message || "Save failed";
      if (errorMsg.includes("duplicate key") || errorMsg.includes("slug")) {
        setError(`The slug "${form.slug}" is already in use. Please choose a different slug.`);
      } else {
        setError(errorMsg);
      }
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      setError(e.message || "Delete failed");
    }
  }

  function onEdit(item: Service) {
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
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Services
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your service offerings
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border bg-card p-6 shadow-sm grid gap-3"
          >
            <h2 className="font-semibold">
              {editingId ? "Edit service" : "New service"}
            </h2>
            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            <label className="text-sm font-medium">Title</label>
            <input
              className="rounded-md border bg-background px-3 py-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <label className="text-sm font-medium">Slug</label>
            <input
              className="rounded-md border bg-background px-3 py-2"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
            />

            <label className="text-sm font-medium">Description</label>
            <textarea
              className="rounded-md border bg-background px-3 py-2"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              required
            />

            <label className="text-sm font-medium">Price (optional)</label>
            <input
              type="number"
              step="0.01"
              className="rounded-md border bg-background px-3 py-2"
              value={form.price || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value ? parseFloat(e.target.value) : null,
                })
              }
              placeholder="e.g., 5000"
            />

            <div className="mt-2 flex items-center gap-2">
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setForm(empty);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="font-semibold">All services</h2>
            {loading ? (
              <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
            ) : items.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                No services yet.
              </p>
            ) : (
              <ul className="mt-3 divide-y">
                {items.map((item) => (
                  <li key={item.id} className="py-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          /{item.slug}
                          {item.price && ` · $${item.price}`}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDelete(item.id)}
                        >
                          Delete
                        </Button>
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
