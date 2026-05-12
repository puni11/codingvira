"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, Download, Share2, Award, Calendar } from "lucide-react";
import QRCode from "react-qr-code"; // Make sure to install this: npm install react-qr-code

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
  const [inputId, setInputId] = useState(initialCertificateId);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const performVerification = useCallback(async (id: string) => {
    const cleanId = id.trim();
    if (!cleanId) {
      setError("Please enter a certificate ID");
      return;
    }

    setError("");
    setCertificateData(null);
    setSearched(true);
    setLoading(true);

    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?certificateId=${encodeURIComponent(cleanId)}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }

    try {
      const response = await fetch(`/api/certificates/verify?id=${encodeURIComponent(cleanId)}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Certificate not found");
      } else {
        setCertificateData(result.data);
      }
    } catch (err) {
      setError("An error occurred while verifying the certificate");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialCertificateId) {
      performVerification(initialCertificateId);
    }
  }, [initialCertificateId, performVerification]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(inputId);
  };

  const handleDownload = () => {
    if (certificateData?.certificateUrl) {
      window.open(certificateData.certificateUrl, "_blank");
    } else {
      window.print();
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Verified Certificate",
          text: `Verified certificate for ${certificateData?.studentName} from Codevira Labs.`,
          url: shareUrl,
        });
      } catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  // Construct the absolute URL for the QR code
  const getVerificationUrl = (certId: string) => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/verify-certificate?certificateid=${encodeURIComponent(certId)}`;
    }
    return `https://codevira.com/verify-certificate?certificateid=${encodeURIComponent(certId)}`; // Fallback domain
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Verify Certificate</h1>
          <p className="text-slate-500">Official verification portal for Codevira Labs Private Limited.</p>
        </div>

        <div className="max-w-2xl mb-12 print:hidden">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                placeholder="Enter certificate ID (e.g., PUN2065)"
                className="w-full bg-white border border-gray-300 text-slate-900 rounded-lg py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-sm font-medium py-3 px-8 rounded-lg transition-all"
            >
              {loading ? "Verifying..." : "Verify Now"}
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        </div>

        {certificateData && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Certificate Area */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between print:hidden">
                <h2 className="text-lg font-bold">Document Preview</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 border border-green-200 rounded-md text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> {certificateData.status}
                </span>
              </div>
              
              <div id="certificate-content" className="relative w-full bg-gradient-to-br from-slate-800 via-slate-900 to-black p-2 md:p-3 rounded-xl shadow-xl overflow-hidden">
                <div className="relative w-full h-full bg-white rounded-lg border-[12px] border-double border-slate-100 p-8 md:p-12 flex flex-col items-center text-center">
                  
                  {/* Background Watermark */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                    <Award className="w-[500px] h-[500px] text-slate-900" />
                  </div>

                  {/* Header info */}
                  <div className="z-10 flex flex-col items-center mb-6">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-slate-900">CODEVIRA LABS PRIVATE LIMITED</h3>
                    <p className="text-[10px] text-slate-500 font-medium">CIN: U62020RJ2025PTC106838</p>
                    <p className="text-[9px] text-slate-400 max-w-sm mt-1">Regd. Office: 66/188, Heera Path, Sanganer, Mansarovar, Jaipur - 302020, Rajasthan</p>
                  </div>

                  <div className="z-10 w-full py-4 mb-6 relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center"><span className="bg-white px-6 text-xl md:text-2xl font-serif font-bold text-slate-800 tracking-tighter">CERTIFICATE OF INTERNSHIP</span></div>
                  </div>

                  <div className="z-10 flex flex-col items-center flex-grow max-w-2xl space-y-4">
                    <p className="text-sm md:text-base text-slate-600 italic font-serif">This is to certify that</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 py-2 underline decoration-slate-200 underline-offset-8 font-serif">{certificateData.studentName}</h2>
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                      has successfully completed their internship as a <span className="font-bold text-slate-900">{certificateData.domain} Intern</span>.
                    </p>
                    
                    {/* Integrated Date Info */}
                    <div className="grid grid-cols-3 gap-4 w-full max-w-md py-4 border-y border-slate-50 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase text-slate-400 font-bold">Start Date</span>
                        <span className="text-sm font-medium text-slate-800">{certificateData.startingDate}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase text-slate-400 font-bold">Duration</span>
                        <span className="text-sm font-medium text-slate-800">{certificateData.duration}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase text-slate-400 font-bold">Completion</span>
                        <span className="text-sm font-medium text-slate-800">{certificateData.awardDate}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-tight max-w-lg pt-2">
                      Throughout this period, they demonstrated strong technical aptitude, dedication, and a professional attitude in executing their responsibilities.
                    </p>
                  </div>

                  {/* Footer with Signatures & Real QR Code */}
                  <div className="z-10 w-full flex justify-between items-end mt-auto pt-10">
                    <div className="text-left flex flex-col items-start gap-4">
                      {/* Functional QR Code */}
                      <div className="p-1.5 border border-slate-200 rounded bg-slate-50">
                        <QRCode
                          value={getVerificationUrl(certificateData.certificateNo)}
                          size={64}
                          level="H"
                          bgColor="transparent"
                          fgColor="#1e293b" // slate-800 equivalent
                        />
                        <p className="text-[7px] text-center text-slate-500 mt-1.5 uppercase font-bold tracking-wider">Scan to Verify</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-medium">Issue Date: {certificateData.awardDate}</p>
                        <p className="text-[10px] text-slate-500 font-medium">Certificate ID: {certificateData.certificateNo}</p>
                      </div>
                    </div>
                    
                    <div className="text-right flex flex-col items-end">
                      <div className="w-32 border-b-2 border-slate-800 mb-2"></div>
                      <p className="text-xs font-bold text-slate-900">Gurmeet Kaur</p>
                      <p className="text-[10px] text-slate-500">Director</p>
                      <p className="text-[9px] text-slate-400 uppercase font-bold">DIN: 11314241</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Record Details */}
            <div className="lg:col-span-5 flex flex-col gap-6 print:hidden">
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleDownload} className="flex items-center justify-center gap-2 bg-[#8b5cf6] hover:bg-[#7c4dff] text-white text-sm font-medium py-3 px-4 rounded-lg shadow-sm"><Download className="w-4 h-4" /> Save PDF</button>
                <button onClick={handleShare} className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-sm font-medium py-3 px-4 rounded-lg shadow-sm"><Share2 className="w-4 h-4" /> Share</button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <h3 className="font-semibold text-sm">Official Record Timelines</h3>
                </div>
                <div className="px-5 py-2">
                  <dl className="divide-y divide-slate-100 text-sm">
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Internship Start</dt>
                      <dd className="font-medium text-slate-900">{certificateData.startingDate}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Internship End</dt>
                      <dd className="font-medium text-slate-900">{certificateData.awardDate}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Total Duration</dt>
                      <dd className="font-medium text-slate-900">{certificateData.duration}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4 border-t-2 border-slate-100 mt-2">
                      <dt className="text-slate-500">Domain</dt>
                      <dd className="font-medium text-slate-900">{certificateData.domain}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-slate-500">Verification ID</dt>
                      <dd className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">{certificateData.certificateNo}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}