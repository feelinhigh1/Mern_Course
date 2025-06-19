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
    <div className="w-full h-[70vh] overflow-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-gray-100 sticky top-0 shadow z-10">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-gray-700 font-semibold uppercase tracking-wider select-none whitespace-nowrap"
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
                  className="px-4 py-2 text-gray-800 break-words whitespace-nowrap"
                >
                  {typeof row[header] === "object"
                    ? JSON.stringify(row[header])
                    : String(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
