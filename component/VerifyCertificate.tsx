"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  CheckCircle,
  AlertCircle,
  Download,
  Share2,
  FileText,
  Award,
} from "lucide-react";

interface CertificateData {
  studentName: string;
  domain: string;
  duration: string;
  certificateNo: string;
  startingDate: string;
  awardDate: string;
  status: string;
  certificateUrl?: string;
}

export default function VerifyCertificate({
  certificateId: initialCertificateId,
}: {
  certificateId: string;
}) {
  const [certificateId, setCertificateId] = useState(
    initialCertificateId || ""
  );

  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const performVerification = useCallback(async (id: string) => {
    if (!id.trim()) {
      setError("Please enter a certificate ID");
      return;
    }

    setError("");
    setCertificateData(null);
    setSearched(true);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/certificates/verify?id=${encodeURIComponent(id)}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Certificate not found");
      } else {
        setCertificateData(result.data);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while verifying the certificate");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto verify from search params
  useEffect(() => {
    if (initialCertificateId) {
      performVerification(initialCertificateId);
    }
  }, [initialCertificateId, performVerification]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(certificateId);
  };

  const handleDownload = () => {
    if (certificateData?.certificateUrl) {
      window.open(certificateData.certificateUrl, "_blank");
    } else {
      window.print();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Verified Certificate",
          text: `Check out this verified certificate for ${certificateData?.studentName} in ${certificateData?.domain}.`,
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-36 px-4 md:px-8 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #certificate-content,
          #certificate-content * {
            visibility: visible;
          }

          #certificate-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            border: none;
            box-shadow: none;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .min-h-screen,
          .max-w-6xl {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <div className="mb-10 pb-6 border-b border-gray-200 print:hidden">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Verify Certificate
          </h1>

          <p className="text-slate-500">
            Enter a certificate ID to verify its authenticity and
            view details.
          </p>
        </div>

        <div className="max-w-2xl mb-12 print:hidden">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input
                type="text"
                value={certificateId}
                onChange={(e) =>
                  setCertificateId(e.target.value)
                }
                placeholder="Enter certificate ID"
                className="w-full bg-white border border-gray-300 text-slate-900 rounded-lg py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500 text-white text-sm font-medium py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Now"
              )}
            </button>
          </form>
        </div>

        {error && searched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3 max-w-2xl shadow-sm print:hidden"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />

            <div>
              <h3 className="font-semibold text-red-900 text-sm">
                Verification Failed
              </h3>

              <p className="text-red-700 text-sm mt-1">
                {error}
              </p>
            </div>
          </motion.div>
        )}

        {certificateData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex gap-3 mb-6 print:hidden">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-lg"
              >
                <Download className="w-4 h-4" />
                Download
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 border border-slate-300 px-5 py-3 rounded-lg"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <div
              id="certificate-content"
              className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200"
            >
              <div className="flex items-center justify-center mb-6">
                <Award className="w-16 h-16 text-violet-600" />
              </div>

              <h2 className="text-4xl font-bold text-center mb-4">
                Certificate Verified
              </h2>

              <p className="text-center text-slate-500 mb-10">
                This certificate is authentic and officially verified.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500">
                    Candidate Name
                  </p>

                  <p className="font-semibold text-lg">
                    {certificateData.studentName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Domain
                  </p>

                  <p className="font-semibold text-lg">
                    {certificateData.domain}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Duration
                  </p>

                  <p className="font-semibold text-lg">
                    {certificateData.duration}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Certificate ID
                  </p>

                  <p className="font-semibold text-lg">
                    {certificateData.certificateNo}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Starting Date
                  </p>

                  <p className="font-semibold text-lg">
                    {certificateData.startingDate}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Award Date
                  </p>

                  <p className="font-semibold text-lg">
                    {certificateData.awardDate}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-2 text-green-700 font-medium">
                <CheckCircle className="w-5 h-5" />
                Verified Authentic Certificate
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}