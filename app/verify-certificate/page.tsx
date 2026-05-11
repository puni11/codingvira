"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, AlertCircle } from "lucide-react";

interface CertificateData {
  studentName: string;
  domain: string;
  duration: string;
  certificateNo: string;
  startingDate: string;
  awardDate: string;
  status: string;
}

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [certificateData, setCertificateData] = useState<CertificateData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCertificateData(null);
    setSearched(true);

    if (!certificateId.trim()) {
      setError("Please enter a certificate ID");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/certificates/verify?id=${encodeURIComponent(certificateId)}`
      );
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Certificate not found");
      } else {
        setCertificateData(result.data);
      }
    } catch (err) {
      setError("An error occurred while verifying the certificate");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Verify Certificate
          </h1>
          <p className="text-lg text-slate-600">
            Enter your certificate ID to verify its authenticity
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Certificate ID or Number
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter certificate code (e.g., 20e6fee)"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg py-3 pl-12 pr-4 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Error Message */}
        {error && searched && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 flex items-start gap-4"
          >
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Verification Failed</h3>
              <p className="text-red-800 text-sm mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Success Message & Certificate Details */}
        {certificateData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Verification Status */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900">
                  Certificate Verified ✓
                </h3>
                <p className="text-green-800 text-sm mt-1">
                  This certificate is authentic and valid.
                </p>
              </div>
            </div>

            {/* Certificate Details Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">
                  Certificate Details
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700 bg-slate-50 w-1/3">
                        Student Name
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {certificateData.studentName}
                      </td>
                    </tr>

                    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700 bg-slate-50 w-1/3">
                        Domain
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {certificateData.domain}
                      </td>
                    </tr>

                    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700 bg-slate-50 w-1/3">
                        Duration
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {certificateData.duration}
                      </td>
                    </tr>

                    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700 bg-slate-50 w-1/3">
                        Certificate No
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-mono">
                        {certificateData.certificateNo}
                      </td>
                    </tr>

                    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700 bg-slate-50 w-1/3">
                        Starting Date
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {certificateData.startingDate}
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700 bg-slate-50 w-1/3">
                        Award Date
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {certificateData.awardDate}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Status Badge */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-slate-700 font-medium">Status</span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  {certificateData.status}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                setCertificateId("");
                setCertificateData(null);
                setError("");
                setSearched(false);
              }}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Search Another Certificate
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!certificateData && searched && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600">Searching for your certificate...</p>
          </motion.div>
        )}

        {/* Info Section */}
        {!searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mt-8"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              How to verify your certificate?
            </h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>Enter your unique certificate number in the search field above</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>Click the "Search" button to verify authenticity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>View detailed certificate information if verified</span>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
