import React from "react";

interface TableProps<T> {
  data: T[];
  onRowClick?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function Table<T extends Record<string, any>>({
  data,
  onRowClick,
  onEdit,
  onDelete,
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
    <div className="w-full h-[70vh] overflow-auto rounded-xl border border-gray-200 shadow-xl bg-white">
      <table className="min-w-full text-sm border-collapse table-fixed">
        <thead className="sticky top-0 z-10 bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-gray-900 font-serif font-bold uppercase tracking-wide select-none bg-gray-100"
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
            <th className="px-4 py-3 text-left text-gray-900 font-serif font-bold uppercase tracking-wide select-none bg-gray-100">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`transition duration-150 ${
                onRowClick ? "cursor-pointer" : ""
              } hover:bg-gray-50`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-4 py-2 text-gray-800 whitespace-nowrap text-[0.95rem]"
                >
                  {typeof row[header] === "object"
                    ? JSON.stringify(row[header])
                    : String(row[header])}
                </td>
              ))}
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent row click
                    onEdit?.(row);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent row click
                    onDelete?.(row);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
