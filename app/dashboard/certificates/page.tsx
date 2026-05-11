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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Redirected above
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Certificate Management
          </h1>
          <p className="text-lg text-slate-600">
            Add and manage student certificates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Certificate Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Add Certificate
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Student Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={form.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter student name"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Domain */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Domain/Course *
                  </label>
                  <input
                    type="text"
                    name="domain"
                    value={form.domain}
                    onChange={handleInputChange}
                    placeholder="e.g., Web Development"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 4 weeks"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Certificate Number */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Certificate No *
                  </label>
                  <input
                    type="text"
                    name="certificateNo"
                    value={form.certificateNo}
                    onChange={handleInputChange}
                    placeholder="e.g., 20e6fee"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Starting Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Starting Date *
                  </label>
                  <input
                    type="date"
                    name="startingDate"
                    value={form.startingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Award Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Award Date *
                  </label>
                  <input
                    type="date"
                    name="awardDate"
                    value={form.awardDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  >
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="revoked">Revoked</option>
                  </select>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm flex items-center gap-2">
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {loadingStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    Certificate added successfully!
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loadingStatus === "loading"}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-6"
                >
                  {loadingStatus === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Certificate
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Certificates List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">
                  All Certificates ({certificates.length})
                </h2>
              </div>

              {certificates.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <p className="text-lg">No certificates added yet</p>
                  <p className="text-sm">Add your first certificate using the form</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                          Student
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                          Domain
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                          Cert No
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((cert, idx) => (
                        <tr
                          key={cert._id || idx}
                          className="border-b border-slate-100 hover:bg-slate-50 transition"
                        >
                          <td className="px-6 py-4 text-slate-900 font-medium">
                            {cert.studentName}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {cert.domain}
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-mono text-sm">
                            {cert.certificateNo}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                                cert.status === "verified"
                                  ? "bg-green-100 text-green-800"
                                  : cert.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {cert.status === "verified" && (
                                <CheckCircle className="w-4 h-4" />
                              )}
                              {cert.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  router.push(
                                    `/verify-certificate?id=${cert.certificateNo}`
                                  )
                                }
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="View certificate"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(cert._id || "")}
                                disabled={deletingId === cert._id}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                title="Delete certificate"
                              >
                                {deletingId === cert._id ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-5 h-5" />
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
