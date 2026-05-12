"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, AlertCircle, Download, Share2, FileText, Award } from "lucide-react";

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

export default function VerifyCertificate({ certificateId: initialCertificateId }: { certificateId: string }) {

  const [certificateId, setCertificateId] = useState(initialCertificateId);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Wrapped in useCallback so it can be used in useEffect safely
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
        `/api/certificates/verify?id=${encodeURIComponent(id)}`
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
  }, []);

  // Effect to handle URL parameters on load
  useEffect(() => {
    if (certificateId) {
      setCertificateId(certificateId);
      performVerification(certificateId);
    }
  }, [certificateId, performVerification]);

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
        console.log("Error sharing", err);
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
          body * { visibility: hidden; }
          #certificate-content, #certificate-content * { visibility: visible; }
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
          .min-h-screen, .max-w-7xl { padding: 0 !important; margin: 0 !important; background: white !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10 pb-6 border-b border-gray-200 print:hidden">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Verify Certificate
          </h1>
          <p className="text-slate-500">
            Enter a certificate ID to verify its authenticity and view details.
          </p>
        </div>

        <div className="max-w-2xl mb-12 print:hidden">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter certificate ID (e.g., 20e6fee)"
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
              <h3 className="font-semibold text-red-900 text-sm">Verification Failed</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {certificateData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
          >
            
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between print:hidden">
                <h2 className="text-lg font-bold text-slate-900">Document Preview</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 border border-green-200 rounded-md text-xs font-semibold shadow-sm">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Authentic
                </span>
              </div>
              
              <div id="certificate-content" className="relative w-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 p-2 md:p-3 rounded-xl shadow-xl overflow-hidden">
                
                {certificateData.certificateUrl ? (
                  <iframe 
                    src={certificateData.certificateUrl} 
                    className="w-full h-[500px] border-0 bg-white rounded-lg"
                    title="Certificate Preview"
                  />
                ) : (
                  <div className="relative w-full h-full bg-white rounded-lg border-2 border-slate-100 p-8 md:p-12 flex flex-col items-center text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                       <Award className="w-96 h-96 text-blue-900" />
                    </div>

                    <div className="z-10 flex flex-col items-center mb-6">
                      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-slate-900 mb-1">
                        Codevira Labs <span className="font-light">Private Limited</span>
                      </h3>
                      <p className="text-[10px] md:text-xs text-slate-500 font-medium">CIN: U62020RJ2025PTC106838</p>
                      <p className="text-[10px] md:text-xs text-slate-400 max-w-sm mt-1 leading-tight">
                        Regd. Office: 66/188, Heera Path, Sanganer, Mansarovar, Jaipur - 302020, Rajasthan
                      </p>
                    </div>

                    <div className="z-10 w-full py-4 mb-6 relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-6 text-xl md:text-2xl font-serif font-bold text-blue-900 tracking-wider">
                          CERTIFICATE OF INTERNSHIP
                        </span>
                      </div>
                    </div>

                    <div className="z-10 flex flex-col items-center flex-grow max-w-2xl space-y-4">
                      <p className="text-sm md:text-base text-slate-600 italic font-serif">This is to certify that</p>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-800 py-2">
                        {certificateData.studentName}
                      </h2>
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-lg mt-4">
                        has successfully completed their internship as a <span className="font-bold text-slate-900">{certificateData.domain} Intern</span> at Codevira Labs Private Limited.
                      </p>
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-lg">
                        During their internship tenure, they worked on various tasks including CI/CD pipelines, automation, and infrastructure support. Throughout this period, they demonstrated strong technical aptitude, dedication, and a professional attitude in executing their responsibilities.
                      </p>
                      <p className="text-xs md:text-sm text-slate-600 italic mt-2">
                        We wish them all the best for their future endeavours.
                      </p>
                    </div>

                    <div className="z-10 w-full flex justify-between items-end mt-auto pt-8 px-4 md:px-8">
                      <div className="text-left flex flex-col gap-1">
                        <p className="text-[11px] md:text-xs text-slate-500 font-medium tracking-wide">
                          Date: <span className="text-slate-900">{certificateData.awardDate}</span>
                        </p>
                        <p className="text-[11px] md:text-xs text-slate-500 font-medium tracking-wide">
                          ID: <span className="text-slate-900">{certificateData.certificateNo}</span>
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="w-32 md:w-40 border-b-2 border-slate-800 mb-2"></div>
                        <p className="text-xs md:text-sm font-bold text-slate-900">Gurmeet Kaur</p>
                        <p className="text-[10px] md:text-xs text-slate-500">Director</p>
                        <p className="text-[9px] md:text-[10px] text-slate-400">DIN: 11314241</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6 mt-8 lg:mt-10 print:hidden">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 bg-[#8b5cf6] hover:bg-[#7c4dff] cursor-pointer text-white text-sm font-medium py-3 px-4 rounded-lg transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-sm font-medium py-3 px-4 rounded-lg transition-all shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Share Link
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-black" />
                    Official Record Details
                  </h3>
                </div>
                <div className="px-5 py-2">
                  <dl className="divide-y divide-slate-100 text-sm">
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Candidate Name</dt>
                      <dd className="font-medium text-slate-900 text-right">{certificateData.studentName}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Domain / Role</dt>
                      <dd className="font-medium text-slate-900 text-right">{certificateData.domain}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Duration</dt>
                      <dd className="font-medium text-slate-900 text-right">{certificateData.duration}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Starting Date</dt>
                      <dd className="font-medium text-slate-900 text-right">{certificateData.startingDate}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Issue Date</dt>
                      <dd className="font-medium text-slate-900 text-right">{certificateData.awardDate}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Certificate ID</dt>
                      <dd className="font-mono text-slate-900 text-right bg-slate-100 px-2 py-0.5 rounded">{certificateData.certificateNo}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!searched && !certificateData && (
          <div className="max-w-2xl border border-blue-100 rounded-xl p-6 bg-blue-50/50 shadow-sm mt-8 print:hidden">
            <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              How to verify a certificate:
            </h3>
            <ol className="space-y-3 text-sm text-blue-800 list-decimal list-inside marker:text-blue-500 marker:font-medium">
              <li>Locate the unique Certificate ID.</li>
              <li>Enter the exact ID into the search field or use a direct link.</li>
              <li>Click "Verify Now" to check our secure database.</li>
            </ol>
          </div>
        )}

      </div>
    </div>
  );
}