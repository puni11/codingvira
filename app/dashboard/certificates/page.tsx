
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle, Plus, Trash2, Eye } from "lucide-react";

interface Certificate {
  _id?: string;
  studentName: string;
  domain: string;
  duration: string;
  certificateNo: string;
  startingDate: string;
  awardDate: string;
  status: string;
}

export default function CertificatesAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [form, setForm] = useState<Certificate>({
    studentName: "",
    domain: "",
    duration: "",
    certificateNo: "",
    startingDate: "",
    awardDate: "",
    status: "verified",
  });
  const [loadingStatus, setLoadingStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [fetchingCerts, setFetchingCerts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch existing certificates
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch("/api/certificates/list");
        if (res.ok) {
          const data = await res.json();
          setCertificates(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
      } finally {
        setFetchingCerts(false);
      }
    };

    if (session) {
      fetchCertificates();
    }
  }, [session]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoadingStatus("loading");

    // Validation
    if (
      !form.studentName ||
      !form.domain ||
      !form.certificateNo ||
      !form.startingDate ||
      !form.awardDate
    ) {
      setError("All fields are required");
      setLoadingStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/certificates/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create certificate");
      }

      setLoadingStatus("success");
      setCertificates((prev) => [data.data, ...prev]);
      setForm({
        studentName: "",
        domain: "",
        duration: "",
        certificateNo: "",
        startingDate: "",
        awardDate: "",
        status: "verified",
      });

      // Reset status after 3 seconds
      setTimeout(() => setLoadingStatus("idle"), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoadingStatus("error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/certificates/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCertificates((prev) => prev.filter((cert) => cert._id !== id));
      } else {
        setError("Failed to delete certificate");
      }
    } catch (err) {
      setError("Error deleting certificate");
    } finally {
      setDeletingId(null);
    }
  };

  if (status === "loading" || fetchingCerts) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-black animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Redirected above
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-8 font-sans text-slate-900">
      <div className="">
        {/* Header - Aligned to the left, bold dark text */}
        <div className="mb-10 pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Certificate Management
          </h1>
          <p className="text-slate-500">
            Add and manage student certificates for verification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Add Certificate Form - Flat design, light borders */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Add New Certificate
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Student Name */}
                <div>
                  <input
                    type="text"
                    name="studentName"
                    value={form.studentName}
                    onChange={handleInputChange}
                    placeholder="Student Name *"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                  />
                </div>

                {/* Domain */}
                <div>
                  <input
                    type="text"
                    name="domain"
                    value={form.domain}
                    onChange={handleInputChange}
                    placeholder="Domain / Course *"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                  />
                </div>

                {/* Duration */}
                <div>
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleInputChange}
                    placeholder="Duration (e.g., 4 weeks)"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                  />
                </div>

                {/* Certificate Number */}
                <div>
                  <input
                    type="text"
                    name="certificateNo"
                    value={form.certificateNo}
                    onChange={handleInputChange}
                    placeholder="Certificate No *"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                  />
                </div>

                {/* Dates Container - Placed side-by-side like filters */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Starting Date */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Start Date *</label>
                    <input
                      type="date"
                      name="startingDate"
                      value={form.startingDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-sm text-slate-700 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                    />
                  </div>

                  {/* Award Date */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Award Date *</label>
                    <input
                      type="date"
                      name="awardDate"
                      value={form.awardDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-sm text-slate-700 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm text-slate-700 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition bg-white"
                  >
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="revoked">Revoked</option>
                  </select>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-2">
                    <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Success Message */}
                {loadingStatus === "success" && (
                  <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Certificate added successfully.</span>
                  </div>
                )}

                {/* Submit Button - Solid Black styling */}
                <button
                  type="submit"
                  disabled={loadingStatus === "loading"}
                  className="w-full bg-black text-white text-sm font-medium py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {loadingStatus === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Add Certificate"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Certificates List - Flat table design */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-bold text-slate-900">
                  Submissions ({certificates.length})
                </h2>
              </div>

              {certificates.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <p className="text-sm">No certificates found. Add one to get started.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">
                          Domain
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">
                          Certificate No
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-500 whitespace-nowrap">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right font-semibold text-slate-500 whitespace-nowrap">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((cert, idx) => (
                        <tr
                          key={cert._id || idx}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-slate-900">
                            {cert.studentName}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {cert.domain}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {cert.certificateNo}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md border ${
                                cert.status === "verified"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : cert.status === "pending"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }`}
                            >
                              {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3 text-slate-400">
                              <button
                                onClick={() =>
                                  router.push(
                                    `/verify-certificate?id=${cert.certificateNo}`
                                  )
                                }
                                className="hover:text-slate-900 transition-colors"
                                title="View certificate"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(cert._id || "")}
                                disabled={deletingId === cert._id}
                                className="hover:text-red-600 transition-colors disabled:opacity-50"
                                title="Delete certificate"
                              >
                                {deletingId === cert._id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}