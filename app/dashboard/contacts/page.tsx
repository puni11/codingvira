"use client";

import { useEffect, useState } from "react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchContacts = async () => {
    const res = await fetch(
      `/api/contact?page=${page}&search=${search}&startDate=${startDate}&endDate=${endDate}`
    );
    const data = await res.json();

    setContacts(data.data);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchContacts();
  }, [page, search, startDate, endDate]);

  return (
    <div className="">
      <div className="max-w-6xl mx-auto bg-white  p-8">
        
        <h1 className="text-2xl font-semibold text-slate-900 mb-8">
          Contact Submissions
        </h1>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search name, email, phone"
            className="rounded-xl border border-slate-200 px-4 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="date"
            className="rounded-xl border border-slate-200 px-4 py-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            className="rounded-xl border border-slate-200 px-4 py-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button
            onClick={() => {
              setPage(1);
              fetchContacts();
            }}
            className="rounded-xl bg-black text-white py-3"
          >
            Apply
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-sm">
                <th className="py-4">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="py-4">{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-full border border-slate-200 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-slate-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-full border border-slate-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}