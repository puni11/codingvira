import { editorJsToHtml } from "@/lib/editorJsToHtml";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getBlog(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`,
    { cache: "no-store" } // always fresh
  );

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return {};

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.fileUrl ? [blog.fileUrl] : [],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return notFound();

  const htmlContent = editorJsToHtml(blog.content);

  return (
    <div className="bg-white">

      {/* Hero */}
     <div className="max-w-4xl mx-auto px-4 py-20">

  {/* Make hero image smaller & centered */}
  {blog.fileUrl && (
    <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] rounded-3xl overflow-hidden shadow-md mb-16 mt-4">
      <Image
        src={blog.fileUrl}
        alt={blog.title}
        fill
        className="object-cover"
        priority
      />
    </div>
  )}

  <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
    <span className="inline-block px-4 py-1 text-sm bg-black text-white rounded-full">
      {blog.category}
    </span>

    <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
      {blog.title}
    </h1>

    <p className="text-gray-500 text-lg">
      {blog.description}
    </p>
  </div>

  {/* Content */}
  <article
    className="blog-content"
    dangerouslySetInnerHTML={{ __html: htmlContent }}
  />
</div>

    </div>
  );
}