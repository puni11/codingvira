"use client";

import { useEffect, useState, useCallback } from "react";
import { slugify } from "@/lib/slugify";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Editor from "@/component/Editor";

const categories = ["Technology", "Business", "Marketing", "AI", "Design"];

export default function CreateBlogPage() {
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    slug: "",
    fileUrl:"",
    metaTitle: "",
    metaDescription: "",
    category: "",
    content: null,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  // Auto-generate slug from title
  useEffect(() => {
    if (form.title) {
      setForm((prev: any) => ({
        ...prev,
        slug: slugify(prev.title),
      }));
    }
  }, [form.title]);

  // Memoized to prevent Editor re-renders
  const handleEditorChange = useCallback((content: any) => {
    setForm((prev: any) => ({ ...prev, content }));
  }, []);

  const handleImageUpload = async (file: File) => {
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("file", file);  
    
    const res = await fetch("/api/upload_image", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      console.error("Image upload failed");
      setLoadingImage(false);
      return;
    }

    const data = await res.json();
    if (data.success) {
      setForm((prev: any) => ({ ...prev, fileUrl: data.url }));
      setLoadingImage(false);
    }
  };
const handleRemoveImage = async () => {
  if (!form.fileUrl) return;

  try {
    const res = await fetch("/api/delete_image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: form.fileUrl }),
    });

    const data = await res.json();

    if (data.success) {
      setForm((prev: any) => ({ ...prev, fileUrl: "" }));
    }
  } catch (error) {
    console.error("Failed to delete image");
  }
};
  const handlePublish = async () => {
    if (!form.title || !form.content) {
      setError("Title and Content are required");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <div className=" py-4 px-4 space-y-6 font-sans bg-white">
      <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-bold">Create New Blog</h1>
      <div>
   <button
  disabled={status === "loading" || status === "success"}
  onClick={handlePublish}
  className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold cursor-pointer transition-all flex items-center justify-center gap-3 disabled:opacity-70 ${
    status === "success" 
      ? "bg-green-600 text-white cursor-default" 
      : "bg-black hover:bg-zinc-800 text-white"
  }`}
>
  {status === "loading" && (
    <Loader2 className="animate-spin" size={20} />
  )}

  {status === "success" && (
    <CheckCircle size={20} />
  )}
  Publish 
</button>
      </div>
      </div>
 {/* Status Messages */}
      {status === "error" && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl">
          <XCircle size={18} />
          {error}
        </div>
      )}
      {/* Title */}
      <div className="space-y-2">
        <label className="font-medium ">Title</label>
        <input
          placeholder="Blog title"
          className="w-full border border-gray-300 text-gray-700 rounded-xl px-4 py-3 text-lg focus:ring-2 mt-2 focus:ring-black outline-none"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

  {/* Short Description */}
  <div className="space-y-3">
    <label className="font-semibold text-gray-800">
      Short Description
    </label>

    <textarea
      placeholder="Write a short summary of this blog..."
      className="w-full border border-gray-200 bg-gray-50 text-gray-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none resize-none"
      rows={6}
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
    />

    <p className="text-xs text-gray-400">
      This will appear in previews and SEO snippets.
    </p>
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
          Recommended ratio: 2:1 (1200 × 600)
        </span>

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Slug */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-950">Slug (URL)</label>
          <input
            className="w-full border border-gray-300 text-gray-700 mt-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            value={form.slug}
            readOnly
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-950">Category</label>
          <select
            className="w-full border border-gray-300 text-gray-700 mt-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor Container */}
      <div className="space-y-2">
        <label className="font-medium">Content</label>
        <div className="bg-white border border-gray-300 mt-2 rounded-2xl p-2 md:p-5">
          <Editor onChange={handleEditorChange} data={form.content} />
        </div>
      </div>

      {/* SEO Section */}
      <div className=" border border-dashed rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-gray-700">SEO Settings</h2>
        <input
          placeholder="Meta title"
          className="w-full border border-gray-300 text-gray-700 mt-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          value={form.metaTitle}
          onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
        />
        <textarea
          placeholder="Meta description"
          className="w-full border border-gray-300 text-gray-700 mt-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          rows={2}
          value={form.metaDescription}
          onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
        />
      </div>

     


    </div>
  );
}