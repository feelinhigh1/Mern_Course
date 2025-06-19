import React from "react";

interface DynamicTableProps<T> {
  data: T[];
  onRowClick?: (row: T) => void;
}

export default function DynamicTable<T extends Record<string, any>>({
  data,
  onRowClick,
}: DynamicTableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No data available.</div>
    );
  }

  // Get table headers from keys of first item
  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border border-gray-300 px-4 py-2 bg-gray-100 text-left text-gray-700 font-semibold"
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
              className={`cursor-pointer hover:bg-gray-100 ${
                onRowClick ? "cursor-pointer" : ""
              }`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {headers.map((header) => (
                <td key={header} className="border border-gray-300 px-4 py-2">
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
