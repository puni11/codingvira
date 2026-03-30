"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  Edit2Icon,
} from "lucide-react";

const categories = ["All", "Technology", "Business", "Marketing", "AI", "Design"];

export default function BlogListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    fetchBlogs();
  }, [search, category, page]);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/blog/list?search=${search}&category=${category}&page=${page}`
    );
    const data = await res.json();
    setBlogs(data.blogs);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  const updateFilters = (newFilters: {
    search?: string;
    category?: string;
    page?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newFilters.search !== undefined)
      params.set("search", newFilters.search);
    if (newFilters.category !== undefined)
      params.set("category", newFilters.category);
    if (newFilters.page !== undefined)
      params.set("page", newFilters.page.toString());
    else params.set("page", "1");

    router.push(`/dashboard/blog?${params.toString()}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Blogs</h1>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            defaultValue={search}
            placeholder="Search blogs..."
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2"
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateFilters({ category: cat })}
            className={`px-4 py-2 rounded-full text-sm ${
              category === cat
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-50 text-left text-sm">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-gray-500"
                  >
                    No blogs found
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-t border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {blog.title}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {blog.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 line-clamp-2 max-w-sm">
                      {blog.description}
                    </td>
                    <td className="px-4 py-3 ">
                        <button
                        onClick={() =>
                          router.push(`/dashboard/blog/edit/${blog._id}`)
                        }
                        className="text-black text-sm font-medium hover:underline mr-3"
                      >
                        <Edit2Icon size={18} />
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/dashboard/blog/${blog.slug}`)
                        }
                        className="text-black text-sm font-medium hover:underline"
                      >
                        <EyeIcon size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-6">
          <button
            disabled={page === 1}
            onClick={() => updateFilters({ page: page - 1 })}
            className="p-2 border rounded-lg disabled:opacity-30"
          >
            <ChevronLeft />
          </button>
          <span className="font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => updateFilters({ page: page + 1 })}
            className="p-2 border rounded-lg disabled:opacity-30"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
