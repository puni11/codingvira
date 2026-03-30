"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/component/Editor";
import { Loader2, XCircle } from "lucide-react";

const categories = ["Technology", "Business", "Marketing", "AI", "Design"];

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    slug: "",
    category: "",
    metaTitle: "",
    metaDescription: "",
    content: null,
    fileUrl: "",
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    console.log("Fetching blog with ID:", id);
    try {
      const res = await fetch(`/api/blog/edit/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setError("Blog not found");
        return;
      }

      setForm(data);
    } catch {
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    setError("");

    const res = await fetch(`/api/blog/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Update failed");
      setSaving(false);
      return;
    }

    router.push("/dashboard/blog");
  };

  const handleImageUpload = async (file: File) => {
    setLoadingImage(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload_image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setForm((prev: any) => ({ ...prev, fileUrl: data.url }));
    }

    setLoadingImage(false);
  };

  const handleRemoveImage = async () => {
    if (!form.fileUrl) return;

    await fetch("/api/delete_image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: form.fileUrl }),
    });

    setForm((prev: any) => ({ ...prev, fileUrl: "" }));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8 bg-white">

      <h1 className="text-3xl font-bold">Edit Blog</h1>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl">
          <XCircle size={18} />
          {error}
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-800">Title</label>
        <input
          className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-black focus:bg-white transition outline-none"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />
      </div>

      {/* Description + Featured Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Description */}
        <div className="space-y-3">
          <label className="font-semibold text-gray-800">
            Short Description
          </label>

          <textarea
            className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black focus:bg-white transition outline-none resize-none"
            rows={6}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* Featured Image */}
        <div className="space-y-3">
          <label className="font-semibold text-gray-800">
            Featured Image
          </label>

          {!form.fileUrl ? (
            <label className="flex flex-col items-center justify-center w-full aspect-[2/1] border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
              <span className="text-sm text-gray-500 mb-2">
                {loadingImage ? "Uploading..." : "Click to upload image"}
              </span>

              <span className="text-xs text-gray-400">
                Recommended ratio: 1200 × 600
              </span>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleImageUpload(e.target.files[0]);
                  }
                }}
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-sm border">
                <img
                  src={form.fileUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                onClick={handleRemoveImage}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-800">Category</label>
        <select
          className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black focus:bg-white transition outline-none"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Editor */}
      <div className="space-y-3">
        <label className="font-semibold text-gray-800">Content</label>
        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
         {form.content && (
  <Editor
    data={form.content}
    onChange={(content) =>
      setForm({ ...form, content })
    }
  />
)}
        </div>
      </div>

      {/* SEO */}
      <div className="border border-dashed rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-gray-700">
          SEO Settings
        </h2>

        <input
          placeholder="Meta title"
          className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          value={form.metaTitle}
          onChange={(e) =>
            setForm({ ...form, metaTitle: e.target.value })
          }
        />

        <textarea
          placeholder="Meta description"
          className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          rows={2}
          value={form.metaDescription}
          onChange={(e) =>
            setForm({ ...form, metaDescription: e.target.value })
          }
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleUpdate}
        disabled={saving}
        className="px-8 py-4 rounded-xl font-bold bg-black text-white hover:bg-zinc-800 transition flex items-center gap-3 disabled:opacity-60"
      >
        {saving && <Loader2 className="animate-spin" size={18} />}
        Update Blog
      </button>

    </div>
  );
}