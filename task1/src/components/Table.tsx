import React from "react";

interface TableProps<T> {
  data: T[];
  onRowClick?: (row: T) => void;
}

export default function Table<T extends Record<string, any>>({
  data,
  onRowClick,
}: TableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 italic">
        No data available.
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 sticky top-0 shadow">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-gray-700 font-semibold uppercase tracking-wider select-none"
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`transition-colors duration-200 ${
                onRowClick ? "cursor-pointer" : ""
              } ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-6 py-4 text-gray-800 whitespace-nowrap"
                >
                  {String(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
