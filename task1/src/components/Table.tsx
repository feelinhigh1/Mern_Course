import React, { useState } from "react";

interface TableProps<T> {
  data: T[];
  onRowClick?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  pagination?: {
    pageSize: number;
    total: number;
  };
}

export default function Table<T extends Record<string, any>>({
  data,
  onRowClick,
  onEdit,
  onDelete,
  pagination,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = pagination?.pageSize || 10;
  const total = pagination?.total || data.length;
  const totalPages = Math.ceil(total / pageSize);

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 italic font-sans text-xl">
        No data available.
      </div>
    );
  }

  const headers = Object.keys(data[0]);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div
      className="w-full h-[70vh] overflow-auto rounded-2xl border border-gray-300 shadow-md bg-white"
      style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}
    >
      <table className="min-w-full text-sm table-fixed border-collapse">
        <thead className="sticky top-0 z-10 bg-cyan-700 text-white">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-center text-base font-semibold tracking-wide border-b border-gray-700"
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
            <th className="px-6 py-4 text-center text-base font-semibold tracking-wide border-b border-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody
          className="divide-y divide-gray-200"
          style={{
            fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {paginatedData.map((row, i) => (
            <tr
              key={i}
              className={`transition duration-150 ${
                onRowClick ? "cursor-pointer" : ""
              } even:bg-gray-50 hover:bg-gray-100`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-6 py-3 text-center text-gray-800 whitespace-nowrap text-sm"
                >
                  {typeof row[header] === "object"
                    ? JSON.stringify(row[header])
                    : String(row[header])}
                </td>
              ))}
              <td className="px-6 py-3 text-center whitespace-nowrap">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(row);
                    }}
                    className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(row);
                    }}
                    className="px-3 py-1.5 rounded-md bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-4 p-4">
        <button
          className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === page
                ? "bg-green-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
